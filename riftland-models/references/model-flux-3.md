<!-- generated from Riftland's knowledge base: model "flux-3", version acf1ebe9037f, checksum 31555d20. Do not edit. -->

# FLUX 3 Image

The newest FLUX image model: better with complex prompts and text, and with changes to a whole image.

## Use it for

- Complex prompts with many parts
- Whole-image changes: weather, relighting, colour grading and text edits
- Images with a short title or sign
- Changing an image with several references
- Short prompts that the model expands

## Pick something else when

- Long passages of text: pick a model built for layout and small text.
- A face that must stay the same across a series: pick a character (LoRA) model.
- Vector files or transparent backgrounds: pick a model that exports them.

## Strengths

- Handles complex prompts and text better than the earlier FLUX models. [V]
- Whole-image edits such as weather, relighting, grading and text edits are improved. [V]

## Watch out for

- Each image in a set is its own request, so a set takes longer to finish. [R]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Start with the subject in a short description of the picture: the model expands it. Add detail only for what matters, and refer to references by position.
- **Length:** Short works. Add sentences for the parts you need to control.
- **Exact words:** Put the words in quotes and say how they are set: The text 'OPEN' appears in red neon letters above the door. Text is better than in the earlier FLUX, but still keep it short.
- **Changing an image:** Describe the change, then fix the rest: Modify the sky by replacing the clouds with a clear sunset. Keep the rest of the image exactly unchanged.
- **References:** Refer to each reference by its position, image 1, image 2, and say its job.
- **Leaving things out:** Describe what you want instead of what you do not want; the earlier FLUX models take no negative prompts, and Riftland sends none here.

Tips:
- Whole-image changes work: weather, relighting, colour grading and text edits.
- Start short and add detail only where the first result differs from what you meant.
- Name a hex colour next to the object it belongs to.

Avoid:
- Writing a long prompt before you have seen what a short one gives.
- Negative phrasing such as no people: say what is there instead.

## Examples

**Ask:** A neon sign over a bar door that says OPEN.

```text
A narrow bar door at night in the rain. The text 'OPEN' appears in red neon letters above the door, lettering thin and slightly crooked. Wet pavement reflecting the red glow, a single passer-by under an umbrella. Cinematic, shallow depth of field.
```

**Ask:** A product poster in my exact brand blue.

```text
A glass perfume bottle standing on a pale stone slab, the bottle cap in color #0047AB, soft studio light from the left, clean white background. Minimal luxury product photograph.
```

The hex code is tied to one object.

**Ask:** Change the weather in my photo to a clear evening.

```text
Modify the sky by replacing the grey clouds with a clear golden-hour sky. Keep the rest of the image exactly unchanged.
```

From the vendor's own guide:

- "change the color of only one bird in the middle to #e01075"

## Facts

- Reference images: up to 8
- Can change an existing image: yes
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Speed: normal
- Repeatable with a seed: no
- Director tags (provisional): edit
- Recommended pick for: no mode today

## In its family

The newest FLUX: pick it for complex prompts and whole-image changes. The earlier siblings stay good for exact colours and quick or top-quality still images.

Same family: FLUX.2 Max, FLUX.2 Pro.
