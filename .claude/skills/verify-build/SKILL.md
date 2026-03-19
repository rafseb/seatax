---
name: verify-build
description: Run the full pre-push verification checklist for SEA Tax Calculator — lint, build, then guided browser tests
---

Run the full verification sequence before pushing to main:

1. Run `npm run lint` in the project root — must exit with zero errors. Report any failures.
2. Run `npm run build` — must succeed with no TypeScript errors. Report any failures.
3. If both pass, prompt the user to start `npm run dev` and manually verify in the browser:
   - [ ] Salary at minimum, maximum, and a mid-range value — results update correctly
   - [ ] Monthly ↔ annual toggle — gross/net figures scale correctly
   - [ ] Resident ↔ expat toggle — tax changes (expat uses flat rate)
   - [ ] Switch input currency to USD, EUR, GBP — slider appears and dragging updates results
   - [ ] Switch back to local currency — original slider range restored
   - [ ] All four country pages load and calculate without errors (Philippines, Thailand, Vietnam, Indonesia)
4. Ask the user to confirm each browser check before marking verification complete.
5. Only declare the build verified once all automated and manual steps pass.
