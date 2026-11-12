<!-- generated from Riftland's knowledge base: model "gpt-image-2", version acf1ebe9037f, checksum 827c18cc. Do not edit. -->

# GPT Image 2

The first GPT Image model. Its maker marks it deprecated, so new work belongs on a newer sibling.

Status: Deprecated by its maker. Prefer a current sibling for new work.

## Use it for

- Posters, logos and graphics where the words must be right
- Infographics and diagrams
- Ad and UI mock-ups where the layout matters
- Photoreal scenes
- Edits that must keep the same person or object

## Pick something else when

- New work: pick a current model, because the maker deprecated this one.
- Vector files, transparent backgrounds or animated output: pick a newer model of this family that exports them.
- Quick drafts: pick a fast model; this one is rated slow.

## Strengths

- Strong at photorealism, text, infographics and diagrams. [V]
- Strong at edits that keep an identity, and at using world knowledge. [V]

## Watch out for

- The maker's model page marks it as deprecated. [V]
- Small or dense text, close-up portraits and identity-sensitive edits are weak points; compare results before you ship them. [V]
- Rated slow in Riftland's catalog. [R]

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

- "Translate the text in the infographic to Spanish. Do not change any other aspect of the image."

## Facts

- Reference images: up to 8
- Can change an existing image: yes
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Speed: slow
- Repeatable with a seed: no
- Director tags (provisional): typography, design, edit
- Recommended pick for: no mode today

## In its family

Kept so saved jobs and presets still open. For new work pick one of its newer siblings.

Same family: GPT Image 2.6 Flare, GPT Image 2.6 Sunburst, GPT Image 2.5 Flare.
