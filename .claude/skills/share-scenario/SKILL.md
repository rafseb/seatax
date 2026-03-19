---
name: share-scenario
description: Construct a shareable deep-link URL for a specific tax scenario on the SEA Tax Calculator given a plain-English description
---

Build a shareable GitHub Pages URL from the described salary scenario.

**Base URL**: `https://rafseb.github.io/seatax/{country}`

Valid countries: `philippines`, `thailand`, `vietnam`, `indonesia`

**Supported query params** (omit any not specified — the app uses its defaults):

| Param | Values | Default |
|-------|--------|---------|
| `salary` | number (in the chosen currency) | country default |
| `period` | `monthly` \| `annual` | `monthly` |
| `isExpat` | `true` \| `false` | `false` |
| `currency` | `local` \| `USD` \| `EUR` \| `GBP` | `local` |
| `dependents` | `0`–`10` | `0` |
| `maritalStatus` | `single` \| `married` | `single` |

**Steps:**
1. Parse the user's description and extract all relevant values.
2. If the country is ambiguous or missing, ask before proceeding.
3. Construct the full URL with params in this order: `salary`, `period`, `isExpat`, `currency`, `dependents`, `maritalStatus`.
4. Output the final URL as a clickable markdown link and as a plain URL for easy copying.
5. Briefly summarise the scenario the URL encodes (e.g. "Philippine resident, ₱80,000/month, 2 dependents, married").
