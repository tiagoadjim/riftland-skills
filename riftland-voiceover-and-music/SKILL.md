---
name: riftland-voiceover-and-music
description: "Audio for a video or an ad: a voice-over read from a script, original music or a short sound effect. Use when: \"una voz en off para mi video\", \"música de fondo sin letra\", \"un jingle para mi marca\", \"narrate this script\", \"a whoosh sound effect\". NOT for: a face that speaks with synced lips (use talking-avatar); a whole narrated video (use explainer-video); a film's score and dialogue (use cinema-film)."
version: 1.0.0
---

# Voice-over, music and sound effects

Make the audio for a video, ad, course or phone menu with `generate_audio`: a voice-over from a script (`kind` voiceover), original music (`kind` music) or a short effect (`kind` sound_effect). Every result is an MP3 with download links.

## Ask only if missing
For a voice-over, the script and the language; for music, what it's for and the mood. Suggest the rest.

## Voice-over (`kind` voiceover)
- `text` is read exactly as written, up to 5000 characters (about 5 minutes). Fix typos, spell out numbers, acronyms and prices the way they should sound, and use punctuation for pauses.
- `voice`: Spanish `Spanish_SereneWoman` (default, calm), `Spanish_ConfidentWoman`, `Spanish_ChattyGirl` (upbeat ads), `Spanish_ThoughtfulMan`, `Spanish_RationalMan`, `Spanish_Jovialman`; English `English_ConfidentWoman`, `English_Graceful_Lady`, `English_Diligent_Man`, `English_magnetic_voiced_man`; Portuguese `Portuguese_ConfidentWoman`, `Portuguese_LovelyLady`, `Portuguese_ReliableMan`, `Portuguese_ThoughtfulMan`. `models_explore` with `kind` talk lists every voice.
- `quality` hd (default) or turbo (cheaper). Priced per character: about 14 credits per 1000 characters in hd.
- Long scripts: one call per section keeps retakes cheap.

## Music (`kind` music)
- `preset`: jingle, background (under a voice-over), lofi, epic, corporate, acoustic, electronic, latin, podcast; and/or a `prompt` with genre, mood, instruments and tempo ("upbeat acoustic pop, 110 bpm, hand claps").
- `instrumental` true (default) for background music. Songs: `instrumental` false with your `lyrics` (section tags like [Verse] and [Chorus]) or without them, and `language` es, en or pt for the lyrics the model writes.
- About 21 credits per track and about 2 minutes to make: call with `wait_seconds` 20, then `jobs_wait`.

## Sound effects (`kind` sound_effect)
`prompt` in English works best ("a cash register ring and the drawer opening"), or a `preset`: applause, cash, notification, whoosh, rain, laugh, door, pop. `duration` from 1 to 10 seconds. About 1 credit.

## Workflow
1. Draft the script or the music brief with the user first; it's cheap to adjust text, not audio.
2. `quote` with the same arguments and tell the user the credits.
3. Create, wait with `jobs_wait` when needed, and deliver the MP3 links.
4. Offer the next step: sound effects synced to a clip (`edit_video` with `action` add_sound), a talking avatar that speaks the same script (`talking_avatar`), or a different voice for comparison.

## Gotchas
- Voices read what they get: unusual names or brand words may need phonetic spelling.
- Music length is decided by the model (a jingle is short, a song is a few minutes); trim it in an editor if needed.
- Don't imitate a real singer or a famous song, and don't promise exclusive rights the user hasn't checked.

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
