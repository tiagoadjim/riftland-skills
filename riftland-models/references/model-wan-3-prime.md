<!-- generated from Riftland's knowledge base: model "wan-3-prime", version acf1ebe9037f, checksum f6958e38. Do not edit. -->

# Wan 3.0 Prime

The accelerated Wan 3.0: native dialogue, music and effects in one pass.

## Use it for

- Clips with speech, music and sound effects in one pass
- A planned sequence of timed shots
- Animating a still image
- Lip-synced talking shots

## Pick something else when

- A silent clip where the model might add speech: say No dialogue, or pick a silent model.
- Long takes in one pass: pick a model built for long clips.

## Strengths

- Generates dialogue, music and sound effects natively. [V]
- Shot blocks with time ranges plan a multi-scene clip. [V]

## Watch out for

- May add dialogue you did not ask for unless the prompt says No dialogue. [V]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** An overall description, then Shot blocks with time ranges, then dialogue, then sound effects and music, then the style.
- **Length:** Medium: one overall paragraph, then a few lines per shot.
- **Leaving things out:** Treat exclusions as prompt text: write them as plain sentences. Riftland sends no separate exclusion field for this model.
- **Camera:** Describe the camera inside each shot. Write One continuous take when you want no cuts. If you pick a camera move in Riftland, leave the camera out of the prompt.
- **Several shots:** Write the overall description, then Shot 1 [start-end], Shot 2 [start-end] and so on. Write One continuous take to avoid cuts.
- **Sound and dialogue:** Write speech as: Mia says: "Let's go." Then a sound-effects line and a music line. Write No dialogue when you want none, or the model may add some. Write Lip sync when it matters.
- **From a start frame:** Describe the motion, not the picture: the start image is the anchor. Say what moves and how the camera behaves.

Tips:
- Open with an overall description, then the shot blocks.
- Say No dialogue when the clip should have none.
- Write Lip sync when a face speaks to the camera.
- Put sound effects and background music on their own lines.

Avoid:
- Leaving dialogue unspecified: the model may add some.
- Cuts you did not plan: write One continuous take.

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
- Resolutions: 480p, 720p, 1080p
- Aspect ratios: 16:9, 9:16, 1:1, 4:3, 3:4
- Start frame: optional
- End frame: yes
- Sound: optional (it can be switched off)
- Camera move: not offered for this model (describe the move in the prompt)
- Repeatable with a seed: yes
- Director tags (provisional): i2v
- Recommended pick for: no mode today
- An end frame needs a start frame: without one the request is refused (nothing is charged).
- The model's own prompt expansion is on for a raw prompt and off when Riftland planned the prompt.

## In its family

The newer Wan, with sound. Pick the earlier sibling for a simple silent clip.

Same family: Wan 2.6.
