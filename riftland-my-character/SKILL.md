---
name: riftland-my-character
description: "A reusable character made from the user's own photos of a real person, saved once and reused in images, videos and talking clips, with the consent the product requires. Use when: \"quiero salir yo en mis imágenes\", \"guardame como personaje\", \"que mi cara salga igual siempre\", \"make a character from my photos\", \"train my face\". NOT for: an invented person or mascot described in words (use ai-influencer), keeping a product, place or object consistent (use consistent-elements), a photo that speaks (use talking-avatar), a professional headshot from a selfie (use pro-headshot)."
version: 1.0.0
---

# My character (from the user's own photos)

Save a real person, the user or someone who agreed, as a reusable character, then use it in images, videos and talking clips. A character is saved from images: one main photo, optional pose images, and optionally a build that makes a turnaround sheet or trains an identity. The "What the tools really do" section says exactly how far that goes.

## When to use
The user brings photos of a real person and wants that person to appear again and again ("quiero salir yo en mis imágenes"). An invented person described in words is `ai-influencer`; a product, place or object is `consistent-elements`.

## Modes
| Goal | People say | Call |
|---|---|---|
| Save their photo as a character | "guardame como personaje", "mi cara en mis imágenes" | `character_save` with `image` (the best photo) and optional `sheet_images` |
| A polished version from their photos | "una versión profesional de mí", "mejorá mi foto" | `avatar_generate` (`kind` `rift`, `reference_images`), pick one, then `character_save` |
| A turnaround sheet | "hoja de personaje", "de frente y de perfil" | `character_save` with `build_sheet` true |
| The same face in any scene | "que salga siempre igual", "entrenar mi cara" | `character_save` with `build_lora` true (about 25 minutes) |
| Use a saved character | "usá a Luna", "otra foto mía" | `create` or `talking_avatar` with `character_id` |

Tie-breakers:
- A real person's photos are this skill; a person described in words is `ai-influencer`.
- A saved character with no build already works for most requests: offer the sheet or the trained identity only when the user needs consistent full-body views or the exact face across many scenes.
- A polished version changes the photo; saving the photo as it is keeps it. Ask which one the user wants only when it is unclear.
- A character already exists for this person (`characters_list`): reuse it, never save a duplicate.

## Permission for a real person's likeness
The product will not run these calls without `consent: true` (it refuses, or asks the user first) and charges nothing in that case: `avatar_generate` with `reference_images` the user brought, `character_save` with `build_sheet` or `build_lora` from photos the user brought, and later `talking_avatar`, `studio_video` swap and motion, and Marketing Studio videos with that character. Photos Riftland itself generated need none.
1. Ask the user, in their language, whether the person in the photos has given permission for this use of their likeness. When the person is the user, their own yes is the permission.
2. Send `consent: true` only on that yes. Never decide it yourself and never assume it: a missing answer is a no. The product's own wording is that the user confirms they have permission of the real person to use their likeness.
3. On a no, stop: do not try other photos of the same person or work around the rule.

## Interview
Skip what the conversation already answers. At most 4 questions per request type, as labeled options, in the user's language.

**Photos attached ("hacé un personaje conmigo")**
1. Which is the main photo? The best of the attached photos, named by number · Let me choose for you
2. A turnaround sheet too? Yes · Not now
3. Train the exact face (about 25 minutes, extra credits)? Yes · Not now
4. The character's name? Use mine · Another name

**No photos yet**
1. Who is it? Me · Someone who agreed · An invented person (that is `ai-influencer`)
2. Can you send 1 to 4 photos now? Yes, now · Later

**A polished version from photos**
1. Which style? Natural and realistic · Editorial · Casual phone photo
2. How many options to compare? 2 · 4
3. Save the one I pick as the character? Yes · No

**An existing character to use**
1. Which one? One of the characters from `characters_list` · A new one
2. For what? Photos · A video · A talking clip · An ad

## What the tools really do
- `character_save` saves an image as a character (`character_id`) with an optional default voice and up to 8 extra pose images in `sheet_images`.
- `build_sheet` draws a turnaround sheet from the main image. `build_lora` generates a dataset of new shots from the main image (and the sheet, if there is one) and trains a small identity model on that generated set. It does not train on your photos directly, so the main photo decides how faithful the result is. It takes about 25 minutes: follow it with `characters_list` (the `build` and the LoRA `status`).
- Nothing trains an identity from a pile of photos in one step. Several photos help the sheet and the polished version; the main photo carries the identity.
- A trained identity is used through the image model that needs one (`models_explore` lists it with `requiresLoraCharacter`). The director never picks it on its own: pass it as `model` with the `character_id`.

## What you pass and what the server decides
- You pass: `image` (the main photo), `sheet_images` (the supporting photos), `name`, `description` (one line on what must not change), `kind` `rift` for a real person, the builds the user chose, and `consent` on the user's word.
- The server decides: how the sheet and the dataset are drawn, the training, and which model draws a later image of the character (in `create`, the director picks it).
- Never pass: a model for the first save, or a build the user did not choose.

## Calls
Shapes only. The user's photos must reach Riftland first (`media_upload`, or `media_upload_widget`):
```json
{ "name": "Luna", "image": "<main photo: upload_id or ast_…>", "sheet_images": ["<side>", "<full body>"], "description": "mujer de 30 años, pelo corto rojizo, pecas", "kind": "rift", "build_sheet": true, "consent": true }
{ "kind": "rift", "prompt": "<the person in one paragraph>", "reference_images": ["<photo 1>", "<photo 2>"], "count": 4, "consent": true }
{ "request": "Luna tomando un café en Palermo, luz de la mañana", "kind": "image", "character_id": "<id>", "count": 2, "max_credits": 60 }
```
The first is `character_save`, the second `avatar_generate`, the third `create` (`plan` first, free). Reuse recipes for every tool: [Reusing the character](references/reuse-recipes.md).

## Spending
- `quote` `character_save` with the same arguments (it prices the sheet and the trained identity) and `avatar_generate`; tell the user the credits. Ask a separate yes for the trained identity: it is the most expensive step.
- Saving with no build is free. `create` calls with the character carry the `max_credits` the user agreed to.
- Low credits: share the buy link and offer the save without builds.

## Delivery
The character's image (and sheet) as URLs, then one summary line: what was made, the credits charged and the balance, and how to use it in one sentence ("Listo: Luna está guardada, 18 créditos, saldo 232. Pedime fotos de Luna cuando quieras."). Keep the character's id for later calls; show it only if the user asks. For a build in progress, say it takes about 25 minutes and offer to check later.

## Retries and caps
- A hard cap of 3 rounds of `avatar_generate` per request (up to 4 options each), and one build per request. Never rebuild or retrain unless the user asks.
- If a result looks unlike the person, look with `media_view`, say what differs and ask for a better main photo ([Photos that make a good character](references/photo-guide.md)); do not draw more rounds of the same photo.
- A failed build is refunded: say so, retry at most once and only when the error says it is transient.
- At most 2 retries of the same request.

## Does not do
- Make a character without the permission step when the photos are the user's own of a person.
- Invent a person from words (`ai-influencer`).
- Keep a product, place or object consistent (`consistent-elements`).
- Make a photo speak (`talking-avatar`) or edit a headshot (`pro-headshot`).
- Clone a voice: Riftland has no voice cloning; a recording from the user is how a voice is kept.
- Promise an exact likeness: the result depends on the main photo.

## Common mistakes
- Sending `consent: true` without asking, or because the user "seems fine".
- Saving a second character for the same person.
- Building the trained identity before the user saw the character in a normal image.
- Passing the trained identity's model on the first `create`, before the build is ready.
- Using a group photo or a covered face as the main photo.

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
- [Photos that make a good character](references/photo-guide.md) — read when the user is about to share photos, or the character looks different from the person.
- [Sheet and trained identity](references/build-options.md) — read when deciding whether to build a sheet or train the identity, or following a build.
- [Reusing the character](references/reuse-recipes.md) — read when the character is saved and the user asks for images, video, a talking clip or an ad with it.
Load one: open the file under `references/` next to this SKILL.md when the skill is installed; over MCP call `skill_get` with `skill_id` `my-character` and `reference` set to a file name from the list above.
