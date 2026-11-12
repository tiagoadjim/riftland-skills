---
name: riftland-ui-icon-set
description: "A consistent icon or illustration set for an app or website, exported as transparent PNGs, WebP or SVG into the repo with a name-to-path map. Use when: \"un set de íconos para mi app\", \"íconos 3D de arcilla\", \"ilustraciones de estados vacíos\", \"icon set for my website\", \"stickers and badges\". NOT for: an app icon or favicon set (use app-icon); a single logo as SVG (use logo-to-svg); the graphics around a dashboard (use app-graphics)."
version: 1.0.0
---

# UI icon set for a codebase

You are coding an app or website and need icons, spot illustrations, stickers or badges that look like one family — for example soft 3D clay icons — and you want the files in the repo, wired into the components. Engine: Riftland UI asset sets (`ui_assets_generate`).

## 1. Read the project first (no credits)
- Find the current icons and how they are used: an icon library import, SVG components, img tags or next/image, and the public or static folder they are served from.
- Find the design tokens: the Tailwind config, CSS variables or theme file. Take 3–6 brand colors as hex for `palette` (or use a saved brand with `brand_id` from `brand_get`).
- List the identifiers the new assets replace (for example home, projects, team, billing, settings). Those become the item names, so the files line up with the code.

## 2. Choose the look
- `ui_assets_styles` lists the presets: clay-3d (soft matte clay, the default), glossy-3d, glass, isometric, flat, outline, duotone, gradient, soft-ui, pixel-art, hand-drawn, paper-cut, low-poly, sticker, emoji-3d.
- Kinds (`kind`): `icon` (UI icons), `illustration` (empty states, onboarding), `sticker`, `badge`, `logo_mark`, `app_icon` (use the app-icon skill).
- To match existing art, upload one to three current icons with `media_upload` and pass the `upload_id` values as `reference_images`. Add `style_prompt` for anything the preset misses (stroke weight, corner radius, mood).
- Line or flat styles can also get vector files: `formats` with `svg` (flat, outline, duotone, gradient, isometric, pixel-art, hand-drawn, sticker only). `webp` adds WebP copies.
- `quality`: `quality` (GPT Image, best) or `fast` (Nano Banana 2, cheaper, background removed afterwards).
- `transparency` (quality sets with a transparent background): `native` (default; the model draws the alpha itself: best for glass, glossy highlights and soft edges, about three times the price of `cutout` per item) or `cutout` (a flat backdrop plus background removal: cheaper, crisp edges, may erase translucent parts). Quote both when the set is large and let the user pick; use `cutout` for flat, outline and sticker styles.

## 3. Generate
1. `quote` with tool `ui_assets_generate` and the same arguments; tell the user the credits.
2. `ui_assets_generate` with `items` (one per identifier; add a `description` when the name is ambiguous), `kind`, `style`, `palette`, and `target_dir` (the public folder: public for Next.js and Vite, static for SvelteKit). The first item sets the style for the rest, so put the most representative item first.
3. Sets take about 30 s per item. If it is still running, `jobs_wait` with the job id until it completes, then `ui_assets_files` with `job_id` and `target_dir`.

## 4. Put the files in the repo
- The result has a ZIP whose folders mirror the public folder (icons/NAME/NAME-SIZE.png, optional NAME.svg) plus manifest.json and an index.ts that maps each name to its paths. Run the ready unzip command, or the per-file curl lines when only a few files are needed.
- Wire them in: an img tag or next/image with explicit width and height, or import the SVG where the project does that. Use one size per context (for example 24 px in nav, 64 px in empty states), and pick the exported size that matches (or 2× for retina).
- Keep the index.ts map if the project likes typed names; otherwise reference the paths directly. Remove the old icon imports you replaced.

## 5. Iterate cheaply
Fix one item at a time: call `ui_assets_generate` with just that item, the same `style`, `palette` and `seed`, and two or three good items of the set as `reference_images`. Never regenerate the whole set for one bad icon.

## Example
```json
{ "items": ["home", "projects", "team", { "name": "billing", "description": "a credit card with a coin" }, "settings"],
  "kind": "icon", "style": "glass", "palette": ["#6366F1", "#22D3EE", "#F8FAFC"], "sizes": [24, 48, 96],
  "target_dir": "public" }
```

## Gotchas
- Item names become file names (kebab-case): name them after the code, not after the drawing.
- Transparent PNGs are trimmed and centered with the same padding, so icons line up at every size. For tiny sizes (16–24 px) prefer flat or outline styles: 3D detail disappears.
- Up to 48 items per call; for bigger libraries split by section and reuse the first set as `reference_images`.
- The signed links last 7 days: download the files into the repo, don't hotlink them.

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
