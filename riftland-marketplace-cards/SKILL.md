---
name: riftland-marketplace-cards
description: "A listing image set for a marketplace or store page: the main image on pure white, a benefits card with up to three callouts, and styled supporting looks, through Marketing Studio's marketplace format. Use when: \"imagen principal para Mercado Libre\", \"fotos para mi publicación de Amazon\", \"el set completo de la ficha\", \"listing images for my product\", \"main image on white\". NOT for: in-use, hands, model or banner images (use product-photoshoot), ads with headlines and a call to action (use static-ads-campaign), a video of the product (use product-link-video)."
version: 1.0.0
---

# Marketplace cards

A listing image set for a marketplace or a store page, made with Marketing Studio's `marketplace` format (`marketing_studio_generate`, `media` image): the main image on pure white, a benefits card with up to three short callouts, and styled supporting looks. It makes what that format produces and nothing else; the "Does not do" list says where the rest goes. One fact shapes every call: the format is built to carry up to three callouts on any image, so an image that must have no words needs the explicit text-free call shown below.

## When to use
The user has a product (photo, link or saved product) and wants the images of a listing. They may name the scope ("la principal", "las de apoyo", "el set completo") and the marketplace ("Mercado Libre", "Amazon", "mi tienda"). The scope is an argument: a named scope is never asked again.

## Scope
| Scope | People say | Images | Template |
|---|---|---|---|
| main | "la imagen principal", "la portada de la publicación" | 1 | `marketplace--blanco-pdp` (style `clean`, 1:1) |
| secondary | "las de apoyo", "las otras fotos" | 3 | the benefits card `marketplace--tres-beneficios`, a premium look and a look for the product kind |
| full | "el set completo", "toda la publicación" | 4 | main plus secondary |

The premium look is `marketplace--noche-de-carbon` (style `dark`). The look for the product kind is one of `pastel`, `splash`, `color-pop` or `surreal` (templates in the set recipes).

Tie-breakers:
- A named scope wins over any inference from the words.
- The main image is always `clean`, even when the user says "premium": marketplaces want a white main image. Offer the premium look for the secondary images.
- The secondary images start only after the user accepted the main image.
- Only the benefits card carries words. Every other image is called text-free: `copy` with a headline and no `callouts`, and "no text" in `prompt`.
- In use, hands, a person or a banner is `product-photoshoot`, not here.

## Interview
Skip what the conversation already answers. At most one question in total, apart from asking for the product when it is missing.

**Scope named ("el set completo", "solo la principal")**
1. Go with this set and this price? Yes · Change the scope · Cancel

**Scope not named ("imágenes para mi publicación")**
1. Which scope? Main only · Secondary only · Full set

**An accepted main image already exists**
1. Build the secondary images from it? Yes · Make a new main image

## What you pass and what the server decides
- You pass: `template_id` (the table), `product_id`, `aspect_ratio` only when the user names one, `language` (the marketplace's: Spanish for Mercado Libre, else the conversation's), `brand_id` when a brand kit exists, `images` (the accepted main image), and `copy` on every call: with `callouts` for the benefits card, headline only for the others.
- You write the callouts, from facts: the product page, the brand kit or the user's words. Never invent numbers, certifications or guarantees. Rules and examples: [Writing callouts](references/callouts.md).
- The server decides: the final prompt, the pure white background and the 85% fill of the `clean` style, how the callouts are laid out and rendered verbatim, and the resolution. Without a `copy` from you it writes its own callouts for any image of this format.

## Calls
Save the product once, free: `products_add` with `url`, or with `manual` (`name` and the photo in `images`). A brand kit to apply: `brands_list`. Shapes only:
```json
{ "media": "image", "template_id": "marketplace--blanco-pdp", "product_id": "<id>", "aspect_ratio": "1:1",
  "copy": { "headline": "<product name>" }, "prompt": "pure white background, the product alone, no text, no badges" }
{ "media": "image", "template_id": "marketplace--tres-beneficios", "product_id": "<id>", "images": ["<accepted main: job_… or ast_…>"], "language": "es", "dry_run": true }
{ "media": "image", "template_id": "marketplace--tres-beneficios", "product_id": "<id>", "images": ["<accepted main>"], "language": "es",
  "copy": { "headline": "<product name, up to 6 words>", "callouts": ["<callout 1>", "<callout 2>", "<callout 3>"] } }
```
The text-free calls (the main image and the looks) send `copy` with only the headline and "no text" in `prompt`; the benefits card sends its callouts. The `dry_run` is free and returns `copy_facts`: write the callouts from them, then call again without `dry_run`. Order: the main image, then the user accepts it, then the other calls together, then one `jobs_wait` (20–60 seconds).

## Spending
- `quote` every call (`tool` `marketing_studio_generate` and the same arguments), add them up and put the total in the one confirmation question.
- Tell the user the credits; ask above 100 credits unless they already approved that spend. Low credits: share the buy link and offer the main image alone.
- A redo needs no new question while the total stays under what they approved.

## Delivery
The images in listing order (main, benefits card, looks), each as its URL (`url`; `downloadUrl` to keep the file), then one summary line: what was made, the credits charged and the balance ("Listo: set de 4 imágenes, 76 créditos, saldo 140."). Remind the user to check the marketplace's current image rules (size, background, text) before uploading. No ids or assembled prompts unless asked.

## Retries and caps
- A hard cap of 6 images per request, counting every call and every retry.
- Check each image with `media_view`: the main image must be pure white with the product alone and no words; the benefits card must spell each callout exactly as written. Redo a failing image once, with the same call.
- If words still appear on a text-free image after that redo, make the main image with `product-standalone`, style `studio-white`, 1:1 (a format that renders no text) and tell the user why.
- At most 2 retries of the same request; then show the best result and say what is off.
- A failed job is refunded automatically: say so. Retry at most once, and only when the error says it is transient.

## Does not do
- Infographics with spec tables, comparison charts or more than three callouts: the format renders up to three.
- Lifestyle, in-use, hands, model or banner images (`product-photoshoot`).
- Ads with a headline and a call to action (`static-ads-campaign`).
- A+ pages, banners or video (`product-photoshoot`, `product-link-video`).
- Put text, badges or logos on the main image, or promise that a marketplace accepts an image.
- Guarantee that a marketplace accepts an image: policies change, so the user checks.

## Common mistakes
- Making the secondary images before the main one is accepted: they should be built from it.
- Callouts longer than 4 words, or claims the product page does not support.
- Asking for 4:5: this format offers 1:1, 3:2, 2:3, 4:3, 3:4, 9:16 and 16:9.
- Asking for 4K: only `product-standalone` has it.
- Leaving `copy` out of an image that should have no words: the format then writes its own callouts.
- Using the `ads` format for listing images, or `batch` 4 for the main image.
- Forgetting `language`: the card is written in the language you pass.

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
- [Set recipes by product kind](references/set-recipes.md) — read when choosing which looks support the main image for this kind of product.
- [Writing callouts](references/callouts.md) — read when writing the benefit callouts of the benefits card, in any language.
Load one: open the file under `references/` next to this SKILL.md when the skill is installed; over MCP call `skill_get` with `skill_id` `marketplace-cards` and `reference` set to a file name from the list above.
