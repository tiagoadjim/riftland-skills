# Product photos that work

The product photo is the reference every route copies from. A better photo gives a better, more faithful result than any amount of direction.

## What makes a good source photo
- Sharp, with the label or logo readable at full size.
- The whole product visible, nothing cropped, facing the camera or at a slight three-quarter angle.
- Even light with no harsh reflections on glossy parts; a plain or simple background.
- At least 1000 pixels on the long side; the more of the frame the product fills, the better.
- True color: no heavy filter, no color cast from a colored wall.

## How many photos
- One good photo is enough to start.
- Two or three angles (front, side, detail of the label) help for products with a back or a texture that matters. Pass the extras as `images` in Marketing Studio (up to 6) or as more `references` in `create`.
- Do not pass photos of different versions of the product together: the result mixes them.

## What to ask the user for
- "¿Tenés una foto nítida del producto de frente?" Photo · Link · Neither.
- If the only photo is poor: say what is wrong (blur, glare, cropped label) and ask for a better one before spending. A weak photo costs credits and gives a weak result.
- A product page link is a good source too: `products_add` with `url` reads the name and the images.

## Fixing a photo before use
- A messy background: `photo-retouch` can put the product on a clean background first.
- A cropped or small image: `photo-retouch` can expand it; `upscale_media` sharpens a small one.
- Two products in one photo: crop to the one to shoot (ask which).

## Checking the result against the photo
Look with `media_view` and compare, in this order:
1. The label or logo: the same words, the same position.
2. The shape and proportions: no extra parts, nothing missing.
3. The color: the same tone, not a different edition.
4. The scale: the product looks the size it is next to a hand or a prop.
5. Hands and fingers, when a person appears.

A result that fails 1 to 3 is redone once; if it fails again, tell the user the photo may be the limit and show the best result.

## Things the photo cannot fix
- Text on the packaging is redrawn by the model: tiny small print can change. Say so when the label is dense.
- A transparent or mirror-like product needs a simple background to look right.
