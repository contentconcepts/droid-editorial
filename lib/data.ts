export type ServiceId = "proofreading" | "substantive" | "rewriting";

export const SERVICES: Array<{
  id: ServiceId;
  name: string;
  rateUSD: number;
  rateINR: number;
  description: string;
}> = [
  {
    id: "proofreading",
    name: "Proofreading",
    rateUSD: 0.019,
    rateINR: 1.58,
    description: "Final polish for grammar, spelling, and light style refinement.",
  },
  {
    id: "substantive",
    name: "Substantive Editing",
    rateUSD: 0.021,
    rateINR: 1.74,
    description: "Structural edits, clarity improvements, and tone alignment.",
  },
  {
    id: "rewriting",
    name: "Rewriting",
    rateUSD: 0.036,
    rateINR: 2.99,
    description: "Extensive rewriting for major overhauls and editorial transformations.",
  },
];

export const DELIVERY_WINDOWS: Record<ServiceId, Array<{ min: number; max: number; hours: number }>> = {
  proofreading: [
    { min: 0, max: 1999, hours: 48 },
    { min: 2000, max: 3999, hours: 72 },
    { min: 4000, max: 5999, hours: 96 },
    { min: 6000, max: 10000, hours: 120 },
  ],
  substantive: [
    { min: 0, max: 1999, hours: 48 },
    { min: 2000, max: 3999, hours: 72 },
    { min: 4000, max: 5999, hours: 96 },
    { min: 6000, max: 10000, hours: 120 },
  ],
  rewriting: [
    { min: 0, max: 1999, hours: 96 },
    { min: 2000, max: 3999, hours: 120 },
    { min: 4000, max: 10000, hours: 168 },
  ],
};

export const JOB_STATUSES = [
  {
    id: "draft",
    label: "Draft",
    description: "Customer compiling job requirements and uploads before submission.",
  },
  {
    id: "awaiting_payment",
    label: "Awaiting Payment",
    description: "Quote submitted and pending Razorpay payment completion.",
  },
  {
    id: "paid",
    label: "Paid",
    description: "Funds captured and ready for assignment.",
  },
  {
    id: "assigned",
    label: "Assigned",
    description: "Manager aligned a qualified editor to the job.",
  },
  {
    id: "in_progress",
    label: "In Progress",
    description: "Editor actively editing deliverables.",
  },
  {
    id: "changes_requested",
    label: "Changes Requested",
    description: "Manager needs updates before delivery approval.",
  },
  {
    id: "delivered",
    label: "Delivered",
    description: "Manager approved files and released to customer.",
  },
  {
    id: "closed",
    label: "Closed",
    description: "Customer confirmed completion or auto-closure after seven days.",
  },
];

export const ROLE_CAPABILITIES: Array<{
  role: "Admin" | "Customer" | "Manager" | "Editor";
  responsibilities: string[];
}> = [
  {
    role: "Admin",
    responsibilities: [
      "Provision and deactivate accounts across all roles",
      "Assign appropriate role-based permissions",
      "Trigger credential setup emails",
    ],
  },
  {
    role: "Customer",
    responsibilities: [
      "Create jobs via guided quote form",
      "Upload source files and review price/delivery",
      "Pay securely and follow progress",
      "Collaborate with editor and manager in-thread",
      "Download final approved deliverables",
    ],
  },
  {
    role: "Manager",
    responsibilities: [
      "Monitor all jobs and prioritise assignments",
      "Match editors with workloads and expertise",
      "Review editor submissions and gate quality",
      "Request revisions or approve delivery",
      "Coordinate communication across roles",
    ],
  },
  {
    role: "Editor",
    responsibilities: [
      "Access assigned jobs and download originals",
      "Produce revised deliverables within SLA",
      "Answer queries via job discussion board",
      "Resubmit updates until manager approval",
    ],
  },
];

export const INTEGRATIONS = [
  {
    name: "Razorpay Checkout",
    summary: "Handles global payments with auto currency logic and webhook-driven status sync.",
  },
  {
    name: "Secure Object Storage",
    summary: "Stores originals and revisions with short-lived, role-gated download URLs.",
  },
  {
    name: "Resend Email",
    summary: "Delivers workflow notifications for payments, assignments, and message events.",
  },
];

export const WORKFLOW_STEPS = [
  {
    title: "Customer Creates Job",
    details: [
      "Authenticated customers capture requirements via the quote form",
      "Job IDs follow service initials + sequence + date, e.g., SE0123082025",
      "Uploads stored immediately with checksum verification",
    ],
  },
  {
    title: "Secure Payment",
    details: [
      "Razorpay modal processes INR for India and USD for global customers",
      "Webhook confirmation flips status from awaiting_payment to paid",
      "Notifications sent to customer and manager with job context links",
    ],
  },
  {
    title: "Manager Assignment",
    details: [
      "Managers triage paid jobs, attach editor notes, and lock in assignees",
      "Editors gain access to original uploads instantly after assignment",
    ],
  },
  {
    title: "Editorial Production",
    details: [
      "Editors download originals, work locally, then upload up to three revisions",
      "Submission triggers dual email to customer and manager with secure links",
    ],
  },
  {
    title: "Review and Approval",
    details: [
      "Managers request changes or approve delivery, maintaining audit trails",
      "Approved jobs notify customers and expose revision links for seven days",
    ],
  },
  {
    title: "Closure",
    details: [
      "Customers close the job manually or the system auto-closes after seven days",
      "Closed jobs remain read-only with preserved files and discussion history",
    ],
  },
];

export const DASHBOARD_SECTIONS: Record<
  "customer" | "manager" | "editor" | "admin",
  Array<{ title: string; description: string; highlights: string[] }>
> = {
  customer: [
    {
      title: "Quote & Job Intake",
      description: "Track drafts and submitted quotes with live pricing and currency switching.",
      highlights: [
        "Guided form with word-count override",
        "Upload up to three originals per job",
        "Preview delivery commitments before paying",
      ],
    },
    {
      title: "Progress Tracking",
      description: "Timeline view surfaces the next milestone and responsible party.",
      highlights: [
        "Status cards for every active job",
        "Event log capturing file submissions and messages",
        "Direct links to download originals and revisions",
      ],
    },
    {
      title: "Conversation Threads",
      description: "Secure, job-specific messaging keeps the entire history in one place.",
      highlights: [
        "Rich text editor with file references",
        "Instant notifications via Resend",
        "Pinned manager announcements for clarity",
      ],
    },
  ],
  manager: [
    {
      title: "Assignment Console",
      description: "Filter by service, due date, or workload to assign editors with confidence.",
      highlights: [
        "Availability indicators for editors",
        "Inline notes stored alongside job metadata",
        "Bulk operations for high-volume periods",
      ],
    },
    {
      title: "Quality Gate",
      description: "Review revisions, annotate feedback, or approve delivery in a single view.",
      highlights: [
        "Side-by-side file previews",
        "Structured change requests with due dates",
        "One-click delivery approval",
      ],
    },
    {
      title: "Operational Insights",
      description: "Analytics widgets surface SLA risk, workloads, and repeat customer trends.",
      highlights: [
        "Service mix and turnaround dashboards",
        "Export-ready reports for leadership",
        "Integration status checks for payments and email",
      ],
    },
  ],
  editor: [
    {
      title: "Focused Work Queue",
      description: "Only assigned jobs appear, prioritised by due date and word count.",
      highlights: [
        "Original file downloads with checksum info",
        "Delivery countdown timers",
        "Slack-style thread replies to keep context clear",
      ],
    },
    {
      title: "Submission Hub",
      description: "Upload revised documents, add summary notes, and hand off for review.",
      highlights: [
        "Drag-and-drop upload with versioning",
        "Up to three revisions per submission",
        "Automatic notification receipts",
      ],
    },
    {
      title: "Feedback Loop",
      description: "Respond to manager change requests and maintain final revisions.",
      highlights: [
        "Change request checklist",
        "History of resubmissions",
        "Delivery readiness indicators",
      ],
    },
  ],
  admin: [
    {
      title: "User Provisioning",
      description: "Create accounts, assign roles, and dispatch setup emails instantly.",
      highlights: [
        "Bulk import via CSV",
        "Role-based permission presets",
        "Audit log of access changes",
      ],
    },
    {
      title: "Governance & Compliance",
      description: "Enforce policies around file retention and data access.",
      highlights: [
        "Configurable retention windows",
        "Full activity history per user",
        "Exportable compliance reports",
      ],
    },
    {
      title: "Platform Health",
      description: "Monitor integration status, storage utilisation, and email deliverability.",
      highlights: [
        "Webhook success/failure tracing",
        "Storage usage against quotas",
        "Resend bounce and engagement metrics",
      ],
    },
  ],
};

export const MESSAGE_SAMPLE = [
  {
    author: "Manager",
    content: "Hi Sam, editor assigned and kickoff scheduled for 10:00 AM UTC.",
    timestamp: "2025-09-15 08:32",
  },
  {
    author: "Editor",
    content: "Uploaded first revision with tracked changes focusing on tone consistency.",
    timestamp: "2025-09-16 14:18",
  },
  {
    author: "Customer",
    content: "Thanks! Could we emphasise the executive summary conclusions a bit more?",
    timestamp: "2025-09-16 16:41",
  },
];
