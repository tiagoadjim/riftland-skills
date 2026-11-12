<!-- generated from Riftland's knowledge base: workflow "voice-and-music-for-video", version acf1ebe9037f, checksum 473fb8a8. Do not edit. -->

# Voice-over and music for a video

Make a voice-over and a music track for a clip, and know what Riftland can and cannot put together.

## When to use

The user has a clip, or is making one, and wants a narrator, music or sound effects with it. First ask whether the model already makes the sound they need (check the model's facts): speech and ambience written into the prompt are the simplest path.

## You need

- The clip, or the idea of it, and its length.
- The script for the voice-over and the feel of the music: genre, mood, instruments.
- Whether the user will combine the pieces in their own editor, or wants one finished video from Riftland.

## Steps

1. **Make the clip (skip it when the user has one)**: `generate_video`

```json
{
  "tool": "generate_video",
  "arguments": {
    "prompt": "the shot; with sound written in when the model makes it: quoted speech with a speaker, SFX and ambient lines",
    "audio": "true only if the model makes sound and the user wants it (check the model's facts)",
    "duration": "seconds, long enough for the voice-over",
    "max_credits": "the most the user agreed to spend on this call",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: A clip with a signed link and a job id.
- Feeds: Step 5 `edit_video` and step 6 `motion_sandbox_create`: the clip.

2. **Make the voice-over**: `generate_audio`

```json
{
  "tool": "generate_audio",
  "arguments": {
    "kind": "voiceover",
    "text": "the script",
    "voice": "a voice id from models_explore kind talk",
    "quality": "the best quality, or the faster one for a draft"
  }
}
```

- Produces: An MP3 of the narration, with its length.
- Feeds: Step 6 `motion_sandbox_create`: assets.

3. **Make the music**: `generate_audio`

```json
{
  "tool": "generate_audio",
  "arguments": {
    "kind": "music",
    "prompt": "genre, mood, instruments and what it is for",
    "instrumental": "true for no vocals (the default), false for vocals"
  }
}
```

- Produces: An MP3 of the track, which takes about two minutes to make.
- Feeds: Step 6 `motion_sandbox_create`: assets.

4. **Listen to both**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the voice-over and the music"
  }
}
```

- Produces: Each audio file as a waveform, to check its length against the clip.
- The user decides: Whether the voice and the music are right. At this point the honest default is to give the user the clip and the MP3 links, to combine in their own editor.

5. **Optional: add sound effects to a silent clip**: `edit_video`

```json
{
  "tool": "edit_video",
  "arguments": {
    "action": "add_sound",
    "video": "the silent clip",
    "prompt": "what it should sound like"
  }
}
```

- Produces: An MP4 with synced sound effects for the first part of the clip.
- If it fails: It adds effects only: it does not mix in a voice-over or a music file.

6. **Optional, for one finished file: open a Motion Studio sandbox with the pieces**: `motion_sandbox_create`

```json
{
  "tool": "motion_sandbox_create",
  "arguments": {
    "aspect_ratio": "the clip's canvas: 16:9, 9:16, 1:1 or 4:5",
    "duration_seconds": "the clip's length, a whole number of seconds",
    "assets": "the clip, the voice-over MP3 and the music MP3, each with the path it takes in the project"
  }
}
```

- Produces: A sandbox with the files and an index.html scaffold.
- Feeds: Steps 7 `motion_sandbox_write`, 8 `motion_sandbox_check` and 9 `motion_sandbox_render`: sandbox_id.
- The user decides: Whether the user wants this: you write the composition yourself, and the render is charged.

7. **Write the timeline**: `motion_sandbox_write`

```json
{
  "tool": "motion_sandbox_write",
  "arguments": {
    "sandbox_id": "the sandbox",
    "write": "index.html: the video clip and two audio clips, each on its own track with a start time and a duration"
  }
}
```

- Produces: The composition saved and linted.

8. **Check it**: `motion_sandbox_check`

```json
{
  "tool": "motion_sandbox_check",
  "arguments": {
    "sandbox_id": "the sandbox",
    "frames": "seconds to snapshot, for example the middle and the last frame"
  }
}
```

- Produces: Lint findings and snapshots of the frames.
- If it fails: Fix what the check reports and write again. Whether the clip's own sound plays through is not confirmed here: listen to the render.

9. **Render it**: `motion_sandbox_render`

```json
{
  "tool": "motion_sandbox_render",
  "arguments": {
    "sandbox_id": "the sandbox",
    "title": "the video's title",
    "quality": "draft, standard or high",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: An MP4 rendered from the composition.
- The user decides: The price: `quote` motion_sandbox_render with the same arguments, tell the user and wait for a yes.

10. **Wait and check**: `jobs_wait`

```json
{
  "tool": "jobs_wait",
  "arguments": {
    "job_ids": "the render job id",
    "timeout_seconds": "how long to wait in this call"
  }
}
```

- Produces: The finished video, which you can then look at with `media_view`.

## Spending

`generate_video` takes `max_credits`. `generate_audio` and `edit_video` have no cap: run `quote` with the tool name and the same arguments first. `motion_sandbox_render` has no cap either: `quote` it before rendering. Creating, writing and checking the sandbox are free. `media_view` and `jobs_wait` are free.

## Limits

- No Riftland tool takes a finished clip and a voice-over or a music file and returns one video. `edit_video` only removes a background, erases an object or adds sound effects; `generate_audio` returns separate MP3 files; `studio_video` can only keep a clip's own audio.
- The honest paths are: give the user the clip and the MP3 files to combine in their editor; or write a composition in a Motion Studio sandbox that places the clip and the two audio files on a timeline, which is authoring work and is charged by length and quality; or build the piece in Riftland Cine, whose cut mixes dialogue, ambience and score for its own takes (it can take a finished music file as the score).
- The sandbox route is not a one-call mix, and a clip's own sound may not play through it: check the render. The canvas must be 16:9, 9:16, 1:1 or 4:5 at the sandbox sizes, and the length a whole number of seconds from 5 to 120.
- A voice-over is read from text: a recorded voice of the user needs `talking_avatar` (lip sync) or an editor.

## See also

- `technique:dialogue-sound-music`: Dialogue, sound and music
- `workflow:portrait-to-talking-avatar`: Portrait to talking avatar
- `workflow:storyboard-to-film`: Storyboard to film with Riftland Cine
