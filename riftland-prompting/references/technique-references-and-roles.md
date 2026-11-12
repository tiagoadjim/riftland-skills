<!-- generated from Riftland's knowledge base: technique "references-and-roles", version acf1ebe9037f, checksum ea8b1164. Do not edit. -->

# References and their roles

A reference can be the subject, the style, the layout or a start frame: say which, in the order you pass them.

Applies to: image, video.

## Rules

1. Decide what each reference is for: the subject to keep (a face, a product), the style to follow, the layout or structure to build on (a sketch), or the start or end frame of a video. One reference, one job.
   - Why: A picture that could be either style or subject leaves the model to guess.
2. Name each reference's role in the prompt, by position or label: Image 1 is the product photo, Image 2 is the style reference; or Image A for the pose and Image B for the art style.
   - Why: The GPT Image, Nano Banana, FLUX and Seedream vendors all advise naming references by index and role.
3. Order matters. With a saved character, its image goes first; your own references follow in the order you listed them; images from @tag elements come after. Write Image 1, Image 2 in that order.
   - Why: That is the order Riftland sends them in.
4. In `plan` and `create`, pass references as a list of file and role: reference (the look, product or face to follow), start_frame or end_frame (first or last frame of a video; a lone reference of a video is its first frame). In `generate_image` the list is `reference_images`; in `generate_video` the frames are `start_image` and `end_image`.
5. Pass an earlier result by its id (job_…, job_…#2 for its second image, or ast_…). Never download a result to upload it again. A public URL or an upload id works too.
6. Do not expect an exact copy. References steer the result but do not guarantee identity, a logo or a label to the pixel, so look at the result and say what must stay exact. When it must be exact, change the picture around it instead (see product photography).
   - Why: The Seedream vendor says it in so many words; the Nano Banana vendor lists character consistency as one that may vary.
7. Keep the number sensible. Riftland takes up to eight references on a request, but each model has its own limit, and some take none or use them only as a style guide. Check the model's facts before sending many.
8. Saved characters and elements are references too: `character_id` adds the character's image, and an @tag written in the prompt adds that element's images and its description.
9. A photo of a real person that the user brought needs their confirmation that they have the person's permission. The studio tools that take a likeness ask for `consent`: ask the user, never assume it.

## Do and don't

- Don't: Make something like these three pictures.
  Do: Image 1 is the sneaker to keep exactly: shape, laces and logo. Image 2 is the mood: pastel studio, used only for light and colour. Put the sneaker from Image 1 on a pastel pedestal lit like Image 2.

## Checklist

- [ ] Does each reference have one job?
- [ ] Does the prompt name each one by position or label?
- [ ] Are they listed in the order the prompt uses?
- [ ] Did you say what must stay exact?

## See also

- `technique:consistency`: Keeping a character, a product or a brand the same
- `technique:editing-and-changes`: Editing and changing a result
- `technique:product-photography`: Product photography looks
- `technique:image-to-video`: Image to video
