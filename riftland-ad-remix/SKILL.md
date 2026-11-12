---
name: riftland-ad-remix
description: "Variants of a video ad that already works: recreate it with the user's cast and product, or regenerate only its hook or its call to action, through Ad Multiplier. Use when: \"hacé variantes de este anuncio\", \"cambiá solo el hook\", \"un CTA nuevo para mi video\", \"remix this ad with my product\", \"3 hooks for the same ad\". NOT for: a new UGC ad from scratch (use ugc-video-ad); static ads (use static-ads-campaign); swapping a person in any other clip (use character-swap)."
version: 1.0.0
---

# Ad remix (Ad Multiplier)

Turn one video ad that works into variants: the same ad recreated with the user's cast and product, or only a new hook (first seconds) or a new CTA (last seconds). Engine: Riftland Ad Multiplier (`ad_multiplier`, Seedance 2.5).

## Ask only if missing
The reference video and what should change (cast and product, hook, CTA). If they want new hooks or CTAs but gave no lines, write three options in the ad's language and confirm.

## Inputs
- `video`: the reference ad, 4–30 s. A local file: upload it. A public file URL: pass it, or `media_import_url` once if you'll reuse it in several calls. Social post links aren't files: ask for the MP4.
- `images` (up to 20): the user's presenter or character and product photos. In `prompt`, refer to them in order as @Image1, @Image2…
- `resolution`: 480p for tests, 720p by default, 1080p for finals. `batch` 1–4: alternative takes of the same request.

## Modes
- `mode: "recreate"`: same structure, motion, timing and audio with a new cast or product. Prompt: "Replace the woman with @Image1 and the bottle with the product in @Image2. Keep the camera, timing, gestures and voice."
- `mode: "sections"` with `section`: `hook` (regenerates the first ~3 s), `cta` (the last ~4 s) or `both`. Put the new spoken lines in `hook_text` and `cta_text`; the middle stays untouched.
- Different hooks are separate calls, one `hook_text` each: quote one and multiply.

## Writing hooks and CTAs
- Hook: up to 3 s spoken, about 6–9 words. CTA: up to 4 s, about 8–10 words. Same language and register as the original.
- Hook patterns: surprise ("No puedo creer que esto cueste menos que un café"), question ("¿Por qué nadie habla de esto?"), hard fact (real data only), pain ("Si se te frizza el pelo con la humedad…"), social proof ("Se agotó tres veces este mes").
- CTA: one action and one reason ("Entrá al link y llevate el 2x1 hasta el domingo").

## Workflow
1. Get the video (and images) as files Riftland can read.
2. Choose the mode; write or confirm the lines.
3. Consent: ads almost always show people. Ask the user whether they have permission from the real people in the ad and in the photos; add `consent: true` only after they confirm (`consent: false` if nobody real appears), never on your own.
4. `quote` (`tool: "ad_multiplier"`). Cost scales with the clip length: a 15 s recreate is about 600 credits at 720p and 270 at 480p; sections cost less. Confirm the total for all versions.
5. Launch every version in parallel, then `jobs_wait` with all the ids (4–8 min).
6. Deliver a list: version, hook or CTA text, link. Suggest testing them as separate ad sets.

## Example
```json
{ "video": "<upload_id>", "mode": "sections", "section": "hook",
  "hook_text": "¿Por qué nadie habla de esto?", "resolution": "720p" }
```

## Gotchas
- Clips over 30 s are rejected: trim them first (with a shell: ffmpeg -t 30).
- Remix only ads the user owns or has rights to. For a competitor's ad, recreate the structure with the user's own cast, product and claims; never copy their logo or brand.
- Real faces in `images` must be the user or people who agreed.

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
