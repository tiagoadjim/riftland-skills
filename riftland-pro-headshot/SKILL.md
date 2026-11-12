---
name: riftland-pro-headshot
description: "A professional headshot from a casual selfie, keeping the same face, with a new backdrop and outfit. Use when: \"una foto profesional para LinkedIn\", \"foto de perfil para mi CV\", \"retrato corporativo desde mi selfie\", \"make my selfie a LinkedIn headshot\", \"corporate portrait\". NOT for: a reusable character of the person (use my-character); a stylized person for content (use ai-influencer); general photo fixes (use photo-retouch)."
version: 1.0.0
---

# Professional headshot from a selfie

Turn a casual selfie into a polished profile photo (LinkedIn, CV, company site, speaker bio) with `edit_image` and `action` headshot. Identity is locked: same face, features, skin tone, hair and age; only the framing, background, light and (optionally) clothes change.

## Ask only if missing
The selfie, and where it will be used (it decides the format). Default the style to corporate and the outfit to keep.

## Choices
- `style`: corporate (gray studio, the safe default), office (blurred modern office), studio (deep-blue color backdrop), outdoor (park, soft daylight), creative (editorial, textured backdrop).
- `outfit`: keep (tidied up), suit, blazer, shirt, casual (smart casual).
- `aspect_ratio`: 1:1 for profile pictures (default), 3:4 for CVs and team pages.
- `prompt` for one extra wish ("slight smile", "glasses off", "navy blazer").

## What makes a good input
A sharp, front-facing photo in soft light, eyes visible, no sunglasses or heavy filters, one person. Group photos: crop to the person first. Low-resolution or very dark selfies give weaker results; ask for a better one before spending.

## Workflow
1. Files: Riftland results by id (`ast_…` or `job_…`), public file URLs as they are; otherwise `media_upload` and use the `upload_id`.
2. `quote`, then `edit_image` (about 19 credits per take; about 30–45 s, so `wait_seconds` 45 or `jobs_wait`).
3. Offer two or three variations in one go (for example corporate + office, or two outfits) and let the user pick.
4. Deliver the links and suggest a matching banner (`create`, with the user's `max_credits`) or a background removal (`remove_background`) for a transparent version.

## Gotchas
- The face is preserved but expressions can soften: if the user doesn't recognize themselves, retry with outfit keep and the same style.
- Strong hats, masks or hands over the face confuse the identity lock.
- Never invent credentials or text on the image.

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
