<!-- generated from Riftland's knowledge base: model "flux-3-video", version acf1ebe9037f, checksum 1dbd85c8. Do not edit. -->

# FLUX.3 Video

Black Forest Labs' preview video model: synchronised speech with lip-sync, several scenes, typography and stylised looks.

Status: Preview. Its maker calls it a preview model, so behaviour can change.

## Use it for

- A speaking person with lip-sync
- Several scenes in one clip, with timed steps
- Stylised looks and typography
- Animating a still image
- Clips with named sound sources

## Pick something else when

- Exact timing to the beat: its timing targets are not exact, so pick a model that documents timestamped shots.
- Several speakers who must each be attributed correctly: expect to review every result, or split them into separate clips.

## Strengths

- Strong at synchronised speech and lip-sync. [V]
- Handles multi-scene shots, typography and stylised looks. [V]

## Watch out for

- Timing targets are not exact, and attributing lines to several speakers needs a lot of review. [V]
- The maker calls it a preview, so behaviour may change. [V]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** A core summary, then the scene, then the subject (described the same way in every shot), then a timed narrative, then the audio, then the style.
- **Length:** Medium to long for a multi-shot clip. A single shot can be one line: [camera] shot of [subject] [action] in [environment].
- **Exact words:** A quoted line with no visible speaker may be treated as text that belongs in the frame. Use quotes only for speech by a person on screen or for words you want to see.
- **Leaving things out:** Riftland sends no separate exclusion field for this model. Write constraints as plain sentences, such as no on-screen text.
- **Camera:** Start with the camera: wide shot, close-up, low angle. Use HARD CUT between timed steps. If you pick a camera move in Riftland, leave the camera out of the prompt.
- **Several shots:** Write a timecoded narrative: each step with its time range, a HARD CUT between steps, and the subject described the same way in every shot.
- **Sound and dialogue:** Name each sound source. A visible speaker gets lip-sync: Anna says: "Look at this." For speech from off screen, add a voiceover cue.
- **From a start frame:** The source image sets the first frame; the prompt drives the motion. Describe what moves, not what is already there.

Tips:
- Describe the subject identically in every shot so it stays the same.
- Use HARD CUT between timed steps.
- Name every sound source, so each gets its own sound.
- Mark off-screen speech with a voiceover cue.

Avoid:
- A quoted line with no visible speaker: it may be drawn as text in the picture.
- Relying on exact timing: the targets are approximate.
- Several speakers at once: attribution needs review.

## Examples

**Ask:** A baker talking to the camera in a small shop.

```text
Close-up shot of a baker in a small shop, flour on her apron, facing the camera, warm morning light. She says: "The first batch is always the best one." Sound: the clink of trays and a soft oven hum. Documentary style, natural colour.
```

**Ask:** A two-scene clip: a letter arrives, then it is read.

```text
Core summary: a quiet moment in a flat when a letter arrives. Subject: a young man in a green sweater, the same in every shot. Step 1: wide shot, he picks a letter off the doormat. HARD CUT. Step 2: close-up, he reads it and smiles; voiceover cue: a woman's voice reads the first line softly. Sound: paper rustling, a clock ticking. Soft film look.
```

## Facts

- Durations: 5, 8, 10, 15, 20 s
- Resolutions: 720p, 1080p
- Aspect ratios: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9
- Start frame: optional
- End frame: no
- Sound: optional (it can be switched off)
- Camera move: not offered for this model (describe the move in the prompt)
- Repeatable with a seed: no
- Director tags (provisional): i2v
- Recommended pick for: no mode today

## In its family

The only video model of its family. Pick it for speech with lip-sync and stylised multi-scene clips; for dependable timing pick another model.
