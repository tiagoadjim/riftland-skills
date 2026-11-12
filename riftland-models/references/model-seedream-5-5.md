<!-- generated from Riftland's knowledge base: model "seedream-5.5", version acf1ebe9037f, checksum dfc8d41d. Do not edit. -->

# Seedream 5.5

The newest Seedream: edits meant to hold over many rounds, and less corrupted text than the earlier ones.

## Use it for

- Edits you will repeat over many rounds
- Images with a headline or a label that must stay legible
- Product hero images with space left for a headline
- Pictures built from several references with different jobs
- Photoreal scenes from a clear brief

## Pick something else when

- Long passages of exact text: pick a model built for typography and check any result.
- A face that must stay the same across a series: pick a character (LoRA) model.
- Output that needs a vector file or a transparent background: pick a model that exports them.

## Strengths

- Editing stays stable over many rounds of changes. [V]
- Corrupts text less than the earlier Seedream models. [V]

## Watch out for

- In one independent test an edit was ignored and a few characters were wrong in a long text. Treat the vendor's gains as claims until you check them. [I]
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

- Reference images: up to 10
- Can change an existing image: yes
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Speed: normal
- Repeatable with a seed: no
- Director tags (provisional): photoreal, edit
- Recommended pick for: Photo, Product shot, Lifestyle, Edit image

## In its family

The newest Seedream and the one to try first for repeated edits. Its independent test record is thin, so keep an earlier sibling as a fallback.

Same family: Seedream 5.0 Pro, Seedream 4.5.
