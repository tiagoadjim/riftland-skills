<!-- generated from Riftland's knowledge base: workflow "image-to-video", version acf1ebe9037f, checksum ea55f1d4. Do not edit. -->

# Image to video

A generated or uploaded image becomes the first frame of a video.

## When to use

The user has an image, or wants one made first, and wants it to move. For exact control of the model, the duration, sound or a camera move by id, call `generate_video` with `start_image` instead of `plan` and `create`.

## You need

- An image: a result of `generate_image` or `create`, an upload, or a public URL.
- What should move, in the user's words.
- A spending limit the user agrees to.

## Steps

1. **Make the still (skip it when the user already has the image)**: `generate_image`

```json
{
  "tool": "generate_image",
  "arguments": {
    "prompt": "the picture as the user described it, in their own words",
    "aspect_ratio": "the format the clip will have, so the frame fits it",
    "count": "2 or 3 when the user should choose",
    "max_credits": "the most the user agreed to spend on this call",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: Images with job ids such as job_…#1 and job_…#2, and signed links.
- Feeds: Step 3 `plan` and step 4 `create`: the chosen image goes in references as the file.
- If it fails: A price above max_credits charges nothing and returns the price: show it to the user and ask. A blocked request names the reason: see the troubleshooting guide.

2. **Look at the candidates and choose the first frame**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the job ids of the candidates, up to six"
  }
}
```

- Produces: The images at full detail, for you to judge.
- The user decides: Which image becomes the first frame. Check the framing, the faces and the hands now: the clip starts from exactly this picture.

3. **Plan the clip (free)**: `plan`

```json
{
  "tool": "plan",
  "arguments": {
    "request": "only the motion, in the user's words: what moves and what the camera does",
    "kind": "video",
    "references": "one entry: file is the chosen image's id, role is start_frame",
    "format": "the aspect ratio that matches the image"
  }
}
```

- Produces: A plan: direction_id, the model with its reason, the assembled prompt, the duration, the price and the balance; or needs_input questions, or a handoff to a studio.
- Feeds: Step 4 `create`: direction_id.
- The user decides: Whether the price is acceptable. Answer any needs_input question with the user's own words and call again with answers.

4. **Make the clip**: `create`

```json
{
  "tool": "create",
  "arguments": {
    "request": "the same motion request",
    "kind": "video",
    "references": "the same entry: the chosen image as start_frame",
    "direction_id": "from the plan: make exactly that plan at that price",
    "max_credits": "at least the price the plan showed, and no more than the user agreed to",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: The video job: the clip's signed link when it finishes in time, or a job id while it is still running; the credits charged and the balance.
- Feeds: Step 5 `jobs_wait`: job_ids.
- If it fails: Over budget: nothing is spent and the plan comes back with its price. A model that refuses a start image says so and charges nothing: choose another with `generate_video`.

5. **Wait while it renders**: `jobs_wait`

```json
{
  "tool": "jobs_wait",
  "arguments": {
    "job_ids": "the video job id",
    "timeout_seconds": "how long to wait in this call; call again while it is still running"
  }
}
```

- Produces: The finished clip, or its current status. A clip usually takes one to five minutes.

6. **Check the result**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the video job id"
  }
}
```

- Produces: A contact sheet of frames across the clip, with their times.
- If it fails: If the face changes, objects appear or the colours shift, shorten the clip, reduce the motion, remove the camera move and repeat what must stay (see the image to video guide).

## Spending

`plan` is free and shows the price. `generate_image`, `create` and `generate_video` take `max_credits`, the most the user agreed to: a higher price refuses the call, charges nothing and returns the plan and the price. `quote` prices a `generate_image` or `generate_video` call before you make it. `media_view` and `jobs_wait` are free.

## Limits

- Riftland uses the image as the first frame only. To fix where the clip ends too, use the first and last frame workflow.
- `plan` and `create` take no camera move by id: describe it in the request, or call `generate_video` with camera_move.
- One clip per call: no tool extends a clip or continues from its last frame (see the long video workflow).

## See also

- `technique:image-to-video`: Image to video
- `technique:video-prompting`: Prompting a video
- `technique:camera-moves`: Camera movement vocabulary
- `workflow:first-last-frame-video`: First and last frame to video
- `workflow:long-video-by-chaining`: A longer video from several clips
