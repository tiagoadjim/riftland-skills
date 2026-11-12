---
name: riftland-product-mockup
description: "A logo, print or design shown on real products (t-shirts, mugs, bags, boxes, billboards), or a product photo placed on a clean or lifestyle background. Use when: \"mostrame mi logo en una taza\", \"mockup de remera\", \"mi diseño en un cartel\", \"put my logo on a t-shirt\", \"packaging mockup\". NOT for: photos of the product itself by intent (use product-photoshoot); garments on a person (use virtual-try-on); turning the logo into a vector (use logo-to-svg)."
version: 1.0.0
---

# Product mockups

Show a logo, print or design on real products, or put a product photo in the right setting, with `edit_image`: `action` mockup for designs on products, replace_background and expand for product photos.

## Ask only if missing
The design (a logo or artwork; a PNG with a transparent background works best) and which products. Default to three popular ones (t-shirt, mug, tote) when the user doesn't say.

## Mockups (`action` mockup)
- `preset` is the product: tshirt, hoodie, mug, tote, cap, `phone_case`, box (packaging), bottle, billboard, `business_card`, poster.
- `color` in words for the product itself ("black", "navy blue", "kraft paper").
- The design is reproduced as given (same text, colors and proportions) and follows the product's shape and light. One product per call; about 19 credits each.
- `prompt` for the scene ("on a café counter", "worn by a young woman outdoors").

## Product photos
- Clean catalog shot: `action` replace_background with `preset` white; lifestyle: kitchen, wood, marble, outdoor or a `prompt`. About 6 credits.
- Each marketplace or social format: `action` expand with `aspect_ratio` (1:1 marketplace, 4:5 feed, 9:16 stories) after the background is right.
- For a full shoot from a product link, use the `product-shots` skill instead.

## Workflow
1. Files: Riftland results by id (`ast_…` or `job_…`), public file URLs as they are; otherwise `media_upload` and use the `upload_id`.
2. `quote` the plan (one call per product and format) and confirm when it goes over 100 credits.
3. Launch the calls, then one `jobs_wait` with every job id (about 30–45 s each).
4. Deliver a short gallery with the links and offer more products, other colors or the formats for each channel.

## Gotchas
- Tiny or blurry logos come out soft: vectorize or upscale them first (`vectorize`, `creative_upscale` with `mode` precision).
- Very long text in the design may get distorted on curved products (mugs, bottles, caps): prefer flat products for text-heavy art.
- Don't add brands, slogans or prices the user didn't give.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:references-and-roles`: References and their roles. File: `riftland-prompting/references/technique-references-and-roles.md`
- `technique:product-photography`: Product photography looks. File: `riftland-prompting/references/technique-product-photography.md`
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
