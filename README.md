# Oak & Leaf — QR Table Ordering (Frontend Demo)

Mobile-first React demo of a restaurant QR table-ordering flow. No backend and no customer login: guests land on the digital menu after scanning a table code (Table 14 by default).

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3000/?table=14](http://localhost:3000/?table=14).

## Customer flow

1. **Menu** — browse categories, search, customize (spice + note), add to cart.
2. **Cart** — adjust quantities and tap **Place order**.
3. **Live tracking** — kitchen ticket → preparing → served (simulated timers).
4. **Request bill** — notifies reception and kitchen (steps 7–9 of the workflow).
