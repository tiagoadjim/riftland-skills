---
name: riftland-motion-graphics-promo
description: "A motion-graphics video built from the user's brand kit (titles, kinetic type, logo reveal, launch promo), rendered by Riftland Motion Studio, not AI footage. Use when: \"un video de lanzamiento con tipografía cinética\", \"animá mi logo\", \"un promo con mi marca y música\", \"motion graphics for my launch\", \"logo reveal\". NOT for: a narrated explainer (use explainer-video); motion code you write scene by scene (use motion-code); AI footage of a product (use product-link-video); an app walkthrough from screenshots (use app-promo-video)."
version: 1.0.0
---

# Motion graphics promo (Motion Studio)

A brand-built motion graphics video — product launch, feature announcement, kinetic typography, logo reveal, sale promo, social ad — directed by you (HyperFrames in a Riftland sandbox) from the brand kit and rendered to MP4. Not AI footage: exact text, the real logo, brand fonts and colors.

## Needs
A brand kit (`brand_id`): `brands_list`; none yet: `brand_create` with the website `url` (about a minute) or `manual` (see `brand-kit`). Products (`product_ids`, up to 6) and extra files (`assets`: logo variants, screenshots, photos) are optional.

## Pick a preset (`preset_id`; `presets_list` with `source: "motion"` shows them)
| `preset_id` | For | Default |
|---|---|---|
| `product-launch` | launching a product (needs one) | 16:9 · 20 s |
| `teaser` | coming soon, date reveal | 9:16 · 10 s |
| `social-ad` | Reels or TikTok ad with captions | 9:16 · 15 s |
| `promo-sale` | discount and deadline | 9:16 · 10 s |
| `ad-banner` | animated display ad | 1:1 · 6 s |
| `kinetic-type` | a phrase or manifesto in moving type | 9:16 · 12 s |
| `logo-reveal` | logo animation | 16:9 · 6 s |
| `brand-manifesto` | brand story with voiceover | 16:9 · 30 s |
| `product-showcase`, `product-hero` | several products, one hero product | 4:5 · 15 s, 4:5 · 8 s |
| `app-promo` | app or SaaS screens | 16:9 · 20 s |
| `stats`, `testimonial`, `event` | numbers, a review, an event countdown | 1:1 · 12 s, 4:5 · 10 s, 9:16 · 10 s |
| `motion-graphics`, `freeform` | abstract brand motion, anything else | 1:1 · 8 s, 9:16 · 15 s |

Defaults are suggestions: every preset takes 5–120 s and 16:9, 9:16, 1:1 or 4:5.

## Brief (`prompt`, up to 4000 characters)
Goal and audience · the message in one line · beats or scenes in order · exact on-screen copy in quotes (short lines) · the CTA · mood and references ("bold, fast, editorial"). Facts, prices and dates exactly as they must appear; the language goes in `language`.

## Call `motion_studio_generate`
```json
{ "brand_id": "<id>", "preset_id": "product-launch", "prompt": "<brief>", "duration_seconds": 20,
  "aspect_ratio": "16:9", "quality": "standard", "music": true, "voiceover": false, "captions": false,
  "product_ids": ["<id>"], "language": "es" }
```
- `quality`: draft (cheap test), standard (default), high (hero pieces, logo reveals).
- `voiceover` adds narration; `captions` burns in subtitles (use both for sound-off social).

## You are the director (default)
`motion_studio_generate` with the default `director: "you"` is free: it opens a sandbox themed with the brand kit and returns DIRECTOR.md — the request, the format, a suggested art direction, the audio plan and the steps. Then:
1. Read it, and `CRAFT.md` with `motion_sandbox_files`. Write `STORYBOARD.md` (scenes, seconds, exact copy, moves, transitions) and show the user a short version.
2. Narration: `motion_sandbox_voiceover` (one line per scene; free local voice) returns WAVs with durations and word timings for captions. Music: `generate_audio` (quote it), then `motion_sandbox_write` `assets`.
3. Build one sub-composition per scene with `motion_sandbox_write`; borrow moves from `motion_catalog`. Follow `motion-code` for the HyperFrames rules.
4. `motion_sandbox_check` with frames at each scene: look at them like a designer and fix until clean.
5. `quote` `motion_sandbox_render`, tell the user the credits, render, `jobs_wait`.
Only the render is charged (standard ≈ 8 + 1 credit per second: 20 s ≈ 29). `director: "riftland"` asks Riftland's own AI director instead (far pricier, and only where the server has one).

## Deliver
Give the MP4 link (`appUrl`) and the scene summary, and ask the user to proofread text and claims before publishing. Edits: change the sandbox and render again, or open the finished video in a new sandbox (`motion_sandbox_create` `from: "job_…"`).

## Next steps to offer
Other aspect ratios (same brief, new `aspect_ratio`), a 6 s cut (`ad-banner` or `teaser`), the high-quality version of an approved draft.

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
