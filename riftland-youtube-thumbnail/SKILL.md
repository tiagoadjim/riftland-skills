---
name: riftland-youtube-thumbnail
description: "A YouTube thumbnail made from concepts: 3 to 5 distinct ideas first, then one image per chosen concept at 16:9 with the person's own photo and exact words, and surgical tweaks afterwards. Use when: \"miniatura para mi video\", \"thumbnail de YouTube\", \"portada del video con mi cara\", \"make a thumbnail for my video\", \"change the text on this thumbnail\". NOT for: a set of images that share a style for a feed (use social-carousel), a poster or a flyer with a layout (use create), an ad (use static-ads-campaign), a video (use cinematic-shot)."
version: 1.0.0
---

# YouTube thumbnail

Thumbnails are made in two steps: concepts first, then one image per concept the user chooses. Everything runs through `create` (skill `create` has the shared rules: `plan`, `max_credits`, delivery): a 16:9 image, text on the image, the person's own photo as the reference, and `change_of` for surgical tweaks.

## When to use
The user wants the thumbnail of a video: a new one, a tweak to one they have, or a second version to test against the first. Vertical covers for Shorts or Reels are the same recipe with `format` "9:16".

## Modes
| Mode | People say | Call |
|---|---|---|
| New thumbnail | "miniatura para mi video", "a thumbnail for my video" | 3 to 5 concepts first, then one `create` per chosen concept, `format` "16:9" |
| Tweak | "cambiale el texto", "más contraste", "sacá el fondo" | `create` with `change_of` and only the change as the request |
| Test pair | "dos versiones para testear" | two different concepts, one `create` each (not `count`) |
| Next video, same face | "otra para mi próximo video" | a new concept with the same `character_id` or the same photo |

Tie-breakers:
- A tweak is never a regeneration: if one thing changes, use `change_of`.
- "Different" means a new concept, not a new random draw of the same one.
- A wrong face is not a tweak: start a new request with a better photo.
- Several concepts means several requests; use `count` only for 2 draws of the same concept at most.
- A saved character (`characters_list`) beats a loose photo for the same person; `change_of` cannot be combined with `character_id`.

## Interview
Skip what the conversation already answers. At most 4 questions per request type, as labeled options, in the user's language.

**Topic only, no photo ("miniatura para mi video de recetas")**
1. Does a person appear? Me (send a photo) · Someone else who agreed (send their photo) · No person
2. Which mood? Curious · Shocking · Calm and clean · Fun
3. The words on the image? Propose 3 options · I have them
4. Language of the video? Spanish · English · Portuguese

**Topic and photo**
1. Which mood? Curious · Shocking · Calm and clean · Fun
2. The words on the image? Propose 3 options · I have them
3. How many concepts to see? 3 · 5

**An existing thumbnail to improve**
1. What changes? The words · The face or expression · The background · Everything (new concepts)
2. Keep the layout? Yes · No

**A series for a channel**
1. The same person in each one? Yes, a saved character · Yes, the same photo · No
2. Colors? The brand kit's (read from `brand_get`) · I name them · Open

## Concepts first
Before generating anything, propose 3 to 5 distinct concepts, one line each, from different approaches (see [Composition approaches](references/concept-approaches.md)): a name, the picture in one sentence and the words that go on it. Two concepts that differ only in color are one concept. The user picks one or two; nothing is generated and nothing is charged before they pick.

## The request for a chosen concept
The request is the concept the user chose, written plainly as an ordered brief. It is not a model prompt: no lens, no camera and no model syntax, because the director writes the prompt. The order never changes: frame, subject, the exact words, supporting element, background, light. Details and worked examples: [The ordered brief and tweaks](references/brief-order.md).

## Identity
The face comes only from the person's own photo (or their saved character). A style reference never supplies identity: pass a style thumbnail as a reference only when it has no people; if it has a face, describe its layout in words instead. Use only photos of the user or of someone who agreed to appear. After each result, look with `media_view`: if the face drifts, the fix is a sharper, closer photo, not more draws.

## Words on the image
Few words (2 to 4), exact spelling in quotes, legible at small size: very large, high contrast against the background, and not in the bottom-right corner where the duration badge sits. Never repeat the video's title. Rules and checks: [Words on a thumbnail](references/text-rules.md).

## What you pass and what the server decides
- You pass: the ordered brief of the chosen concept, the exact words in quotes, `format` "16:9" (or "9:16" for a vertical cover), the photo in `references` (role `reference`) or `character_id`, and `max_credits`.
- The server decides: the director mode, the model (the plan says which and why), the final prompt and the resolution. Ask `models_explore` with action `recommended` if the user asks which model.
- Never pass: a model, lens or camera terms, or a prompt in a model's syntax.

## Calls
Shapes only (`plan` first, free, with the same fields):
```json
{ "request": "Frame: tight close-up, face on the right third. Subject: the person from the photo, wide eyes, mouth open. Exact words: “SE ROMPIÓ”. Supporting element: a cracked phone in the left hand. Background: solid red-orange with a soft vignette. Light: strong from the front, bright edge on the hair.",
  "kind": "image", "format": "16:9", "references": [{ "file": "<the person's photo>", "role": "reference" }], "max_credits": 40 }
{ "request": "<only the change: “la palabra en amarillo”>", "change_of": "job_…", "max_credits": 25 }
```
Launch the chosen concepts together and wait once with `jobs_wait`.

## Spending
Plan the first chosen concept (free) and use its price as the unit: the total to confirm is that price times the concepts the user chose, in one question. Each `create` then carries its own `max_credits`. A tweak is a new generation and is priced by its own plan.

## Delivery
Each thumbnail as its URL (`url`; `downloadUrl` to keep the file) with the concept's name, then one summary line: what was made, the credits charged and the balance ("Listo: 2 miniaturas, 56 créditos, saldo 190."). Offer the tweak as the one next step. No ids or assembled prompts unless asked.

## Retries and caps
- A hard cap of 8 generations per thumbnail, counting every image of every call (`count` included) and every tweak. At the cap, stop and show the best.
- At most 2 retries of the same request. The third attempt must change the concept or the photo.
- A failed job is refunded automatically: say so. Retry at most once, and only when the error says it is transient.

## Does not do
- Write the video's title, description or tags (offer it as a next step).
- Upload to YouTube, schedule, or A/B test: the user does it in their channel.
- Predict or promise clicks.
- Take a face from a style reference, or use a photo of someone who has not agreed.
- Edit a video frame: the thumbnail is a new image.

## Common mistakes
- Sending a long technical prompt instead of the ordered brief.
- More than 4 words on the image, or the words in the bottom-right corner.
- Using `count` to get variety: distinct concepts are distinct requests.
- Regenerating from scratch for a small change instead of `change_of`.
- Passing a thumbnail with someone else's face as a style reference.
- Starting before the user picked a concept.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:text-on-image`: Text on an image. File: `riftland-prompting/references/technique-text-on-image.md`
- `technique:editing-and-changes`: Editing and changing a result. File: `riftland-prompting/references/technique-editing-and-changes.md`

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
- [Composition approaches](references/concept-approaches.md) — read when proposing the 3 to 5 concepts, or when every concept starts to look alike.
- [The ordered brief and tweaks](references/brief-order.md) — read when writing the request for a chosen concept, or tweaking a result with change_of.
- [Words on a thumbnail](references/text-rules.md) — read when choosing, spelling or checking the words that go on the image.
Load one: open the file under `references/` next to this SKILL.md when the skill is installed; over MCP call `skill_get` with `skill_id` `youtube-thumbnail` and `reference` set to a file name from the list above.
