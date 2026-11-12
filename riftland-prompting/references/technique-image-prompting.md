<!-- generated from Riftland's knowledge base: technique "image-prompting", version acf1ebe9037f, checksum 1e87b775. Do not edit. -->

# Prompting an image

Say what the picture shows, then how it looks: subject, action, setting, light, lens, framing, style and palette.

Applies to: image.

## Rules

1. Cover the same few things every time, most important first: the subject, what it is doing, where it is, the light, the lens or framing, the style, the palette. Leave out the ones that do not matter instead of padding them.
   - Why: Riftland's own director fills the same fields in its photo, portrait and product modes, so a request built this way lines up with what it would write.
2. On most models put the subject first and the rest after it; the GPT Image family prefers the scene first: the background or setting, then the subject, then the key details, then the constraints.
   - Why: The vendors of the Nano Banana and FLUX families put the subject or the key element first (word order matters on FLUX); the vendor of the GPT Image family recommends background, then subject, then details.
3. For Ideogram write one sentence for the whole image, then its style, then each element with its placement: exact words in quotes with their styling, and colours by name or hex.
   - Applies to the families: Ideogram.
   - Why: The vendor describes structured prompts of that shape. Riftland sends prose, so this is the closest plain-language form.
4. Say what the image is for: a product hero for a web banner, an ad, a UI mock-up, an infographic. Add the room you need, such as open space on the left for a headline.
   - Why: The vendors of the GPT Image and Seedream families both advise naming the intended use, because it tells the model what finish and layout to aim for.
5. Use concrete light, lens and film words: golden hour side light, a large overhead softbox, 85mm with shallow depth of field, fine grain, teal and amber grade. Avoid empty quality words such as masterpiece or 8k.
   - Why: Several vendors list lighting and lens vocabulary as what steers the look. On the GPT Image family camera specs are read loosely, so use them for the feel of the picture, not for exact optics.
6. Describe what you want, not what you do not want: write an empty street, not no cars. When something must be absent, state it as a plain constraint at the end: no watermark, no extra text.
   - Why: Most image models have no negative-prompt field. A few take a separate negative field, but do not rely on it.
7. Tie a hex colour to an object: an apple in colour #0047AB. A loose request such as use #FF0000 somewhere is unreliable.
   - Applies to the families: FLUX, Ideogram.
   - Why: The FLUX and Ideogram vendors both describe hex codes as reliable only when attached to a thing.
8. Length follows the family: the FLUX vendor calls roughly 30 to 80 words usually ideal for the earlier FLUX versions and says a short description is enough for its newest, Qwen Image takes very long prompts that combine layout, exact text and style, and Ideogram wants structure over length. When unsure, a clear short paragraph beats a list of keywords.
9. When Riftland's director is on, `plan` and `create` take the request in the user's own words and write the final prompt for the model they choose; the plan shows it. Use this guide to write a clear request, to judge the prompt the plan returns, and to write a prompt yourself with prompt_mode raw.
   - Why: That is how `generate_image`, `plan` and `create` describe the director.

## Do and don't

- Don't: A beautiful picture of a woman, high quality, 8k, masterpiece.
  Do: A woman in her sixties repotting a fern on a sunlit balcony, golden hour side light, 50mm, shallow depth of field, warm natural palette. For a lifestyle blog header, with room on the right for a title.
- Don't: A street with no cars and no people.
  Do: An empty street at dawn, wet asphalt, a single streetlamp still lit, low blue light.

## Checklist

- [ ] Is the subject clear in the first line?
- [ ] Is there an action or a pose, not just a noun?
- [ ] Are light and framing concrete words?
- [ ] Did you say what the image is for and what space you need?
- [ ] Are exact words in quotes, and everything that must not appear written as a plain constraint?

## See also

- `technique:text-on-image`: Text on an image
- `technique:editing-and-changes`: Editing and changing a result
- `technique:references-and-roles`: References and their roles
- `technique:product-photography`: Product photography looks
- `technique:troubleshooting`: Troubleshooting: what went wrong and what to change
