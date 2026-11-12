---
name: riftland-cinematic-shot
description: "One cinematic video shot with a real camera package and look: keyframe first, then the take and an optional graded finish, through Riftland Cine. Use when: \"un plano cinematográfico\", \"b-roll con un dolly\", \"una escena de película con lente anamórfico\", \"cinematic shot with a crane move\", \"film look\". NOT for: a quick video from a plain request without camera control (use create); a multi-shot story (use storyboard-film); a full film with dialogue (use cinema-film); a music video (use music-video)."
version: 1.0.0
---

# Cinematic shot

One film-grade shot made like on set: a real camera package (body, lens, focal length, stop, shutter), lighting, film stock and grade chosen by id, the keyframe first, then the take, then an optional graded finish. It runs as a one-shot Riftland Cine project, so the look is exact and the shot can grow into a film later.

## Ask only if missing
The scene (subject, place, moment). Default the rest: 16:9 (2.39:1 when they say "cinematic" or "widescreen"), 5 s (8 s for slow reveals), 720p, a look recipe that fits the mood.

## 1. The shot (free)
`cinema_project_create` with one shot in `shots`, the `aspect`, a `look_recipe` and any `look` overrides. `cinema_catalog` lists every id; the usual ones:
- Camera: `alexa-35` (natural skin), `alexa-65` (epic large format), `venice-2` (night), `red-raptor` (crisp action), `film-35`, `film-16`, `super-8`, `iphone`, `vhs`.
- Lens: `cooke-s4` (warm), `master-prime` (clinical), `panavision-anamorphic` (oval bokeh, blue flares), `atlas-anamorphic`, `k35` (70s), `helios` (swirly bokeh); `focal` 14–200 mm; `aperture` t1.3 (razor-thin focus) to t11 (deep focus).
- Light: `golden-hour`, `blue-hour`, `rembrandt`, `chiaroscuro`, `low-key`, `neon-noir`, `volumetric`, `moonlight`, `firelight`, `silhouette`.
- Stock and grade: `vision3-500t`, `portra`, `kodachrome`, `double-x` (black and white); `filmic`, `teal-orange`, `bleach-bypass`, `warm-nostalgia`, `cold-thriller`.
- Recipes (`look_recipe`): `blockbuster`, `prestige-drama`, `neo-noir`, `classic-noir`, `indie-16mm`, `dreamy-romance`, `sci-fi`, `western`, `commercial`.

Camera move (`move`) from their words: push and pull `dolly-in`, `dolly-out`, `super-dolly`, `crash-zoom-in`, `dolly-zoom` (vertigo), `focus-change` (rack focus); orbit `orbit-360`, `arc-left`, `arc-right`, `bullet-time`, `lazy-susan`; pan and tilt `pan-left`, `whip-pan`, `tilt-up`, `truck-left`; crane and aerial `crane-up`, `crane-down`, `overhead`, `fpv-drone`, `aerial-pullback`, `low-angle-hero`; handheld `handheld`, `snorricam`, `car-chase`, `follow`; effects `through-object`, `robo-arm`, `dutch-angle`, `hyperlapse`, `static`.
```json
{ "title": "Faro", "aspect": "16:9", "look_recipe": "blockbuster", "look": { "lens": "panavision-anamorphic", "focal": 35, "lighting": "golden-hour" },
  "shots": [{ "id": "s1", "action": "Un faro en una tormenta al atardecer; el haz barre la lluvia y las olas golpean las rocas",
    "size": "ews", "angle": "low", "move": "crane-up", "rig": "crane", "duration": 8, "sound": "viento racheado, olas rompiendo contra las rocas, el zumbido del faro" }],
  "audio": { "music": { "enabled": false } }, "cut": { "subtitles": "off" } }
```
People in the shot: add them to `cast` (a saved `character_id`, photos in `images`, or a `description`) and list their id in the shot's `cast`. `consent: true` only if the user confirms they are fictional or consented.

## 2. Keyframe
`quote` `cinema_frames` with `count` 2–4, run it (`project_id`), `jobs_wait`. `cinema_project_get` shows `frame_candidates`: the user picks one (`cinema_project_update` `update_shots` with `frame_asset`), or redo with `fix` ("lower horizon, more rain").

## 3. Take
The shot's `model` (or `auto`): `seedance-2.5` for people and acting (4–15 s, `preview: true` gives a cheap draft to approve), `kling-4` for motion, physics and long takes (up to 30 s, 21:9), `wan-3-prime` for the lowest price per second and a repeatable `seed`. `quote` `cinema_takes`, confirm, run, `jobs_wait` (2–6 min). The take in `cinema_project_get` is the raw shot with its sound. Write the shot's `sound` like a sound designer (the space, its texture and 2–3 key sounds, never music): a silent take (`kling-4`) gets synced foley and, when the install designs voices, an ambience bed built from it.

## 4. Finish (optional)
`cinema_cut` conforms the take to the frame (2.39:1 bars included), applies the grade as a LUT and the film emulation (`fx`: grain, halation, bloom, vignette), masters the sound and returns an MP4 and a poster. Quote it first; it costs a few credits without music.

## Cost (720p, approximate)
Keyframes about 23 credits each · take per 5 s: `wan-3-prime` 95, `kling-4` 107, `seedance-2.5` 156 (1080p: 189, 159, 415) · finish 5–10. A 5 s shot with 3 candidates: about 170–230.

## Next steps to offer
The same keyframe with another move (`update_shots` `move`, then `cinema_takes`), a different grade (`look` and `cinema_cut` again), more shots around it (`cinema-film`), `upscale_media` for 4K.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:video-prompting`: Prompting a video. File: `riftland-prompting/references/technique-video-prompting.md`
- `technique:camera-moves`: Camera movement vocabulary. File: `riftland-prompting/references/technique-camera-moves.md`
- `technique:image-to-video`: Image to video. File: `riftland-prompting/references/technique-image-to-video.md`
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
