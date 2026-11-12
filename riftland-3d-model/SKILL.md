---
name: riftland-3d-model
description: "A 3D model (GLB, STL, OBJ) of a product, character or prop from a description or photos, picking the right Riftland 3D engine. Use when: \"un modelo 3D de este producto\", \"quiero imprimirlo en 3D\", \"un asset 3D para mi juego\", \"make a 3D model from these photos\", \"GLB of my product\". NOT for: a 3D viewer embedded in a site (use web-3d-model); a turntable or camera-path video (use product-spin); a render that is just an image (use create)."
version: 1.0.0
---

# 3D model

Turns a description or photos of a product, character or prop into a textured 3D model (GLB) with Riftland (`generate_3d`), then hands over GLB, STL (3D printing) and OBJ links.

## Ask only if missing
- What the object is, or a photo of it. One clear photo on a plain background beats a busy scene.
- What it is for, when it changes the model: web/AR viewer, game engine, animation (rigging) or 3D printing.

## Choosing the model (`model`)
- From a photo, cheap and fast (about 45 s, 2–5 credits): trellis-2 (the default with `images`). `quality` draft = 512 preview, high = 1536 with 4K textures. It can also retexture an existing GLB: pass it as `mesh` with the new look in `images`.
- One object out of a real, cluttered photo: sam-3d. Name the object in `prompt` (for example "the red chair") or pass a `mask` (white = object).
- From text only, fast (about 1 min): hunyuan-3d-rapid (the default without images). `pbr` adds metal/roughness maps.
- 3D printing: hunyuan-3d-pro (watertight meshes). `quality` draft = geometry only, cheaper and enough for printing. Then STL via `model3d_convert`.
- Game assets: tripo-3.1. `low_poly`, `quad`, `parts` (separate editable pieces), `poly_count` up to 20000. Up to 4 views in `images` (front, side, back).
- Characters for animation: rodin-gen-2 with `pose` t-pose or a-pose (rig-friendly); `quality` high = HighPack, 4K textures (3× the price). Up to 5 views. meshy-6 is the best overall quality (also `pose`, `low_poly`, `quad`) but takes 4–6 minutes.
- Text on trellis-2 or sam-3d works too: Riftland first renders a clean product-shot concept image (included in the price) and builds the model from it.

## Workflow
1. Photos: Riftland results by id, public URLs as they are, otherwise `media_upload` and use the upload id in `images`.
2. `quote` with `tool: "generate_3d"` and the same arguments; share the credits and the expected time.
3. `generate_3d` with `wait_seconds` 30 or less, then `jobs_wait` until it completes (15 s to 6 min depending on the model).
4. Deliver the GLB link (view and download), the STL link (3D printing) and the OBJ link from the result text, plus the Riftland link where the model spins in an interactive viewer. For another GLB, `model3d_convert` with `media` and `format` (stl or obj).

## Prompting
- One object, described by shape, material, colors and style: "a ceramic coffee mug with a matte sage glaze and a wooden handle, minimalist product design". No scenes, no backgrounds, no camera words.
- Characters: full body, neutral standing pose, arms slightly away from the body, simple clothing silhouettes.

## Next steps to offer
- A cheaper draft first, then the same seed at high quality.
- STL for printing, OBJ for other 3D tools.
- Animate it: open the result in Riftland and use the Director 3D (Crear 3D → Director 3D) to stage it with camera moves and render a video.

## Gotchas
- Textures and PBR live in the GLB only: STL and OBJ are geometry.
- Thin parts (straps, antennas, hair strands) often come out thick or fused; mention it for printing.
- Draco-compressed GLBs can't be converted to STL or OBJ.

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
