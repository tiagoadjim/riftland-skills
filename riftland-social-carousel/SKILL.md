---
name: riftland-social-carousel
description: "A coherent series of images with one style, character or product for a carousel, grid or lookbook, made with create. Use when: \"un carrusel de 5 imágenes\", \"una grilla coherente para Instagram\", \"un lookbook\", \"make a matching series of images\", \"a set of posters in one style\". NOT for: one product shown in several looks (use product-photoshoot); a YouTube thumbnail (use youtube-thumbnail); the same subject kept across images with no training (use consistent-elements); a single image (use create)."
version: 1.0.0
---

# Social image series

A set of images that clearly belong together — Instagram carousel, feed grid, lookbook, thumbnails, posters, illustrations — sharing a style, character or product. Tool: `create` (skill `create` has the rules: the user's words, questions, `max_credits`, delivery).

## Ask only if missing
The theme and how many images (default 5). Infer the rest: the platform gives the format, their words give the style.

## Format
Formats offered: 1:1, 3:4, 9:16, 16:9, 4:3 and 21:9 (no 4:5). Name the platform in the request ("para Instagram") and the plan picks the closest format and lists the change; pass `format` only when the user named one. For a 4:5 carousel expect 3:4 and keep key content away from the top and bottom ~6% so a 4:5 crop is safe. Stories are 9:16, YouTube thumbnails 16:9.

## 1. Plan the series (show it in a few lines)
- Frame list: one line per image telling the story: cover or hook, middle beats, closing or CTA.
- Style: only what the user said (palette, light, medium, mood). Don't invent a style guide: the first result sets the look.
- Price: `plan` the cover, multiply its price per image by the number of frames and get one yes for the total. Each `create` then carries its own `max_credits`.
- Up to 4 images that don't need different beats: one `create` with `count` makes a pack that keeps one visual system and varies light, angle and palette.

## 2. Anchor, then fan out
1. `create` the cover (`count` 2–4) with the theme in the user's words; the user picks one.
2. Every other frame: one `create` each, with the cover in `references`, the user's words for that frame and "same palette, light and grade as the reference". Add:
   - a product: its photo in `references`;
   - a recurring person: `character_id`;
   - the cover's `model` and `format` (its `director` block) so the whole series stays on one model and one shape.
3. Launch every frame at once, then one `jobs_wait` with all the job ids if any still run (10–40 s).
4. Redo outliers with the same anchor; keep the order.

## Text on images
Short and exact, in quotes in the request (headline: “Un domingo perfecto”), one text block per image; check the spelling in the result. For designed posters with the brand palette, Marketing Studio's `posters` format is an alternative.

## Model questions
Ask `models_explore` (`action: "recommend"` with the `need`); don't answer from memory. A model the user names stays for the whole series.

## Deliver
The images in order with their links and one line per slide, then the series' credits and the balance. Offer captions for each slide, a cover variant, more slides in the same style, `upscale_media` for print, or a short video from one frame (`cinematic-shot`).

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:consistency`: Keeping a character, a product or a brand the same. File: `riftland-prompting/references/technique-consistency.md`
- `technique:image-prompting`: Prompting an image. File: `riftland-prompting/references/technique-image-prompting.md`
- `technique:text-on-image`: Text on an image. File: `riftland-prompting/references/technique-text-on-image.md`

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
