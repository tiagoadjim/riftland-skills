---
name: riftland-cinema-film
description: "A real film made with AI: script, cast with designed voices, a storyboard checked for continuity, acted takes with lip sync, sound and a mastered cut, through Riftland Cine. Use when: \"un cortometraje con diálogos\", \"un tráiler de mi película\", \"un comercial con actores IA\", \"make a short film with dialogue\", \"a fashion film\". NOT for: a quick 4-shot short (use storyboard-film); a single shot (use cinematic-shot); a music video (use music-video); a talking presenter (use talking-avatar)."
version: 1.0.0
---

# Film with Riftland Cine

A whole film, shot like a production: script and shot list, a fixed cast with voices designed for them, a storyboard checked for continuity, acted takes with lip sync, foley and ambience, and a final cut with a score composed to the picture, narration, grade, film emulation, titles and subtitles. One project holds everything; every step reads it, so faces, wardrobe, set and light stay the same shot to shot.

## Ask only if missing
The story. Default the rest and state it in one line: the user's language, `aspect` 2.39:1 scope (9:16 for Reels or TikTok), 720p, 30–60 s in 6–10 shots, a look recipe that fits the genre. Ask once whether the people in their photos are real (see consent).

## 1. Project (free)
- `cinema_catalog` with `sections` such as ["recipes", "sound", "models"] gives the ids; `sound` says how this install makes voices: designed voices (each speaking character gets a voice written from its `voice_notes`) or library voices picked from `voices`; the cast in `cinema_project_get` shows it too (`voice_designed`, `voice_options`). Reuse people: `characters_list` (`character_id`) or an @element (`element_id`).
- `cinema_project_create` with `title`, `brief` (their idea, in their words), `language`, `aspect`, `look_recipe` (`prestige-drama`, `blockbuster`, `neo-noir`, `classic-noir`, `indie-16mm`, `seventies`, `dreamy-romance`, `horror`, `sci-fi`, `western`, `commercial`, `documentary`, `home-movie`) and the cast you already know. A saved character brings its photo, sheet, name and voice; otherwise `name` + `description` (face, age, hair, wardrobe) and optional photos in `images`, plus `voice_notes` for whoever speaks (step 5).
```json
{ "title": "La última estación", "language": "es", "aspect": "2.39:1", "look_recipe": "neo-noir",
  "brief": "Una mujer espera de noche un tren que nunca llega. Un desconocido le habla. Ella se va caminando por las vías.",
  "cast": [{ "id": "mara", "name": "Mara", "description": "mujer de 40, gabardina gris, pelo corto canoso" }] }
```
- Consent: `consent: true` only after the user confirms the people in the references are fictional or have given permission. Seedance needs it for photoreal people; without it, shots with people go to `kling-4`. Never real public figures.

## 2. Script and shot list
- You write the script — Riftland spends no LLM on it and it is free. `cinema_plan` (`project_id`, optional `brief`, `shots`, `seconds`) returns the director's craft rules with every allowed id and the project. Write the plan yourself as that JSON object (title, logline, look, music, cast with voice notes or voices, locations, props, scenes, shots), then call `cinema_plan` again with `plan` set to it to save it; unknown ids fall back to defaults and the result lists the saved shots.
- Write the sound into the script, because it is what the film will sound like: every line gets a `delivery` and every shot a `sound` (step 5). Lines short and speakable: about 2.5 words per second of shot.
- Show the logline and the shot list as a compact table: # · size and angle · move · seconds · model · action · dialogue. It is the cheapest moment to change anything: apply edits with `cinema_project_update` — `update_shots` (by `id`, only what changes), `add_shots` (with `after`), `delete_shots`, `shot_order`; `cast`, `locations` and `scenes` update by id.
- Craft: `size` (ews, ws, ms, mcu, cu, ecu, insert), `angle`, `move` from the camera library (`dolly-in`, `crane-up`, `orbit-360`, `handheld`, `whip-pan`…), `rig`, `transition` into the shot (`dissolve`, `fade_black`; `continuous` starts on the previous take's last frame), `end_on_next` for a matched move. Up to 3 lines per shot; voice-over lines use `cast: "narrator"`.

## 3. Cast and places
- Faces first: anyone without photos gets a neutral portrait with `cinema_frames` and `cast` (their ids); show it, redo with `fix` until it is right. Places: `locations` makes empty establishing plates, or pass photos in `images`.

## 4. Storyboard with continuity
- `quote` `cinema_frames` (default: every shot without a keyframe; `count: 2` on key shots), confirm, run it, `jobs_wait`.
- You are the script supervisor (free, no Riftland LLM). `cinema_project_get`: each shot has `frame`, `frame_candidates` and `references` (what the frame was drawn against, each with what it is). Look at the frame next to its references with `media_view` (up to 6 ids per call) and judge: same face, hair and wardrobe; same set, time of day and light direction as the previous shot; screen direction (180-degree rule); right shot size and angle; readable action; no AI artifacts in hands, faces or text. Save each verdict with `cinema_review` (`shot`, `score` 0–100, `issues`, `fix` = one sentence for the prompt) so the user sees it in the web storyboard too.
- Show the frames in order with any issue. Score under ~80, or anything the user dislikes: redo those shots with `cinema_frames` (`shots`, `fix` = your fix or the user's note), or pick another candidate with `update_shots` `frame_asset`.
- Animate only an approved storyboard: frames cost about 23 credits, takes 100–400.

## 5. Voices and sound
Users judge a film by its sound first. You write all of it (no Riftland LLM); Riftland records, designs and mixes it.
- Voices, when the install designs them: each speaking character (and the narrator) gets one voice for the whole film.
  1. Write `voice_notes` per character with `cinema_project_update` `cast` (by `id`) like a casting brief, in English (the designer reads it best) whatever the film's language: gender, age, accent, timbre, pace, attitude — "woman in her 40s, Rioplatense Spanish accent, low husky voice, slow, guarded, a little tired". The narrator: `audio` `narrator_notes` ("warm documentary voice, man in his 60s, calm, close to the mic"). Their own lines are the sample the design reads.
  2. `quote` `cinema_voices` (default: everyone who speaks and has no voice yet; or `targets`: cast ids and/or "narrator"), run it, `jobs_wait` (~30 s). Each design gives a few candidates.
  3. Listen: each candidate in `voice_options` (in `cinema_project_get`, also in the tool's result) is an audio file — `media_view` with its `audio` id shows a waveform and a player, or give the user the links. Let the user pick; if none fits, design again with a sharper `description`.
  4. `cinema_voices` `choose` { `target`, `option` } keeps one (free). Anyone still without a voice when their takes run gets the first candidate automatically (the takes quote includes it), so choosing first is better.
  With library voices there is no design: set each character's `voice` from `cinema_catalog` voices in the film's language, and `audio` `narrator`.
- Acting: every line has a `delivery`, a short direction of emotion and manner — "whispers, scared", "laughing, relieved", "cold, clipped", "shouting over the wind". It becomes the tag the voice acts the line with (first ~60 characters), and a shot's lines are recorded as one performance, so write them as a scene. Fix lines with `update_shots` `dialogue` (the whole list of that shot).
- Each shot's `sound`, like a sound designer: the space, its texture and the 2–3 sounds that sell the action — "empty concrete platform at night, rain drumming on a tin roof, buzzing neon, a distant train horn". Never music or speech there. It shapes the ambience bed under silent takes (`audio` `ambience`, on by default when voices are designed) and foley adds synced effects.
- Score (`audio` `music`): `style` and a `prompt` written like a brief to a composer (instruments, mood, where it swells or drops out). `mode` `picture` (the default when voices are designed) composes it to the assembled cut, following its cuts and arc, and reuses it free while the edit doesn't change; `prompt` composes from style and prompt with the scenes as timed cues. Their own track: `asset`. `new_score` drops the stored score to compose a new one. `cinema_project_get` `score` says whether the next cut composes, recomposes or reuses it.
- Dialogue (`audio` `dialogue`): `performance` (default, keep it) — Seedance acts each shot's lines on camera from the character's recorded voice (native lip sync, breath, the room's acoustics, the scene reacting), then the voice is split from the take and locked to the character's voice; `kling-4` shots are dubbed instead (recorded voice + lip sync, placed in the shot's room). Keep people's shots on `auto` (Seedance) so their lines are performed, not dubbed. `voice` dubs everything; `native` lets the model use a voice of its own.
- Levels (`audio` `levels`, dB): relative to film-mix targets (dialogue −20 LUFS, takes −26, music −24); defaults dialogue 0, takes −8, music −16. Raise `music` (−10) for a score-driven piece, `takes` (−4) for a thick atmosphere; the music dips under the lines. `loudness` web (−14) or broadcast (−23).

## 6. Takes
Video models (`model` per shot; `auto` routes): only these three.
| `model` | Best for | Length |
|---|---|---|
| `seedance-2.5` | people (identity from the cast references), acting and performed dialogue with native lip sync and sound, action included, every frame shape; cheap drafts | 4–15 s |
| `kling-4` | physics and stunts without people, long takes, 21:9 (no 4:3; silent: Riftland adds foley and dubs the lines) | 3–30 s |
| `wan-3-prime` | flat price per second, repeatable `seed` for matching takes, native audio | 5, 10, 15 s |

- `quote` `cinema_takes` and get a clear yes: this is the big spend. For uncertain acting shots on Seedance use `preview: true`: each draft comes back `awaiting_approval`; show it, then `job_action` `approve` (finishes at full resolution with the same motion) or `reject` (refunds all but the draft), only on the user's word.
- `jobs_wait` with every id (2–8 min). Review in `cinema_project_get`; redo a weak take with `cinema_takes` and `shots` (earlier takes stay: `update_shots` `take_asset` brings one back, `take_in` trims its start).

## 7. Cut
- Finish first, with `cinema_project_update`: `audio` (score, narrator and levels from step 5), `cut` (`title` card, `credits` `lines`, `subtitles` burned or file, `letterbox_16x9` for platforms that crop), `look` (`grade`, `grade_intensity`, `fx`: grain, halation, bloom, vignette, weave, flicker).
- `quote` `cinema_cut` (it includes the narrator's voice design if it has none), run it, `jobs_wait` (1–5 min).

## 8. Deliver
`cinema_project_get` → `film`: the film (`url`, `downloadUrl`), the poster, the SRT and the ZIP with the takes, audio stems and an EDL (CMX 3600) for Premiere, DaVinci Resolve or Final Cut; plus the project's `appUrl` to keep editing in Riftland. Offer: a new grade (re-cut only: the same edit keeps its score, so it is cheap), other music (`new_score` or their own track), a recast voice (design, choose, redo that character's takes), alternate takes of a shot, a trailer or a 9:16 teaser as a new project with the same cast.

## Cost (720p, approximate credits)
Script, continuity review, voice notes, deliveries and shot sound: free (you write them) · portrait 19 · keyframe 19 per candidate · voice design 14 per character or narrator (choosing is free) · takes per 5 s: `seedance-2.5` 156, `kling-4` 107, `wan-3-prime` 95, +50 for recorded dialogue with lip sync (the acted lines themselves about 1 per 100 characters), +1–3 for the ambience bed; a Seedance draft adds about 110 · cut about 0.4 per second plus the score (to picture about 10 per 30 s, 20 per minute; reused free on the same edit). An 8-shot, 40 s film with two speaking characters: about 1,250–1,650 credits; 1080p roughly doubles the takes.

## Gotchas
- Limits: 40 shots, 5 minutes, 8 cast, 3 lines of up to 300 characters per shot.
- Editing a shot doesn't redraw it: after changing its action or cast, redo its frame (and take); after changing its lines or a voice, redo its take.
- A `continuous` shot renders after the previous take; the first shot can't chain.
- Errors arrive in Spanish ("Faltan tomas en los planos 3, 5"): fix and retry.

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
