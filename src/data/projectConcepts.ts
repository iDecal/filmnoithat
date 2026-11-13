import content from "./projectConcepts.json";
export const projectConcepts = content.projects;
export type ProjectConcept = typeof projectConcepts[number];
