---
name: riftland-workflows
description: "Multi-step jobs across Riftland's tools: how to run a chain (price each spending step, carry ids from one step to the next, where the user decides, what to do when a step fails, one agreed total), a recipe per job, and what Riftland cannot chain today. Use when: \"de imagen a video\", \"un video más largo que un clip\", \"la misma persona en varias imágenes y un video\", \"turn this photo into a talking avatar\", \"product photo to ad\", \"add a voice-over and music to my clip\". NOT for: one image or one video from a plain request (use create); choosing a model (use models); how to word a prompt (use prompting); a short film with continuity (use storyboard-film)."
version: 1.0.0
---

# Multi-step jobs

Some jobs take more than one tool call: an image that becomes a video, a character in a series, a product photo that becomes an ad, a video with a voice and music. Each recipe is generated from Riftland's knowledge base: open the one that matches, follow its steps and the rules here. Tools: `guide`, `plan`, `jobs_wait` and `media_view` run the chain; `create`, `generate_image` and `generate_video` make images and videos;
`quote` prices the studios.

## Pick the recipe
Call `guide` with `topic` `workflow:<id>` (or `for` set to what the user wants), or open the file next to this SKILL.md.

| Recipe | Use it when |
|---|---|
| [Image to video](references/workflow-image-to-video.md) | The user has an image, or wants one made first, and wants it to move. |
| [First and last frame to video](references/workflow-first-last-frame-video.md) | The user knows how a shot starts and how it ends (a door closed, then open; a bud, then a flower) and wants the motion in between. |
| [A character, then a consistent series](references/workflow-character-series.md) | The user wants the same person across several images and a clip: a brand ambassador, a story character, a mascot. |
| [Product photo to product photos to a video ad](references/workflow-product-to-ad.md) | The user has a product photo and wants images for a listing or a campaign and a short video ad that shows the same product. |
| [Storyboard to film with Riftland Cine](references/workflow-storyboard-to-film.md) | The user wants a short film or a sequence with continuity: the same characters and places across shots, dialogue, a score and a final cut. |
| [Change chain, then upscale](references/workflow-change-chain-and-upscale.md) | The user has an image they mostly like and wants a few specific changes, then a sharper, larger final. |
| [Portrait to talking avatar](references/workflow-portrait-to-talking-avatar.md) | The user wants a presenter, a spokesperson or a character who speaks to the camera with lip sync, from a portrait and a script (or a voice recording). |
| [Brand kit to on-brand static ads](references/workflow-brand-to-ads.md) | The user has a business or a brand and wants a batch of static ads (feed, story) that look like it. |
| [Voice-over and music for a video](references/workflow-voice-and-music-for-video.md) | The user has a clip, or is making one, and wants a narrator, music or sound effects with it. |
| [A longer video from several clips](references/workflow-long-video-by-chaining.md) | The user wants more than one clip can hold. |

## Running a chain
1. Read the whole recipe before you start: its steps, what feeds what, where the user decides and its Limits.
2. Say the chain in a line or two before any spending: the steps, the tool of each and the total price. The user agrees to one agreed total for the whole chain ("La cadena sale unos 210 créditos: ¿sigo?"). A budget they already stated that covers the total is the yes.
3. Price each step with the tool it uses. `plan` is free and prices an image or a video made through the director; `quote` prices a studio or any other paid tool before you run it.
4. Send a `max_credits` on every `create`, `generate_image` and `generate_video` call, within the share of the agreed total that step needs. A price above it spends nothing; stop and ask before you raise it.
5. Carry ids, not files: a result feeds the next step by id (`ast_…`, `job_…`, `job_…#2`) in its file field. Never download one to upload it again. Look at each result with `media_view` before it feeds the next step.
6. Stop where the recipe says the user decides (the pick of a keyframe, the script, the voice) and wait for their answer. A job in `awaiting_approval` shows its preview first: the essentials say how.
7. Wait with `jobs_wait` for the jobs of a step before you start the next.
8. When a step fails, its credits come back. Read the error, retry at most once and only when it says it is transient. Otherwise stop the chain: say which steps are done (keep their ids), what the failed one needs, and the cheapest way to continue from there. Do not run the finished steps again.
9. Deliver the final links and one summary line: what was made, the credits of the whole chain and the balance.

## Limits: what Riftland cannot chain today
- No tool extends a clip or exports its last frame as an image, so a longer video starts each clip from a still keyframe (only Riftland Cine continues from a previous take).
- No tool puts a clip and a voice-over or a music file into one video; the recipe for voice and music says the honest paths.
- No tool joins clips in one call, outside Cine.
- Nothing checks that a face or a product stays the same across steps: compare with `media_view`.
- Studios do not hand results to each other: you carry the ids, and each studio keeps its own price rule.
- A chain is not one transaction: if step 3 fails, steps 1 and 2 are already charged; only the failed job is refunded.
Tell the user a limit before they pay for a step that depends on it.

## Questions, spending and delivery
Nothing here changes them: the Riftland essentials at the end of this skill apply.

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
- [Image to video](references/workflow-image-to-video.md) — read when the job matches this recipe: a generated or uploaded image becomes the first frame of a video.
- [First and last frame to video](references/workflow-first-last-frame-video.md) — read when the job matches this recipe: two keyframes become one clip that starts on the first and ends on the second.
- [A character, then a consistent series](references/workflow-character-series.md) — read when the job matches this recipe: design or save a character, then make a series of images and a video that keep the same person.
- [Product photo to product photos to a video ad](references/workflow-product-to-ad.md) — read when the job matches this recipe: start from a real product photo, make polished product images, then a video ad through the Marketing Studio.
- [Storyboard to film with Riftland Cine](references/workflow-storyboard-to-film.md) — read when the job matches this recipe: riftland Cine plans the shots, draws the frames, animates the takes and cuts the film.
- [Change chain, then upscale](references/workflow-change-chain-and-upscale.md) — read when the job matches this recipe: take an accepted result, make targeted changes one at a time with change_of, then upscale the final.
- [Portrait to talking avatar](references/workflow-portrait-to-talking-avatar.md) — read when the job matches this recipe: a generated or uploaded portrait becomes a talking video with a script and a voice.
- [Brand kit to on-brand static ads](references/workflow-brand-to-ads.md) — read when the job matches this recipe: set up the brand kit and its products, then make static ads that use its logo, palette, fonts and tone.
- [Voice-over and music for a video](references/workflow-voice-and-music-for-video.md) — read when the job matches this recipe: make a voice-over and a music track for a clip, and know what Riftland can and cannot put together.
- [A longer video from several clips](references/workflow-long-video-by-chaining.md) — read when the job matches this recipe: plan the keyframes as stills first, then make each clip from one frame to the next so the pieces join.
Load one: open the file under `references/` next to this SKILL.md when the skill is installed; over MCP call `skill_get` with `skill_id` `workflows` and `reference` set to a file name from the list above.
