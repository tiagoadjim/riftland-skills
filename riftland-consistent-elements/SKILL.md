---
name: riftland-consistent-elements
description: "Keep the same character, product, location or style identical across many images or videos without training, by saving it once as an element and mentioning its @tag. Use when: \"que mi mascota salga igual en toda la serie\", \"guardá este producto para usarlo siempre\", \"el mismo lugar en varias escenas\", \"keep this character consistent\", \"save it as an @tag\". NOT for: a real person from photos with a trained identity (use my-character); a new invented character (use ai-influencer); a series with one look and no recurring subject (use social-carousel)."
version: 1.0.0
---

# Consistent elements with @tags

Keep a character, product, location, object or style identical across a whole series without training: save it once as an element, then write its @tag in every request. Tools: `element_save`, `elements_list`, `create` (skill `create` has the rules: the user's words, questions, `max_credits`, delivery).

## 1. Find or save the elements
- `elements_list` (optional `kind`: character, location, object, product, style) shows what the user already has, each with its @tag. Saved characters appear too and work the same way.
- New element: `element_save` with `name`, `kind`, `images` (1–8: front, side, details; clean, well-lit shots work best) and a short `description` of what must not change (face, wardrobe, materials, logo placement). `tag` is optional (default: from the name). It is free.
- Local files: `media_upload` first, then pass the `upload_id` in `images`. To fix an element later, call `element_save` again with its `element_id`.

## 2. Images: mention, don't repeat
- Write the @tag where the element belongs in the request, in the user's words: "@luna sitting on a bench in Paris at dawn, film grain". Riftland adds the element's images as references and its description to the prompt. Send it with `create` and the agreed `max_credits`.
- Several elements in one shot work: "@luna holding @mug in @kitchen". Each element's images count toward the model's reference limit; keep `references` for one-off extras.
- Keep one look for the series: after the first result, pass its `model` and `format` (its `director` block) in the next calls.
- An unknown @tag fails with the list of available tags: fix the spelling or save it first.

## 3. Video
- `create` with `kind: "video"`: a @character or @product with no first frame becomes the first frame (like `character_id`); other elements add their description to the prompt.
- For the best identity, make the key frame with `create` first, then a video `create` with that frame in `references` (role `start_frame`) and the @tag in the request.
- Videos take longer: if one is still running, `jobs_wait` with its job id.

## Deliver
The results in order with their links, the @tags used and a line on how to reuse them ("write @luna in any prompt"). Offer more shots of the series or a video from the best image.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:consistency`: Keeping a character, a product or a brand the same. File: `riftland-prompting/references/technique-consistency.md`
- `technique:references-and-roles`: References and their roles. File: `riftland-prompting/references/technique-references-and-roles.md`
- `workflow:character-series`: A character, then a consistent series. File: `riftland-workflows/references/workflow-character-series.md`

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
