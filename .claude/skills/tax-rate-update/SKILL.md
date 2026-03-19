---
name: tax-rate-update
description: Guide a tax bracket or contribution rate update for a specific country calculator, ensuring all four touch-points are updated consistently
---

Walk through a tax rate update for the specified country. Always ask for the country if not provided.

**Files that must be updated together — never update one without the others:**

1. `lib/calculators/{country}.ts` — update the bracket array, rate constants, or contribution caps with the new figures
2. `components/TaxInfo.tsx` — update the corresponding brackets table and contribution rate display shown to users
3. Year references — update the tax year in file comments and in the TaxInfo source links/labels
4. Official source — confirm the government source URL is current and accessible

**Steps:**
1. Ask the user for: the country, what changed (brackets / contribution rates / both), and the official source URL for the new figures.
2. Read `lib/calculators/{country}.ts` and `components/TaxInfo.tsx` before making any edits.
3. Apply changes to both files, keeping calculator logic and UI display in sync.
4. Update year references in comments and TaxInfo (search for the old year string to avoid missing any).
5. Run `npm run lint` then `npm run build` — both must pass.
6. Summarise the changes as old → new values, ready to paste into a commit message. Remind the user to cite the official source in the commit or PR description.
