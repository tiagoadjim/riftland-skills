<!-- generated from Riftland's knowledge base: model "veo-3.1-fast", version acf1ebe9037f, checksum ff873158. Do not edit. -->

# Veo 3.1 Fast

The faster Veo, with the same kind of sound and look, for trying a shot before the final render.

## Use it for

- Rehearsing a shot before the final render
- Quick tries of a prompt, a camera move or a line of dialogue
- Scenes with dialogue and ambience
- Animating a still image

## Pick something else when

- The final version of an important clip: finish on the full model.
- Clips longer than a short beat: pick a model built for long clips.

## Strengths

- Rehearse on this model and finish on the full one: it keeps the same clock and ratios. [I]
- Generates dialogue, sound effects and ambience from the prompt. [V]
- Understands timestamp prompting, so the beats of a clip can be ordered. [V]

## Watch out for

- An ending written as decaying into silence produced dead air in an independent test. [I]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Cinematography first (shot size, angle, lens look), then the subject, the action, the context, then the style and ambiance.
- **Length:** Medium: a sentence for each of those parts, plus dialogue and sound lines when you want them.
- **Leaving things out:** Say what you want; Riftland adds the exclusions for this model, so there is nothing to write by hand. Describe things positively.
- **Camera:** Open with the shot and the camera in film terms: medium shot, low angle, slow dolly. If you pick a camera move in Riftland, leave the camera out of the prompt.
- **Several shots:** Timestamp prompting is supported: say what happens in each stretch of the clip, in order.
- **Sound and dialogue:** Put dialogue in quotes with who says it. Write effects as a labelled line, SFX: thunder cracks in the distance. Write ambience as a labelled line, Ambient noise: a low city hum. If you want no sound, switch sound off in Riftland.
- **From a start frame:** Describe the motion, not the picture: the start image is the anchor. With an end frame too, say how the first becomes the last.

Tips:
- Write the dialogue as a quoted line with a speaker, so the voice matches the person.
- Give effects and ambience their own labelled lines.
- Use timestamps to order the beats of a clip.
- Describe an ending by what is still happening, not by silence.

Avoid:
- Describing an ending as fading into silence: it produced dead air in an independent test.
- Negative phrasing such as no people: say what is there.

## Examples

**Ask:** A tired worker in an office, with a line of dialogue.

```text
Medium shot, a tired office worker at a desk late at night, rubbing his temples, the screen light on his face. The camera pushes in slowly. He mutters: "One more hour." SFX: a keyboard clicks. Ambient noise: a low air-conditioning hum. Muted blue and green, quiet mood.
```

**Ask:** A storm arriving over a field.

```text
Wide shot, low angle, a lone tree in a field as dark clouds gather. Wind bends the grass. SFX: thunder cracks in the distance. Ambient noise: wind rising. The storm keeps building to the end of the shot.
```

The ending says what is still happening, not silence.

From the vendor's own guide:

- "Medium shot, a tired corporate worker, rubbing his temples…"

## Facts

- Durations: 4, 6, 8 s
- Resolutions: 720p, 1080p
- Aspect ratios: 16:9, 9:16
- Start frame: optional
- End frame: yes
- Sound: optional (it can be switched off)
- Camera move: not offered for this model (describe the move in the prompt)
- Repeatable with a seed: yes
- Director tags (provisional): audio, cinematic, i2v
- Recommended pick for: no mode today
- An end frame needs a start frame: without one the request is refused (nothing is charged).
- Riftland sends the exclusions itself (a negative prompt); a planned request sends its own list.

## In its family

The quick Veo: use it to try ideas. Finish on the full sibling for the final version.

Same family: Veo 3.1.
