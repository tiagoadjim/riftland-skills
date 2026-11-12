---
name: riftland-app-promo-video
description: "A promo, launch or walkthrough video of an app, SaaS or website from screenshots, through Marketing Studio's app-video tool or Motion Studio. Use when: \"un video de mi app\", \"video de lanzamiento de mi SaaS con capturas\", \"promo video for my website\", \"app walkthrough video\". NOT for: a product on a store page (use product-link-video); motion graphics designed from the brand kit (use motion-graphics-promo); scroll videos coded into a site (use scroll-video)."
version: 1.0.0
---

# App or SaaS promo video

A launch, promo or walkthrough video for an app, SaaS or website, made from screenshots. Two engines:

| | Marketing Studio, `tool: "app-video"` | Motion Studio, `preset_id: "app-promo"` |
|---|---|---|
| Look | AI footage: phones and laptops in real scenes, optionally a person using the app | Motion graphics: the real screens animated, kinetic type, brand fonts |
| Screen fidelity | Approximate (small text can warp) | Exact screens, crisp text |
| Length | 5–15 s (default 10) | 10–45 s suggested (5–120 possible) |
| Needs | screenshots or `brand_url` | a brand kit (`brand_id`) |
| Cost (approx.) | 10 s ≈ 215 credits at 720p | 20 s ≈ 420 credits (standard) |
| Time | 3–6 min | 5–25 min |

Default: Motion Studio for dashboards, SaaS and anything with readable UI or many features; Marketing Studio for consumer apps where a person and a device in context sell the idea.

## Ask only if missing
Screenshots (2–6, in story order) or the app's URL, and the platform: vertical for TikTok, Reels and stories; 16:9 for the web, YouTube and launches.

## Story first (3–5 beats)
Hook (the problem or the promise), then the key screens (onboarding, core feature, result), then the CTA (download, try it free). One screenshot per beat; exact on-screen text in quotes.

## Files
Upload each screenshot (one `media_upload` per file) or pass public URLs. Full-resolution PNGs from the same device, without personal data.

## Route A: Marketing Studio (`marketing_studio_generate`)
```json
{ "media": "video", "tool": "app-video", "screenshots": ["<id1>", "<id2>", "<id3>"], "device": "mobile",
  "brand_url": "https://miapp.com", "aspect_ratio": "9:16", "duration": 15, "resolution": "720p", "language": "es",
  "prompt": "Una persona en el subte abre la app, ve el resumen de gastos y sonríe. Cierre: “Probala gratis”." }
```
`device`: mobile or desktop. Optional `avatar_id`: a saved character using the app.
Riftland runs no LLM over MCP, so write the final prompt yourself: the same call with `dry_run: true` (free) returns `draft`, `references` (which `@Image` tag is each screenshot, the logo, the person) and `required_tags`; rewrite it as `script` (English, 120–220 words, beats with timing, the screens in story order by their tags, exact on-screen text in quotes in the target language) keeping every tag, and send it with the same arguments.

## Route B: Motion Studio (`motion_studio_generate`)
1. Brand: `brands_list` for the `brand_id`; none yet: `brand_create` with the app's `url` (see `brand-kit`).
2. Call:
```json
{ "brand_id": "<id>", "preset_id": "app-promo", "prompt": "<beats with the exact copy>", "duration_seconds": 20,
  "aspect_ratio": "16:9", "quality": "standard", "music": true, "assets": ["<screenshot ids>"], "language": "es" }
```
   Add `voiceover: true` and `captions: true` for a narrated walkthrough.

## Then
`quote`, confirm, create, then `jobs_wait` repeatedly (Motion renders take a while). Deliver the MP4 link and the beat list. Offer a 9:16 version of a 16:9 video, a 6–10 s teaser (`preset_id: "teaser"`), or static ads (`static-ads-campaign`).

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
