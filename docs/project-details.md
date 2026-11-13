# Project detail content

Actual project records in `src/data/projects.ts` support:

- `title`, `location`, `materials` and optional exact `sampleSlugs`.
- `startDate` and `completionDate` as ISO dates (`YYYY-MM-DD`).
- `beforeAfter`: a list of `{ title, before?: { src, alt }, after?: { src, alt } }` pairs.

Only use before/after photographs from the same confirmed work item. Missing photographs display a labeled placeholder; an illustration is never substituted for a result photograph.

The illustrative records in `src/data/projectConcepts.json` have empty location, date and comparison fields. These are sample proposals, not completed-project evidence. The page labels their material categories as suggestions. Add confirmed project records to `completedProjects` when real details and authorized photographs are available.

Catalogue application pages retain their distinct application/reference layout.
