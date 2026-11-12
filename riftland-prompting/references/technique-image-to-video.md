<!-- generated from Riftland's knowledge base: technique "image-to-video", version acf1ebe9037f, checksum d0680d43. Do not edit. -->

# Image to video

Animate a still: the image is the first frame, so describe the motion, not the picture.

Applies to: video.

## Rules

1. Treat the image as the first frame and the anchor. The prompt drives what happens next; it does not need to describe what is already visible.
   - Why: The FLUX Video vendor says the source image sets the first frame and the prompt drives the motion; the Kling guide says to treat the input image as an anchor.
2. Describe the motion: what moves, how fast, and what the camera does. Her hair and the dress drift in a light breeze, the lavender sways, she turns toward the camera. Do not write her in a white dress in a field of lavender again.
3. Pass the image as `start_image` on `generate_video`, or as a reference with the role start_frame on `plan` and `create` (a lone reference on a video is its first frame too). A saved character given as `character_id` becomes the first frame when you give no start image, and so does a @character or @product tag in the prompt.
4. Match the format to the image: pass an aspect ratio that fits it. Riftland snaps the aspect ratio to the closest one the model supports.
5. Keep the motion modest and name what must stay: subtle breathing and blinking, hair and fabric drifting, a slow parallax, clouds and water moving; the same face and outfit, the same composition at the first frame, no new objects.
   - Why: That is the vocabulary of the director's animate-an-image mode. The Seedance vendor also recommends slow, gentle movement.
6. For a clip that ends somewhere specific, give an end frame as well: `end_image`, or the role end_frame. A model that does not take an end frame refuses the call, and an end frame needs a start frame. See the first and last frame workflow, and check the model's facts.
7. When the clip drifts from the image (the face changes, new objects appear, colours shift): shorten it, reduce the motion, remove the camera move, repeat what must stay, or add an end frame that pins down where it finishes. If it still drifts, try another model family.
8. Look before you accept: media_view shows a clip as a contact sheet of frames with their times, so compare the first and the last frames with the source.

## Do and don't

- Don't: A woman in a white dress standing in a field of lavender at sunset, golden light.
  Do: Slow push-in. Her hair and the dress drift in a light breeze, the lavender sways, she turns her head toward the camera and smiles. Same face and outfit, same composition, no new objects.

## Checklist

- [ ] Is the image passed as the first frame?
- [ ] Does the prompt say only what moves and what the camera does?
- [ ] Does it say what must stay?
- [ ] Does the aspect ratio match the image?

## See also

- `technique:video-prompting`: Prompting a video
- `technique:camera-moves`: Camera movement vocabulary
- `technique:consistency`: Keeping a character, a product or a brand the same
- `technique:troubleshooting`: Troubleshooting: what went wrong and what to change
- `workflow:image-to-video`: Image to video
- `workflow:first-last-frame-video`: First and last frame to video
