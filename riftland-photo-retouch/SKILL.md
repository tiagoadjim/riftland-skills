---
name: riftland-photo-retouch
description: "Fix a photo without design skills: erase objects or people, expand a photo to another format, put a subject on a new background or restore an old photo. Use when: \"borrá este objeto de la foto\", \"pasala a 9:16 para historias\", \"cambiá el fondo\", \"restaurá esta foto vieja\", \"remove the person behind me\". NOT for: a professional headshot from a selfie (use pro-headshot); a product shoot (use product-photoshoot); erasing something in a video (use video-cleanup); changing the light (use relight-and-angles)."
version: 1.0.0
---

# Photo retouch

Fix a photo without any design work: erase what doesn't belong, extend it to the format each platform needs, put the subject on a new background or bring an old print back to life. One `edit_image` call per change; every result is a new image the next call can take.

## Ask only if missing
The photo and what should change. Default the rest and say it in one line ("lo paso a 9:16, centrado").

## Erase (`edit_image` with `action` erase)
- Prefer `remove` in words ("the man in the red jacket behind the table", "the cable on the left wall"): precise about which one and where. It runs an instruction edit (about 19 credits).
- A `mask` (black and white, the size of the photo, white = erase) is cheaper (about 5 credits per megapixel) and exact; use it only when the user gives one. In the web app (/tools?tool=erase) people paint it with a brush.
- Several things to remove: one call per object, each on the previous result.

## Expand (`action` expand)
- `aspect_ratio` is the final format: 9:16 for stories and Reels, 4:5 for the feed, 1:1, 16:9 for YouTube and the web, 21:9 for banners. Only the short side grows; the photo itself is not cropped or changed.
- `zoom` (from 1.1 to 3) pulls the camera back on both axes; it combines with `aspect_ratio`.
- `position` keeps the original against an edge (top, bottom, left, right) instead of centered: useful to leave room for text.
- `quality` high (default) or fast (several times cheaper, fine for landscapes, walls and products). The price grows with the final megapixels (up to 4).
- One photo for every channel: one call per format, all from the original.

## New background (`action` replace_background)
- `preset`: white (e-commerce), marble, wood, kitchen, beach, office, outdoor, city, pastel, luxury, holiday. Add `prompt` to refine it ("with a plant and morning light"), or use `prompt` alone.
- Or a `reference_image` (a photo of the place), never together with `preset` or `prompt`.
- The subject stays pixel-faithful; only what's behind changes. About 6 credits.

## Old photos (`action` restore)
Repairs scratches, tears, stains, fading and noise; faces stay faithful. `colorize` true for black-and-white or sepia prints. A flat, well-lit phone photo of the print works; crop the frame out first if you can.

## Workflow
1. Files: Riftland results by id (`ast_…` or `job_…`), public file URLs as they are; otherwise `media_upload` and use the `upload_id`.
2. `quote` each call with the same arguments and tell the user the credits.
3. Chain edits in a sensible order: erase, then background, then expand (expanding last keeps the new areas consistent).
4. Most edits finish within the call; expand in high quality can take 1–2 minutes: use `wait_seconds` 30, then `jobs_wait`.
5. Show before and after when you can and offer the next step (another format, a cut-out with `remove_background`, an upscale with `upscale_media`).

## Gotchas
- Erasing something large invents what was behind it; expect a plausible fill, not the real scene.
- Expanding a tight portrait to 16:9 invents a lot of room: zoom out a little less or keep the subject centered.
- Restore won't recover faces that are completely missing from the print.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:editing-and-changes`: Editing and changing a result. File: `riftland-prompting/references/technique-editing-and-changes.md`
- `workflow:change-chain-and-upscale`: Change chain, then upscale. File: `riftland-workflows/references/workflow-change-chain-and-upscale.md`

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
