---
name: riftland-product-link-video
description: "A promotional video made from a product page link with minimal input, through Marketing Studio's product-link tool. Use when: \"hacé un video con este link\", \"video de producto desde mi página de Shopify\", \"make a promo video from this product URL\". NOT for: a creator presenting the product (use ugc-video-ad); product photos (use product-photoshoot); a video of an app or website (use app-promo-video)."
version: 1.0.0
---

# Video from a product link

Turn a product page URL (Shopify, Tienda Nube, Amazon, Mercado Libre, any store) into a promo video with script, scenes and audio, from minimal input. Engine: Riftland Marketing Studio with `tool: "product-link"`.

## Defaults
`aspect_ratio: "9:16"`, `duration: 15` (4–30 s), `resolution: "720p"`, audio on, `language` = the audience language, `batch: 1`.

## Workflow
1. Check the link is a single product page (not the home page, a category or a search). Ask for the right one if not.
2. Recommended for marketplaces: `products_add` with `url` to see what Riftland reads (name, price, images). If it's wrong or thin, fix it with `manual` (name, real photos) and pass the `product_id` instead of `product_url`.
3. Look (optional): `style_id` takes a motion template id as the visual direction. List them with `marketing_studio_catalog` (`category: "motion"`, `include: ["templates"]`), e.g. `motion-hypermotion--macro-liquido`, `motion-showcase--pedestal-giratorio`, `motion-hypermotion--titulares-en-movimiento`. Without it, the tool picks the treatment.
4. `brand_id` (optional) applies the brand kit. `prompt` adds what the page can't say: the offer, audience, tone, exact on-screen text, things to avoid.
5. Write the script yourself (Riftland runs no LLM over MCP): the same call with `dry_run: true` (free) returns `draft`, `references` and `required_tags`, and imports the product (use the returned `product_id` instead of `product_url` from then on). Rewrite the draft into `script`: one English prompt of 120–220 words, beats in order with timing (hook, product hero shots, benefit callouts in big type, end card with the offer), camera, light, sound and any on-screen text in quotes in the target language; keep every tag of `required_tags`; only facts from the page or the user.
6. `quote` (`tool: "marketing_studio_generate"`), confirm, generate with `script`, then `jobs_wait` (3–6 min).

## Example
```json
{ "media": "video", "tool": "product-link", "product_url": "https://tienda.com/zapatillas-runner",
  "aspect_ratio": "9:16", "duration": 12, "resolution": "720p", "language": "es",
  "prompt": "Energía de running urbano. Mostrar la suela y el tejido. Cierre: “Envío gratis hoy”." }
```

## Cost (approximate)
12 s: about 260 credits at 720p (115 at 480p). 15 s: about 320 at 720p. Over 15 s the engine switches to Seedance 2.5, about twice the price per second.

## Aspect ratio by platform
TikTok, Reels and Shorts 9:16 · feed 1:1 or 3:4 · YouTube and web 16:9. Video has no 4:5.

## Gotchas
- Some marketplaces block reading the page: if the result looks generic, add the product by hand with real photos.
- Prices, discounts and dates on screen must be exact: write them in the prompt.

## Next steps to offer
The same video in another aspect ratio, a UGC version with a creator (`ugc-video-ad`), static ads (`static-ads-campaign`), product photos (`product-shots`).

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
