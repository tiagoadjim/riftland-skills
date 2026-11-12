---
name: riftland-hero-video-loop
description: "A seamless looping background or hero video for a website or app, exported light with posters and wired in as a component. Use when: \"un video de fondo en loop\", \"un hero animado para mi landing\", \"un fondo vertical 9:16 para el celular\", \"seamless looping background\", \"background video for my site\". NOT for: a video driven by scroll (use scroll-video); still images for the page (use web-images); a promo video with a message (use app-promo-video)."
version: 1.0.0
---

# Seamless background loop for a website or app

A hero or section background that loops forever without a visible cut, light enough for the first screen. Riftland generates or reuses the clip, crossfades its last second into the first one, and exports a 1080p MP4, a 720p MP4, an optional VP9 WebM, an optional 9:16 cut and posters, plus a BackgroundVideo component (muted autoplay, pauses off screen and for reduced motion), a vanilla HTML demo, README and manifest. Engine: `web_video` with `kit` "loop".

## 1. Read the project first (no credits)
- Framework: Next.js (App Router or Pages), React with Vite, Vue or Nuxt, SvelteKit, Astro or plain HTML. Pass it as `framework` (next, react, vue, svelte, astro, html).
- The static folder: public for Next.js, Vite and Astro, static for SvelteKit. Pass it as `target_dir`.
- Where components and modules live (src/components, components, src/lib) and the page or section that gets the asset.
- The look: design tokens in the Tailwind config, CSS variables or theme file (brand colors as hex), light or dark background, the mood of the copy.
- Check where the copy sits over the video: the clip must stay calm behind it.

## 2. Pick the source
- A prompt: gentle continuous motion that could repeat forever (steam, clouds, water, slow particles, light moving across a surface, fabric in the wind). Riftland adds the loop direction (no cuts, locked or very slow camera, no text). Avoid people walking in and out and anything that starts or ends.
- An image: pass it as `start_image` (upload with `media_upload`). Models with a last frame end on the same image, so the loop closes by itself.
- An existing clip: pass it as `video` (2 to 30 s): processing fee only. Any clip is made seamless by the crossfade.

## 3. Choose the options
- `aspect_ratio` 16:9 for desktop heroes; 9:16 for vertical heroes, stories and app previews; 1:1 for cards.
- `mobile` true adds a 9:16 cut for portrait phones (the component switches with a media query).
- `formats` with `webm` adds a VP9 file, smaller in Chrome, Firefox and Edge.
- `duration` 5 s is enough (the crossfade takes up to 1 s); `model` default `kling-2.6`, `camera_move` `static` or a slow one such as `dolly-in`.
- `name`: the folder (videos/NAME/) and the default paths of the component.

## 4. Generate
1. `quote` with tool `web_video` and the same arguments; tell the user the credits.
2. `web_video`. Generating takes 2 to 5 minutes: `jobs_wait` until it completes, then `web_kit_files` with `job_id`, `target_dir` and `framework`.

## 5. Put it in the repo and wire it
- Run the unzip line from `web_kit_files` (media into the static folder) and the unzip -p lines (component into the components folder).
- Wrap the hero content in BackgroundVideo (React and Next.js, or the Vue, Svelte or Astro file); plain HTML copies the demo markup. Give the wrapper a min-height and a fallback background color.
- Keep text readable on every frame: a dark gradient overlay or a text shadow.
- Preload the poster with fetchpriority high: it is the first paint and the reduced-motion image.

## 6. Iterate cheaply
- Motion too busy or a visible jump: regenerate with calmer motion words, or pass the clip as `video` again.
- Another framework, a mobile cut or WebM later: `web_video` with the kit's MP4 as `video`: processing fee only.

## Gotchas
- Weight budget above the fold: aim for 2 to 4 MB. The kit includes a 720p file for small heroes and slow connections.
- Autoplay only works muted and inline (muted + playsinline). Never expect sound.
- Source order matters: the 9:16 file with its media query, then WebM, then MP4.
- Off-screen videos should pause (the component uses IntersectionObserver).
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
