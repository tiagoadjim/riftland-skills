---
name: riftland-relight-and-angles
description: "Change the lighting of a photo or clip, see an image from another camera angle, get a shot sheet from one image, restore skin or upscale with new detail. Use when: \"cambiá la luz de esta foto\", \"mostrame este plano desde otro ángulo\", \"hora dorada\", \"relight this photo\", \"creative upscale\". NOT for: removing objects or changing a background (use photo-retouch); a product angle set from a 3D model (use product-spin); a brand-new image (use create)."
version: 1.0.0
---

# Relight, camera angles and upscale

Fix or restyle the light of a photo, re-shoot it from new camera positions (or a 9-shot sheet), restore realistic skin and finish with a creative upscale, all from one image, with Riftland's image tools.

## Ask only if missing
The image (or a 3–10 s clip, for relight only) and what should change. Infer the rest from the request; never ask about every parameter.

## Relight (`relight`)
- Only the light changes: identity, pose, composition and background stay. Say so to the user when they worry about the face.
- Mood in one word: `ambience` (studio, golden_hour, blue_hour, neon, candlelight, overcast, moonlight, chiaroscuro, white_sweep for products on white).
- Direction: `direction` (front, left, right, top, back for rim light, under) or exact `azimuth` (0 from the camera, 90 frame right, 180 behind) and `elevation`.
- Color: `color` as hex or `temperature` in Kelvin (1800 candle, 3200 tungsten, 5600 daylight). `intensity` and `softness` go from 0 to 1 (low softness = hard light with crisp shadows).
- "Use the light of this other photo": upload it and pass it as `light_reference`.
- `model`: nano-banana-pro (default, best identity), gpt-image-2 or seedream-5-pro. A `video` uses Kling O1 video edit and is priced per second.

## New camera angles (`change_angle`)
- One view: `azimuth` orbits the camera (+ right, 180 behind), `elevation` from -30 (low angle) to 75 (top-down), `distance` (close_up, medium, wide…) and `lens` (24, 35, 50 or 85).
- A shot sheet: `shots` with up to 9 of wide_establishing, medium, close_up, extreme_close_up, low_angle, high_angle, over_the_shoulder, profile, top_down. One job, one image per shot, each charged at the model's price.
- `model`: nano-banana-pro (default), qwen-image-3 (cheaper) or seedream-5-pro.

## Skin and upscale
- Portraits that look plastic: `skin_enhance` (`mode` natural or strong) also upscales 2×.
- `creative_upscale` with `mode` creative (Clarity) invents fine detail: `factor` 2 or 4, `creativity` from 0.2 (subtle) to 0.8, `resemblance` to stay close to the original, and a short `prompt` describing the image. `mode` precision (CCSR, 2×) invents nothing: use it for text, logos and products. Videos: `upscale_media`.

## Workflow
1. Files: Riftland results by id (`ast_…` or `job_…`), public URLs as they are, otherwise `media_upload` and use the upload id.
2. `quote` each call (`tool` + the same `arguments`); tell the user the credits and confirm when the plan is over 100 credits.
3. Order: relight first, then angles from the relit image (pass the result's asset id), then skin, then upscale the picks. Upscaling last keeps every step cheap.
4. Shot sheets and videos take longer: call with `wait_seconds` 30 or less, then `jobs_wait` with the job id.
5. Show the results and offer the next step.

## Gotchas
- Big changes of angle (behind the subject, top-down) invent what the photo never showed; expect variation and offer a retry.
- Relight can't remove hard shadows baked into a very contrasty photo completely; softness near 1 with overcast or studio gets closest.
- Creative upscale above about 0.5 of creativity can change faces and text: lower it or use precision.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:editing-and-changes`: Editing and changing a result. File: `riftland-prompting/references/technique-editing-and-changes.md`

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
