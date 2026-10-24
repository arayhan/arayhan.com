import type { CommunityStat, Role } from "@/domain/portfolio";

export const roles: Role[] = [
  { company: "Anify LLC", title: "Frontend Engineer Lead", years: "2025–2026" },
  { company: "Badr Interactive", title: "Frontend Developer, part-time (SMILE 5.0)", years: "2022–now" },
  { company: "Founderplus", title: "Frontend Developer", years: "2020–2022" },
  { company: "Skydu", title: "Frontend Developer & Course Instructor", years: "2019–2020" },
  { company: "Integrasi Media Kreasi", title: "Web Designer & Frontend Developer", years: "2017–2018" },
];

export const community: CommunityStat[] = [
  { value: "1,800+", label: "members in GDG Depok, which I organize" },
  { value: "1 of 45", label: "Google Developer Student Club Leads in Indonesia" },
  { value: "10+", label: "technical talks on frontend and Firebase" },
  { value: "2", label: "GoTo Impact Foundation mentoring cohorts" },
];
