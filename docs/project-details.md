# Project detail content

Actual project records in `src/data/projects.ts` support:

- `title`, `location`, `materials` and optional exact `sampleSlugs`.
- `startDate` and `completionDate` as ISO dates (`YYYY-MM-DD`).
- `beforeAfter`: a list of `{ title, before?: { src, alt }, after?: { src, alt } }` pairs.

Only use before/after photographs from the same confirmed work item. Missing photographs display a labeled placeholder; an illustration is never substituted for a result photograph.

The illustrative records in `src/data/projectConcepts.json` have empty location, date and comparison fields. These are sample proposals, not completed-project evidence. The page labels their material categories as suggestions. Add confirmed project records to `completedProjects` when real details and authorized photographs are available.

Catalogue application pages retain their distinct application/reference layout.

## Selected services

In Admin → Công trình chi tiết → Công trình mẫu / phương án minh họa, edit “Dịch vụ đã chọn” (multiple choices). The `services` slug list is displayed on the detail page and determines which service pages link to that project. The general interior-film service includes every project with at least one selected service. Other service pages use exact matches; empty selections are excluded. Completed records use the same `services` field in `src/data/projects.ts`.
