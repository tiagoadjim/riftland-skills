<!-- generated from Riftland's knowledge base: workflow "long-video-by-chaining", version acf1ebe9037f, checksum 8687ccf5. Do not edit. -->

# A longer video from several clips

Plan the keyframes as stills first, then make each clip from one frame to the next so the pieces join.

## When to use

The user wants more than one clip can hold. First check whether a single clip is enough: some models make longer clips than others (models_explore lists the durations). When a story with continuity is the goal, use Riftland Cine instead.

## You need

- The sequence as a list of keyframes: where the video starts, the points it passes through and where it ends.
- A model that takes an end frame (models_explore lists endImage).
- A way to join the clips: Riftland has no one-call joiner for arbitrary clips (see the limits).

## Steps

1. **Find the longest clips and the models with an end frame**: `models_explore`

```json
{
  "tool": "models_explore",
  "arguments": {
    "action": "list",
    "kind": "video"
  }
}
```

- Produces: Each video model's durations, startImage, endImage and sound.
- Feeds: Step 5 `generate_video`: model, one whose endImage is true.
- The user decides: Whether one long clip from a model with long durations already does the job. If so, stop here and make it with `generate_video`.

2. **Make the first keyframe**: `generate_image`

```json
{
  "tool": "generate_image",
  "arguments": {
    "prompt": "the opening state, in the user's words",
    "aspect_ratio": "the format of the whole video",
    "max_credits": "the most the user agreed to spend on this call"
  }
}
```

- Produces: The first keyframe with a job id.
- Feeds: Step 3 `create`: change_of. Step 5 `generate_video`: start_image.

3. **Make each next keyframe from the one before**: `create`

```json
{
  "tool": "create",
  "arguments": {
    "request": "only what changes from the previous frame: the next state of the shot",
    "change_of": "the previous keyframe's job id",
    "max_credits": "the most the user agreed to spend on each call"
  }
}
```

- Produces: The next keyframe, the same picture with one change. Repeat for each point of the sequence.
- Feeds: Step 5 `generate_video`: start_image and end_image.
- If it fails: `change_of` needs the director and works on images only. Without it, use `generate_image` with the previous keyframe in reference_images.

4. **Look at the keyframes together**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the keyframes, up to six at a time"
  }
}
```

- Produces: The frames to compare.
- The user decides: The sequence: the subject, framing and light must agree from one keyframe to the next, or the clips will not join.

5. **Make one clip for each pair of keyframes**: `generate_video`

```json
{
  "tool": "generate_video",
  "arguments": {
    "prompt": "the motion from this frame to the next, not what the frames show",
    "model": "the same model every time, one whose endImage is true",
    "start_image": "this keyframe",
    "end_image": "the next keyframe",
    "duration": "seconds, snapped to what the model supports",
    "aspect_ratio": "the same format as the keyframes",
    "max_credits": "the most the user agreed to spend on each call",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: One clip for each pair: each starts on its keyframe and is asked to end on the next one.
- Feeds: Step 6 `jobs_wait`: job_ids.
- If it fails: A model that does not take an end frame refuses the call and nothing is charged.

6. **Wait while they render**: `jobs_wait`

```json
{
  "tool": "jobs_wait",
  "arguments": {
    "job_ids": "the clips' job ids",
    "timeout_seconds": "how long to wait in this call"
  }
}
```

- Produces: The finished clips.

7. **Check the joins**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the clips"
  }
}
```

- Produces: A contact sheet of each clip: compare the last frame of one with the first frame of the next.
- If it fails: If a join jumps, redo that clip with a simpler motion, or redo the keyframe it starts from.

## Spending

`generate_image`, `create` and `generate_video` each take `max_credits`: set it on every call, and add up the clips before you start so the user agrees to the total. A higher price refuses the call and charges nothing. `quote` prices a `generate_video` call. `models_explore`, `media_view` and `jobs_wait` are free.

## Limits

- No tool extends a finished clip, and none exports a clip's last frame as an image to start the next one: `generate_video` takes only `start_image` and `end_image`, and `media_view` shows frames to you but gives no file. That is why the keyframes are made first, as stills.
- Only Riftland Cine chains from a previous take's last frame: a shot with the continuous transition starts on it. That works inside a Cine project, not for clips made with `generate_video`.
- No tool joins clips in one call. Hand the clips to the user's editor; or build the sequence in Riftland Cine, whose cut joins its takes; or write a timeline composition in a Motion Studio sandbox, which is authoring work.
- Matching keyframes keeps the subject and the place, not the motion: speed and camera movement can change at a join.

## See also

- `workflow:first-last-frame-video`: First and last frame to video
- `workflow:storyboard-to-film`: Storyboard to film with Riftland Cine
- `technique:multi-shot-and-timing`: Multi-shot clips and timing
- `technique:consistency`: Keeping a character, a product or a brand the same
- `technique:image-to-video`: Image to video
