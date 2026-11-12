<!-- generated from Riftland's knowledge base: technique "product-photography", version acf1ebe9037f, checksum b129717e. Do not edit. -->

# Product photography looks

Clean catalog, in use, hands, on a model, banner: pick the shot, keep the product exact, and use light and surface words.

Applies to: image.

## Rules

1. Pick the kind of shot first. Clean catalog: the whole product on a plain surface in even light. In use: the product in a believable everyday scene. Hands: a hand picks it up, pours, opens it. On a model: a person wears or holds it. Banner: a hero image with open space for a headline. Say which one in the first line.
   - Why: The director's product and lifestyle modes, and the Marketing Studio's product-only and on-a-model formats, split the work the same way.
2. Give the product photo as a reference and say what stays exact: the shape, the colours, the proportions, the label and the logo. Image 1 is the bottle: keep its shape, colour and label exactly.
   - Why: The vendors advise naming each reference's role and the elements to preserve.
3. Light it with studio words: a large overhead softbox, a gradient strip light along one edge, a bounce card for fill, a controlled specular highlight, a backlit rim glow.
   - Why: These are the terms the director uses for product shots.
4. Name the surface and the finish: seamless paper sweep, matte stone slab, brushed metal, glass with a soft reflection; a subtle contact shadow, crisp edges, accurate material colour, a clean label.
5. Choose the framing: a centred hero, a three-quarter angle, a tight macro on a detail, a flat lay from above.
6. For a banner state the use and the space: a product hero image for a web banner, with open space on the left for a headline. Put the exact words in quotes only if the image itself must carry text.
   - Why: The Seedream vendor's own example is exactly this shape.
7. When the product must stay as close as possible to the real one, do not regenerate it from a description. Start from the real photo and change what is around it: `edit_image` with the action replace_background gives it a new scene from a preset, a description or a background photo, and with the action mockup puts a logo or design on a product.
8. For a transparent background, some models take `transparent_background` (png or webp); check the model's facts.
   - Applies to the families: GPT Image.
9. Keep a set consistent: the same light and surface across the pack, one product per image, and `count` up to four on one request. For a video, the Marketing Studio takes a saved product and its photos, and a product photo can be the first frame of a clip.

## Do and don't

- Don't: A photo of my bottle on a nice background.
  Do: Image 1 is the bottle: keep its shape, colour and label exactly. Place it on a matte stone slab, three-quarter angle, a large overhead softbox with a gradient strip light along the left edge, subtle contact shadow, clean label, open space on the right for a headline.

## Checklist

- [ ] Which kind of shot is it?
- [ ] Is the product photo a reference, with what stays exact?
- [ ] Light, surface and framing in concrete words?
- [ ] Did you look at the label in the result?

## See also

- `technique:references-and-roles`: References and their roles
- `technique:consistency`: Keeping a character, a product or a brand the same
- `technique:text-on-image`: Text on an image
- `technique:troubleshooting`: Troubleshooting: what went wrong and what to change
- `workflow:product-to-ad`: Product photo to product photos to a video ad
