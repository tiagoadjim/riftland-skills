<!-- generated from Riftland's knowledge base: model "kling-3", version acf1ebe9037f, checksum ba62a9ae. Do not edit. -->

# Kling 3.0 Pro

A Kling video model with sound, several shots in one request, text on screen and multilingual dialogue.

## Use it for

- Scenes with dialogue, where who speaks matters
- Several shots in one request, with a camera plan for each
- Believable physical motion: people moving, objects falling
- Animating a still image
- Clips with words on screen

## Pick something else when

- Scenes that depend on strong or violent wording: pick a model from another family, because moderation here is strict.
- Very long single takes: pick a model built for long clips.

## Strengths

- Generates sound natively, including dialogue in several languages. [V]
- Plans several shots in one generation and renders text. [V]

## Watch out for

- Moderation is strict: words such as burst or explosion can block a harmless scene. [I]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Label each shot, then for each shot describe the framing, the subject and the motion explicitly, then how the camera behaves over time.
- **Length:** Medium: enough to give every shot its framing and motion. Do not pad a single shot.
- **Exact words:** Put any words that must appear on screen in quotes and say where they appear.
- **Leaving things out:** Say what you want; Riftland adds the exclusions for this model, so there is nothing to write by hand.
- **Camera:** Describe the framing and how the camera behaves over time, for example holding still when the subject pauses. If you pick a camera move in Riftland, leave the camera out of the prompt.
- **Several shots:** Label the shots, Shot 1, Shot 2, and describe the framing and motion of each. One request can hold several shots.
- **Sound and dialogue:** Write dialogue as a labelled line: [Character A: Exhausted Partner, trembling frustrated voice]: "You never listen to me." Describe sounds in the same prompt. If you want no sound, switch sound off in Riftland instead of writing it.
- **From a start frame:** Treat the start image as the anchor: describe only the motion and the camera, not what the picture already shows.

Tips:
- Say what the camera does over time, not only where it starts.
- Give dialogue a speaker label and a voice description, so the right character speaks.
- Keep wording neutral: harmless scenes can be blocked by strong words.

Avoid:
- Strong words such as burst or explosion in a harmless scene: moderation can block it.
- Describing the whole start image again: it is already the anchor.

## Examples

**Ask:** A quiet argument in a kitchen, with the dialogue.

```text
Shot 1: medium two-shot in a small night kitchen, the camera holds still while a tired woman dries a cup and a man stands by the fridge. [Woman: tired, quiet voice]: "Please, just sit down." Shot 2: close-up on her face, the camera slowly pushes in as she looks away. Ambient: a refrigerator hum and a ticking clock.
```

**Ask:** Animate my product photo: a slow reveal.

```text
The camera glides slowly around the bottle on the table, a soft reflection moves across the glass, steam drifts in the background. The bottle itself stays still and sharp.
```

Only motion and camera: the photo is the anchor.

## Facts

- Durations: 3, 5, 8, 10, 15 s
- Resolutions: 1080p
- Aspect ratios: 16:9, 9:16, 1:1
- Start frame: optional
- End frame: yes
- Sound: optional (it can be switched off)
- Camera move: sent as prompt text (there is no separate camera control)
- Repeatable with a seed: no
- Director tags (provisional): motion, i2v
- Recommended pick for: Vertical reel, Seamless loop
- An end frame needs a start frame: without one the request is refused (nothing is charged).
- Riftland sends the exclusions itself (a negative prompt); a planned request sends its own list.

## In its family

The dialogue-and-shots Kling. Pick the earlier sibling for a simpler, steadier clip with sound, and the newest sibling for long clips and fast, tracked motion without sound.

Same family: Kling 4.0, Kling 2.6 Pro.
