<!-- generated from Riftland's knowledge base: workflow "first-last-frame-video", version acf1ebe9037f, checksum 01a9654b. Do not edit. -->

# First and last frame to video

Two keyframes become one clip that starts on the first and ends on the second.

## When to use

The user knows how a shot starts and how it ends (a door closed, then open; a bud, then a flower) and wants the motion in between. Not every model takes an end frame: check the model's facts first.

## You need

- Two frames of the same scene with the same subject and framing, or the idea of both so they can be made.
- A model that takes an end frame: models_explore lists endImage for each video model.
- A spending limit the user agrees to.

## Steps

1. **Find the models that take an end frame**: `models_explore`

```json
{
  "tool": "models_explore",
  "arguments": {
    "action": "list",
    "kind": "video"
  }
}
```

- Produces: Each video model's facts: startImage, endImage, durations, aspect ratios and sound.
- Feeds: Step 5 `generate_video`: model, chosen among the ones whose endImage is true.

2. **Make the first frame**: `generate_image`

```json
{
  "tool": "generate_image",
  "arguments": {
    "prompt": "the opening state of the shot, in the user's words",
    "aspect_ratio": "the format of the final clip",
    "max_credits": "the most the user agreed to spend on this call"
  }
}
```

- Produces: The first keyframe, with a job id.
- Feeds: Step 3 `create`: change_of. Step 5 `generate_video`: start_image.

3. **Make the last frame from the first**: `create`

```json
{
  "tool": "create",
  "arguments": {
    "request": "only what changes between the two states, for example: the door is now open",
    "change_of": "the first keyframe's job id",
    "max_credits": "the most the user agreed to spend on this call"
  }
}
```

- Produces: The same picture with just that change: the last keyframe, with a job id.
- Feeds: Step 5 `generate_video`: end_image.
- If it fails: `change_of` needs the director and works on images only. Without the director, call `generate_image` with the first frame in reference_images and the change as the prompt.

4. **Look at both frames**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the two keyframes' job ids"
  }
}
```

- Produces: Both frames side by side for you to compare.
- The user decides: Whether the pair is right. The subject, the framing and the light must agree, or the clip will morph between them.

5. **Make the clip between them**: `generate_video`

```json
{
  "tool": "generate_video",
  "arguments": {
    "prompt": "the motion between the two frames: what moves and what the camera does, not what the frames show",
    "model": "one whose endImage is true",
    "start_image": "the first keyframe",
    "end_image": "the last keyframe",
    "duration": "seconds, snapped to what the model supports",
    "aspect_ratio": "the same format as the frames",
    "max_credits": "the most the user agreed to spend on this call",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: The video job, with a signed link when it finishes in time.
- Feeds: Step 6 `jobs_wait`: job_ids.
- If it fails: A model without end-frame support refuses the call and nothing is charged: pick another from step 1. An end frame without a start frame is refused too.

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

- Produces: The finished clip, or its status.

7. **Check the clip**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the video job id"
  }
}
```

- Produces: A contact sheet of frames with their times: the first and last should match the two keyframes.

## Spending

`generate_image`, `create` and `generate_video` each take `max_credits`; set it on every call. A higher price refuses the call and charges nothing. `models_explore`, `media_view` and `jobs_wait` are free, and `quote` prices a `generate_video` call before you make it.

## Limits

- An end frame needs a start frame, and only some models take one: check the model's facts.
- Riftland does not check that the two frames agree. If they differ too much, the clip morphs between them.
- `plan` and `create` take the frames too (references with the roles start_frame and end_frame), but they choose the model themselves; to choose a model that takes an end frame, use `generate_video`.

## See also

- `technique:image-to-video`: Image to video
- `technique:editing-and-changes`: Editing and changing a result
- `workflow:image-to-video`: Image to video
- `workflow:long-video-by-chaining`: A longer video from several clips
