---
name: riftland-motion-code
description: "Motion graphics you design and code yourself in a Riftland sandbox (HyperFrames: HTML and GSAP), checked with real frames and rendered to MP4; only the render is billed. Use when: \"diseñá vos el video con código\", \"animá este título escena por escena\", \"editá el código de mi video de Motion\", \"code the motion graphics yourself\", \"edit a Motion Studio video\". NOT for: letting Riftland's director animate from the brand kit with a prompt (use motion-graphics-promo); an explainer with narration (use explainer-video); AI footage (use create)."
version: 1.0.0
---

# Motion graphics you code (Motion Studio sandbox)

You are the motion designer. Riftland gives you a HyperFrames project in a sandbox: you write the HTML, CSS and GSAP, check it, look at real frames and render it to MP4. Riftland runs no AI director here and charges only the render. The result is a normal Motion Studio video (library, editor, editable project).

## Workflow
1. Brief: message, audience, format (16:9, 9:16, 1:1 or 4:5; 5–120 s), exact on-screen copy. Brand: `brands_list` (or `brand-kit` to make one).
2. Ideas: `motion_catalog` with a `query` (kinetic title, chart, logo reveal, transition, UI) — blocks are ready sub-compositions, components are effects to paste into a scene, examples are whole projects. `motion_catalog` with `id` returns an item's source and how to mount it. Read one or two, adapt them; never ship a block unchanged.
3. A Motion Studio request (brand, format, voiceover, music, captions) starts better with `motion_studio_generate`: it opens the sandbox and returns DIRECTOR.md with the brief and art direction. Otherwise `motion_sandbox_create`: `aspect_ratio`, `duration_seconds`, `brand_id` (themes the project), `product_ids`, `assets` (Riftland files → project paths), and `from` = a block or example id to start from it, or a finished Motion Studio job id to edit that video. You get every file and index.html.
4. Plan the beats on paper: scene, seconds, what moves, the copy. Then write: `motion_sandbox_write` with `write` (whole files), `patch` (find/replace; copy the find text exactly from the file) and `delete`. Each call lints and returns the findings: fix errors right away. `motion_sandbox_files` lists the files or reads them (`paths`) when you need the exact text to patch.
5. Look: `motion_sandbox_check` with `frames` at the middle of every scene, on transitions and the last frame (up to 8). You get layout, contrast, runtime and network findings plus the frames as images. Judge them like a designer (hierarchy, legibility, spacing, safe margins, nothing cut off) and iterate until there are no errors and the frames look right.
6. `quote` with `tool` motion_sandbox_render and the same arguments, tell the user the credits, then `motion_sandbox_render` with `sandbox_id`, a `title`, `quality` (draft to preview, standard to publish, high for hero pieces) and `fps`. Then `jobs_wait` until it finishes (1–10 min) and deliver the links.
7. Changes after the render: keep editing the same sandbox and render again, or later open the video with `from` = its job id.

## The HyperFrames contract (break it and the render fails)
- index.html: one root div in body with data-composition-id, data-start="0", data-duration (whole seconds, 5–120), data-width and data-height equal to the canvas (1920×1080, 1080×1920, 1080×1080 or 1080×1350). Size the root with 100%, never hardcoded pixels.
- Timed elements: class="clip" with data-start, data-duration and data-track-index. The runtime shows and hides clips: never tween display, visibility or autoAlpha on a clip; animate a child.
- One paused timeline per composition, registered under the composition's id: window.__timelines["main"] = gsap.timeline({ paused: true }). GSAP is local at vendor/gsap.min.js. The render seeks the timeline: build every tween on it, at absolute positions.
- Scenes as sub-compositions: compositions/intro.html wraps its root in a template element (style and script inside the template), registers its own timeline with the same id, and index.html mounts it with a div that has data-composition-src, data-start and data-duration. Prefix ids and classes with the scene id.
- Deterministic: no Date, timers or unseeded random driving visuals; a repeat of -1 only inside a finite duration.
- No network: the sandbox is offline, so CDN scripts, web fonts, remote images and fetch fail. Put media in the project with `assets` and fonts with @font-face to local files (the brand kit's are already in brand/theme.css). Use the brand tokens: var(--bg), var(--fg), var(--brand), var(--accent), var(--font-display), var(--font-body).
- Audio: narration with `motion_sandbox_voiceover` (free local voice; one WAV per scene with its duration and word timings for captions) or `generate_audio` for music and premium voices, copied in with `assets`. Place each file as <audio id class="clip" data-start data-duration data-track-index src> on its own track; data-volume (0–1) lowers music under the voice.
- Media: video and audio elements need an id; no crossorigin attribute; don't time a video and its wrapper both.
- Don't pair a CSS transform with a GSAP tween on the same property: set start states with gsap.set or fromTo, center with flex or inset.

## Craft (what makes it look premium)
- One idea per scene; 3–6 scenes in 15 s. Hook in the first second, CTA held at least 1.5 s at the end.
- Type is the image: big display sizes (8–14% of the short side for headlines), tight tracking, at most two families, 2–7 words per line, no line breaks inside sentences.
- Motion: ease out on entries ('power3.out', 'expo.out'), ease in on exits, 0.4–0.8 s per move, staggered 0.04–0.08 s. Every scene owns its exit and the next its entry; cut on motion, not on stillness.
- Depth: layered parallax, a slow push-in or scale on the hero, subtle grain or gradient, never everything moving at once.
- Contrast: text over images gets a scrim; keep 6% safe margins (more on 9:16 for app UI overlays).
- Frames are the truth: if a snapshot looks crowded, cut copy, don't shrink it.

## Rules
- Don't render with lint errors; fix check errors (layout overflow, contrast) or explain why a warning is fine.
- Quote first; over 100 credits wait for a yes. A render charges by seconds, quality and fps; checks and snapshots are free but rate-limited.
- Sandboxes expire after 24 h idle. A finished video stays editable: start a new sandbox from its job id.
- Copy, claims, prices and dates come from the user or the brand kit: ask, don't invent.

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
