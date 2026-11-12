---
name: riftland-virtual-try-on
description: "Dress a person or model photo in one to three garments from product or flat-lay photos, keeping the person's face, pose and body. Use when: \"probame esta ropa virtualmente\", \"vestí a la modelo con estas prendas\", \"un lookbook de mi tienda\", \"virtual try-on for my store\", \"outfit on a model\". NOT for: product photos with a model by intent (use product-photoshoot); a logo on garments (use product-mockup); a clothing change inside a video (use character-swap)."
version: 1.0.0
---

# Virtual try-on

Dress a person in garments from product photos with `edit_image` and `action` try_on: one photo of the person in `image` and one to three garment photos in `garments`. The face, pose, body and background stay; only the clothes change.

## Ask only if missing
The person's photo and the garments. If the user only has a garment, offer a model photo they own or one generated first with `create` (a plain full-body shot on a neutral background, within the user's `max_credits`).

## Inputs that work
- Person: full body or waist up, facing the camera, arms not covering the torso, good light, one person.
- Garments: one garment per photo, alone, flat-lay or on a hanger, on a plain background; product photos from the store are ideal. A garment worn by someone else also works; then say in `prompt` which piece to take ("the denim jacket, not the shirt").
- A full outfit: up to three garments in the same call (for example a jacket, pants and shoes).

## Price and time
About 3 credits for one garment, 4 for two, 5 for three; 15–30 s per try-on.

## Workflow
1. Files: Riftland results by id (`ast_…` or `job_…`), public file URLs as they are; otherwise `media_upload` and use the `upload_id`.
2. `quote`, then `edit_image` with `action` try_on, `image` and `garments`.
3. Several outfits or sizes of the same look: one call each, then one `jobs_wait` with every job id.
4. For a store: offer a clean background afterwards (`edit_image` with `action` replace_background, `preset` white) and the formats for each channel (`action` expand).

## Gotchas
- Garment details (logos, prints, buttons) follow the product photo; a blurry garment photo gives a blurry garment.
- Very loose or layered pieces may be simplified; try one garment at a time if the combination looks off.
- Only use photos of people who agreed to it.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:references-and-roles`: References and their roles. File: `riftland-prompting/references/technique-references-and-roles.md`
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
