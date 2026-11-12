---
name: riftland-product-spin
description: "A 360-degree product spin, an orbiting or dolly product shot with an exact camera path, or a consistent set of product angles, from a photo or a 3D model. Use when: \"un video giratorio del producto\", \"los 6 ángulos de e-commerce\", \"una órbita alrededor del producto\", \"360 product spin\", \"turntable video\". NOT for: only the 3D file (use 3d-model); product photos by intent (use product-photoshoot); a new camera angle of one existing photo (use relight-and-angles)."
version: 1.0.0
---

# Product spin and consistent angles from 3D

Uses a 3D model as the skeleton of the shot: Riftland renders the GLB with an exact camera (matte clay by default, the best structure guide), then an optional photoreal pass turns the renders into realistic video or photos that keep that camera, perspective and silhouette. Result: a 360° product spin or a camera move that never drifts, and e-commerce angles that match each other.

## Ask only if missing
The product (photo, several photos or a .glb), what they want (spin video, angle set or both) and where it goes (store, Reels or TikTok, web hero). Infer the rest.

## Workflow
1. Model. A .glb already: upload it with `media_upload` (or pass its URL or asset id) and use it as `model`. Only photos: upload them and call `generate_3d` with the clean product photo(s) in `images` (one clear photo on a plain background works best); `jobs_wait` until the GLB is ready (15 s to a few minutes). Keep the photos: they are the `reference_images` of the photoreal pass.
2. Check the shape. Run `scene3d_angles` with `photoreal` off first (1 credit): `preset: turnaround-4` shows front, sides and back. If the mesh is wrong, regenerate it before spending on photoreal.
3. Spin video: `scene3d_video` with `camera_path: "turntable"`, `photoreal: true`, the product photos in `reference_images` and a `prompt` with the set (surface, background, light, mood). `aspect_ratio` 9:16 for Reels, TikTok and Stories, 1:1 for feeds, 16:9 for web. `duration` 5–8 s. `video_model`: `seedance-2.5` for best fidelity, `wan-3-prime` to save. `resolution` 720p (480p for drafts).
4. Other moves: `camera_path` orbit-arc (half orbit), push-in-hero (low hero push), dolly-in/dolly-out, crane-up/crane-down, top-down-spin. For an exact move pass `keyframes` (each with `t` seconds, `position`, `target`, `fov`, `easing`): the model is centered with radius 1, front facing +Z, and a camera at distance about 3.2 frames it whole.
5. Angle set: `scene3d_angles` with `preset: product-6` (front, 3/4, side, back, other 3/4, top) or contact-9, `photoreal: true`, the same `reference_images` and a `prompt` such as "professional e-commerce photo on pure white". Custom shots go in `views` (`azimuth` 0 = front, 90 = right side; `elevation` in degrees).
6. `quote` each call before running it and tell the user the price; then run them and `jobs_wait` with the job ids (videos 1–4 minutes).

## Without photoreal
`photoreal: false` returns the render itself for 1 credit: clay or the model's own textures (`material: "original"`), `lighting` studio, dramatic, daylight or neon, `background` "studio", a "#rrggbb" color or "transparent" (stills only). Good for previews, packshots of a clean model, and as guides for other tools.

## Cost (approximate)
Render alone: 1 credit. A photoreal 6 s spin at default prices: about 240 credits with Seedance 2.5 at 720p, 107 at 480p, 114 with Wan 3.0 Prime at 720p and 56 at 480p (price scales with the seconds). Photoreal angles: one Nano Banana Pro edit per view, about 19 credits each (about 112 for the 6-angle set, 168 for the contact sheet). `generate_3d` costs from 2 to about 160 credits depending on the model.

## Check before delivering
- The product's shape, label and logo match the photos in every frame or still; redo the ones that drift and say which.
- The spin is smooth and the product stays centered; a mesh with holes or a wrong back side shows up in the turnaround first.
- Angle sets: same light and background across the set.

## Next steps to offer
`upscale_media` on the best stills, a longer or different camera move, the same angles in another set or season, the GLB for their web viewer.

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
