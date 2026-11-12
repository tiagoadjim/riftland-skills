---
name: riftland-product-shots
description: "Studio-style product photography in batches through Marketing Studio formats, from a product link or photo. Use when: \"fotos de producto en lote\", \"packshots para mi tienda\", \"producto con modelo en 4 variantes\", \"catalog images from my link\". NOT for: one product image chosen by intent, such as in use, hands, banner or a restyle (use product-photoshoot); listing image sets for a marketplace (use marketplace-cards); a logo on merchandise (use product-mockup); garments on a person (use virtual-try-on)."
version: 1.0.0
---

# Product shots

Ready-to-use product photos — studio packshots, lifestyle scenes, the product on a model, marketplace listing images — from a product link or photo, in batches. Engine: Riftland Marketing Studio images (Nano Banana Pro at 2K or 4K).

This skill is the batch recipe: you pick the format and the style. For one image chosen by intent (catalog, in use, hands, banner, ad stills, a new version of a photo) use `product-photoshoot`; for a marketplace listing set (main image on white, benefits card) use `marketplace-cards`.

## Ask only if missing
The product (link, photo or saved product) and where the images will be used (store, Instagram, Amazon or Mercado Libre, ads, web banner). Infer the rest.

## Pick the format
| Need | `format_id` | Styles (`style_id`) |
|---|---|---|
| Product alone: e-commerce, catalog, hero | `product-standalone` | `studio-white`, `color-pop`, `natural`, `usage` |
| Product with a person | `product-with-model` | `closeup`, `faceless`, `full-body`, `editorial`, `ugc` |
| Marketplace listing (main image, benefit callouts) | `marketplace` | `clean`, `dark`, `splash`, `pastel`, `color-pop`, `surreal` |

A `style_id` or a `template_id` is required (templates: `marketing_studio_catalog` with `category: "product-shot"` or `"marketplace"` and `include: ["templates"]`, e.g. `product-standalone--pedestal-de-travertino`, `marketplace--blanco-pdp`). Add art direction in `prompt`: surface, props, light, mood, palette, and "no text" unless they want text.

## Text on the image (marketplace callouts, posters, the `ads` format)
Riftland runs no copywriter over MCP: write the words yourself in `copy` and they are rendered verbatim (without it, a generic rules copy). `dry_run: true` (free) returns `copy_facts` (product, benefits, price, brand, language) and `rules_copy`. Rules: `headline` up to 6 words, `subcopy` up to 14, `cta` up to 3 (ads only), `callouts` up to 3 of 4 words each (marketplace shows only these); the job's language, no emojis or hashtags, only facts from the product (never invented prices, percentages or ratings). `product-standalone` and `product-with-model` render no text and ignore `copy`.

## Aspect ratio by destination
- Store product page or marketplace main image: 1:1. Amazon and Mercado Libre main image: `marketplace` with `clean` (pure white, product filling about 85% of the frame).
- Instagram feed: 4:5 (only `product-standalone` has it; otherwise 3:4). Stories and Reels: 9:16. Web hero: 16:9 or 21:9 (`product-standalone`).
- An unsupported ratio silently falls back to 3:4.

## Workflow
1. Product: `brands_list` and `brand_get` for saved products (`product_id`). A link: `products_add` with `url`. A photo: upload it, then `products_add` with `manual` (`name`, `images`). Several clean angles help; extra references go in `images` (up to 6).
2. Brand look (`product-standalone`, `marketplace`): pass `brand_id` to apply the brand palette and logo when there's a brand kit.
3. Model shots: `characters_list` and `avatar_id` for a consistent model; otherwise describe the model in the prompt.
4. Plan the set: one call per style or scene, `batch` up to 4 variations each. Default `batch: 4` at 2K; `quality: "4K"` only on `product-standalone`, for print or big zooms.
5. `quote` every call, add them up and confirm if the total is over 100 credits. Run the `marketing_studio_generate` calls in parallel, then one `jobs_wait` with every job id (20–60 s).
6. Show the results grouped by style and ask which ones to keep.

## Example: studio set plus a lifestyle shot
```json
{ "media": "image", "format_id": "product-standalone", "style_id": "studio-white", "product_id": "<id>",
  "aspect_ratio": "4:5", "batch": 4, "prompt": "fondo beige cálido, sombra larga y suave" }
{ "media": "image", "format_id": "product-with-model", "style_id": "full-body", "product_id": "<id>",
  "aspect_ratio": "3:4", "batch": 2, "prompt": "chico joven con los auriculares puestos, calle de ciudad al atardecer" }
```

## Cost (approximate)
About 19 credits per image at 2K and 33 at 4K: a set of 4 is about 76 credits.

## Check before delivering
- Label text, logo and shape must match the real product; redo the images that drift and say which.
- Hands and product scale in model shots.
- Marketplace main images: no text, no props, pure white background.

## Next steps to offer
`upscale_media` (`topaz-image` for detail, `seedvr-image` for a cheap 2x), more styles or seasonal scenes, a product video (`product-link-video`), ads with copy (`static-ads-campaign`).

## Riftland essentials (every job)
- Reply in the user's language. Tool errors and job stages come in Spanish: translate them when needed.
- Questions: ask only what you can't infer, at most 4, as labeled options, and skip what the conversation already answers. Default the rest and say your defaults in one line.
- Riftland results: reuse them by id (`ast_…`, or the job id `job_…` / `job_…#2`) in any file field, and look at them with `media_view` (image, video frames, audio waveform). Never download a result to look at it or to upload it again.
- User files: pass public https file URLs as they are. Attached in Claude: `media_upload` (`filename`), then run its `curl` on `/mnt/user-data/uploads/<name>` in your sandbox. With a shell, the same on the local file. No sandbox, no network or a failed PUT: `media_upload_widget` (the user drops the files in the chat and you get the ids in their next message); in clients without MCP Apps, the `browser_upload_url` of `media_upload`.
- Words: for an image or a video, pass the user's own words to `plan` / `create` (skill `create`): Riftland's director writes the prompt and picks the model. In the studios Riftland runs no LLM over MCP: scripts, ad copy and brand texts come from you, in the tool's fields (`script`, `copy`, `concepts`, `manual`). The user pays only for the media.
- Spending, images and videos (`create`, `generate_image`, `generate_video`): always send a `max_credits` the user agreed to in this conversation; a price above it spends nothing. No `quote` needed.
- Spending, studios and every other paid tool: `quote` with the same tool and arguments before running it, and tell the user the credits. Get a yes above 100 credits unless they already approved that spend. Not enough credits: don't run it; share the buy link and offer a cheaper option.
- Waiting: `jobs_wait` with every job id (`timeout_seconds` up to 55). Call it again while any job is queued or running, with a short progress note every few calls. If you can't keep waiting, share the `appUrl` and resume later with `jobs_get`.
- `awaiting_approval`: show the `preview`, say what to check and how many credits a reject gives back (`refundOnReject`); `job_action` `approve` or `reject` only on the user's word.
- Deliver: the result links (`url`; `downloadUrl` to keep the file; `appUrl` to edit or remix) and one summary line: what was made, the credits charged and the `balance`. No ids, JSON or assembled prompts unless the user asks (keep the ids to reuse results).
- A failed job is refunded automatically: say so. Retry at most once, and only when the error says it is transient; otherwise show the error's own fix.
- Tools: A tool a skill names that is not in your tool list still works when you call it by name. To have every tool listed, call `tools_profile` with `profile` `full` when the user asks for a studio tool directly.
- Other skills are named by id: load them with `skill_get` (`skill_id`), or use them directly if installed as `riftland-<id>`.
