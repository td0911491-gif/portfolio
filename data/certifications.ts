import { Certification } from "@/types";

// Drop the certificate file (PDF or image) into /public/documents or /public/images
// and point `fileUrl` at it. `verificationUrl` is optional but recommended.

export const certifications: Certification[] = [
  {
    id: "harvard-cs50x",
    title: "CS50x: Introduction to Computer Science",
    issuer: "Harvard University",
    date: "2026",
    credentialId: "3c5f5d11-1b8f-4f28-bd44-f690dcb7b483",
    fileUrl: "/documents/Havard_Certificate_CS50x.pdf",
    verificationUrl: "https://cs50.harvard.edu/certificates/3c5f5d11-1b8f-4f28-bd44-f690dcb7b483",
    description: "Completed CS50x, including ten problem sets and one final project, taught by David J. Malan.",
  },
  {
    id: "hackerrank-sde-intern",
    title: "Software Engineer Intern — Role Certification",
    issuer: "HackerRank",
    date: "2026-07-26",
    credentialId: "4BEBC4738A29",
    fileUrl: "/documents/software_engineer_intern_certificate.pdf",
    verificationUrl: "https://www.hackerrank.com/certificates/iframe/4bebc4738a29",
    description: "Passed the HackerRank role certification test for Software Engineer Intern.",
  },
  {
    id: "hackerrank-sql-intermediate",
    title: "SQL (Intermediate) — Skill Certification",
    issuer: "HackerRank",
    date: "2026-07-29",
    credentialId: "5807DD16463B",
    fileUrl: "/documents/sql_intermediate_certificate.pdf",
    verificationUrl: "https://www.hackerrank.com/certificates/iframe/5807dd16463b",
    description: "Passed the HackerRank skill certification test for Intermediate SQL.",
  },
  {
    id: "deloitte-data-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "2026-07-25",
    fileUrl: "/documents/Deloitte_Certificate.pdf",
    verificationUrl: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6a64a54dd3a970278a17101f_1784987323469_completion_certificate.pdf",
    description: "Completed practical tasks in data analysis and forensic technology.",
  },
  {
    id: "hackerrank-problem-solving-intermediate",
    title: "Problem Solving (Intermediate) — Skill Certification",
    issuer: "HackerRank",
    date: "2026-08-08",
    credentialId: "DA39B3F923EE",
    fileUrl: "/documents/problem_solving_intermediate_certificate.pdf",
    verificationUrl: "https://www.hackerrank.com/certificates/iframe/da39b3f923ee",
    description: "Passed the HackerRank skill certification test for Intermediate Problem Solving.",
  },
];
