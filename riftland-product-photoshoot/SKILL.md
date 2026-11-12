---
name: riftland-product-photoshoot
description: "Brand-quality images of one product, chosen by intent: clean catalog shot, in use, hands, on a model, vertical pin, wide banner, ad stills, a conceptual scene or a new version of an existing image. Use when: \"foto de catálogo\", \"fotos de mi producto para la tienda\", \"con modelo\", \"un banner para la web\", \"product photos for my brand\", \"restyle this product image\". NOT for: batches of studio formats picked by style (use product-shots), listing image sets for a marketplace (use marketplace-cards), a logo on merchandise (use product-mockup), garments on a person (use virtual-try-on), ads with headlines (use static-ads-campaign)."
version: 1.0.0
---

# Product photoshoot

Brand-quality images of one product, chosen by intent: a clean catalog shot, the product in use, hands holding it, a person with it, a vertical pin, a wide banner, stills for ads, a conceptual scene, or a new version of an image the user already has. Two routes do the work and the table says which one each intent takes: Marketing Studio (`marketing_studio_generate`: product formats that keep the product exact and can apply the brand kit) and `create` (Riftland's director writes the prompt from the user's words and the product photo).

## When to use
The user has a product (a photo, a link or a saved product) and wants images of it. They may name an intent ("foto de catálogo", "con modelo", "un banner"), a use ("para mi tienda") or only say "haceme fotos de esto". Several intents in one request are normal: one call per intent.

## Modes
| Intent | People say | Route | Call |
|---|---|---|---|
| Catalog | "foto de catálogo", "fondo blanco", "packshot" | Marketing Studio | `product-standalone`, `style_id` `studio-white` |
| In use | "en uso", "en contexto", "lifestyle" | Marketing Studio | `product-standalone`, `style_id` `usage` (`natural` for materials and daylight) |
| Hands | "con manos", "sosteniéndolo", "sin cara" | Marketing Studio | `product-with-model`, `style_id` `faceless` |
| On a model | "con modelo", "una persona usándolo" | Marketing Studio | `product-with-model`, `style_id` `closeup`, `full-body` or `editorial`; a saved character as `avatar_id` |
| Vertical pin | "pin", "vertical para Pinterest" | Marketing Studio | `product-standalone`, `aspect_ratio` `2:3` |
| Wide banner | "banner", "hero de la web", "portada" | Marketing Studio | `product-standalone`, `aspect_ratio` `21:9` or `16:9` |
| Ad stills | "imágenes para anuncios", "un pack" | `create` | the photo in `references`, `count` 2–4 |
| Conceptual | "flotando", "surreal", "salpicaduras" | `create` | the photo in `references`, the concept in the user's words |
| New version | "cambiale el fondo", "otra versión de esta" | `create` | `change_of` the image, only the change as the request |

Tie-breakers:
- The format the user names beats the look ("banner" beats "en uso"), and the platform beats the mood.
- A face in the picture means `product-with-model`; only hands, `faceless`; nobody, `product-standalone`.
- An image to modify (theirs or an earlier result) is a new version with `change_of`, never a new shot from scratch.
- Words on the image (headline, price, callouts) are not this skill: `static-ads-campaign` for ads, `marketplace-cards` for listing images.
- Of these formats only `product-standalone` reads `brand_id`. With `create` and `product-with-model`, say the palette in the user's words.
- Two intents fit equally: make both only when the user asked for a set; otherwise ask the first question of the interview.

## Interview
Skip what the conversation already answers. At most 4 questions per request type, as labeled options, in the user's language; default the rest and say the defaults in one line.

**Photo attached, no intent named ("haceme fotos de esto")**
1. What are the images for? Store page · Social feed · Ad · Web banner
2. Which look? Clean studio · In use · With a person · Conceptual
3. How many of each? 1 · 4
4. Apply your brand kit? Yes · No (ask only when `brands_list` shows a brand)

**Photo attached and a use named ("para mi tienda")**
1. Anything on the product that must stay exact? Label · Color · Shape · Nothing special
2. Which look? Clean studio · In use · With a person
3. How many? 1 · 4

**Text only, no photo ("fotos de mi termo")**
1. Can you share a photo or the product link? Photo · Link · Neither
   Neither: say the images will show an imagined product, not theirs, and use `create` with no references.

**A person with the product**
1. Who? A saved character · A model I describe · Hands only
2. Framing? Close-up · Full body · Editorial
3. Where? Street · Home · Studio

**An image to redo (theirs or an earlier result)**
1. What changes? Background · Light · Colors · Something else
2. Keep the same format? Yes · No, make a new image

## What you pass and what the server decides
- You pass: the product (a saved `product_id`, a link, or the photo), the intent as the route in the table, the user's words, an aspect ratio only when the user or the use names one, `count` or `batch` only for a pack, and `brand_id` when it applies.
- Marketing Studio decides: the final prompt from its format and style, product fidelity to the reference, the brand block and the resolution.
- With `create` the server decides: the director mode, the model and why (the plan says it; `models_explore` with action `recommended` shows the pick per mode), the format when you left it out, the final prompt, and how a pack varies (light, angle, palette) while keeping one visual system.
- Never pass: a model, a written prompt or a negative prompt to `create`; and no format or style that the table above does not name.

## Calls
Save the product once, free: `products_add` with `url`, or with `manual` (`name` and the photo in `images`). A brand to apply: `brands_list`. Shapes only:
```json
{ "media": "image", "format_id": "product-standalone", "style_id": "studio-white", "product_id": "<id>", "brand_id": "<id>", "aspect_ratio": "4:5", "batch": 2, "prompt": "fondo beige cálido, sombra larga y suave" }
{ "request": "<the user's words>", "kind": "image", "references": [{ "file": "<ast_… or URL>", "role": "reference" }], "count": 3, "max_credits": 90 }
{ "request": "<only the change>", "change_of": "job_…#2", "max_credits": 40 }
```
The first is `marketing_studio_generate` (one call per look); the other two are `create`, after a free `plan` with the same fields. Results take 20–60 seconds: `jobs_wait` with every job id.

## Spending
- `create` calls: `plan` first (free). The price the user accepts is the `max_credits` of each call. For several calls, add up the plans and get one yes for the total.
- Marketing Studio calls: `quote` every call with the same arguments, add them up, tell the user the credits and ask above 100 credits unless they already approved that spend.
- A second round of images needs a new yes.

## Delivery
Show the images grouped by intent, each as its URL (`url`; `downloadUrl` to keep the file), then one summary line: what was made, the credits charged and the balance ("Listo: 4 fotos de tu termo, 76 créditos, saldo 214."). No ids, JSON or assembled prompts unless the user asks. One next step at most.

## Retries and caps
- A hard cap of 12 images per request, counting every call and every retry. At the cap, stop and show what exists.
- Look at each image with `media_view` against the user's photo (label text, shape, color, scale, hands). Redo a drifted image once: the same call for Marketing Studio, `change_of` the image with the single fix for `create`. At most 2 retries of the same request; then show the best result and say what is still off.
- A failed job is refunded automatically: say so. Retry at most once, and only when the error says it is transient.
- Never raise `count` or `batch` to get lucky.

## Does not do
- Text on the image: headlines, prices, callouts (`static-ads-campaign` for ads, `marketplace-cards` for listing images).
- Video of the product (`product-link-video`) or a spin (`product-spin`).
- Cut-outs, object removal or restoring a real photo (`photo-retouch`).
- A logo on merchandise (`product-mockup`) or garments on a person (`virtual-try-on`).
- Pick a model or write the prompt: the server does, and says why.
- Invent claims, labels or features that are not in the photo or the user's facts.

## Common mistakes
- Writing a long prompt for `create`: pass the user's words; the director writes the prompt.
- Passing a model or a format "to be safe": the plan picks and says why; only the user's explicit choices go in.
- Forgetting the photo: without it the product is imagined, not theirs.
- Expecting the brand kit in `create` or in `product-with-model`: neither reads `brand_id`.
- Asking for 4:5 outside `product-standalone`: the other formats and `create` have no 4:5.
- Regenerating from scratch for a small fix instead of using `change_of`.
- Starting without the price.

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

## References
Read a reference only when its line applies; none is needed for a plain request.
- [Looks by intent](references/looks.md) — read when choosing the art direction of a look, or when results come out generic.
- [Product photos that work](references/photo-guide.md) — read when the user shares a photo, or the product comes out distorted.
- [Packs with one visual system](references/pack-recipes.md) — read when the request asks for more than one image or more than one intent.
Load one: open the file under `references/` next to this SKILL.md when the skill is installed; over MCP call `skill_get` with `skill_id` `product-photoshoot` and `reference` set to a file name from the list above.
