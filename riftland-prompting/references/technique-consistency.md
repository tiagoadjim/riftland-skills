<!-- generated from Riftland's knowledge base: technique "consistency", version acf1ebe9037f, checksum 2d97f0aa. Do not edit. -->

# Keeping a character, a product or a brand the same

Use a saved character, element tags, a product photo and the accepted result as the next source; know what Riftland does not do.

Applies to: image, video.

## Rules

1. Decide what must not change, then write it once as a short fixed description and reuse it word for word: for a person the face, hair and wardrobe; for a product the shape, colours and label; for a place its light and materials. Two or three fixed features under one consistent label hold better than a long list.
   - Why: The Kling, Veo, Seedance, Wan and Hailuo guides all advise a reference frame plus a few fixed features under one label.
2. For a person, make a character: design options with `avatar_generate`, keep the one the user likes with `character_save`, then pass `character_id` to `generate_image`, `create`, `generate_video` or `talking_avatar`. The character's image goes in as a reference, or as the first frame of a video when you give none.
3. For the closest likeness, train the character: `character_save` with build_lora true trains an identity model in about 25 minutes, and it is charged, so quote it first. `characters_list` shows its status; once it is ready, `generate_image` with that character_id and the image model that needs a trained identity (check the model's facts) keeps the face closest.
4. For objects, places and styles, save an element with `element_save` (one to eight images, and a description of what must stay the same), then write its @tag in any image or video prompt. It costs nothing and needs no training. `elements_list` shows the tags; saved characters appear there too.
5. For a product or a logo, pass its photo as a reference and say what must stay exact (see the product photography guide). When the product must stay as close as possible to the real one, start from the real photo and change only what is around it with `edit_image`.
6. Build the next image from the accepted one: `change_of` on `create` keeps the picture and changes one thing, and an accepted still can be the `start_image` of a clip. For a film, start every clip from the same reference frame, and use Riftland Cine, which draws each shot's keyframe with its cast, location and props as references.
7. Ask for a small pack when you want a family of images: `count` up to four on one request keeps one visual system and varies light, angle and palette.
   - Why: That is how the director describes a pack.
8. Know what Riftland does not do today. `plan` and `create` take no brand: the director's brand-lock block, a fixed paragraph repeated in every prompt of a pack, is not connected to them, so write the brand details into the request each time or pass the logo and product photo as references. The brand kit (`brand_id`) is read by the Ads, Marketing and Motion studios. The generate tools do not check whether a face or a product stayed the same: look with media_view and compare.
9. A seed repeats a result for the same request on the models that take one. Treat it as a way to repeat, not as a way to keep identity: identity comes from references, characters and elements.

## Do and don't

- Don't: A woman in a café. Next: a woman at the beach. Next: the same woman at a market.
  Do: Save her once as a character, then ask for each scene with `character_id`: Luna reading in a café, Luna on a beach at dusk, Luna at a market stall. Keep her wardrobe line identical in each: a green wool coat, short dark hair.
- Don't: Make a video of my bottle, any bottle that looks similar is fine.
  Do: Pass the bottle's photo as the first frame and say: keep the bottle's shape, colour and label exactly the same, only the camera moves.

## Checklist

- [ ] What exactly must stay the same, in one short sentence?
- [ ] Is there a saved character, an element tag or a photo carrying it?
- [ ] Did you look at the new result next to the source?

## See also

- `technique:references-and-roles`: References and their roles
- `technique:product-photography`: Product photography looks
- `technique:troubleshooting`: Troubleshooting: what went wrong and what to change
- `workflow:character-series`: A character, then a consistent series
- `workflow:brand-to-ads`: Brand kit to on-brand static ads
