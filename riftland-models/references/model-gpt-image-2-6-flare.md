<!-- generated from Riftland's knowledge base: model "gpt-image-2.6-flare", version acf1ebe9037f, checksum 61943a84. Do not edit. -->

# GPT Image 2.6 Flare

The speed-focused newer GPT Image: graphics and text, with vector, animated and transparent output, larger sizes and edits of a marked zone.

## Use it for

- Logos and icons as vector files
- Stickers, cut-outs and overlays with a transparent background
- Infographics, diagrams and posters with real text
- A short animated image from a description
- Editing just one zone of an image you upload

## Pick something else when

- The most detail and the most precise edits: pick the high-detail sibling of this family.
- Dense small print: pick a model built for layout and very small text.
- A photographic face that must stay the same across a series: pick a character (LoRA) model.

## Strengths

- Strong at photorealism, text, infographics and diagrams. [V]
- Strong at edits that keep an identity, and at using world knowledge. [V]
- Built for speed in this family, and supports transparent backgrounds. [V]

## Watch out for

- Small or dense text, close-up portraits and identity-sensitive edits are weak points; compare results before you ship them. [V]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Start with the background or scene, then the subject, then the key details, then the constraints. Say what the picture is for: an ad, a UI mock, an infographic.
- **Length:** As long as those four parts need. Keep each follow-up to one change.
- **Exact words:** Put the exact words in quotes or in capitals. Spell unusual names letter by letter. Keep small or dense text short: the maker lists it as a weak point.
- **Changing an image:** Say "change only X" and "keep everything else the same", and repeat the keep-list on every round so the result does not drift.
- **References:** Label them in the prompt: Image 1 is the product photo, Image 2 is the style reference. Say what to take from each.
- **Leaving things out:** There is no separate field for exclusions. Write them as constraints inside the prompt, such as no watermark and no extra text.

Tips:
- Say "photorealistic" when you want a photo. Camera details are read loosely, so use them for the look, not for exact optics.
- Name the intended use, such as an infographic or an ad, so the layout fits it.
- Iterate with single-change follow-ups instead of rewriting the prompt.
- For a vector or animated result, describe everything in words: those files are made from the prompt.

Avoid:
- Small or dense blocks of text: they are the family's weak point.
- Trusting a close-up portrait or an identity-sensitive edit without comparing results: check before you ship.

## Examples

**Ask:** An infographic that explains how to brew pour-over coffee.

```text
Background: a clean cream-coloured page. Subject: a four-step infographic for brewing pour-over coffee, with a simple line drawing for each step. Details: step titles "GRIND", "BLOOM", "POUR", "SERVE" in dark brown capitals, short one-line captions under each, a thin arrow between steps. Intended use: a poster for a café wall. No watermark, no extra text.
```

**Ask:** Translate the text in my infographic to Spanish and change nothing else.

```text
Translate all the text in the infographic to Spanish. Change only the text. Keep the layout, the colours, the icons and the fonts the same.
```

One change, plus the list of what must not move.

**Ask:** My product photo restyled like my reference.

```text
Image 1: product photo of a steel water bottle. Image 2: style reference, a soft pastel studio look. Restyle Image 1 in the look of Image 2. Keep the bottle's shape, label and proportions the same.
```

From the vendor's own guide:

- "Create an original, non-infringing logo for a company called Field & Flour… Fully transparent background."

## Facts

- Reference images: up to 8
- Can change an existing image: yes
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Speed: normal
- Repeatable with a seed: no
- Files: PNG, JPG, WEBP, SVG, GIF. SVG is a vector file and GIF an animated image (up to 16 frames); both come from the prompt alone.
- Quality levels: low, medium, high, xhigh, max. Thinking levels (how much the model reasons before drawing): low, medium, high.
- Sizes: 1K, 2K, 4K.
- Transparent background: yes.
- Zone edit: paint a mask (white is the part to change) or draw marks over the first reference, and only that zone changes.
- Director tags (provisional): typography, design, vector, edit
- Recommended pick for: no mode today
- A vector or animated file is made from the prompt alone: no references and no character.
- Sizes above 1K are for the raster formats only, not vector or animated files.
- A transparent background needs PNG or WEBP output.
- Editing a zone works on the first reference (a mask or marks, not both, and no character) and keeps that image's frame.

## In its family

The fast one of the newer pair: pick it for graphics, vector or transparent assets and quick rounds. Pick the high-detail sibling when detail and precise edits matter more than speed, and an older sibling only for saved work.

Same family: GPT Image 2.6 Sunburst, GPT Image 2.5 Flare, GPT Image 2.
