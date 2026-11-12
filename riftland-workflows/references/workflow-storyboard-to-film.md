<!-- generated from Riftland's knowledge base: workflow "storyboard-to-film", version acf1ebe9037f, checksum c146d636. Do not edit. -->

# Storyboard to film with Riftland Cine

Riftland Cine plans the shots, draws the frames, animates the takes and cuts the film.

## When to use

The user wants a short film or a sequence with continuity: the same characters and places across shots, dialogue, a score and a final cut. For one shot, use the image to video workflow.

## You need

- The story idea in the user's words, the language, the format and the length.
- Who is in it: characters and locations, with photos or descriptions.
- A yes from the user to the script, then to each priced step. If real people appear in the references, their confirmation of permission (`consent` on the project), set only on the user's word.

## Steps

1. **Create the project (free)**: `cinema_project_create`

```json
{
  "tool": "cinema_project_create",
  "arguments": {
    "title": "the film's title",
    "brief": "the idea in the user's words",
    "language": "es, en or pt: the language of dialogue and subtitles",
    "aspect": "the frame, for example 16:9",
    "cast": "characters: name, description, and character_id or images for their look",
    "locations": "places: name, description and optional photos"
  }
}
```

- Produces: The project with its id (cin_…).
- Feeds: Steps 2 and 3 `cinema_plan` and every later Cine call: project_id.

2. **Get the director's rules**: `cinema_plan`

```json
{
  "tool": "cinema_plan",
  "arguments": {
    "project_id": "the project",
    "shots": "how many shots you will write",
    "seconds": "the film's target length in seconds"
  }
}
```

- Produces: The craft rules with every allowed id and the exact JSON shape of a plan. Riftland runs no model here: you write the plan.
- Feeds: Step 3 `cinema_plan`: plan.

3. **Write and save the plan (free)**: `cinema_plan`

```json
{
  "tool": "cinema_plan",
  "arguments": {
    "project_id": "the project",
    "plan": "the JSON plan you wrote: title, logline, look, cast, locations, scenes, shots"
  }
}
```

- Produces: The saved shot list, with any invalid shot dropped and reported.
- The user decides: The logline and the shot list: show them and get the user's yes before anything is spent.

4. **Draw the keyframes**: `cinema_frames`

```json
{
  "tool": "cinema_frames",
  "arguments": {
    "project_id": "the project",
    "cast": "cast ids, to draw neutral portraits first so their look becomes a reference",
    "locations": "location ids, to draw empty plates first",
    "count": "candidates per shot, 1 to 4; each is charged"
  }
}
```

- Produces: A keyframe for each shot, drawn with its cast, location, props and the previous shot as references.
- The user decides: The price: `quote` cinema_frames with the same arguments, tell the user and wait for a yes.

5. **Review continuity, shot by shot**: `cinema_review`

```json
{
  "tool": "cinema_review",
  "arguments": {
    "project_id": "the project",
    "shot": "the shot id you reviewed with media_view",
    "score": "0 to 100; 90 or more is ready to shoot",
    "issues": "the continuity problems a viewer would notice",
    "fix": "one sentence that fixes the main one"
  }
}
```

- Produces: The saved verdict, which the user also sees in the web storyboard.
- If it fails: A score under about 80: redraw that frame with `cinema_frames` (shots and fix).

6. **Design the voices (only when there is dialogue or narration)**: `cinema_voices`

```json
{
  "tool": "cinema_voices",
  "arguments": {
    "project_id": "the project",
    "targets": "cast ids and/or narrator",
    "description": "a casting brief: gender, age, accent, timbre, pace",
    "auto": "true to keep the first candidate"
  }
}
```

- Produces: Candidate voices to listen to, then choose one for each.
- The user decides: Which voice to keep for each character. The price: `quote` cinema_voices first.

7. **Animate the takes**: `cinema_takes`

```json
{
  "tool": "cinema_takes",
  "arguments": {
    "project_id": "the project",
    "shots": "the shots to animate; default every shot with a keyframe and no take",
    "preview": "true for cheap drafts that wait for approval",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: A take for each shot, or drafts awaiting approval.
- The user decides: The price, which is high: `quote` cinema_takes, tell the user and wait for a yes. Approve or reject each draft with `job_action`.
- If it fails: A shot that came out wrong: change it with `cinema_project_update` (update_shots) and call `cinema_takes` for that shot.

8. **Set the score, titles and subtitles (free)**: `cinema_project_update`

```json
{
  "tool": "cinema_project_update",
  "arguments": {
    "project_id": "the project",
    "audio": "music style or prompt, narrator, levels",
    "cut": "title card, credits, subtitles, fades"
  }
}
```

- Produces: The project updated for the cut.

9. **Cut the film**: `cinema_cut`

```json
{
  "tool": "cinema_cut",
  "arguments": {
    "project_id": "the project",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: The film: an MP4, a poster, subtitles and a ZIP of takes, audio stems and an edit list.
- The user decides: The price: `quote` cinema_cut and wait for a yes. The cut needs a take for every shot.

10. **Wait for anything still running**: `jobs_wait`

```json
{
  "tool": "jobs_wait",
  "arguments": {
    "job_ids": "the job ids a production call returned",
    "timeout_seconds": "how long to wait in this call"
  }
}
```

- Produces: The finished frames, takes or cut.

## Spending

Writing the project, the plan, the review and the settings is free. `cinema_frames`, `cinema_voices`, `cinema_takes` and `cinema_cut` have no cap: run `quote` with the tool name and the same arguments before each one, tell the user and wait for a yes. `jobs_wait` and `media_view` are free.

## Limits

- You write the plan: Riftland runs no model for it, so the quality of the script is yours.
- Takes are routed by Cine to its own set of video models, chosen per shot (`update_shots` model, or automatically); they are not picked from the whole video catalog.
- Only inside Cine does a shot start on the previous take's last frame (a continuous transition). Nothing outside Cine exposes a clip's last frame.
- Real people in the references need the project's `consent`, set only on the user's word.

## See also

- `technique:multi-shot-and-timing`: Multi-shot clips and timing
- `technique:consistency`: Keeping a character, a product or a brand the same
- `workflow:character-series`: A character, then a consistent series
- `workflow:long-video-by-chaining`: A longer video from several clips
