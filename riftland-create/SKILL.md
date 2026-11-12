---
name: riftland-create
description: "Default entry for any make-me-X request: plan (free, shows the plan and its price), then create within the budget the user agreed to; Riftland's director picks the model and format and writes the prompt. Use when: \"make me an image of…\", \"haceme una foto de…\", \"un reel para Instagram\", \"un póster\", \"cambiá solo el fondo\". NOT for: brand product images by intent (use product-photoshoot); YouTube thumbnails (use youtube-thumbnail); UGC or creator ads (use ugc-video-ad); ad campaigns (use static-ads-campaign); short films (use cinema-film); motion graphics (use motion-graphics-promo); a talking presenter (use talking-avatar)."
version: 1.0.0
---

# Create an image or video

The default for any "make me X": an image, a video, a reel, a poster, a product photo, a cinematic shot, a logo. Riftland's director decides what to make, with which model and format, and writes the final prompt. You pass the request, handle the price and the questions, and deliver. Tools: `plan` (free) and `create` (spends credits).

## Recipe
1. `plan` with `request`: the user's words. It creates nothing and returns the plan (what it will make and why), the price, the balance, and `needs_input` questions or a `handoff` when they apply.
2. Show the plan in one or two lines with its price and ask for the go: "Foto de producto, 1:1 · 24 créditos (saldo 310). ¿La hago?". The price the user accepts is the `max_credits`.
3. `create` with the same fields, that `max_credits` and the `direction_id` from `plan`, so it makes exactly the plan you showed. It generates, waits and returns the results; if a video is still running, `jobs_wait` with its job id.
4. Deliver (see Delivery).

A budget the user already stated ("hasta 100 créditos") that covers the price is a yes: skip step 2. With such a budget and a plain request you may start with `create`; a price above the budget comes back as the plan, with nothing spent.

## Rules
**Request.** Pass `request` in the user's own words and language, as they said them. Do not write, translate or embellish a prompt, and do not choose the model. Fill `kind`, `format`, `count`, `model` or `references` only with what the user asked for or attached (a saved character goes in `character_id`); the server chooses the rest and the plan says why. `mode: "raw"` only when the user gives an exact prompt and wants it sent as written (it needs `kind`). Anything about models: ask `models_explore`, don't answer from memory.

**Questions.** Ask only what `needs_input` returns: at most 4, each shown with its options as labeled options, skipping any the conversation already answers. Then call `plan` again with `answers` (question id → the label the user chose, or their own words). Never add questions of your own.

**Spending.** Never call `create` without a `max_credits` the user agreed to in this conversation (a standing budget they stated counts). When the result is `over_budget` (the price is above `max_credits`, nothing was spent), show the price and ask; never retry with a higher number on your own.

**Handoffs.** When the result is a `handoff`, nothing was spent: switch to that studio's skill (`skill_get`) and call the tool it names, telling the user why in one sentence ("Esto lo hace mejor Marketing Studio: es un anuncio").

**Skills on top of `create`.** Some requests have their own recipe over the same tools: a YouTube thumbnail is `youtube-thumbnail` (concepts first), product images by intent are `product-photoshoot`, a series with one look is `social-carousel`. Load that skill with `skill_get` instead of improvising.

**Delivery.** The result URLs and one summary line: what was made, the credits charged, the balance ("Listo: 2 fotos de tu café, 38 créditos, saldo 272."). No ids, no JSON and no assembled prompt unless the user asks. Reply in the user's language.

**Changes.** For "change only X" on an image (one Riftland made, or one of the user's in the library), call `plan` and `create` with `change_of` set to its id (`job_…`, `job_…#2` for a job's second image, or `ast_…`) and `request` set to only the change, in the user's words ("cambiá solo el fondo a una playa"). Don't describe the rest of the picture and don't write what must stay: Riftland attaches the image, picks an editing model, keeps the original's format and states "keep everything else" once. Leave `model` and `format` out unless the user asked for them (the plan says what it kept from the original). The `director` block of the result names the source job in `change_of`, and the new result is the source of the next change: pass its job id. Only images can be changed: for a video, make a new one or animate an image. Never regenerate from scratch with a longer prompt, and use `references` only for extra images that guide the change (a logo to place), not for the image being changed. A series works the same way: each accepted result is the source of the next.

**Retries.** A failed generation is retried at most once, and only when the error says it is transient. Any other error: show its own fix, from the table.

## Reading `model_notes` and `next_steps`
A plan you can generate, and the result of `create`, carry `model_notes` for the model chosen: `why` (the router's reason and what the model is for), `prompting` (two or three hints for asking it), `limits` (what matters for this request) and `card` (a ref that `guide` opens with `topic`). Read it before you change the prompt, the model or the format: it says what the plan already did, and it gives you one line to tell the user. Do not rewrite the request to follow its hints; the director already did.
`next_steps`, on a plan and on a result, are workflows worth offering once the result is in (each has `ref`, `title` and `why`). Offer one in a line when it helps; to run it, call `guide` with `topic` set to its `ref` (skill `workflows`). `guide` is free and also reads a model's card (skill `models`) or a technique when a result went wrong (skill `prompting`).

## Errors and fixes
| The error says | Do |
|---|---|
| "No te alcanzan los créditos." | Don't retry. Give the balance and the buy link (`account_overview`) and offer a cheaper ask: fewer images, a shorter or smaller video. |
| `over_budget`, or "Este trabajo cuesta N créditos y tu tope (max_credits) es M" | Nothing was spent. Show the price and ask; offer something cheaper. |
| "Ese plan ya no está disponible (venció o no es tuyo)" | Plans last 30 minutes: call `plan` again, and ask again if the price changed. |
| "Ese plan es de imagen y pediste video" (or the reverse), "Ese plan no corresponde a este pedido" | Call `plan` again with the `kind` the user wants. |
| "No podemos generar…" (blocked content) | Don't rephrase to get around it. Tell the user and offer a different idea. |
| "No pudimos cumplir lo que elegiste: …" (no model can do that) | The choices don't fit together. Show the message and ask which one to relax, or drop `model` and `format`. |
| "La planificación del director de Riftland no está activada en el MCP." | Use `generate_image` or `generate_video` directly, with `max_credits`: the prompt is yours then, from the user's words (subject, setting, light; for video the action and the camera). |
| "Indicá kind (image o video)…" | Add `kind`. |
| "No encontramos esa imagen en tu cuenta…" (`change_of`) | It isn't one of the user's own finished images: find it with `media_list`, or ask which result they mean. |
| "Por ahora no se puede cambiar un video: solo imágenes…" | Only images can be changed. Make a new video with `create`, or animate an image. |
| Anything else | Retry once if it says it is temporary; otherwise show it as it is. |

## Next
Offer one next step when it helps: a variation, a bigger version (`upscale_media`), another format, a video from the image.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:image-prompting`: Prompting an image. File: `riftland-prompting/references/technique-image-prompting.md`
- `technique:video-prompting`: Prompting a video. File: `riftland-prompting/references/technique-video-prompting.md`
- `technique:editing-and-changes`: Editing and changing a result. File: `riftland-prompting/references/technique-editing-and-changes.md`
- `technique:troubleshooting`: Troubleshooting: what went wrong and what to change. File: `riftland-prompting/references/technique-troubleshooting.md`
- `workflow:image-to-video`: Image to video. File: `riftland-workflows/references/workflow-image-to-video.md`
- `workflow:change-chain-and-upscale`: Change chain, then upscale. File: `riftland-workflows/references/workflow-change-chain-and-upscale.md`
- Which model fits what: skill `models` (when installed from the repository: `riftland-models/references/models-index.md`).

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
