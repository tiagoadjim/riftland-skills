# Set recipes by product kind

The main image and the benefits card are the same for every product. What changes is the look that supports them. Choose by what the product is, then confirm with the user in the one scope question.

## The fixed part
1. Main: `marketplace--blanco-pdp`, 1:1. Pure white, the product alone, centered, called text-free (`copy` with the headline only, "no text" in `prompt`).
2. Benefits card: `marketplace--tres-beneficios`, 3:4 by default. White background, three callouts with thin lines to the product.

## The supporting looks
| Product kind | Premium look | Look for the kind |
|---|---|---|
| Electronics, tools, spirits, watches | `marketplace--noche-de-carbon` or `marketplace--reflejo-negro` (style `dark`) | the same, second template, or `color-pop` for accessories |
| Beauty, skincare, baby | `marketplace--noche-de-carbon` only if the brand is premium | `marketplace--nube-rosa` or `marketplace--pastel-menta` (style `pastel`) |
| Drinks, snacks, kitchen | `marketplace--noche-de-carbon` | `marketplace--salpicon-citrico` or `marketplace--ola-de-crema` (style `splash`) |
| Fashion accessories, bags, shoes | `marketplace--noche-de-carbon` | `marketplace--amarillo-electrico` or `marketplace--contraste-rojo` (style `color-pop`) |
| Toys, novelty, gifts | not needed | `marketplace--isla-flotante` or `marketplace--arcos-imposibles` (style `surreal`) |
| Home and decor | `marketplace--noche-de-carbon` | `marketplace--nube-rosa` or `marketplace--pastel-menta` |

These are starting points, not rules: if the user names a look, use theirs. The looks are called text-free like the main image; only the benefits card carries words.

## Order of the calls
1. The main image alone. Show it, say what to check (white background, the label readable, the product fills the frame) and get the user's yes.
2. The three secondary calls at once, each with the accepted main image in `images` so the product looks the same in all of them.
3. One `jobs_wait` with the three job ids.

## A set for several variants of the same product
Sizes or colors of one product are separate products: save each with `products_add` and run the set once per variant, never all in one call. The cap of 6 images applies to the request, so for more than one variant ask the user to start a new request.

## When the user only has a link
`products_add` with `url` reads the name, the price and the images. If the images are small or cluttered, ask for a clean photo before the main image: a weak source shows up most on a pure white background.
