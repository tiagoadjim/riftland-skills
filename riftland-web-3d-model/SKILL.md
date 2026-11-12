---
name: riftland-web-3d-model
description: "An interactive 3D model on a website: a viewer the visitor can rotate, with a poster image and the embed code wired into the codebase. Use when: \"un visor 3D de mi producto en la web\", \"que el cliente pueda girarlo\", \"un modelo 3D en mi landing\", \"interactive 3D product viewer\", \"AR-ready model\". NOT for: only the 3D file (use 3d-model); a spin video (use product-spin); a video that follows scroll (use scroll-video)."
version: 1.0.0
---

# Interactive 3D model on a website

A product or object the visitor can rotate on a page: Riftland builds the GLB (`generate_3d`), renders a poster still (`scene3d_angles`), and `web_embed` returns the download command and the embed snippet (model-viewer, or react-three-fiber with useGLTF) for the project's framework.

## 1. Read the project first (no credits)
- `framework` and the static folder (`target_dir`). Check package.json: if three or the react-three-fiber packages are already there, use them; otherwise model-viewer is the lighter path (one web component).
- The page and the slot: product gallery, hero or a configurator area, and its size on desktop and mobile.

## 2. Build the model
- Photos: upload them with `media_upload` (one clean photo on a plain background works best). Text only also works.
- `quote` with tool `generate_3d`, then `generate_3d`: trellis-2 for a cheap model from a photo, hunyuan-3d-pro for clean geometry, meshy-6 for the best quality. For the web keep it light: `low_poly` true or a lower `quality` when the model is small on screen.
- `jobs_wait` until it completes (15 s to 6 min).

## 3. Poster still
`scene3d_angles` with the GLB as `model` and `preset` hero-3 (`photoreal` false costs 1 credit; true makes it photographic). Use one still as the poster that shows while the viewer loads.

## 4. Embed it
- `web_embed` with `media` (the 3D job id or the GLB asset id), `framework` and `target_dir`. It returns the curl line (public/models/NAME.glb) and the snippet.
- model-viewer: npm i @google/model-viewer, import it on the client (in Next.js inside a client component, with a dynamic import in an effect), then the model-viewer element with src, alt, camera-controls, auto-rotate and a poster. Give it an explicit height.
- react-three-fiber: a Canvas with Stage and OrbitControls, useGLTF for the file and useGLTF.preload for a faster start.
- `web_embed` also embeds the poster still: call it with the still's id for its img snippet.

## Gotchas
- Weight: keep GLBs under about 5 to 10 MB. Compress with gltf-transform (npx @gltf-transform/cli optimize in.glb out.glb) when needed.
- Lazy-load the viewer below the fold, and show the poster first.
- AR on iOS needs a USDZ file; Riftland exports GLB, STL and OBJ.
- A model turning as the page scrolls is a video: render it with `scene3d_video` and follow the `scroll-video` skill.
- The signed links last 7 days: download the files into the repo, never hotlink them.

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
