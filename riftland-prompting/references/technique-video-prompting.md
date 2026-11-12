<!-- generated from Riftland's knowledge base: technique "video-prompting", version acf1ebe9037f, checksum dd41b820. Do not edit. -->

# Prompting a video

One action and one camera move per shot, described as motion, with light, pace and a length the model can hold.

Applies to: video.

## Rules

1. Give each shot one clear action and one camera move. A man walks toward the camera while it pushes in slowly is a shot; he runs, jumps, and the camera spins and cuts is a gamble.
   - Why: The Seedance and FLUX Video vendors both advise it.
2. Write the subject and the action early, then the scene, then the light, the camera and the style. The Veo family reads best when the shot size and camera come first: Medium shot, a tired office worker rubbing his temples, a dim open-plan floor at night.
   - Why: The Seedance guide orders subject, action, scene, light, camera, style, constraints; the Veo guide orders cinematography first, then subject, action, context and style.
3. Describe motion with verbs and pace words: slowly, steadily, gently, abruptly. Keep the motion modest on the Seedance family, whose vendor recommends slow, gentle movement and says sprinting, big jumps and violent rolls are weak spots.
   - Why: The Wan, FLUX Video and Veo guides all list pace words. The Seedance vendor itself says the plausibility of complex motion, and of several subjects interacting, still needs work.
4. Put light and time of day in the scene part: golden hour backlight, practical lamps at dusk, cold overcast, firelight flicker.
   - Why: Three vendors place light and time of day in the scene or style section.
5. Use shot size and lens words the models know: wide shot, close-up, low angle, two-shot, shallow depth of field, 24mm wide, 85mm telephoto.
   - Why: The Veo, Wan and Kling guides all use this vocabulary.
6. Keep the length in line with the idea. Riftland snaps `duration` to the closest one the model supports, so check the model's facts for the options, plan one action per clip, and expect a clip to take one to five minutes to render.
7. Write unwanted things as plain text constraints: keep it subtitle-free, no on-screen text, do not generate a watermark. On the Veo family describe what you want rather than what you do not.
   - Why: The Seedance, FLUX Video and Wan guides use text constraints; the Veo vendor has no negative field and advises positive wording. Riftland also sends its standard negative list to the models that take one.
8. Turn sound on only when you want it, and write it in the prompt: speech, sound effects, ambience. Some models have no sound and some always have it; check the model's facts.
9. When the director is on, `create` writes this prompt for the model it picks, from the request in the user's own words. Use this guide for a request that holds one action and one move, and to write a prompt yourself with prompt_mode raw.

## Do and don't

- Don't: A cinematic epic of a man running, then jumping, then the camera spins around and cuts to a fight, make it amazing.
  Do: Side shot of a narrow alley at dusk. A man in a grey coat walks steadily toward the camera, slow dolly-in, warm practical lamps, light rain. Keep it subtitle-free.
- Don't: No text, no blur, nothing weird, don't morph.
  Do: A steady locked-off shot, the subject moves slowly, sharp focus throughout, no on-screen text.

## Checklist

- [ ] One action?
- [ ] One camera move, named?
- [ ] Light and time of day?
- [ ] A length the model offers?
- [ ] What must not appear, written as text?

## See also

- `technique:camera-moves`: Camera movement vocabulary
- `technique:image-to-video`: Image to video
- `technique:multi-shot-and-timing`: Multi-shot clips and timing
- `technique:dialogue-sound-music`: Dialogue, sound and music
- `technique:troubleshooting`: Troubleshooting: what went wrong and what to change
