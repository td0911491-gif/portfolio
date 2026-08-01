import { Certification } from "@/types";

// Drop the certificate file (PDF or image) into /public/documents or /public/images
// and point `fileUrl` at it. `verificationUrl` is optional but recommended.
export const certifications: Certification[] = [
  {
    id: "hackerrank-sde-intern",
    title: "Software Engineer Intern — Role Certification",
    issuer: "HackerRank",
    date: "2026-07-26",
    credentialId: "4BEBC4738A29",
    fileUrl: "/documents/software_engineer_intern_certificate.pdf",
    description: "Passed the HackerRank role certification test for Software Engineer Intern."
  },
  {
    id: "hackerrank-sql-intermediate",
    title: "SQL (Intermediate) — Skill Certification",
    issuer: "HackerRank",
    date: "2026-07-29",
    credentialId: "5807DD16463B",
    fileUrl: "/documents/sql_intermediate_certificate.pdf",
    description: "Passed the HackerRank skill certification test for Intermediate SQL."
  },
  {
    id: "deloitte-data-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "2026-07-25",
    fileUrl: "/documents/Deloitte_Certificate.pdf",
    description: "Completed practical tasks in data analysis and forensic technology."
  }
];
