<!-- generated from Riftland's knowledge base: model "seedream-4.5", version acf1ebe9037f, checksum 0b9bd4b7. Do not edit. -->

# Seedream 4.5

An earlier Seedream: image generation from text, or from one or several references, with edits.

## Use it for

- Photoreal scenes and product shots from a clear brief
- Changing an image you upload: replace one object, keep the rest
- Pictures built from several references with different jobs
- A set of images from one request

## Pick something else when

- Pieces with a lot of exact text: pick a model built for typography.
- Edits that must stay stable over many rounds: pick a newer model of this family.
- A face that must stay the same across a series: pick a character (LoRA) model.

## Strengths

- Generates from text alone or from one or several references. [V]
- Can return a batch of images from one request. [V]

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

- "Replace the red chair with a light-oak chair. Keep the table, camera angle, room layout, and lighting unchanged."

## Facts

- Reference images: up to 8
- Can change an existing image: yes
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Speed: normal
- Repeatable with a seed: yes
- Director tags (provisional): photoreal, edit
- Recommended pick for: no mode today

## In its family

The earlier Seedream, also the base of the editorial preset. Pick a newer sibling for edits that must hold over many rounds or for text inside the image.

Same family: Seedream 5.5, Seedream 5.0 Pro.
