<!-- generated from Riftland's knowledge base: model "qwen-image-3", version acf1ebe9037f, checksum 1d527676. Do not edit. -->

# Qwen Image 3

Alibaba's image model for complex layouts, very small text and long prompts, with edits from a few references.

## Use it for

- Newspaper pages, menus and storyboards with many regions
- Posters with text in several languages
- Very small text that must stay readable
- Long, detailed prompts that combine layout, words and style
- Product shots with a brand name on the object

## Pick something else when

- Vector files or transparent backgrounds: pick a model that exports them.
- One character across a long series: pick a character (LoRA) model.

## Strengths

- Handles complex layouts such as newspapers, storyboards and menus. [V]
- Renders very small text, in many languages and many fonts. [V]
- Takes long prompts in one pass, combining layout, exact text and style. [V]

## Watch out for

- Its largest output is smaller than several other image models' outputs. [V]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** One long prompt in a single pass: the subject and what the piece is (a poster, a menu, a storyboard), then the layout (what goes where), then the exact words, then the style.
- **Length:** Long is welcome. This model is built to take long prompts that combine layout, words and style.
- **Exact words:** Put each text in quotes, say its language and where it sits: a poster reading "MORNING BLEND" in English, Chinese and Japanese.
- **Changing an image:** Give the image and say what to change and what must stay the same.
- **References:** Name each input by its order and its job, such as image 1 for the product and image 2 for the style.
- **Leaving things out:** The model supports a negative prompt. Say what you want; when Riftland plans the request it adds the exclusions, so there is nothing to write by hand.

Tips:
- Describe a layout as regions: header, body columns, footer, caption.
- Name the language of each piece of text.
- Combine layout, words and style in one prompt instead of several rounds.

Avoid:
- Mixing languages without naming the language of each text.
- Expecting an output as large as the largest models give.

## Examples

**Ask:** A coffee shop poster in three languages.

```text
A trilingual coffee shop poster, warm minimalist layout. A steaming ceramic cup at the centre. Above it the title "MORNING BLEND" in English; below it the same title in Chinese and in Japanese, smaller, in a thin serif font. Cream background, dark brown text.
```

**Ask:** A front page for a school newspaper.

```text
A school newspaper front page. Header: the masthead "THE RIVERSIDE GAZETTE" in a bold serif font, centred. Below it a large photo area on the left with a caption "Science fair winners", and two narrow text columns on the right with small headlines. Footer: a thin rule and the line "Issue 12". Black ink on off-white paper, print look.
```

What the piece is, then the layout regions, then the words, then the look.

From the vendor's own guide:

- "A trilingual coffee shop poster reading 'MORNING BLEND' in English, Chinese, and Japanese, warm minimalist layout, a steaming ceramic cup at the center"

## Facts

- Reference images: up to 3
- Can change an existing image: yes
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Speed: normal
- Repeatable with a seed: yes
- Director tags (provisional): portrait, typography, edit
- Recommended pick for: no mode today
- Riftland sends a negative prompt only when it plans the request.

## In its family

The layout and long-prompt option. Pick it when a page has many regions or tiny text; pick a typography specialist for a short bold headline and a design model for exact placement.
