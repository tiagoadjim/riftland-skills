<!-- generated from Riftland's knowledge base: workflow "portrait-to-talking-avatar", version acf1ebe9037f, checksum 9aa9f1c3. Do not edit. -->

# Portrait to talking avatar

A generated or uploaded portrait becomes a talking video with a script and a voice.

## When to use

The user wants a presenter, a spokesperson or a character who speaks to the camera with lip sync, from a portrait and a script (or a voice recording).

## You need

- A portrait of one person facing the camera, or the idea of one so it can be made.
- The script, in the language it will be spoken, or a voice file.
- If the portrait is a photo of a real person the user brought: their confirmation that they have that person's permission (`consent`). Ask; never assume.

## Steps

1. **Make the portrait (skip it when the user has one)**: `generate_image`

```json
{
  "tool": "generate_image",
  "arguments": {
    "prompt": "one person, head and shoulders, facing the camera, mouth closed, even soft light, plain background",
    "aspect_ratio": "the format of the final video",
    "max_credits": "the most the user agreed to spend on this call"
  }
}
```

- Produces: Portrait options with job ids.
- Feeds: Step 5 `talking_avatar`: image.

2. **Choose the portrait**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the portrait candidates"
  }
}
```

- Produces: The portraits at full detail.
- The user decides: Which portrait speaks. The face and the mouth are the part that will move: choose one with a clear, front-facing face.

3. **Choose the voice and the engine**: `models_explore`

```json
{
  "tool": "models_explore",
  "arguments": {
    "action": "list",
    "kind": "talk"
  }
}
```

- Produces: The talking engines with their maximum length, and the voices with language and gender.
- Feeds: Step 5 `talking_avatar`: voice and engine.
- The user decides: The voice, after listening if the user wants to: `generate_audio` with kind voiceover makes an MP3 sample of the script in the chosen voice.

4. **Price it**: `quote`

```json
{
  "tool": "quote",
  "arguments": {
    "tool": "talking_avatar",
    "arguments": "the same arguments you will pass to talking_avatar"
  }
}
```

- Produces: The price and the balance. The length is estimated from the script.
- The user decides: Whether to go ahead at that price.

5. **Make the talking video**: `talking_avatar`

```json
{
  "tool": "talking_avatar",
  "arguments": {
    "image": "the chosen portrait",
    "script": "what the person says",
    "voice": "the voice id from step 3",
    "engine": "optional: the engine from step 3",
    "resolution": "the video resolution",
    "prompt": "acting direction: emotion, gestures, setting",
    "consent": "true only when the portrait is a photo the user brought and they confirmed permission",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: The talking video job.
- Feeds: Step 6 `jobs_wait`: job_ids.
- If it fails: Without the confirmation for a brought photo the call is refused and nothing is charged. To lip-sync a recording instead of a script, pass `audio` (for example a voice-over made with `generate_audio`).

6. **Wait while it renders**: `jobs_wait`

```json
{
  "tool": "jobs_wait",
  "arguments": {
    "job_ids": "the video job id",
    "timeout_seconds": "how long to wait in this call"
  }
}
```

- Produces: The finished video, or its status.

7. **Check the lips and the voice**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the video job id"
  }
}
```

- Produces: A contact sheet of the video: look at the mouth, the eyes and the first and last frames.

## Spending

`generate_image` takes `max_credits`. `talking_avatar` has no cap: run `quote` with the tool name and the same arguments, tell the user and wait for a yes. `generate_audio` is priced the same way if you use it for a sample. `models_explore`, `media_view` and `jobs_wait` are free.

## Limits

- One speaker per video: the portrait is the speaker.
- How long a video can be depends on the engine: read its maximum from `models_explore`.
- Gestures and expression are steered only by the `prompt` acting direction.
- A portrait of a real person that the user brought needs the confirmation of permission; Riftland asks for it and never assumes it.

## See also

- `technique:dialogue-sound-music`: Dialogue, sound and music
- `technique:consistency`: Keeping a character, a product or a brand the same
- `workflow:character-series`: A character, then a consistent series
- `workflow:voice-and-music-for-video`: Voice-over and music for a video
