<!-- generated from Riftland's knowledge base: model "seedream-5-pro", version acf1ebe9037f, checksum cba36296. Do not edit. -->

# Seedream 5.0 Pro

A Seedream release built around precise, interactive editing with references.

## Use it for

- Precise edits of an image you upload
- Infographics and layouts that need controlled changes
- Photoreal scenes from a clear brief
- Pictures built from several references with different jobs

## Pick something else when

- Pieces with a lot of exact text: pick a model built for typography.
- Quick drafts: pick a fast model.
- A face that must stay the same across a series: pick a character (LoRA) model.

## Strengths

- The maker builds this release around precise, interactive editing of an existing image. [V]
- Takes many references at once, so one request can combine several sources. [V]

## Watch out for

- References guide the result but do not guarantee pixel-identical faces or objects. [V]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Write it as a brief: the kind of image and what it is for, what is shown and where, the style, colour, light and composition, then what to preserve and what to change.
- **Length:** A few short sentences that follow that brief. The brief is the structure; extra adjectives add little.
- **Exact words:** Put the exact words in double quotes and say where they go and how they are set.
- **Changing an image:** Keep the edit apart from the constraints: say what to replace and with what in one sentence, then list what stays unchanged in the next.
- **References:** Say what to take from each reference: the pose, the outfit, the palette. A reference guides the result but does not guarantee the same pixels.
- **Leaving things out:** Riftland sends no separate exclusion field for this model. Say what to keep and what to leave out in plain sentences, in the preserve part of the brief.

Tips:
- Name the intended use: a product hero, a poster, a thumbnail. It shapes the composition.
- Leave open space where a headline will go if you plan to add one.
- Say what to preserve before you say what to change.

Avoid:
- Expecting a reference to reproduce a face or an object pixel for pixel: it guides, it does not copy.
- Mixing the edit and its constraints in one clause: the model may change the wrong thing.

## Examples

**Ask:** A hero image for my ceramic mug, with room for a headline.

```text
Create a product hero image for a speckled ceramic mug, for a web shop front page. Show the mug on a pale oak table by a window, steam rising. Use soft morning light, a warm neutral palette and a low three-quarter angle. Leave open space on the right for a headline.
```

**Ask:** Swap the sofa in my living room photo for a green one.

```text
Replace the grey sofa with a deep green velvet sofa. Keep the rug, the window, the camera angle, the room layout and the lighting unchanged.
```

The edit in one sentence, the constraints in the next.

**Ask:** Use my outfit photo and my location photo to make a street style shot.

```text
Create a street-style fashion photo for a lookbook. Show the person from Image 1 walking across the street from Image 2. Take the outfit and the pose from Image 1 and the setting from Image 2. Use overcast daylight, muted colours and a waist-up composition.
```

From the vendor's own guide:

- "Create a product hero image for a reusable glass water bottle on a pale stone countertop. Use soft morning light… Leave open space on the left for a headline."

## Facts

- Reference images: up to 8
- Can change an existing image: yes
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Speed: normal
- Repeatable with a seed: no
- Director tags (provisional): photoreal, design, edit
- Recommended pick for: no mode today

## In its family

The editing-focused Seedream. Pick the newest sibling when edits must stay stable over many rounds, and the earliest for a plain, simple brief.

Same family: Seedream 5.5, Seedream 4.5.
