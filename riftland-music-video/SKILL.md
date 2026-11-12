---
name: riftland-music-video
description: "A music video for the user's song or beat: performance and story shots with a consistent artist, cut to the track, through Riftland Cine. Use when: \"un videoclip para mi canción\", \"un clip de mi tema\", \"un video para mi beat\", \"make a music video for my song\", \"lyric and performance shots\". NOT for: a film with dialogue (use cinema-film); a short with no music track (use storyboard-film); only a score (use voiceover-and-music)."
version: 1.0.0
---

# Music video

A videoclip cut to the user's song with Riftland Cine: the track is the score, performance shots of the artist alternate with story shots, the look is bold and every shot keeps the same artist and wardrobe.

## Ask only if missing
The song (a file or a public link), which part of it (the film starts with the track's first second and lasts as long as the shots), the artist (photos or a saved character) and the idea. Default: 9:16 for Reels and TikTok (16:9 for YouTube), 20–60 s, shots of 2–4 s.

## 1. Song and project (free)
- The song: a public URL as is, or `media_upload` and its `upload_id`.
- `cinema_project_create`: `look_recipe: "music-video"` (or `neo-noir`, `seventies`, `dreamy-romance`, `home-movie` to match the genre), `aspect`, `brief` with the song's mood, lyrics themes and the story, the artist in `cast` (`character_id` from `characters_list`, or photos in `images`), and the mix:
```json
{ "title": "Neón", "aspect": "9:16", "language": "es", "look_recipe": "music-video",
  "brief": "Videoclip de un tema pop melancólico: ella canta en una terraza con neones; una pareja se pierde en la ciudad de noche.",
  "cast": [{ "id": "luna", "name": "Luna", "images": ["<photo>"] }],
  "audio": { "music": { "enabled": true, "asset": "<song>" }, "take_sound": false, "foley": false, "ambience": false, "levels": { "music": 0 } },
  "cut": { "subtitles": "off", "fade_in": false } }
```
- `consent: true` only if the user confirms the artist agreed (needed for Seedance with real people).

## 2. Shot list on the beat
- `cinema_plan` with `seconds` = the part of the song and `shots` = seconds ÷ 3 gives you the director's rules; write the plan yourself and save it with `cinema_plan` `plan` (free, no Riftland LLM).
- Shape it with `cinema_project_update` `update_shots`: alternate performance (`size` mcu or cu, `move` `dolly-in`, `orbit-360`, `handheld`) and story (`ws`, `crane-up`, `fpv-drone`); `transition` cut or `whip` on the beat; no `dialogue` (the song is the only voice).
- Singing to camera won't match the lyrics: frame performance as mood (eyes, hands, the mic, wide shots) rather than visible singing.

## 3. Sound
- The song is the score: `audio` `music` `asset` = the track, never composed (no `mode` needed, nothing to recompose on a re-edit). Keep `levels` `music` 0 so it plays at full level.
- A clip without spoken parts: `take_sound` false and `foley` false (as in the JSON above), and `ambience` false (a bed nobody hears is still charged), so only the song plays.
- Texture under the song (a city at night, waves): `take_sound` true and `ambience` true, write each shot's `sound` like a sound designer (the space and 2–3 key sounds: "rooftop at night, distant traffic, wind in the cables"), and set `levels` `takes` around −14 so it sits under the music.
- A spoken intro or outro (a line before the song kicks in): write it in that shot's `dialogue` with a `delivery` ("soft, half-smiling"); when the install designs voices, write the artist's `voice_notes` (gender, age, accent, timbre, pace, attitude), `quote` and run `cinema_voices`, listen to the candidates (`media_view` or the links) and keep one with `choose`; otherwise pick a `voice` from `cinema_catalog` voices.

## 4. Storyboard and takes
- `quote` and run `cinema_frames` (2 candidates on the hero shots), `jobs_wait`, show the storyboard from `cinema_project_get`, redo weak frames with `fix`.
- `quote` `cinema_takes` and get a yes; `kling-4` for energy and camera moves, `seedance-2.5` for close performance. `jobs_wait` (2–8 min).

## 5. Cut and deliver
`quote` and run `cinema_cut`, `jobs_wait`; deliver the film (`url`, `downloadUrl`), the poster, the ZIP (takes, stems, EDL) and the `appUrl`. Offer a 16:9 version as a new project with the same artist, or a teaser of the best 15 s.

## Cost (approximate)
A 30 s, 10-shot clip at 720p: frames about 230, takes about 1,000–1,500 (`kling-4` 107 and `seedance-2.5` 156 per 5 s; an ambience bed adds 1–3 per take), cut under 20 (the song is used as is, never composed). A spoken intro: voice design 14, the line about 1 per 100 characters, plus lip sync on that take (about 50 per 5 s).

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:camera-moves`: Camera movement vocabulary. File: `riftland-prompting/references/technique-camera-moves.md`
- `technique:multi-shot-and-timing`: Multi-shot clips and timing. File: `riftland-prompting/references/technique-multi-shot-and-timing.md`
- `workflow:storyboard-to-film`: Storyboard to film with Riftland Cine. File: `riftland-workflows/references/workflow-storyboard-to-film.md`
- `workflow:long-video-by-chaining`: A longer video from several clips. File: `riftland-workflows/references/workflow-long-video-by-chaining.md`

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
