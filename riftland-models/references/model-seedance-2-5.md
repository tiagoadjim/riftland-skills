<!-- generated from Riftland's knowledge base: model "seedance-2.5", version acf1ebe9037f, checksum ec129c65. Do not edit. -->

# Seedance 2.5

The newest Seedance: long single takes with timed shot blocks and native sound.

## Use it for

- Long cinematic takes in one pass
- A planned sequence of shots with time ranges
- Clips with sound, speech and ambience
- Animating a still image
- A wide cinematic frame

## Pick something else when

- Complex, fast physical action with interacting subjects: the maker lists it as still weak, so pick a model known for motion.
- Quick drafts: pick a fast model.

## Strengths

- Plans a long clip in one pass with timestamped shot blocks. [V]
- Generates sound natively: speech, effects and ambience. [V]

## Watch out for

- The maker lists the physical plausibility of complex motion and the stability of scenes with several interacting subjects as still needing work. [V]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Subject, action, scene, lighting and colour, camera, style, quality, then constraints.
- **Length:** Medium: a sentence or two for each part of the order that matters, and nothing more.
- **Leaving things out:** Riftland sends no separate exclusion field for this model. Write constraints as plain sentences at the end of the prompt: keep it subtitle-free, do not generate a watermark.
- **Camera:** One camera move per shot, written first inside the shot. If you pick a camera move in Riftland, leave the camera out of the prompt.
- **Several shots:** Write shot blocks with a time range in square brackets for each: Shot 1 [start-end], then the camera move, the action, the position and the audio. Keep one camera move per shot.
- **Sound and dialogue:** Put sound last inside each shot: the camera move, the action, the position, then the audio. Write speech in double quotes: the woman says "We should go."
- **From a start frame:** Describe the motion, not the picture: the start image is the anchor. Say what moves and how the camera behaves.

Tips:
- Use a time range for each shot to control the pacing of a long take.
- One camera move per shot, one clear action per shot.
- Write speech in double quotes and constraints as plain text.
- Lighting and time of day belong with the scene, before the camera.

Avoid:
- Several actions or several camera moves in one shot.
- Complex action between several subjects: expect some failures and try again.

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
- Resolutions: 480p, 720p, 1080p
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Start frame: optional
- End frame: yes
- Sound: optional (it can be switched off)
- Camera move: not offered for this model (describe the move in the prompt)
- Repeatable with a seed: no
- Director tags (provisional): cinematic, multishot, identity, i2v
- Recommended pick for: Cinematic shot, Product video, Animate image
- An end frame needs a start frame: without one the request is refused (nothing is charged).
- A start or end frame that shows a real person is not accepted: the clip is not made (nothing stays charged) and the message points to another model.

## In its family

The long-take Seedance. Pick the earlier siblings for short, gentle clips, and the fast sibling for rehearsals.

Same family: Seedance 2.0, Seedance 2.0 Fast.
