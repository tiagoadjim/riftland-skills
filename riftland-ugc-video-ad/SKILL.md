---
name: riftland-ugc-video-ad
description: "A vertical creator-style video ad in which an AI creator presents the user's product, with native audio, through Marketing Studio. Use when: \"anuncio UGC\", \"un video de un creador mostrando mi producto\", \"reseña en video para TikTok\", \"UGC ad for my product\", \"talking-head ad\". NOT for: static ad images (use static-ads-campaign); new hooks or CTAs on a video ad that exists (use ad-remix); a video made only from a product link (use product-link-video); a presenter reading a script with no product (use talking-avatar)."
version: 1.0.0
---

# UGC video ad

A vertical creator-style video ad (TikTok, Reels, Shorts) where an AI creator talks about or shows the user's product, with native audio. Engine: Riftland Marketing Studio (`marketing_studio_generate`).

## Ask only if missing
- The product: a link, a photo or a saved product. Without a product, a prompt-only ad still works with `tiktok` or `ugc-classic`.
- Anything they insist on: language, length, a specific creator, a claim or an offer.

## Defaults
- Format `ugc-talking` (creator talks to camera, 15–30 s) for reviews, testimonials and tutorials. Short punchy ideas: `tiktok` (4–15 s, TikTok-native modes) or `ugc-classic` (4–15 s viral formats).
- `aspect_ratio: "9:16"`, `duration: 15`, `resolution: "720p"` (480p for cheap tests, 1080p for the final cut), audio on, `batch: 1` (2–4 to A/B test).
- `language`: ISO code of the audience language (es, en, pt…). It defaults to Spanish, so always pass it.

## Workflow
1. Product: `brands_list` and `brand_get` to find a saved one (`product_id`). A link: `products_add` with `url` (keeps name, images and cutout for reuse) or pass `product_url` directly. A photo: upload it, then `products_add` with `manual` (`name`, `images`).
2. Presenter: `characters_list`. Use the user's character as `avatar_id` for a recurring face; otherwise describe the creator in the prompt (age, look, energy) and Riftland casts one. For a new recurring creator, run `ai-influencer` first.
3. Ids: `marketing_studio_catalog` with `category: "ugc"` (or `"tiktok"`) and `include: ["formats", "templates", "hooks", "settings"]`. These formats need a `style_id` or a `template_id`:
   - `ugc-talking`: `review`, `unboxing`, `tutorial`, `before-after`, `try-on`, `delivery`, `at-home`, `shopping`.
   - `tiktok`: `secret-hack`, `pov`, `selfie-testimonial`, `direct`, `gadget-saved-me`, `mess-fresh`, `classic-modern`, `couple`.
   - `ugc-classic`: `unboxing-asmr`, `mystery-box`, `crush-test`, `tv-spot`, `giant-figure`, `addiction`, `sneaker-tryon`, `pro-tryon`, `ugc-tryon`, `unboxing-tryon`, `reboxing`, `wild-card`.
   - A template such as `ugc-talking--primera-impresion` presets style, aspect ratio, duration and sometimes hook and setting.
4. Creative plan (show it in 3–4 lines before quoting):
   - Hook, first 2 s (`hook_id`). Stunts: `product-hit`, `random-mic`, `indoor-storm`, `dodge`. Subtle: `close-detail`, `street-interview`, `dropped`, `camera-bump`, `epic-fail`. Subtle for premium brands, stunts for impulse buys.
   - Setting (`setting_id`). Real: `bedroom`, `bathroom`, `kitchen`, `gym`, `car`, `street`, `office`, `nature`. Surreal: `plane-wing`, `skyscraper`, `volcano`, `tiny`, `car-roof`, `train`. Match where the product is used.
   - Idea in `prompt`: who the creator is, the angle (problem, product, proof, call to action) and 2–4 spoken lines in the target language, in quotes. About 2.5 words per second: 15 s is roughly 35 words. One benefit, one proof, one call to action.
5. Write the final prompt yourself (Riftland runs no LLM over MCP): the same call with `dry_run: true` (free, creates nothing) returns `draft`, `references` (what each `@Image1`, `@Image2`… is: the creator, the product, other angles) and `required_tags`. Rewrite the draft into `script`: one English prompt of 120–220 words with the shots in order and their timing (the hook in the first 2 s), camera, action, lighting, sound and the spoken lines in the target language, in quotes. Keep every tag of `required_tags` exactly as written and use each for what it is; add no brands, logos or claims beyond the draft and the user's facts. If it returns `product_id`, use it instead of `product_url` from now on.
6. Optional look check: the same call with `script` and `preview: true` renders one style frame (about 19 credits) before paying for the video.
7. Consent: with an `avatar_id`, `images` or a reference video, ask the user whether those show real people and whether they have their permission. Add `consent: true` only after they confirm (`consent: false` if nobody real appears); never on your own. Real faces need that permission: with `consent: true` the video renders on an engine that accepts real people, and without it a job with a real face fails and is refunded.
8. `quote` (`tool: "marketing_studio_generate"` and the same arguments), share the cost, then `marketing_studio_generate` with `script`. Read `notes`: a script missing a tag is replaced by the draft.
9. `jobs_wait` until done (3–6 min; one job per batch item).

## Example
```json
{ "media": "video", "format_id": "ugc-talking", "style_id": "review", "product_id": "<id>",
  "hook_id": "close-detail", "setting_id": "bathroom", "aspect_ratio": "9:16", "duration": 15,
  "resolution": "720p", "language": "es",
  "prompt": "Creadora de 28 años, tono cómplice. Abre con: “Tenía manchas que no se iban con nada…”. Muestra la textura del sérum, se lo aplica y cierra con: “Link en mi perfil, después me contás.”",
  "script": "15-second vertical UGC video, handheld phone look, bathroom mirror light. 0–2 s: extreme close-up of the serum bottle from @Image1, label sharp, a woman in her late 20s lifts it to camera and says “Tenía manchas que no se iban con nada…”. 2–9 s: medium shot, she drops the serum on her fingertips, the texture glistens, she pats it on her cheek… 9–15 s: she smiles to camera holding @Image1: “Link en mi perfil, después me contás.” Native audio: her natural voice and room tone, no music." }
```
(The `script` is shortened here; write 120–220 words. Its tags come from `dry_run`.)

## Cost (approximate; always quote)
15 s: about 140 credits at 480p, 320 at 720p, 760 at 1080p. Over 15 s the engine switches to Seedance 2.5, about twice the price per second. A batch multiplies.

## Gotchas
- Video formats have no 4:5, and an unsupported ratio silently falls back to the default (9:16). Use 9:16, 1:1, 3:4, 4:3, 16:9 or 21:9.
- Durations clamp to the format: `ugc-talking` 15–30 s, `tiktok` and `ugc-classic` 4–15 s.
- UGC formats ignore `brand_id`: write the brand name, offer and tone into the prompt.
- `ugc-faceless` and `ugc-silent` are coming soon, not available yet.
- Product fidelity depends on the photo: sharp, facing the camera, label readable.
- No invented claims (medical results, guarantees): keep it the way a real creator would say it.

## Next steps to offer
Two or three hook variants for A/B (new jobs with another `hook_id`), the winner at 1080p, a 1:1 or 16:9 version, static ads for the same product (`static-ads-campaign`), or new hooks on the finished video (`ad-remix`).

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:dialogue-sound-music`: Dialogue, sound and music. File: `riftland-prompting/references/technique-dialogue-sound-music.md`

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
