---
name: riftland-scroll-video
description: "A scroll-driven video for a website (Apple-style scrubbing hero), generated or reused and made scrub-ready, with a component wired into the repo. Use when: \"un hero que avance con el scroll\", \"un video que se mueve al scrollear\", \"scroll-scrubbing video for my landing\", \"3D object turning as I scroll\". NOT for: a looping background (use hero-video-loop); images for the site (use web-images); an interactive 3D model (use web-3d-model)."
version: 1.0.0
---

# Scroll-scrub video for a website

A video that advances as the visitor scrolls (the Apple product-page effect): a tall section keeps the video pinned while the scroll position drives its time. Riftland generates or reuses the clip and makes it scrub-ready: an H.264 MP4 with a keyframe on every frame (instant seeking in both directions), an optional 9:16 cut for phones, a WebP frame sequence for a canvas variant and posters, plus a ready component, a vanilla HTML demo, README and manifest. Engine: `web_video` with `kit` "scroll".

## 1. Read the project first (no credits)
- Framework: Next.js (App Router or Pages), React with Vite, Vue or Nuxt, SvelteKit, Astro or plain HTML. Pass it as `framework` (next, react, vue, svelte, astro, html).
- The static folder: public for Next.js, Vite and Astro, static for SvelteKit. Pass it as `target_dir`.
- Where components and modules live (src/components, components, src/lib) and the page or section that gets the asset.
- The look: design tokens in the Tailwind config, CSS variables or theme file (brand colors as hex), light or dark background, the mood of the copy.

## 2. Pick the source
- A prompt: one object or scene and one slow camera move (orbit, push-in, crane). Riftland adds the scroll direction itself (one continuous take, steady camera, no cuts, no on-screen text). Good subjects: a product turning, a flight through a space, an object assembling.
- A product photo: upload it with `media_upload` and pass the upload as `start_image` (and `end_image` for the final pose). The clip starts on the real product.
- A 3D model, for the most controlled rotation: `generate_3d` from the product photo, `jobs_wait`, then `scene3d_video` with `camera_path` "turntable" (or orbit-arc, push-in-hero), `photoreal` true and the photo in `reference_images`. When it completes, pass its video to `web_video` as `video`.
- An existing clip: pass it as `video` (2 to 20 s). Only the processing fee is charged.

## 3. Choose the options
- `model`: default `kling-2.6` (cheap 1080p with first and last frame); `kling-3` or `veo-3.1-fast` for more realism; `seedance-2.0-fast` for 720p drafts.
- `duration` 5 s for most heroes (4 to 8 s read well; every second adds weight). `aspect_ratio` 16:9 for desktop heroes, 9:16 for mobile-first pages.
- `camera_move`: a library id such as `orbit-360`, `arc-left`, `dolly-in`, `crane-up` or `lazy-susan` (`presets_list` with source camera lists them all).
- `mobile` true adds a 9:16 center cut for portrait phones: keep the subject centered in the prompt.
- `frames`: the WebP sequence for the canvas variant (default 120, 0 = none). Skip it when the site only needs the video.
- `name`: the folder (videos/NAME/) and the default paths baked into the component.

## 4. Generate
1. `quote` with tool `web_video` and the same arguments; tell the user the credits.
2. `web_video`. Generating takes 2 to 5 minutes: `jobs_wait` until it completes, then `web_kit_files` with `job_id`, `target_dir` and `framework`.

## 5. Put it in the repo and wire it
- Run the unzip line from `web_kit_files`: the media lands in the static folder (videos/NAME/), and the unzip -p lines put the component in the components folder. The per-file curl lines work too.
- React and Next.js: import ScrollVideo and render it where the hero goes, with the headline and CTA as children (they sit over the pinned video). It is a client component, so a Next.js server page can render it. ScrollFrames is the canvas variant: frame-exact everywhere, heavier to download.
- Vue, Svelte and Astro get their own component file; plain HTML gets a demo page to copy from. The README in the ZIP shows every framework plus a GSAP ScrollTrigger alternative.
- Preload the poster (the LCP image) with fetchpriority high and give the section a background color that matches the clip.
- Test it: scroll slowly down and up, on a phone too. The clip must move both ways without jumps.

## 6. Iterate cheaply
- Wrong motion or subject: run `web_video` again with a sharper prompt or another `camera_move`, same options.
- Right clip, wrong packaging (more frames, a mobile cut, another framework): pass the kit's MP4 or the original clip as `video`: processing fee only.
- Too heavy: fewer `frames`, a shorter `duration` or 720p.

## Gotchas
- A keyframe on every frame makes the MP4 several MB for 5 s at 1080p: that is the price of instant seeking. Place the section near the top or mount it lazily.
- iOS Safari needs muted and playsinline, and the video must play once before seeking paints: the component does it. Keep those attributes.
- prefers-reduced-motion shows the poster instead of the video: keep that branch.
- No text or logos inside the clip: they smear while scrubbing. Put the copy in HTML over the video.
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
