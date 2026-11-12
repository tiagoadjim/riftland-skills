<!-- generated from Riftland's knowledge base: model "wan-2.6", version acf1ebe9037f, checksum 0e883150. Do not edit. -->

# Wan 2.6

An earlier Wan: silent clips from a simple entity, scene and motion formula, with shot blocks for longer ideas.

## Use it for

- Silent clips from a short description
- A clip that changes scene, written as shot blocks
- Animating a still image
- Landscape, animal and object motion

## Pick something else when

- Clips with dialogue, music or sound effects: pick a model that generates sound.
- Final cinematic work: pick a model built for cinematic quality.

## Strengths

- A simple formula works, entity, scene, motion, and shot-based prompts let one clip change scene. [V]
- Takes exclusions as a separate negative prompt, which Riftland fills in. [R]

## Watch out for

- A raw prompt may be rewritten by the model's own expansion, so a short prompt can come out different from what you meant. [R]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Entity, scene, motion: who or what, where, and what it does. Then split a longer idea into shots.
- **Length:** Short to medium: one entity, one scene, one motion.
- **Leaving things out:** Say what you want; Riftland adds the exclusions for this model, so there is nothing to write by hand.
- **Camera:** Describe the camera inside each shot. Write One continuous take when you want no cuts. If you pick a camera move in Riftland, leave the camera out of the prompt.
- **Several shots:** Write shot blocks: Shot 1 [start-end], then what happens in it, then Shot 2 [start-end], and so on.
- **From a start frame:** Describe the motion, not the picture: the start image is the anchor. Say what moves and how the camera behaves.

Tips:
- Start with the formula: entity, scene, motion.
- Use shot blocks with time ranges for a clip that changes scene.
- Keep each shot to one action.

Avoid:
- A long, unstructured paragraph: split it into shots.
- Asking for sound: this model makes silent clips.

## Examples

**Ask:** A boy alone in a playground, then a friend arrives.

```text
Overall description: a quiet playground in late afternoon, soft golden light. Shot 1 [start-end]: a boy sits alone on a low wall in the corner, kicking his feet, the camera holds still. Shot 2 [start-end]: another child runs in from the left and sits down beside him, the camera pushes in a little. Sound effects: distant traffic, a swing creaking. No dialogue.
```

**Ask:** A fox walking through snow.

```text
A red fox walks through deep snow between bare birch trees at dawn, breath visible in the cold air, the camera tracks it from the side. One continuous take.
```

From the vendor's own guide:

- "Shot 1 [0-3s] A boy sits alone in a corner of the playground…"

## Facts

- Durations: 5, 10, 15 s
- Resolutions: 720p, 1080p
- Aspect ratios: 16:9, 9:16, 1:1, 4:3, 3:4
- Start frame: optional
- End frame: no
- Sound: none
- Camera move: not offered for this model (describe the move in the prompt)
- Repeatable with a seed: yes
- Director tags (provisional): multishot
- Recommended pick for: no mode today
- Riftland sends the exclusions itself (a negative prompt); a planned request sends its own list.
- The model's own prompt expansion is on for a raw prompt and off when Riftland planned the prompt.

## In its family

The earlier Wan: a silent clip from a short formula. Pick the newer sibling for sound.

Same family: Wan 3.0 Prime.
