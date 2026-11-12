# Packs with one visual system

A pack is several images that look like the same shoot. The system has constants (what stays) and variables (what changes). Decide them before the first call.

## Constants and variables
| Constant (never changes in the pack) | Variable (changes by image) |
|---|---|
| The product photo (the same `product_id` or the same reference) | The intent (catalog, in use, hands) |
| The brand (`brand_id` where it is read; the palette in words elsewhere) | The angle and the framing |
| The palette family and the surface family | The prop and the moment |
| The language of any text | The aspect ratio per destination |

## Recipe A: store launch (4 images)
1. Catalog: `product-standalone`, `studio-white`, 1:1.
2. In use: `product-standalone`, `usage`, 4:5.
3. Hands: `product-with-model`, `faceless`, 3:4.
4. Banner: `product-standalone`, a calm scene, 21:9.
Same `product_id` and `brand_id` in all four. Run the calls together and wait with one `jobs_wait`.

## Recipe B: ad stills (3 to 4 images, `create`)
1. One `create` with the photo in `references`, the user's words and `count` 3 or 4. The director varies light, angle and palette inside one visual system instead of paraphrasing.
2. If one image is the favorite, make it the anchor (below) for any further stills.
Words on the ads are a different skill: `static-ads-campaign`.

## Recipe C: the same shot in new settings (chained `change_of`)
1. Make or choose the anchor image and have the user accept it.
2. For each new setting, `create` with `change_of` the anchor and only the change as the request ("ahora sobre una mesa de mármol"). Each accepted result can be the source of the next change.
3. Stop at the cap of the skill. Do not chain more than 3 changes from one anchor: drift accumulates; start again from the anchor instead.

## Keeping the system when the route differs
- Marketing Studio and `create` do not share a prompt. When a pack mixes both, give both the same palette words and the same surface family, and judge the set together with `media_view` before delivering.
- If one image does not belong, redo that image only (once); never regenerate the pack.

## Price a pack once
Add the quotes of the Marketing Studio calls and the prices of the plans, give one total, get one yes. Every `create` call still carries its own `max_credits`.
