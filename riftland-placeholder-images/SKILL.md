---
name: riftland-placeholder-images
description: "Realistic placeholder images for an app under construction: avatars, product photos, covers and listings, exported with a typed file and wired into seed data. Use when: \"imágenes de relleno para mi demo\", \"fotos de productos falsos para el catálogo\", \"avatares para usuarios de prueba\", \"placeholder images for my app\", \"mock data photos\". NOT for: final production images (use web-images); real product photography (use product-photoshoot); an icon set (use ui-icon-set)."
version: 1.0.0
---

# Placeholder and seed images for an app

Realistic images for an app under construction: avatars for fake users, products for a test catalog, covers for sample posts, listing photos, cards for a demo or a storybook. They arrive with stable names, web sizes and a typed images.ts, ready to plug into fixtures. Engine: `web_images`.

## 1. Read the project first (no credits)
- Find the seed data: fixtures, mock JSON, a database seed script, storybook stories or a mocks folder. Count the records that need an image and read their ids or slugs.
- `framework` (next, react, vue, svelte, astro, html) and the static folder for `target_dir` (public, or static for SvelteKit).
- The brand palette and the product category, so the samples look like the real thing.

## 2. Plan the batches (one call per kind)
- Avatars: `use` avatar (square, 64 to 512 px). Vary age, skin tone, hair, clothing and setting across `items`; natural light, realistic. Name them after the fixture ids (user-01, user-02…).
- Products: `use` product with `consistent` true so the whole catalog shares one look (same backdrop and light). One item per product, described concretely (material, color, shape).
- Posts and listings: `use` blog or card, one idea per image.
- Up to 24 items per call; split bigger sets by kind.
- Cheaper sizes: pass `widths` with only what the UI shows (for example 128 and 256 for avatars).

## 3. Generate
1. `quote` with tool `web_images` and the same arguments; tell the user the credits.
2. `web_images`; if it is still running, `jobs_wait`, then `web_kit_files` with `job_id` and `target_dir`.

## 4. Wire them into the data
- Unzip the images into the static folder and copy images.ts into the source.
- Point each record at its image: import images and use images.KEY.src (and width, height, blurDataURL) in the fixtures, or write the public paths (images/NAME/NAME-WIDTH.jpg) into the seed JSON.
- Keep the alt texts: the seed doubles as accessible sample content.

## Gotchas
- These are AI images of nobody in particular: fine for demos and seed data. Don't present them as real customers or real products.
- Keep the batch small in the repo: the widths the UI uses, not every size.
- The signed links last 7 days: download the files into the repo, never hotlink them.

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
