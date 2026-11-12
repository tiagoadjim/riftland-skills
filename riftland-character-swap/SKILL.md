---
name: riftland-character-swap
description: "Replace a person, object or outfit in an existing clip with the user's character, copy a clip's motion onto a character, or restyle a clip, through Riftland Studio with an approval step before the paid render. Use when: \"poné a mi personaje en este clip\", \"que haga el mismo baile\", \"cambiá la ropa del video\", \"swap the person in this video\", \"restyle my clip\". NOT for: a new video from scratch (use create); removing a background or an object (use video-cleanup); a character that does not exist yet (use my-character)."
version: 1.0.0
---

# Character swap and clip edits (Studio)

Edit an existing clip with Riftland Studio (`studio_video`): the user's character replaces a person, the character copies the clip's movement, an object or outfit is swapped, or the whole clip is restyled.

## Pick the mode
| Want | `mode` | Inputs |
|---|---|---|
| Their character replaces the person, same scene | `swap` | `video` + `character_id` or `image` |
| Their character performs the clip's dance or acting, in the scene of their photo | `motion` | `video` + `character_id` or `image` |
| Replace a product, outfit, object or location | `object` | `video` + `image` (the new thing) + `target` (what to replace, e.g. "las zapatillas rojas") |
| Redraw the clip in a look | `style` | `video` + `style` or `prompt` |

Styles: `anime`, `claymation`, `toy-cgi`, `knitted`, `lego`, `noir`, `pixel`, `watercolor`, `cyberpunk`, `marble`.

## Engines (`engine`)
- swap: `swap-genjutsu` (Riftland Jaam, the default: the most faithful, keeps every gesture, gaze and mouth movement; requires `consent: true`), `swap-wild` (Jaam Wild: looser and more expressive, cheaper), `swap-lite` (Jaam Lite: the cheapest, for testing ideas and full-body shots).
- motion: `motion-genjutsu` (Jaam, the default), `motion-wild`, `motion-lite` (the cheapest, full-body dances).
- object: `object-genjutsu` (default; 480p or 720p, up to 15 s), `object-kling` (1080p, up to 10 s, keeps the original audio).
- style: `style-genjutsu`.
`models_explore` with `kind: "studio"` lists the current engines and limits.

## Inputs that work
- Clip: 2–15 s, one main person, steady framing, the subject fully visible. Trim longer clips first (with a shell: ffmpeg). Sources: an upload, a public file URL, or a trending clip from `presets_list` with `source: "studio"` (run it with `preset_run`).
- Character photo: full body visible for swap and motion, similar framing and angle to the person in the clip, neutral expression, plain background.
- `keep_audio` (on by default) keeps the original soundtrack. `resolution`: 480p to test, 720p by default, 1080p for the final.

## Workflow
1. Choose the mode and engine; get the clip and the character (`characters_list`).
2. Consent: before any swap, ask the user to confirm they have permission from the real people in the clip and in the photo. Send `consent: true` (required by `swap-genjutsu`, and by every engine when the character photo is one the user brought) only after they confirm; never on your own.
3. `quote`: cost scales with the clip seconds and the resolution (a 10 s clip with Jaam is about 235 credits at 480p and 440 at 720p; `motion-lite` about 190 at 720p). Confirm.
4. `studio_video`, then `jobs_wait`.
5. Approval gate: the Jaam and Wild engines first prepare a silhouette plate of the subject and stop at `awaiting_approval` with `review: "plate"`. Show the `preview` and ask whether the right person is covered for the whole clip. `job_action` `approve` runs the paid render; `reject` refunds `refundOnReject` (most of the price). Jaam swap at 1080p also stops at a 480p draft (`review: "draft"`) before the final.
6. Keep calling `jobs_wait` after approving (3–10 min). Deliver the link; offer another engine, a higher resolution or another clip.

## Example
```json
{ "mode": "motion", "engine": "motion-genjutsu", "video": "<upload_id>", "character_id": "<id>",
  "resolution": "720p", "keep_audio": true }
```

## Gotchas
- Several people or heavy occlusion confuse the subject selection: pick clips with one clear subject.
- Real people only with consent; no public figures, no sexual or deceptive content.

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
