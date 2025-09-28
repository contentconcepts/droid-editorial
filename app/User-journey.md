User journey for editorial manager

Of course. Here is the workflow translated into a clear user journey with detailed instructions for a developer.

---

### **Developer Guide: Secure Document Editing Workflow**

#### **Objective**
To create a secure, token-based workflow for managing editorial orders without requiring users or editors to create accounts. The system will rely on unique, time-limited URLs for all file access.

#### **Core Components & Prerequisites**

1.  **Database Schema:** You will need at least two tables:
    * `Orders`: To store details of each job.
        * `order_id` (Primary Key, e.g., UUID/string)
        * `user_name` (string)
        * `user_email` (string)
        * `status` (string, e.g., 'new', 'assigned', 'completed', 'delivered')
        * `original_file_path` (string)
        * `edited_file_path` (string)
        * `editor_access_token` (string, unique, nullable)
        * `user_download_token` (string, unique, nullable)
        * `download_token_expires_at` (datetime, nullable)
        * `assigned_editor_id` (Foreign Key to Editors table, nullable)
        * `created_at`, `updated_at` (timestamps)
    * `Editors`: To store a list of available editors.
        * `editor_id` (Primary Key)
        * `editor_name` (string)
        * `editor_email` (string)

2.  **Secure File Storage:** Use a service like Amazon S3, Google Cloud Storage, or a secure, non-public directory on your server. Files should be stored with non-guessable names (e.g., using the `order_id`).

3.  **Token Generation:** Use a robust library to generate cryptographically secure random strings or UUIDs (Version 4 is recommended) for all tokens. **Do not use sequential integers.**

4.  **Email Service:** A transactional email service (Resend) to handle automated notifications reliably.

---

### **User Journey & Development Steps**

Here is the step-by-step logic for the application flow.

#### **Step 1: User Submits an Order**

* **User Action:** A customer visits the website, fills out a form with their name and email, and uploads their document for editing.

* **Developer Instructions:**
    1.  **Frontend:** Create an HTML form with `name`, `email`, and `file` input fields. Implement client-side validation for file size and type.
    2.  **Backend API Endpoint (e.g., `/api/orders/create`):**
        * On form submission, validate all inputs on the server.
        * Generate a unique `order_id` (e.g., `UUID()`).
        * Upload the document to your secure file storage. The stored filename should be tied to the `order_id` (e.g., `uploads/originals/{order_id}.docx`).
        * Create a new record in the `Orders` table with the user's details, the `original_file_path`, and set the initial `status` to `'new'`.
        * Trigger an email to the `user_email` confirming the submission. **This email must not contain any links to the uploaded file.**

#### **Step 2: Manager Assigns the Order to an Editor**

* **Manager Action:** The manager logs into a private dashboard, views the list of new orders, and assigns one to a specific editor.

* **Developer Instructions:**
    1.  **Manager Dashboard:** Create a secure, authenticated web interface that queries the `Orders` table for all records where `status = 'new'`.
    2.  **Assignment Logic (e.g., on an "Assign" button click):**
        * The manager selects an order and an editor from a dropdown list (populated from the `Editors` table).
        * Generate a unique, non-guessable `editor_access_token` (e.g., `UUID()`).
        * Update the corresponding record in the `Orders` table:
            * Set `status` to `'assigned'`.
            * Set `assigned_editor_id` to the selected editor's ID.
            * Store the generated `editor_access_token`.
        * Construct the unique URL for the editor: `https://yourdomain.com/editor/access/{editor_access_token}`.
        * Trigger an email to the assigned editor's email address containing this unique link and instructions.

#### **Step 3: Editor Completes the Work**

* **Editor Action:** The editor receives the email, clicks the unique link, downloads the original document, edits it, and uploads the final version via the same link.

* **Developer Instructions:**
    1.  **Editor Access Page (Endpoint: `GET /editor/access/:token`):**
        * This page is public but only accessible with a valid token.
        * Extract the token from the URL.
        * Query the `Orders` table for a record matching the `editor_access_token`.
        * **Validation:** If no record is found or if the order `status` is not `'assigned'`, display an "Invalid Link" or 404 error page.
        * If valid, display the order details, a secure link/button to download the `original_file_path`, and a file upload form for the edited document.
    2.  **Editor Upload Logic (Endpoint: `POST /editor/upload/:token`):**
        * When the editor submits the edited file, validate the token again.
        * Upload the edited document to secure storage (e.g., `uploads/edited/{order_id}.docx`).
        * Update the `Orders` record:
            * Set `status` to `'completed'`.
            * Save the `edited_file_path`.
            * **Crucially, set `editor_access_token` to `NULL`. This invalidates the editor's link immediately after use.**

#### **Step 4: System Delivers the Final Document to the User**

* **System Action:** As soon as the editor uploads the final document, the system automatically generates a new, unique download link and emails it to the original user.

* **Developer Instructions:**
    1.  **Automated Trigger:** This logic should run immediately after the successful completion of Step 3.
    2.  **Generate User Download Token:**
        * Generate a new, unique `user_download_token` (e.g., `UUID()`).
        * Calculate the expiration timestamp: `download_token_expires_at = NOW() + 7 days`.
        * Update the `Orders` record with these two new values and set `status` to `'delivered'`.
    3.  **Send Final Email:**
        * Construct the unique download URL: `https://yourdomain.com/download/{user_download_token}`.
        * Trigger an email to the original `user_email` with the link, informing them that their document is ready.
    4.  **User Download Page (Endpoint: `GET /download/:token`):**
        * Extract the token from the URL.
        * Query the `Orders` table for a record matching the `user_download_token`.
        * **Validation:**
            * If no record is found, show an "Invalid Link" error.
            * Check if `NOW() > download_token_expires_at`. If it is, show a "Link Expired" error.
        * If the token is valid and not expired, display a page with a button that allows the user to download the file from the `edited_file_path`.
        * **(Optional Feature):** To make the link single-use, you can set the `user_download_token` to `NULL` after the first successful download request.


        