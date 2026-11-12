<!-- generated from Riftland's knowledge base: model "hailuo-2.3", version acf1ebe9037f, checksum c2d0aaf7. Do not edit. -->

# Hailuo 2.3

MiniMax Hailuo: character motion and expressions, with camera moves as bracketed commands that Riftland adds for you.

## Use it for

- Character motion and facial expressions
- Action beats with a clear camera move
- Animating a still image
- Short clips with one subject

## Pick something else when

- Clips with sound or dialogue: pick a model that generates sound.
- Long clips: pick a model built for long clips.

## Strengths

- Camera moves can be given as native bracketed commands, such as Pan left, Push in, Tracking shot and Static shot. [V]
- Positioned around character motion and expressions. [I]
- Riftland adds the native command itself when you pick a camera move that has one. [R]

## Watch out for

- Its own prompt optimizer rewrites a raw prompt, so a short prompt may come out different from what you meant. [R]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** The character and the action first, then the setting and the light. Pick the camera move in Riftland rather than writing it.
- **Length:** Short: one character, one action, one move.
- **Leaving things out:** Riftland sends no separate exclusion field for this model. Describe what you want, and keep any exclusion to one short plain sentence.
- **Camera:** Pick a camera move in Riftland: it adds the native command for you when the move has one, and always the sentence. Do not write brackets by hand, and do not write the move again in the prompt.
- **From a start frame:** Describe the motion, not the picture: the start image is the anchor. Say what the character does.

Tips:
- Say the expression and the action: she hesitates, then smiles.
- Use the camera picker instead of writing the camera.
- Keep to one subject and one action.

Avoid:
- Writing bracketed camera commands yourself: Riftland adds them, and a second one fights the first.
- Several actions in one short clip.

## Examples

**Ask:** A girl hesitating at a door, then smiling.

```text
A young woman stands at a front door with her hand on the handle. She hesitates, takes a breath, then smiles and opens the door. Warm evening light on her face.
```

No camera text: choose the move in Riftland.

**Ask:** A man catching a falling book.

```text
A man in a study reaches out and catches a falling book just before it hits the floor, his face shifting from surprise to relief.
```

From the vendor's own guide:

- "A man picks up a book [Pedestal up], then reads [Static shot]."

## Facts

- Durations: 6, 10 s
- Resolutions: 720p, 1080p
- Aspect ratios: 16:9
- Start frame: optional
- End frame: no
- Sound: none
- Camera move: sent as a native command, and as prompt text too
- Repeatable with a seed: no
- Director tags (provisional): motion
- Recommended pick for: no mode today
- Riftland adds the camera move you pick as a sentence, and also as a native command in brackets when that move has one.
- Hailuo's own prompt optimizer is on for a raw prompt and off when Riftland planned the prompt or you pick a camera move.
- A 1080p clip is always 6 s: that tier has a fixed length.

## In its family

The character-motion MiniMax with native camera commands and no sound. Pick the newer sibling when you want sound.

Same family: MiniMax H3.
