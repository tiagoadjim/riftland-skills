---
name: riftland-ai-influencer
description: "An invented consistent character, influencer or mascot designed from a description, saved and reused across photos, videos and ads. Use when: \"creá una influencer IA\", \"una mascota para mi marca\", \"un personaje virtual consistente\", \"design an AI influencer\", \"make a virtual model\". NOT for: a character made from photos of a real person (use my-character); keeping a product or place consistent (use consistent-elements); a photo that speaks (use talking-avatar)."
version: 1.0.0
---

# AI influencer

Design a consistent AI character (influencer, mascot, virtual model, recurring host), save it, and reuse it across photos, videos, talking clips and ads.

This skill is for an invented character. A character made from photos of a real person (the user, or someone who agreed) is `my-character`.

## 1. Identity spec (fill the gaps with tasteful defaults and show it)
Name · age range · gender presentation · skin tone and ethnicity · face (shape, eyes, marks such as freckles) · hair (color, length, cut) · body type · signature style and outfit · personality · niche (fitness, fashion, tech…).
Fictional people only: no lookalikes of real people or celebrities.

## 2. Candidates
Two kinds (`avatar_generate`, then `jobs_wait`; quote first with `quote`):
- **Rift ID** (`kind: "rift"`, default): a realistic person (ambassador, model, host) from the spec on GPT Image 2. Add `reference_images` (up to 4) only if the user owns those looks; photos of a real person they brought need `consent: true`, sent only after the user confirms that person's permission.
- **Influencer IA** (`kind: "influencer"`): a viral, stylized character from a `tier` (natural, raro, extremo, criatura) and `traits` (group → option ids, listed in the tool's schema) plus `notes`; made for motion transfer and Genjutsu.
```json
{ "kind": "rift", "prompt": "<the spec in one paragraph>", "name": "Luna", "count": 4 }
```
Show the four options; adjust and regenerate until the user picks one.

## 3. Save (and build)
`character_save` with `name`, `image` (the chosen media id), a short `description`, the same `kind` (and `tier`/`traits` for Influencer IA) and optionally a default `voice` (see `talking-avatar`), e.g. `Spanish_SereneWoman`. It returns the character id. Optional builds (quote with `quote` tool `character_save`): `build_sheet: true` (a multi-view turnaround sheet) and `build_lora: true` (a LoRA trained on a generated dataset, ~25 min; follow it with `characters_list` until its LoRA status is ready). A build from a photo the user brought (not a Riftland result) needs `consent: true` on the user's word, and so does every later job with that character. Tell the user the character now works in every Riftland studio.

## 4. Content
- Photos: `create` (skill `create`: plan, the agreed `max_credits`, delivery) with `character_id` and the scene in the user's words: outfit, pose, place, light ("candid iPhone photo, natural light" for Instagram realism), the platform (feed or stories) for the format, `count` 1–4. Leave `model` out; the exception is a character with a ready LoRA (`characters_list`): add `model: "rift-id-lora"` for the exact face at the lowest price, since the director never picks a LoRA model on its own.
- Video: `create` with `kind: "video"` and `character_id` (or a generated photo in `references` as the first frame).
- Talking clips: `talking_avatar` with `character_id` and a `script` (`talking-avatar`).
- Ads: `marketing_studio_generate` with `avatar_id` set to the character (`ugc-video-ad`, `product-shots`).
- Several posts: launch them in parallel and do one `jobs_wait`.

## Example
"Creá una influencer IA de 26 años, estilo urbano, pelo corto rojizo y pecas, y haceme 3 fotos en Buenos Aires": spec, 4 candidates with sheet, save as "Luna", then three `create` calls with the same `character_id`: "café de especialidad en Palermo Soho, mañana", "Caminito en La Boca, colores vivos, tarde", "terraza en San Telmo, golden hour".

## Consistency tips
Always pass `character_id`; reuse the first result's `model` for the rest of a series; avoid extreme angles and covered faces; use the sheet for full-body shots; keep the signature outfit unless the scene needs another.

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
