# Writing callouts

The benefits card shows up to three callouts. They are the only words on any image of the set, so they decide how the card reads.

## Hard rules
- At most 3 callouts, at most 4 words each.
- The headline is up to 6 words and is the product's name or its category. This format lays out the callouts only; the headline is required by the call but not drawn.
- Words from facts only: the product page, the brand kit or what the user said. No invented numbers, percentages, certifications, awards or guarantees.
- No emojis, no hashtags, no prices.
- The language of the listing, with its own spelling and accents.
- Each callout is a benefit or a feature the buyer can verify in the photo or the description.

## How to get the facts
- `dry_run: true` on the same call is free and returns `copy_facts` (product, benefits, brand, language) and a rules draft. Start from the facts, not from the draft.
- If the facts are thin (no benefits found), ask the user for their three best selling points; do not invent them.

## Patterns that read well
| Pattern | Spanish | English |
|---|---|---|
| Measure with unit | "Capacidad 1 litro" | "1 liter capacity" |
| Material | "Acero inoxidable" | "Stainless steel" |
| Included | "Incluye funda" | "Carry case included" |
| Use | "Apto lavavajillas" | "Dishwasher safe" |
| Fit | "Talle único" | "One size fits all" |

Use only the ones that are true for this product.

## Words to avoid
- Superlatives nobody can check: "el mejor", "número 1", "best".
- Health or safety claims without a source on the product page.
- Competitor names or marketplace names.
- Anything the main image already shows ("Producto").

## Spanish for Argentina and Uruguay
Use the neutral rioplatense register of a listing: direct, no voseo needed in a callout (they are labels, not sentences). Keep accents and the ñ.

## Check before delivering
Look at the card with `media_view` and compare every callout letter by letter with what you wrote. A wrong letter, a missing accent or a cut word means a redo with the same call (once). If it fails twice, shorten the callout: shorter words render more reliably.
