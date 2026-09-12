import type { Experience } from "@/lib/types";

/**
 * Career timeline.
 * Content updates: append a new object here to add a job — zero layout changes.
 */
export const experience: Experience[] = [
  {
    id: "air-india",
    company: "Air India",
    role: "Lead Software Engineer",
    location: "Gurugram, India",
    start: "2025-01",
    end: "Present",
    bullets: [
      "Led end-to-end architecture and delivery of MyAI, an enterprise workplace platform scaled from ~30K to ~100K users, owning service boundaries for finance records, leave workflows, document storage, org hierarchy, policy distribution, ticketing, and multi-level approvals from design through production rollout.",
      "Architected request/approval backend services with RBAC, JWT-authenticated APIs, audit trails, and deterministic state transitions, replacing fragmented manual routing with API-driven workflow orchestration used daily across teams.",
      "Traded short-term migration complexity for long-term reliability by re-architecting MyAI Social (feeds, engagement graph, media) onto S3/CDN offload, MongoDB read-replica routing, and Redis cache-aside ahead of the 3x user scale-up, sustaining stable feed-read latency on high-traffic timeline queries.",
      "Leading a team of 9 developers, owning sprint planning, system design reviews, code reviews, and mentorship.",
    ],
    stack: ["Node.js", "MongoDB", "Redis", "AWS", "S3", "CDN", "JWT", "RBAC"],
  },
  {
    id: "unicommerce",
    company: "UniCommerce eSolutions Ltd",
    role: "Senior Software Engineer",
    location: "Gurugram, India",
    start: "2024-05",
    end: "2025-01",
    bullets: [
      "Built a shipping-provider aggregation service evaluating carrier rates/constraints across integrations to select optimal shipping options, reducing shipping costs by ~25% for 150+ businesses.",
      "Owned order-management backend workflows for cancellations and global order search using MongoDB indexing and Redis caching, cutting manual cancellation effort by ~30% and improving lookup speed by ~40%.",
      "Delivered a logistics control-tower service aggregating shipment status/events into operations analytics, streamlining weight-dispute workflows and reducing resolution time by ~25%.",
    ],
    stack: ["Node.js", "MongoDB", "Redis", "APIs"],
  },
  {
    id: "edfora",
    company: "Edfora Infotech Pvt. Ltd (FIITJEE)",
    role: "Senior Software Engineer",
    location: "Delhi, India",
    start: "2022-06",
    end: "2024-04",
    bullets: [
      "Designed and built an internal ticket-management system from scratch (Helpdesk-style) with RBAC, SLA-based escalation workflows, and audit trails, reducing issue-resolution time by 35%.",
      "Led development of MyClasses, an online class-scheduling platform for 50K+ users, integrating Zoom APIs and WebSocket-based live notifications for virtual learning.",
      "Engineered the Glorify Quotient analytics engine, a proprietary teacher-efficacy metric processing 1M+ data points via MongoDB aggregation pipelines and pre-computed materialized views.",
      "Architected a course-plan engine using SQS queues and Redis cache-aside caching, achieving ~500ms retrieval across 200K+ plans. Mentored 3 junior developers.",
    ],
    stack: [
      "Node.js",
      "MongoDB",
      "Redis",
      "AWS SQS",
      "WebSockets",
      "Zoom APIs",
    ],
  },
  {
    id: "wingify",
    company: "Wingify Softwares Pvt. Ltd",
    role: "Software Developer (Frontend)",
    location: "Kochi, India (Remote)",
    start: "2020-08",
    end: "2022-06",
    bullets: [
      "Enhanced VWO's visual editor for layout/element/event/design manipulation, enabling analysts to run A/B personalisation with reduced engineering dependency.",
      "Implemented React.js/SPA support in the visual editor and testing product with rendering and load-path optimisations, improving page-load performance by ~40% and engagement by ~25%.",
    ],
    stack: ["React.js", "SPA", "Performance"],
  },
];
