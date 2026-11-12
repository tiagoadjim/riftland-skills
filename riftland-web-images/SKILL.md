---
name: riftland-web-images
description: "Production images for a website or app: heroes, Open Graph cards, thumbnails and covers, exported as responsive AVIF, WebP and JPEG with a typed images file. Use when: \"imágenes para mi landing\", \"la imagen de Open Graph de 1200x630\", \"portadas para el blog\", \"hero images for my site\", \"responsive images with srcset\". NOT for: placeholder images for seed data (use placeholder-images); the graphics around a dashboard (use app-graphics); a YouTube thumbnail (use youtube-thumbnail)."
version: 1.0.0
---

# Responsive web images

Production images for a website or app, exported the way the web needs them: each image at several widths in AVIF, WebP and JPEG (PNG when transparent), a tiny blur placeholder, the dominant color, a typed images.ts (name → src, srcSet per format, width, height, alt) and a README with picture, next/image, Astro, Vue and Svelte snippets. Engine: `web_images`.

## 1. Read the project first (no credits)
- Framework: Next.js (App Router or Pages), React with Vite, Vue or Nuxt, SvelteKit, Astro or plain HTML. Pass it as `framework` (next, react, vue, svelte, astro, html).
- The static folder: public for Next.js, Vite and Astro, static for SvelteKit. Pass it as `target_dir`.
- Where components and modules live (src/components, components, src/lib) and the page or section that gets the asset.
- The look: design tokens in the Tailwind config, CSS variables or theme file (brand colors as hex), light or dark background, the mood of the copy.
- Find how images are rendered today (next/image, picture, plain img, CSS backgrounds) and which one is the LCP element.

## 2. Choose the use and the items
- `use` sets the aspect, the default widths and the art direction: hero (640 to 2560 px), og (exactly 1200×630, JPEG for crawlers), card, blog, background (calm, text-friendly), pattern (seamless tile + CSS), avatar, product, illustration. One call per use.
- `items`: one per image, with `name` after the identifier the code will use (hero-home, og-default, card-billing) and a `prompt`. Add `alt` for meaningful images; backgrounds and patterns stay decorative.
- `consistent` true makes the first image the style reference of the rest: use it for a family of cards or covers.
- `style_prompt` for the shared art direction and `palette` with the brand hex colors.
- `model`: default `seedream-4.5` (4 MP, cheap: native 2560 px heroes). `flux-2-pro` follows hex colors closely; `nano-banana-pro` or `gpt-image-2` when text must appear. An OG card with `headline` draws the text with `gpt-image-2` by default.
- Existing images: `images` (upload with `media_upload`) to get the same responsive set for only the processing fee; `aspect_ratio` crops them.
- `widths` and `formats` override the defaults (files are never upscaled).

## 3. Generate
1. `quote` with tool `web_images` and the same arguments; tell the user the credits.
2. `web_images` waits up to `wait_seconds`; if it is still running, `jobs_wait`, then `web_kit_files` with `job_id`, `target_dir` and `framework`.

## 4. Put them in the repo and wire them
- Run the unzip line (images/NAME/ into the static folder) and copy images.ts into the source (for example src/lib).
- Next.js: next/image with src, width, height, alt, sizes, placeholder blur and blurDataURL from images.ts; priority on the hero. To serve these exact files instead of re-encoding, add unoptimized or use the picture markup.
- Other frameworks: a picture element with AVIF and WebP sources and the JPEG as img, width and height set (the README has each snippet).
- OG: absolute URL in og:image with width 1200 and height 630 (in Next.js, metadata.openGraph.images).
- Patterns and backgrounds: images.css has one class per image with image-set() and the dominant color.

## 5. Iterate cheaply
Regenerate only the image that is off: one item, same `use`, `style_prompt` and `palette`, and `consistent` with a good image of the set first in `items`.

## Gotchas
- Always width and height (or aspect-ratio): no layout shift.
- sizes decides which width the browser downloads: match it to the layout, not 100vw everywhere.
- Above the fold: fetchpriority high, never lazy. Everything else: loading lazy.
- The signed links last 7 days: download the files into the repo, never hotlink them.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:image-prompting`: Prompting an image. File: `riftland-prompting/references/technique-image-prompting.md`
- `technique:text-on-image`: Text on an image. File: `riftland-prompting/references/technique-text-on-image.md`

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
