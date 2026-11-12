---
name: riftland-app-icon
description: "An app icon, favicon, PWA icon set, apple-touch icon or Android adaptive icon, with the link tags and manifest wired into the project. Use when: \"el ícono de mi app\", \"un favicon para mi sitio\", \"íconos de PWA\", \"make an app icon\", \"apple-touch icon\". NOT for: a set of UI icons (use ui-icon-set); a logo as a vector (use logo-to-svg); a brand identity (use brand-kit)."
version: 1.0.0
---

# App icon and favicon set

A complete app icon set for a web or mobile app: favicon (16, 32, 48 and a multi-size favicon.ico), apple-touch-icon (180), PWA icons (192, 512), Android adaptive foreground (432) and the 1024 store icon, from one artwork. Engine: `ui_assets_generate` with `kind` `app_icon`.

## Ask only if missing
What the app is and the symbol or mood they want. Read the brand colors from the project (theme, Tailwind config, CSS variables) for `palette` and the tile color for `background` (a solid hex).

## Workflow
1. Write one item: the app's name, with a `description` of the symbol (for example a leaf with a coin, a paper plane). Pick a `style` (glossy-3d, clay-3d, glass, gradient or flat read well at small sizes).
2. `quote`, then `ui_assets_generate` with `kind` `app_icon`, `items`, `style`, `palette`, `background` and `target_dir`. The artwork is full-bleed (platforms round the corners) with the symbol inside the central safe zone.
3. `jobs_wait` until it completes, then `ui_assets_files` if the files weren't listed yet. Unzip into the public folder.
4. Wire it in: the favicon and apple-touch-icon link tags in the document head (in Next.js, the metadata icons field of the root layout), and the 192 and 512 icons in the web manifest (purpose any maskable). The README in the ZIP has the exact tags and manifest snippet. For Android native projects use the 432 foreground as the adaptive icon foreground layer.
5. Check the 16 and 32 favicons: if the symbol is unreadable, regenerate with a simpler description or a flat style.

## Next steps to offer
A matching icon set for the UI (ui-icon-set skill) with the app icon as `reference_images`, or a logo mark (`kind` `logo_mark`).

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
