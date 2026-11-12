---
name: riftland-talking-avatar
description: "A photo or saved character that speaks a script or an audio file, with synced lips, through Riftland's talking-avatar engines. Use when: \"que esta foto hable\", \"un video mensaje con mi cara\", \"un presentador que lee este guion\", \"make this photo talk\", \"lip-sync to my audio\". NOT for: a creator ad with a product (use ugc-video-ad); making the character first from photos (use my-character); voice-over for a faceless video (use explainer-video); voice only (use voiceover-and-music)."
version: 1.0.0
---

# Talking avatar

A photo or saved character that speaks a script (or an audio file) with lip-sync: talking head, spokesperson, video message, presenter clip.

## Inputs
- Face: a saved character (`characters_list`, then `character_id`) or a photo (`image`: an upload or public URL). Best photo: one person facing the camera, face fully visible and well lit, mouth relaxed, head and shoulders in frame, nothing covering the face. Frame it the way the video should look (a vertical photo for a vertical video).
- Speech: `script` (text to speech with `voice`) or `audio` (their own recording). Riftland has no voice cloning: to sound like the user, they upload a recording.
- Only animate the user or people who agreed.

## Voices (`voice`)
| Language | Voices |
|---|---|
| Spanish | `Spanish_SereneWoman` (Lucía, female), `Spanish_ConfidentMan` (Mateo, male) |
| English | `af_heart` (Heart, female), `af_bella` (Bella, female), `am_michael` (Michael, male) |
| Portuguese | `Portuguese_SentimentalLady` (Ana, female) |
| Multilingual | `Wise_Woman` (Grace, female), `Deep_Voice_Man` (Leo, male) |

Default: the character's saved voice, else one matching the script language and the person.

## Script
- About 15 characters per second of speech (2.5 words per second): 20 s ≈ 300 characters ≈ 50 words. Trim it to the target length.
- Write for the ear: short sentences, punctuation for pauses, numbers spelled the way they should sound. Up to 5000 characters.
- Example (about 20 s): “Hola, soy Tiago. En treinta segundos te muestro cómo bajar tus costos de envío: comparás tarifas en un solo lugar y elegís la más barata. Probalo gratis hoy.”

## Engine (`engine`)
| `engine` | Best for | Resolution | Max length | Credits per second (approx.) |
|---|---|---|---|---|
| `talk-infinitetalk` (default) | natural lip-sync with head motion and expression, the longest scripts | 480p, 720p | 3 min | 3 at 480p, 6 at 720p |
| `talk-kling` | very expressive, UGC-style ads | 720p | 60 s | 6 |
| `talk-omnihuman` | the most natural gestures and emotion | 1080p | 30 s | 18 |

`models_explore` with `kind: "talk"` shows the current details.

## Workflow
1. Get the face and the script or audio; confirm the script if you wrote it. If the face is a photo the user brought (not a Riftland result or a character made from one), ask them to confirm they have that person's permission and send `consent: true`; without it the call is refused.
2. `quote` (`tool: "talking_avatar"`), confirm:
```json
{ "character_id": "<id>", "script": "Hola, soy Tiago…", "voice": "Spanish_ConfidentMan",
  "engine": "talk-infinitetalk", "resolution": "720p" }
```
3. `talking_avatar`, then `jobs_wait` (2–5 min).
4. Deliver the link; offer another voice or engine, a longer cut, or using it inside a UGC ad (`ugc-video-ad`).

## Gotchas
- Profile shots, sunglasses, glare and open-mouth photos lip-sync worse.
- Long scripts on `talk-omnihuman` or `talk-kling` hit their limits: split them or use `talk-infinitetalk`.

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
