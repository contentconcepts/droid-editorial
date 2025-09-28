# Editorial Workflow Management System

## Overview
The Editorial Workflow Management System is a responsive web platform that enables customers to order editorial services, managers to coordinate assignments, and editors to deliver completed work within a structured lifecycle. It provides secure payments, role-based dashboards, and automated notifications across the job pipeline.

## User Roles
- **Admin** – Manages user accounts, assigns roles, and provisions access via email.
- **Customer** – Creates jobs through a quote form, uploads documents, submits payment, tracks progress, collaborates in job threads, and downloads final deliverables.
- **Manager** – Oversees all jobs, assigns editors, reviews submissions, requests revisions, approves deliveries, and communicates with stakeholders.
- **Editor** – Works on assigned jobs only, downloads customer files, uploads revisions, and participates in job-specific discussions.

## Core Features
### Quote & Job Creation
- Public form with fields for contact details, document type, service selection, document upload (1–3 `.docx` or `.txt` files), word count, and editor instructions.
- Automatic word count extraction with manual override.
- Live pricing and delivery estimates, priced in INR for Indian users and USD for others.
- Razorpay checkout integration for secure payments and webhook-driven status updates.

### Services & Pricing
- Proofreading – $0.019 USD per word
- Substantive Editing – $0.021 USD per word
- Rewriting – $0.036 USD per word

### Delivery Bands
- **Proofreading / Substantive Editing**: 0–1999 words → 48h, 2000–3999 words → 72h, 4000–5999 words → 96h, 6000–10000 words → 120h
- **Rewriting**: 0–1999 words → 96h, 2000–3999 words → 120h, 4000–10000 words → 168h
- Countdown begins once payment is confirmed.

### Job Status Lifecycle
`draft → awaiting_payment → paid → assigned → in_progress ↺ changes_requested → delivered → closed`

### Messaging & Notifications
- Job-specific message boards allow Customers, Managers, and Editors to collaborate.
- Resend-powered emails alert users on payment confirmation, assignments, submissions, change requests, deliveries, and new messages.
- Emails share short-lived secure file links; attachments are never sent directly.

### File Management
- Customers upload originals; editors upload up to three revised files per submission cycle.
- Role-based dashboards present only the files relevant to each participant while preserving full history for managers.

## Workflow Summary
1. **Job Creation** – Customer signs in, completes the quote form (job IDs follow service initials, sequence, and date e.g., `SE0123082025`), uploads files, reviews live pricing, and pays via Razorpay.
2. **Assignment** – Manager reviews paid jobs, selects an editor with notes, and the editor receives access to the originals.
3. **Editing** – Editor downloads originals, produces revisions locally, and uploads up to three edited files for review.
4. **Manager Review** – Manager approves delivery or requests changes, cycling with the editor until ready for release.
5. **Delivery & Closure** – Approved jobs trigger delivery emails with secure links; customers can close jobs manually or the system auto-closes after seven days.

## Integrations & Infrastructure
- **Payments**: Razorpay Checkout with currency awareness.
- **Email**: Resend for automated notifications.
- **Storage**: Secure storage for originals and revisions with pre-signed download links.

## Security & Compliance
- Authentication via verified email/password accounts per role.
- Enforced secure file access using role-based permissions and expiring links.
- No files sent via email; all downloads require authentication within the application.
----

Tech Stack

Framework	Next.js + TypeScript
Payments	Razorpay
Emails	Resend
File Storage	Vercel Blob
Database	Vercel Postgres
Authentication	Auth.js
Hosting	Vercel