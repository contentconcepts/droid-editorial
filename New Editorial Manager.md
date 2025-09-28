New Editorial Manager

Editorial Workflow Management System: Requirements Specification
1. Scope
A responsive web application where customers can order editorial services, pay securely, and track their jobs. The platform will facilitate the entire workflow: managers will assign editors to jobs, editors will submit completed work, and all participants will communicate within a job-specific message board. Automated email notifications will be sent at critical stages of the workflow.
2. User Roles & Authentication
The system will support four distinct user roles with a standard email and password authentication system.
* Admin:
    * Creates and manages user accounts (Managers, Editors).
    * Assigns roles to users.
    * Sends account setup links via email.
* Customer:
    * Creates new jobs via a quote form.
    * Submits documents for editing.
    * Pays for services securely.
    * Tracks job progress.
    * Communicates with the assigned editor and manager.
    * Downloads final, edited files.
* Manager:
    * Views and oversees all jobs in the system.
    * Assigns available editors to new jobs.
    * Reviews submitted work from editors.
    * Can request changes from an editor.
    * Approves final delivery to the customer.
    * Communicates with customers and editors.
* Editor:
    * Views only the jobs they have been assigned to.
    * Downloads customer's original files.
    * Uploads edited deliverables for review.
    * Communicates with the manager and customer for the assigned job.
3. Core Features
3.1. Quote & Job Creation Form
A public-facing form for customers to create a new job.
* Input Fields:
    * Name
    * Email
    * Type of Document (e.g., Essay, Manuscript, Report)
    * Service Selection (dropdown)
    * Document Upload
    * Word Count (auto-calculated with manual override)
    * Instructions to Editor (text area)
* Live Calculation: The form will dynamically display the Price and Estimated Delivery Date based on the selected service and word count. The quote form pricing should show INR for users in India and USD for the rest of the world and process the payment accordingly. 
* Document Upload:
    * Customers can upload 1 to 3 files.
    * Accepted file formats are strictly .docx and .txt.
    * The system will attempt to automatically calculate the word count from uploaded files. An editable field will allow the customer to manually override this count.
3.2. Services, Pricing & Delivery
* Services & Pricing:
    *Proofreading: $0.019 USD per word 
    Substantive Editing: $0.021 USD per word
    * Rewriting: $0.036 USD per word
* Delivery Bands (Substantive Editing):
    * 0 - 1999 words: 48 hours
    * 2000 - 3999 words: 72 hours
    * 4000 - 5999 words: 96 hours
    * 6000 - 10000 words: 120 hours
* Delivery Bands (Rewriting):
    * 0 - 1999 words: 96 hours
    * 2000 - 3999 words: 120 hours
    * 4000 - 10000 words: 168 hours (7 days)
*Delivery Bands (Proofreading):
    * 0 - 1999 words: 48 hours
    * 2000 - 3999 words: 72 hours
    * 4000 - 5999 words: 96 hours
    * 6000 - 10000 words: 120 hours
* Delivery Calculation: The delivery countdown begins immediately upon payment confirmation.
3.3. Job Status Workflow
Each job will progress through the following statuses:
1. draft -> (Customer creates job)
2. awaiting_payment -> (Customer submits form)
3. paid -> (Payment confirmed)
4. assigned -> (Manager assigns an editor)
5. in_progress -> (Editor begins work)
    * Can loop back to in_progress if manager requests changes (changes_requested).
7. delivered -> (Manager approves and sends to customer)
8. closed -> (Job is complete)

4. Technical & Integration Requirements
* Payments: Integrate with Razorpay Checkout for secure payment processing.
* File Storage: 
* Email Notifications: An email service (Resend) will be used to send automated notifications for the following events:
    * Payment Confirmed (to Customer & Manager)
    * Job Assigned (to Editor)
    * Editor Submitted Files (to Manager & Customer)
    * Changes Requested by Manager (to Editor)
    * Delivery Completed (to Customer)
    * New Message Posted (to all job participants)


6. Payments

Razorpay for payments. For users in India show rates in INR and for users outside of India in USD or their currency

User Flow

# User flow

## 1. Customer creates a job
1. Signs in.
2. Completes the quote form - each quote form should have a job ID . For example if Substantive Editing SE0123082025 (service initials, incremental number plus date in DDMMYYY format_
3. Uploaded files are stored in the database.
4. Sees live price and provisional delivery estimate.
5. Clicks proceed → Razorpay Checkout.
6. Pays → Razorpay webhook marks job as Paid
7. Emails:
   - Payment confirmed → sent to customer and manager (with job link, and link to attachments).
8. On the dashboard:
   - Customer sees their uploaded original files.
   - Manager sees originals awaiting assignment.

---

## 2. Manager assigns editor
1. Manager views the Paid queue.
2. Assigns an editor with notes.
3. Status → Assigned.
4. Emails:
   - Job assigned → sent to the editor with job link.
5. On the dashboard:
   - Editor now sees the job with the original customer files available for download.

---

## 3. Editor works
1. Editor downloads **original customer documents**.
2. Makes changes in their local environment (proofreading or editing).
3. Uploads up to **3 revised files** 
4. Clicks submit for review.
5. Status → In Review.
6. Emails:
   - Submitted for review → sent simultaneously to customer and manager.
   - Includes **secure pre-signed links** to revised files (not attachments).
7. On dashboards:
   - Customer now sees both their originals and the editor’s revised files.
   - Manager sees both sets as well, preparing for review.

---

## 4. Manager review cycle
- If issues:
  1. Manager requests changes.
  2. Status → Changes Requested.
  3. Editor receives email and sees notes in job thread.
  4. Editor uploads revised versions again (replacing or adding up to 3 files).
  5. Resubmits → In Review → triggers dual email to customer and manager.
- If approved:
  1. Manager approves delivery.
  2. Status → Delivered.
  3. Customer receives delivery email with secure links to revised files.
  4. Originals remain visible but clearly marked as “submitted by customer”.

---

---

## 6. Closure
- Customer can click **Close Job** after downloading.
- Or system auto-closes the job 7 days after delivery.
- Closed jobs remain accessible in read-only mode with all files and thread messages intact.

---

## Role-based document visibility summary
- **Customer dashboard**: shows originals (their uploads) and editor revisions once submitted.
- **Editor dashboard**: shows customer originals and their own uploaded revisions.
- **Manager dashboard**: shows both originals and editor revisions at all stages.
- **Emails**: never include file attachments. Only short-lived secure links that require login.