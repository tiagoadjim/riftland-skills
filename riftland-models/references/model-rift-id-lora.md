<!-- generated from Riftland's knowledge base: model "rift-id-lora", version acf1ebe9037f, checksum 9e51eb4c. Do not edit. -->

# Rift ID · LoRA

Rift ID LoRA: your trained character in any scene, with the identity carried by the character's own model instead of a photo.

## Use it for

- The same character in many different scenes
- A consistent series: a story, a campaign, a set of avatars
- Portraits of a character in new outfits or places
- Quick scene variations for one character

## Pick something else when

- A character that has no trained LoRA yet: train one first, or pick a reference-based model.
- Changing an existing image: pick a model that edits references.
- Exact words in the image: pick a model built for typography.

## Strengths

- The same face in any scene, with no reference photo: the trained LoRA carries the identity. [R]
- A small model rated fast in Riftland's catalog, so scene variations come quickly. [R]

## Watch out for

- Extra references add a place or an outfit but do not change who the person is. [R]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Describe the person, the pose, the outfit and the scene. Riftland puts the character's trigger word first for you.
- **Length:** Short to medium: the scene, the action, the clothes. The identity comes from the LoRA, not from the words.
- **Exact words:** Not built for exact words in the image. For a headline or a label, pick a typography model.
- **References:** Use extra references for a place or an outfit. The face is not taken from them.
- **Leaving things out:** Riftland sends no separate exclusion field for this model. Say what you want in the scene and leave the rest out.

Tips:
- Describe what is around the character, not the character's face: the LoRA already knows it.
- Say the outfit and the place to vary a series.
- Add a reference only for a place or an outfit you want to match.

Avoid:
- Writing the character's trigger word yourself: Riftland puts it first.
- Describing the face to correct it: it fights the trained identity.

## Examples

**Ask:** My character reading in a rainy cafe window seat.

```text
Sitting at a window seat in a small cafe on a rainy afternoon, reading a paperback, a cup of tea at the elbow, warm lamp light, rain streaks on the glass.
```

Nothing about the face: the LoRA supplies it.

**Ask:** My character as an astronaut on a red planet.

```text
Wearing a white space suit with the helmet under one arm, standing on a rust-red desert plain at dusk, a small rover and two moons in the sky behind.
```

## Facts

- Reference images: up to 4
- Can change an existing image: no
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Speed: fast
- Repeatable with a seed: yes
- Needs a character with a trained LoRA: yes
- Director tags (provisional): character, portrait
- Recommended pick for: no mode today
- Needs a character whose trained LoRA is ready.
- Riftland puts the character's trigger word first in the prompt; the character photo is not sent.

## In its family

The identity-first option: pick it when the same character must appear in many scenes. Pick the editorial preset for a styled look, and a reference-based model when no LoRA exists.

Same family: Riftland Rair.
