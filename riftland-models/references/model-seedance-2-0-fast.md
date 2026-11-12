<!-- generated from Riftland's knowledge base: model "seedance-2.0-fast", version acf1ebe9037f, checksum 25da8130. Do not edit. -->

# Seedance 2.0 Fast

Seedance with the same abilities as the standard model, trading some quality for speed.

## Use it for

- Rehearsing a shot before a final render
- Quick tests of a prompt or a camera move
- Short clips with sound
- Animating a still image

## Pick something else when

- The final version of an important clip: pick the standard or newest sibling.
- Precise per-second timing: pick a model that supports timestamped shots.

## Strengths

- The same capabilities as the standard model, faster, with some loss of quality. [V]
- Generates sound natively: speech, effects and ambience. [V]

## Watch out for

- Trades some quality for speed, and precise timing per shot is unstable on this version. [V]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Subject, action, scene, lighting and colour, camera, style, quality, then constraints.
- **Length:** Medium: a sentence or two for each part of the order that matters, and nothing more.
- **Leaving things out:** Riftland sends no separate exclusion field for this model. Write constraints as plain sentences at the end of the prompt: keep it subtitle-free, do not generate a watermark.
- **Camera:** One camera move per shot, written first inside the shot. If you pick a camera move in Riftland, leave the camera out of the prompt.
- **Several shots:** Label shots Shot 1, Shot 2, Shot 3. Inside each shot: camera move, then action, then position, then audio. Avoid precise timestamps on this version: they are unstable.
- **Sound and dialogue:** Put sound last inside each shot: the camera move, the action, the position, then the audio. Write speech in double quotes: the woman says "We should go."
- **From a start frame:** Describe the motion, not the picture: the start image is the anchor. Say what moves and how the camera behaves.

Tips:
- Prefer slow, gentle motion: walking, turning, pouring.
- One camera move per shot, one clear action per shot.
- Write speech in double quotes and constraints as plain text.
- Lighting and time of day belong with the scene, before the camera.

Avoid:
- Sprinting, big jumps and violent rolls: the vendor advises slow, gentle motion.
- Precise second-by-second timing blocks on this version.
- Real-face references: the vendor does not support them.

## Examples

**Ask:** A man running down a rainy alley, in three shots.

```text
Shot 1: side shot of a narrow alley at night, the camera tracks slowly beside a man in a dark coat as he starts to run; wet cobbles, steam from a vent. Sound: rain and footsteps. Shot 2: low angle from behind, the camera stays still as he runs away from it past neon signs. Sound: a distant siren. Shot 3: close-up of his face as he slows and looks back, the camera pushes in slowly. Sound: his breathing. Keep it subtitle-free.
```

**Ask:** A cup of tea being poured, calm and warm.

```text
Close-up of tea being poured into a white cup on a wooden table, the camera holds still, warm morning light from a window, steam rising slowly. Sound: the soft pour and a quiet room. Calm, natural colours. Do not generate a watermark.
```

From the vendor's own guide:

- "Shot 1: Side shot of a street alley; the man slowly starts running…"

## Facts

- Durations: 4, 5, 8, 10, 12, 15 s
- Resolutions: 480p, 720p
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Start frame: optional
- End frame: yes
- Sound: optional (it can be switched off)
- Camera move: not offered for this model (describe the move in the prompt)
- Repeatable with a seed: no
- Director tags (provisional): i2v
- Recommended pick for: no mode today
- An end frame needs a start frame: without one the request is refused (nothing is charged).
- A start or end frame that shows a real person is not accepted: the clip is not made (nothing stays charged) and the message points to another model.

## In its family

The quick Seedance: use it to try ideas, then finish on the standard or newest sibling.

Same family: Seedance 2.5, Seedance 2.0.
