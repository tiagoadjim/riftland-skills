<!-- generated from Riftland's knowledge base: technique "editing-and-changes", version acf1ebe9037f, checksum 6c4ef8d4. Do not edit. -->

# Editing and changing a result

Change one thing, say what stays, use change_of so the original is the source, and know when to start over.

Applies to: image, video.

## Rules

1. Start with a strong verb and say what stays: replace the red chair with a light-oak one, and keep the table, the camera angle and the lighting unchanged. Verbs that work: replace, remove, recolour, add, extend.
   - Why: Four vendors give this pattern, and Riftland's director writes edits as: change only the element, keep everything else exactly as it is.
2. Repeat the preserve list in every round, not only the first. Each new instruction is a fresh request to the model.
   - Why: The GPT Image vendor advises repeating it on each iteration.
3. Make one change at a time, then look. Three changes in one request are three chances to damage something you wanted to keep.
   - Why: The Nano Banana and GPT Image vendors both advise iterating with single-change follow-ups.
4. To change a result you already have, call `create` (or `plan` first) with `change_of` set to its job id, or job_…#2 for its second image, or an asset id, and write only the change as the request. You get the same image with just that change, in the same format, made by an editing model. The new result can be changed again by passing its job id.
   - Why: That is what `change_of` does; the source is always the user's own image.
5. Know what `change_of` cannot do: it works on images only (a video cannot be changed this way), it cannot be combined with `character_id` because the character is already in the image, and it needs the director (not mode raw). Without the director, call `generate_image` with the source in `reference_images` and the edit as the prompt.
6. Some GPT Image models can edit only a zone: give `mask_image` (white is the area to change) or `markup_image` on the first reference. Check the model's facts for the ones that take it.
   - Applies to the families: GPT Image.
7. For plain photo jobs skip the prompt and use `edit_image`: erase an object, expand the canvas, replace the background, try garments on a person, restore an old photo, make a headshot, put a logo on a product, or turn a sketch into a finished image. For a clip, `edit_video` removes the background, erases an object, or adds sound effects.
8. Check what you wanted to keep. References and edits guide a model but do not guarantee pixel-for-pixel results, so compare the source and the new result side by side with media_view (it takes up to six files) before you accept it.
   - Why: The Seedream vendor says references guide but do not guarantee identity, and the Nano Banana vendor lists artifacts in complex blends and lighting changes as a weak point.
9. Start over, with one fresh request that contains every change, when the edits have piled up artifacts, when the change is structural (a new pose, a new composition, another format), or when the model ignored the same instruction twice. If the look of the accepted result is right, pass it as a reference.

## Do and don't

- Don't: Make it look better.
  Do: Replace the red armchair with a light-oak one. Keep the rug, the camera angle, the room layout and the lighting unchanged.
- Don't: Change the background to a beach, make her smile, add a straw hat and brighten the whole thing.
  Do: Four calls with `change_of`, each on the result of the one before: first the background to a beach, keeping her pose and clothes; then the hat; then the smile; then the brightness.

## Checklist

- [ ] Does the request name one change?
- [ ] Does it say what must stay the same?
- [ ] Is `change_of` set to the result you want to change?
- [ ] Did you compare the new result with the source?

## See also

- `technique:references-and-roles`: References and their roles
- `technique:text-on-image`: Text on an image
- `technique:troubleshooting`: Troubleshooting: what went wrong and what to change
- `workflow:change-chain-and-upscale`: Change chain, then upscale
