<!-- generated from Riftland's knowledge base: technique "troubleshooting", version acf1ebe9037f, checksum b5e7e739. Do not edit. -->

# Troubleshooting: what went wrong and what to change

Symptom, likely cause and fix for wrong text, bad hands, a changed face or product, a morphing video, stray subtitles, mismatched audio, blocked requests and generic results, in Riftland's tools.

Applies to: image, video.

## Rules

1. Wrong or misspelled text: cut it to a few words, put the exact words in quotes, describe the lettering and add no other text. Then fix only the wrong word with `create` and `change_of`, asking to change only that word and keep everything else.
   - Why: Likely cause: the text is long, small or unquoted, or the model is weak at text. Look at the result with media_view and read every character.
2. Extra fingers, extra limbs, warped hands: simplify the pose (hands holding an object, or out of frame), ask for `count` up to four and pick the best, then repair one area with `change_of` (change only the left hand, natural five fingers, keep everything else). In a video, shorten the clip and slow the motion.
   - Why: Likely cause: hands and complex poses are a common weak spot. For video, Riftland already sends warped hands and extra limbs in its standard negative list to the models that take one.
3. The face changed, or the product changed: pass the photo as a reference and name it in the prompt, say what must stay exact, use a saved character with `character_id` or an element @tag, and for a video start from the accepted still as `start_image` with less motion. For the closest likeness, train the character.
   - Why: Likely cause: references guide but do not guarantee identity, and a long or fast clip drifts from its first frame.
4. The edit changed too much: send one change at a time through `change_of`, write change only X and keep everything else the same, repeat the preserve list each round, and use a zone edit (`mask_image`) where the model offers it. If it still drifts, start over with one fresh request.
   - Why: Likely cause: several changes in one request, or no preserve list.
5. The video morphs, or the camera drifts: keep one action and one camera move in the shot, choose the move by `camera_move` or use `static`, write pace words such as slowly and steadily, shorten the duration, and start from a clear first frame. Check where it goes wrong with media_view.
   - Why: Likely cause: too many actions or moves, fast or complex motion, or a clip longer than the model holds steady.
6. Subtitles, on-screen text or a watermark appear: add plain text constraints such as keep it subtitle-free, no on-screen text, do not generate a watermark. To remove a logo or an object that is already there, use `edit_video` with the action erase (it works on the first seconds of the clip).
   - Why: Likely cause: the model adds text on its own. Riftland's standard negative list also names watermark and text artifacts on the models that take a negative.
7. The audio does not match: check that the model makes sound and that `audio` is on; quote each line with its speaker; make the speaker visible for lip sync or cue a voiceover; say no dialogue where there should be none. Or make the audio apart with `generate_audio` and use `talking_avatar` for a speaking portrait.
   - Why: Likely cause: a model without sound or with `audio` off, a line with no speaker, or an off-screen speaker with no voiceover cue.
8. The request was blocked: read the message, which says why and charges nothing. Riftland's own check covers sexual content and nudity, minors, real public figures and a few terms Riftland does not allow. Use an invented character instead of a real public figure and describe the scene plainly. Do not retry the same text in a loop, and do not try to get around a block; if the request is legitimate, tell the user.
   - Why: Likely cause: Riftland's check runs before any credit is charged. The models may also have checks of their own: one independent report says the Kling family is strict and can block harmless scenes over words such as burst or explosion.
9. The result looks generic, or the format is wrong: swap empty quality words for concrete light, lens, setting and style, say what the image is for, and add a reference. If you want a format, pass `format` on `plan` and `create` or `aspect_ratio` on the generate tools; the director picks one for the use otherwise. To widen an existing image to another format, use `edit_image` with the action expand.
   - Why: Likely cause: a request with no concrete detail, or no format stated.

## Do and don't

- Don't: The text on the sign is wrong, make a new poster.
  Do: Call `create` with `change_of` set to that image and the request: change only the word on the sign to "OPEN"; keep everything else exactly as it is.
- Don't: Retry the same request five times and hope.
  Do: Look at the result with media_view, name what is wrong, change one thing from the list above, and try once.

## Checklist

- [ ] Did you look at the result, not only the job status?
- [ ] Did you name the one thing that is wrong?
- [ ] Did you change one thing?
- [ ] Is the fix written as a plain constraint, a reference or a tool argument?

## See also

- `technique:image-prompting`: Prompting an image
- `technique:text-on-image`: Text on an image
- `technique:editing-and-changes`: Editing and changing a result
- `technique:consistency`: Keeping a character, a product or a brand the same
- `technique:video-prompting`: Prompting a video
- `technique:dialogue-sound-music`: Dialogue, sound and music
