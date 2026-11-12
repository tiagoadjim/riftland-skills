---
name: riftland-storyboard-film
description: "A quick short film of 4 to 6 shots in one pass: script, storyboard with a consistent character, takes and the cut with music, through Riftland Cine. Use when: \"un corto rápido\", \"un tráiler de 4 planos\", \"un microdrama con la misma protagonista\", \"quick short film\", \"storyboard and film in one go\". NOT for: one shot (use cinematic-shot); a film with dialogue, designed voices and a mastered cut (use cinema-film); a music video (use music-video)."
version: 1.0.0
---

# Fast short film

A quick multi-shot short (story, micro-drama, trailer) with a consistent character and look, in one pass through Riftland Cine: project, script, storyboard, takes and the final cut with music. Two check-ins only: the shot list and the total price. For full control (casting, voices, continuity fixes, drafts) load `cinema-film`.

## Ask only if missing
The idea. Default: 4–6 shots of 4–5 s, 16:9, one protagonist, music on, the user's language, a look recipe from the tone.

## 1. Project (free)
`characters_list`: reuse a saved protagonist with `character_id`. Then `cinema_project_create`:
```json
{ "title": "Invernadero", "aspect": "16:9", "language": "es", "look_recipe": "sci-fi",
  "brief": "Una astronauta encuentra un invernadero abandonado en Marte. Tono melancólico.",
  "cast": [{ "id": "ada", "name": "Ada", "description": "astronauta de 35, traje blanco gastado, pelo corto oscuro" }] }
```
`consent: true` only if the user confirms the person is fictional or consented (Seedance with people needs it; otherwise those shots go to `kling-4`).

## 2. Script
`cinema_plan` (`project_id`, `shots` 4–6, `seconds`) returns the director's rules: write the plan yourself (free, no Riftland LLM) and save it with `cinema_plan` `plan`. Give every line a `delivery` (short acting direction: "whispers, scared") and every shot a `sound` (the space and 2–3 key sounds), and each speaking character `voice_notes` (gender, age, accent, timbre, pace, attitude): they are what the film will sound like. Show the logline and the shots in one short table and ask for a yes or quick changes (apply them with `cinema_project_update` `update_shots`).

## 3. One price, then produce
- Quote everything at once: `quote` `cinema_frames` and `quote` `cinema_takes` with `shots` = every shot id (it includes designing a voice for each speaking character, kept automatically), plus about 40 for the cut. Tell the user the total and get a yes. To audition voices first, load `cinema-film` (`cinema_voices`).
- `cinema_frames` → `jobs_wait` → glance at the storyboard in `cinema_project_get` (redo only shots that clearly broke continuity, with `fix` from their `review`).
- `cinema_takes` → `jobs_wait` (2–8 min, repeat while running).
- `cinema_cut` → `jobs_wait` → `cinema_project_get` for the film.

## 4. Deliver
The film (`url`, `downloadUrl`), the poster, the ZIP (takes, stems, EDL) and the project `appUrl` to keep editing. Offer: subtitles or a title card (`cut`), other music (`audio`), redoing one shot, or a longer version with `cinema-film`.

## Cost (720p, approximate)
4 shots of 5 s: script free (you write it) + keyframes 4 × 23 + takes 4 × 95–156 (+50 for a take with dialogue and lip sync) + a voice design 14 per speaking character + cut about 35 ≈ 510–780 credits; 6 shots ≈ 760–1,150.

## Gotchas
- Faces stay consistent when the protagonist has references: a saved character, photos, or a portrait first (`cinema_frames` with `cast`).
- Crowds and fast hand action lower consistency; keep 1–2 characters per shot.
- Never real people without their consent.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:video-prompting`: Prompting a video. File: `riftland-prompting/references/technique-video-prompting.md`
- `technique:camera-moves`: Camera movement vocabulary. File: `riftland-prompting/references/technique-camera-moves.md`
- `technique:multi-shot-and-timing`: Multi-shot clips and timing. File: `riftland-prompting/references/technique-multi-shot-and-timing.md`
- `technique:dialogue-sound-music`: Dialogue, sound and music. File: `riftland-prompting/references/technique-dialogue-sound-music.md`
- `workflow:storyboard-to-film`: Storyboard to film with Riftland Cine. File: `riftland-workflows/references/workflow-storyboard-to-film.md`
- `workflow:character-series`: A character, then a consistent series. File: `riftland-workflows/references/workflow-character-series.md`

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
