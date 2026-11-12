<!-- generated from Riftland's knowledge base: model "ideogram-4", version acf1ebe9037f, checksum 00fefdff. Do not edit. -->

# Ideogram 4

Ideogram's model for text, layout and palette: the one to pick when words and their placement are the point.

## Use it for

- Posters and flyers with a headline and supporting lines
- Layouts where each element has a place: title, badge, caption
- Graphics in a brand palette given as colour names or hex codes
- Menus, cards and announcements
- Title graphics and typographic art

## Pick something else when

- Changing or restyling an image you already have: pick a model that takes reference images.
- Keeping one character across several images: pick a character (LoRA) model.
- Vector files or transparent backgrounds: pick a model that exports them.

## Strengths

- Strong at rendering text in vendor-run tests. [V]
- Controls layout by placement of each element, and controls the palette with colour names or hex codes. [V]

## Watch out for

- It makes new images only: it is not an editor. [R]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** One sentence for the whole image, then the style (look, light, medium, palette), then each element with where it sits. For text, give the exact words in quotes and then their styling.
- **Length:** A structured description of a few sentences, one per element. Detail in the layout matters more than adjectives.
- **Exact words:** Put the literal string in quotes, then its styling and place: the headline "GRAND OPENING" in heavy condensed letters, white, upper third, centred.
- **Leaving things out:** Riftland sends no separate exclusion field for this model. List the elements you want and leave the rest out.

Tips:
- Give each element a place: left third, upper right corner, centred under the title.
- Name the colours, or give hex codes, so the palette is fixed.
- State where the subject and the horizon sit, as the vendor's own example does.

Avoid:
- A single run-on sentence that mixes layout, text and style.
- Asking it to edit or restyle a picture: it takes no references.

## Examples

**Ask:** A poster for a jazz night with the date and place.

```text
A vintage-style concert poster for a jazz night. Style: screen-printed look, warm cream paper, deep teal and mustard palette. Elements: a saxophone silhouette in the centre; the title "JAZZ AT THE HARBOUR" in heavy condensed letters across the upper third, mustard; a line "Friday night, Pier Hall" in small teal capitals at the bottom, centred.
```

**Ask:** A menu card with three dishes and a logo spot.

```text
A restaurant menu card on a plain white background. Style: modern, minimal, thin dark-green lines. Elements: a small circle at the top centre for a logo; the heading "TODAY" under it in dark green serif capitals; three lines of text, "Tomato soup", "Grilled trout", "Lemon tart", left aligned, each with a thin rule beneath.
```

Each element has a place and its own words in quotes.

From the vendor's own guide:

- "A cinematic 35mm film photograph of a lone wooden sailboat on a glassy lake at sunset, the boat on a right-third vertical with the horizon at the lower third, in a cool muted blue palette."

## Facts

- Reference images: none
- Can change an existing image: no
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4
- Speed: fast
- Repeatable with a seed: no
- Director tags (provisional): typography, design
- Recommended pick for: no mode today
- Takes no reference image and no character: a request that has one is refused.

## In its family

A text-and-layout specialist that takes no references. Pick it for designs made from words and placement; for edits or a character, pick another kind of model.
