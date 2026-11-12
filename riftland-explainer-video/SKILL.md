---
name: riftland-explainer-video
description: "A faceless narrated video with a script agreed first, voice-over, captions and music, built as motion graphics in Motion Studio. Use when: \"un video explicativo sin cara\", \"faceless video con voz en off\", \"un tutorial animado de 40 segundos\", \"explain this topic in a short video\", \"narrated video for Shorts\". NOT for: a presenter on camera (use talking-avatar); a launch promo with the brand's look (use motion-graphics-promo); a story with actors and dialogue (use cinema-film); only the audio (use voiceover-and-music)."
version: 1.0.0
---

# Faceless explainer (Motion Studio)

A faceless narrated video: no camera and no presenter, only animated scenes, a voice-over, captions and music, with the script agreed before anything is generated. Explainers, tutorials, "video sin cara", educational Shorts and narrated topic videos are all this skill. Motion Studio with `preset_id` `explainer` (HyperFrames compositions rendered to MP4).

## When to use
The user wants a video that explains or narrates a topic with voice and animation and no person on screen. A presenter on camera is `talking-avatar`; footage with actors is `cinema-film`.

## Modes
| Format | Use | `preset_id` | Aspect ratio |
|---|---|---|---|
| Explainer, tutorial, popular science (20–90 s) | the default | `explainer` | 9:16 for Shorts, Reels and TikTok; 16:9 for YouTube and courses; 1:1 or 4:5 for feeds |
| A 15 s teaser of a longer video | a hook for social | `teaser` or `social-ad` | 9:16 |

`presets_list` with `source` "motion" shows every format. Tie-breakers: a requested platform sets the aspect ratio; the topic with no brand still needs a minimal kit (free); anything longer than 90 s is split into parts.

## Interview
Skip what the conversation already answers. At most 4 questions per request type, as labeled options, in the user's language.

**Topic given ("explicame el interés compuesto")**
1. Which duration? 30 s · 45 s · 60 s · 90 s
2. Where will it be published? Shorts, Reels or TikTok · YouTube · A feed post
3. Language of the voice and the texts? Spanish · English · Portuguese
4. Whose brand? A saved brand · A new minimal one · No brand, neutral

**Script already written**
1. Which duration? The script's length · A different one
2. Language of the voice? The script's · Another

## The script comes first
The script is agreed before anything is generated: before you open a sandbox, make a voice or quote a render. Write it from the topic (about 2.5 spoken words per second: 30 s is roughly 75 words), show it as a table of scenes (seconds, voice line, on-screen words, visual) and ask the user to approve it or change it. After approval, change a line only when the user asks, and show it again before the render. How to write and lock it: [Writing and locking the script](references/script-rules.md). Visual ideas by beat: [Scene patterns](references/scene-patterns.md).

## Needs
A brand kit (`brand_id`) for colors, fonts and tone: `brands_list`. For a topic without a brand, `brand_create` with `manual` (name, 2–4 colors, a font pairing, tone): free and reusable for the series.

## What you pass and what the server decides
- You pass: the approved script as the `prompt` (with one visual note per beat), `duration_seconds`, `aspect_ratio`, `language`, `brand_id`, and the choices for voice-over, captions and music.
- Riftland decides: the sandbox theme from the brand kit, the render quality and the price. With the default `director` "you", the direction is yours and the call is free; `director` "riftland" uses Riftland's own director where the server has one, at a much higher price.

## Calls
Shape only:
```json
{ "brand_id": "<id>", "preset_id": "explainer", "prompt": "<approved script + one visual note per beat>",
  "duration_seconds": 40, "aspect_ratio": "9:16", "voiceover": true, "captions": true, "music": true, "quality": "standard", "language": "es" }
```
1. `motion_studio_generate` (free with the default director) opens a sandbox themed with the kit and returns DIRECTOR.md. Read it and CRAFT.md (`motion_sandbox_files`).
2. Write STORYBOARD.md from the approved script and show a short version.
3. Narration: `motion_sandbox_voiceover`, one line per scene (a free local voice): it returns WAVs with durations and word timings for the captions. Music: `generate_audio` (`quote` first), then `motion_sandbox_write` into `assets`.
4. One sub-composition per scene with `motion_sandbox_write`, borrowing moves from `motion_catalog`; the rules are in the skill `motion-code`.
5. `motion_sandbox_check` with frames at each scene: look like a designer and fix until clean.
6. `quote` `motion_sandbox_render`, tell the user the credits, render, then `jobs_wait`.

## Spending
Only the render is charged (standard is about 8 credits plus 1 per second: 20 s is about 29). `quote` the render and `generate_audio` and tell the user the total in one line; ask above 100 credits unless they approved that spend. Drafts, checks and voice lines are free.

## Delivery
The MP4 (`url`; `downloadUrl` to keep it; `appUrl` to edit), the approved script as text and one summary line: what was made, its length and language, the credits charged and the balance ("Listo: explainer de 40 s en español, 29 créditos, saldo 311."). Ask the user to check figures and spelling before publishing. One next step at most: the other aspect ratio, a translated version (`language`), a series with the same brand, or a 15 s teaser.

## Retries and caps
- A hard cap of 2 renders per video: the first, and one after the user's review. Checks of frames are free and unlimited.
- At most 3 attempts per voice line; each is checked against its scene's length. If it still does not fit, shorten the line (never speed up the audio) and tell the user.
- At most 2 retries of a failed call, and only when the error says it is transient. A failed render is refunded automatically.

## Does not do
- Put a person on screen or lip-sync a face (`talking-avatar`).
- Make AI footage with actors and dialogue (`cinema-film`).
- Clone a voice: the voice-over uses Riftland's voices.
- Make up statistics, sources or quotes: figures come from the user or are left out.
- Render before the script is approved.

## Common mistakes
- Generating voice or scenes before the user approved the script.
- Skipping the duration and language questions: 30 s and 90 s are different scripts, and the voice follows the language.
- A script longer than its duration: count the words.
- Speeding up a voice line to fit instead of shortening the text.
- Rendering twice "to see": check the frames first, render once.
- Forgetting the brand kit: a topic without a brand still needs the minimal one.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:dialogue-sound-music`: Dialogue, sound and music. File: `riftland-prompting/references/technique-dialogue-sound-music.md`
- `workflow:voice-and-music-for-video`: Voice-over and music for a video. File: `riftland-workflows/references/workflow-voice-and-music-for-video.md`

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

## References
Read a reference only when its line applies; none is needed for a plain request.
- [Writing and locking the script](references/script-rules.md) — read when writing the script, counting words per second, or the user edits a line after approving.
- [Scene patterns](references/scene-patterns.md) — read when turning each beat of the script into a visual.
Load one: open the file under `references/` next to this SKILL.md when the skill is installed; over MCP call `skill_get` with `skill_id` `explainer-video` and `reference` set to a file name from the list above.
