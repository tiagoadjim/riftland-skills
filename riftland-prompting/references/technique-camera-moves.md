<!-- generated from Riftland's knowledge base: technique "camera-moves", version acf1ebe9037f, checksum 08e193ad. Do not edit. -->

# Camera movement vocabulary

What each move does and when it reads well, and Riftland's library of 33 moves you can pick by id.

Applies to: video.

## Rules

1. Name one move per shot and add a speed word: slow dolly-in, steady pan left, a quick whip pan. Two moves at once, such as an orbit with a crane and a zoom, are where models get confused.
   - Why: The vendors of the Seedance and FLUX Video families advise one camera move per shot.
2. Know the words. A dolly moves the camera toward or away from the subject on wheels; a push-in and a pull-out are the same idea. A truck moves it sideways with the subject in frame; tracking and following move with the subject. A pan turns the camera left or right from a fixed spot and a tilt turns it up or down; a whip pan is a very fast pan. An orbit circles the subject. A crane rises or falls on an arm. Handheld adds a deliberate shake. A rack focus shifts the focus between planes.
   - Why: These are general film terms. Vendors name most of them; rack focus is common film usage that no fetched vendor source states.
3. Match the move to the effect. A slow push-in adds emphasis; an orbit or a turntable suits a product; a crane up shows scale; a handheld follow feels documentary and close; a whip pan makes a transition; a locked-off shot lets the subject do all the moving.
4. Riftland has a library of 33 camera moves, chosen by id, in six categories: `push` (for example `dolly-in` and `dolly-zoom`), `orbit` (`orbit-360`, `lazy-susan`), `pan` (`whip-pan`, `tilt-up`), `crane` (`crane-up`, `fpv-drone`), `handheld` (`handheld`, `snorricam`) and `fx` (`dutch-angle`, `static`). List them all with presets_list (source camera) or models_explore (kind camera).
5. Pick a library move with `camera_move` on `generate_video`. Riftland appends the move to the prompt itself, as a line starting Camera: followed by its own description, and the Hailuo family also gets its native bracket command. Do not repeat the move in the prompt, and do not write the brackets yourself.
6. With `plan` and `create`, which take no `camera_move`, describe the move in the request in plain words and the director writes it into the prompt.
7. Use `static` when only the subject should move: it asks for a locked-off tripod shot with no camera movement. It is the first thing to try when the camera drifts.
8. Give a big move room. A full orbit or a long push needs a longer clip than a small push-in, so check the model's durations and pick a smaller move for a short clip.
9. Check the result: media_view shows a clip as a contact sheet of frames across its length, so you can see whether the move happened and when. If a model softens or ignores it, try a simpler move or the same move with fewer other instructions.

## Do and don't

- Don't: The camera goes around her while zooming in and rising up and shaking a bit.
  Do: Pick `orbit-360` as the `camera_move`, and let the prompt describe only her: she stands still, wind in her coat, soft backlight.
- Don't: Add a dolly-in in the prompt and set camera_move to dolly-in.
  Do: Set `camera_move` once and leave the move out of the prompt: Riftland adds it.

## Checklist

- [ ] One move?
- [ ] Picked by id with camera_move, or described in plain words?
- [ ] Not repeated in the prompt?
- [ ] Does the clip have room for it?

## See also

- `technique:video-prompting`: Prompting a video
- `technique:image-to-video`: Image to video
- `technique:multi-shot-and-timing`: Multi-shot clips and timing
- `technique:troubleshooting`: Troubleshooting: what went wrong and what to change
