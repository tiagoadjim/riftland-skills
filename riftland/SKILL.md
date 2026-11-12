---
name: riftland
description: "The map of Riftland's MCP: how its tools, credits, files and jobs fit together, and which skill to load for each request. Use when: \"¿qué puedo hacer con Riftland?\", \"¿cuántos créditos tengo?\", \"subí este archivo\", \"what is the status of my job\", \"which Riftland skill should I use\". NOT for: making an image or a video from a plain request (use create); brand product images by intent (use product-photoshoot); a workflow that has its own skill, which the routing table of this skill names."
version: 1.0.0
---

# Riftland MCP

Riftland (https://riftland.io) is an AI image and video platform. Its MCP server (https://riftland.io/mcp) gives you every Riftland studio with the user's account and credits. This is the map: how the tools fit together, the rules for every job, and which workflow skill to load for each request.

## Golden rules
1. Reply in the user's language. Tool errors and job stages arrive in Spanish: translate when needed.
2. Ask only what you can't infer (usually the subject, and the product or brand link if there is one): at most 4 questions, as labeled options. Default the rest and state your defaults in one line.
3. Reuse before creating: `brands_list` and `brand_get` (brand kits and products), `characters_list` (saved characters), `media_list` (earlier uploads and results).
4. Images and videos: `plan`, then `create` with the `max_credits` the user agreed to (skill `create`). Studios and other paid tools: price them first (see Cost). Never start a job the user can't afford.
5. Wait with `jobs_wait`, deliver links, offer next steps.
6. Words: for an image or a video, pass the user's own words to `plan` / `create` and let Riftland's director write the prompt. For the studios, Riftland runs no LLM over MCP (it charges only for media): write scripts, ad copy, concepts and brand texts yourself and pass them in (`script`, `copy`, `concepts`, `manual`); without them Riftland falls back to generic rules.
7. Tool input schemas are the source of truth: if a parameter here doesn't match a schema, follow the schema.
8. A tool a skill names that is not in your tool list still works when you call it by name. To have every tool listed, call `tools_profile` with `profile` `full` when the user asks for a studio tool directly.

## Which tool for what
| Request | Tools | Skill |
|---|---|---|
| Any image or video from a plain request, and "change only X" on a result | `plan`, `create` | `create` |
| Image with options only `generate_image` has (SVG, GIF, masks, a fixed seed), series with one look | `generate_image` | `social-carousel` |
| Video with an exact camera move, start and end frames | `generate_video` | — |
| Films with continuity: script, cast with designed voices, storyboard, acted takes with lip sync, final cut scored to picture; a single pro shot with a real camera package; music videos | `cinema_project_create`, `cinema_plan`, `cinema_frames`, `cinema_voices`, `cinema_takes`, `cinema_cut`, `cinema_project_get` | `cinema-film`, `cinematic-shot`, `storyboard-film`, `music-video` |
| Sharper or bigger image or video | `upscale_media` | — |
| An invented character or influencer designed from a description | `avatar_generate`, `character_save` | `ai-influencer` |
| A character from the user's own photos of a real person (reusable, optional trained identity) | `character_save`, `avatar_generate` | `my-character` |
| A photo that speaks | `talking_avatar` | `talking-avatar` |
| Replace a person, object or look in a clip; copy a dance | `studio_video` | `character-swap` |
| UGC and TikTok ads, batches of product shots, posters | `marketing_studio_generate` | `ugc-video-ad`, `product-shots` |
| Brand product images by intent (catalog, in use, hands, model, pin, banner, ad stills, restyle) | `marketing_studio_generate`, `create` | `product-photoshoot` |
| A marketplace listing set (main image on white, benefits card, looks) | `marketing_studio_generate` | `marketplace-cards` |
| A YouTube thumbnail: concepts first, then the image with text | `create` | `youtube-thumbnail` |
| Video from a product link or from app screenshots | `marketing_studio_generate` (tools) | `product-link-video`, `app-promo-video` |
| Static ad campaigns, A/B variants, localization | `ads_studio_generate`, `ads_studio_variations`, `ads_studio_chat` | `static-ads-campaign` |
| Variants of an existing video ad (new cast, hook or CTA) | `ad_multiplier` | `ad-remix` |
| Brand kit: palette, fonts, tone, products | `brand_create`, `brand_update`, `products_add` | `brand-kit` |
| Motion graphics, launch promos, faceless narrated videos and explainers | `motion_studio_generate` | `motion-graphics-promo`, `explainer-video` |
| Motion graphics you design and code yourself (HyperFrames: HTML + GSAP in a sandbox, frames to review, only the render is billed); editing a finished Motion video's code | `motion_catalog`, `motion_sandbox_create`, `motion_sandbox_write`, `motion_sandbox_check`, `motion_sandbox_render` | `motion-code` |
| 3D model from photos or text (GLB, STL, OBJ) | `generate_3d`, `model3d_convert` | `3d-model` |
| Product spins and exact camera paths from a 3D model | `scene3d_video`, `scene3d_angles` | `product-spin` |
| Relight, new camera angles, creative upscale, SVG, cut-outs | `relight`, `change_angle`, `creative_upscale`, `vectorize`, `remove_background` | `relight-and-angles`, `logo-to-svg` |
| Erase objects, expand or uncrop a photo, change the background, restore an old photo | `edit_image` | `photo-retouch` |
| Professional headshot from a selfie | `edit_image` | `pro-headshot` |
| A logo on products (mockups), virtual try-on of garments | `edit_image` | `product-mockup`, `virtual-try-on` |
| Remove a video's background, erase something from a clip, add sound to a clip | `edit_video` | `video-cleanup` |
| Voice-over, music, sound effects | `generate_audio` | `voiceover-and-music` |
| The same person, place or object across many generations (@tags) | `element_save`, `elements_list` | `consistent-elements` |
| Icon sets, illustrations, app icons and favicons for a codebase | `ui_assets_generate`, `ui_assets_files` | `ui-icon-set`, `app-icon` |
| Web-ready media for a codebase: scroll-scrub videos, hero loops (also 9:16), responsive and OG images, app graphics, embeds | `web_video`, `web_images`, `web_kit_files`, `web_embed` | `scroll-video`, `hero-video-loop`, `web-images`, `placeholder-images`, `app-graphics`, `web-3d-model` |

For multi-step work, load the workflow first: `skill_get` with its `skill_id` (or the MCP prompt of the same name, or the installed skill `riftland-<id>`).

## Account and cost
- `account_overview`: email, balance, credit price, links to buy credits and to the library, demo mode. `credit_history` lists movements.
- `quote` takes `tool` and `arguments` (exactly what you'll send) and returns credits, balance and whether it's enough.
- Images and videos (`create`, `generate_image`, `generate_video`): send the `max_credits` the user agreed to; a higher price comes back as a plan and spends nothing (`create`) or as an error (`generate_*`). Show the price and ask; never raise it on your own. A budget the user stated counts as agreed.
- Studio, Marketing, Ads, Ad Multiplier, Cine and Motion jobs and every batch: `quote` them first (no `max_credits` there). Tell the user the credits in one line and wait for a yes when it's over 100 credits (or over a budget they gave), unless they already approved it. Upscales: just run them and report the cost.
- Real people in the references (a Marketing Studio video with an avatar, images or a reference video; Ad Multiplier; Studio's Seedance engines; a photoreal 3D video with photos): ask the user, while planning and before the paid call, whether they have permission from those people. Pass `consent: true` only on their yes, `consent: false` if nobody real appears; never decide it yourself. Without `consent` the call asks first (or shows the user Riftland's form) and charges nothing.
- Not enough credits ("No te alcanzan los créditos."): don't retry. Share the buy link and the balance, and offer a cheaper path (a smaller size, shorter, fewer variants).
- Failed jobs are refunded automatically. Cancelling a queued job (`job_action` `cancel`) refunds it in full.
- Demo mode (`account_overview`): results are placeholders. Say so.

## Catalog and presets
- `models_explore`: `action` `list`, `get` (`model_id`) or `recommend` (`need` in free text); `kind` image, video, upscale, studio or talk.
- `presets_list` (`source`: camera, marketing, motion, studio, styles; `query`, `category`): every preset says which tool and parameters it runs with. `preset_run` (`preset_id` such as `camera:dolly-in` or `motion:logo-reveal`, `prompt`, `inputs`) runs one.
- `marketing_studio_catalog` (`category`, `include`: formats, templates, hooks, settings, tools) gives the Marketing Studio ids. For a business that sells services use `category: "services"` (and `vertical`: belleza, salud, fitness, gastronomia, hogar, profesionales, educacion, software, agencias, eventos, mascotas, autos): testimonials, the expert on camera, before/after, tours, promos, app demos, service ads, photos and flyers.
- `enhance_prompt` (`prompt`, `kind` image or video) is free and shows the prompt the director would write for an idea. Use it only when the user wants to see or edit that prompt; `create` does not need it.

Models: don't answer from memory. `models_explore` is live (what each model is for, its limits, `recommend` from a `need`), and `plan` says which model it chose and why. Leave `model` out of `create` unless the user named one, and keep a model the user named for follow-ups on the same work.
- Options only some models have (GPT Image 2.6, see `models_explore`): `output_format` `svg` (a real vector file, from text) or `gif` (a looping animation from text: `gif_frames` 2–16, `gif_frame_duration`; describe one motion that returns to its start), `transparent_background` (PNG/WEBP), `size` 2K/4K, `quality` low–max, `thinking_level`, and zone edits of the first reference with `mask_image` (white = change) or `markup_image` (marks drawn on a transparent PNG; name the mark in the prompt). Pass them to `generate_image` with `model` left out and the director picks a model that has them. To vectorize an existing logo use `vectorize`.

## Files
Where a tool expects a file (`image`, `video`, `media`, `reference_images`, `start_image`…) you can pass a Riftland media id (`ast_…`, from a result or `media_list`), a job id (`job_…` = its first result, `job_…#2` the second), an `upload_id`, or a public https URL of the file itself (imported automatically).
- Riftland results stay in Riftland: chain them by id from one generation to the next (an image into `start_image`, a video into `studio_video`…). Never download one to re-upload it.
- To see a file yourself: `media_view` (`ids`, up to 6, free) returns the image at full detail, a video as a contact sheet of frames across the clip with their times, an audio as its waveform. Finished generations already include a preview; use `media_view` to compare takes or check details.
- Local file and a shell (Claude Code, Codex, Cursor…): `media_upload` (`filename`, `mime_type`), run the returned `curl` on the local file (the `upload_url` lasts 30 min), then pass the `upload_id`.
- File attached in Claude (claude.ai, Desktop): it is in your code sandbox at `/mnt/user-data/uploads/<name>`. Upload it yourself the same way (`media_upload` + its `curl` on that path); don't ask the user to upload it again.
- No sandbox, the file isn't there, or the PUT fails (sandbox without network): `media_upload_widget` (`kind`, `max_files`) as the only tool of that turn. The user drops the files in a panel inside the chat and their next message brings the `ast_…` ids. In clients without MCP Apps, give the `browser_upload_url` of `media_upload` instead (`media_get` shows whether it arrived).
- A public URL you'll reuse in several calls: `media_import_url` once, then use the asset id.
- Page links are not files: product pages go to `products_add` or `product_url`; for TikTok or Instagram posts, ask for the video file.

## Jobs, waiting and approvals
- Create tools return job ids right away; `create`, `generate_image`, `generate_video` and `upscale_media` can also wait `wait_seconds` (about 45 for images and upscales); `create` waits by default.
- Then `jobs_wait` (`job_ids`: all of them, `timeout_seconds` up to 55). It returns when every job is done or one needs approval. While any job is `queued` or `running`, call it again; every few calls tell the user the stage and progress.
- Typical times: image 10–40 s · upscale 30–90 s · video 2–6 min · Marketing video 3–6 min · ad images 30–90 s · Ad Multiplier 4–8 min · Studio 3–10 min · Motion 5–25 min. If you can't keep waiting, give the `appUrl` and resume later with `jobs_get`.
- `awaiting_approval`: the job carries a `preview` (`review`: keyframe, plate or draft) and `refundOnReject`. Show it, say what to check and ask. `job_action` `approve` runs the paid part; `reject` stops it and refunds. Approve only on the user's word, or if they told you to skip reviews.
- Clients with the Riftland viewer also show results in an interactive card; still give the links.

## Delivering
- The result links (`url`; `downloadUrl` for the user to keep the file; `appUrl` for edits and remixes) and one summary line: what was made, the credits charged and the remaining `balance`. Signed links last 7 days.
- No ids, JSON or assembled prompts unless the user asks; keep the ids to chain results. One next step at most, when it helps: a variation, `upscale_media`, another format, a video from the image.

## Library
- `jobs_list` (`type`: image, video, upscale, marketing, ads, motion, studio; `status`, `favorites_only`, `limit`) and `jobs_get` find earlier work.
- `job_favorite` marks or unmarks a favorite; `job_action`: `hide`, `cancel` (plus `approve`/`reject` at approval gates).
- Remix: send a job's `params` back to the same tool with your changes.

## Errors
Errors come back as results with `isError: true` and a Spanish message. Fix and retry when the fix is obvious (unsupported aspect ratio or duration: use the nearest valid value; missing input: ask). If the platform refuses the content, don't work around it. Brand analysis limits (429): wait and retry later. Retry a failed generation at most once, and only when the error says it is transient; otherwise show the error's own fix (skill `create` has the table).

## Workflow skills
- `create` — Crear una imagen o un video: Pedí lo que quieras con tus palabras: Riftland elige el modelo y el formato, te dice el precio y lo crea.
- `ugc-video-ad` — Anuncio UGC: Un creador IA presenta tu producto en un video vertical con audio, hook y escenario.
- `product-shots` — Fotos de producto: Packshots de estudio o con modelo, en varias variantes y formatos listos para tienda.
- `static-ads-campaign` — Campaña de anuncios: Brand kit desde tu web, decenas de anuncios con titular, texto y CTA en 1:1, 4:5 y 9:16.
- `ad-remix` — Multiplicar un anuncio: Recrea un anuncio que funciona con tu elenco y tu producto, o cambiá solo el hook o el CTA.
- `brand-kit` — Brand kit desde tu web: Paleta, tipografías, logo, tono, públicos y productos leídos de tu sitio en un minuto.
- `product-link-video` — Video desde un link: Pegás el link de un producto y sale un video vertical con guion, escenas y audio.
- `app-promo-video` — Video de tu app: Con capturas de tu app o web, un video de producto con dispositivo, textos y ritmo.
- `cinematic-shot` — Plano cinematográfico: Un plano de cine con cámara, lente, luz, película y grade reales: primero el cuadro, después el movimiento y el acabado.
- `storyboard-film` — Corto rápido con storyboard: De una idea a un corto de 4–6 planos en una pasada: guion, storyboard con el mismo personaje, tomas y montaje.
- `ai-influencer` — Influencer IA: Diseñá un personaje con hoja de referencia y usalo en fotos, videos y anuncios consistentes.
- `talking-avatar` — Avatar que habla: Una foto y un guion (o un audio) se vuelven un video con labios sincronizados.
- `character-swap` — Cambiar personaje en un clip: Tu personaje reemplaza a la persona de un video o copia sus movimientos, en la misma escena.
- `motion-graphics-promo` — Promo en motion graphics: Tu IA dirige escenas, tipografía y animación con tu brand kit en un sandbox de Riftland y lo renderiza a MP4.
- `explainer-video` — Explainer sin cara: Explicá un concepto con escenas animadas, voz en off y subtítulos, sin cámara.
- `social-carousel` — Serie para redes: Una serie coherente de imágenes (misma estética, personaje o producto) para carrusel o grilla.
- `3d-model` — Modelo 3D: Un producto, personaje o prop en 3D (GLB) desde texto o fotos, listo para web, juegos o impresión (STL).
- `product-spin` — Giro de producto 3D: De una foto de producto a un video girando 360° y a un set de ángulos consistentes para tu tienda, usando el 3D como esqueleto.
- `relight-and-angles` — Luz y ángulos: Corregí la luz de una foto, sacá ángulos nuevos o una hoja de 9 planos de una sola imagen, y llevala a alta resolución.
- `logo-to-svg` — Logo a SVG: Convertí un logo o ícono en un SVG editable, o dibujá uno nuevo en vector con tu paleta.
- `photo-retouch` — Retoque de fotos: Borrá objetos o personas, agrandá la foto a cualquier formato, cambiá el fondo o restaurá una foto vieja, sin escribir prompts.
- `pro-headshot` — Foto profesional desde una selfie: Una foto de perfil profesional para LinkedIn o el CV a partir de una selfie, con la misma cara, otro fondo y otra ropa.
- `product-mockup` — Mockups de producto: Tu logo o diseño en remeras, tazas, gorras, cajas, botellas o carteles, y tu producto en un fondo nuevo, listo para vender.
- `virtual-try-on` — Probador virtual: Mostrá cómo le queda tu ropa a una persona: una foto de la modelo y hasta 3 prendas por prueba.
- `video-cleanup` — Limpieza de video: Quitale el fondo a un video (transparente, color o pantalla verde), borrá un objeto o un logo, o agregale sonido a un clip mudo.
- `voiceover-and-music` — Voz en off y música: Locuciones con voces en español, inglés y portugués, música original (jingle, fondo, lo-fi, épica) y efectos de sonido, en MP3.
- `ui-icon-set` — Set de íconos para tu app: Íconos, ilustraciones o stickers consistentes (clay 3D, vidrio, líneas…) descargados directo al repo, con todos los tamaños.
- `app-icon` — Ícono de app y favicon: El ícono de tu app en todos los formatos: favicon, apple-touch-icon, PWA y Android, con las etiquetas listas.
- `consistent-elements` — Elementos consistentes (@): Guardá un personaje, producto o lugar una vez y reusalo con @tag en toda una serie de imágenes y videos.
- `scroll-video` — Video con scroll para tu web: Un video que avanza con el scroll (estilo Apple) listo para tu código: MP4 con un keyframe por cuadro, versión mobile, secuencia de cuadros y componente.
- `hero-video-loop` — Video de fondo en loop: Un loop perfecto para el hero o el fondo de tu web (también 9:16 para mobile): liviano, con WebM, póster y componente listo.
- `web-images` — Imágenes web responsive: Hero, OG, cards, blog y fondos en AVIF, WebP y JPEG con todos los anchos, blur placeholder y un images.ts tipado para tu código.
- `placeholder-images` — Imágenes de ejemplo para tu app: Avatares, productos, portadas y fotos realistas para seed data, demos y mockups, con nombres y tamaños listos para tu código.
- `app-graphics` — Gráficos para sistemas y apps: Estados vacíos, onboarding, 404 e ilustraciones de features para tu app, más fondos y patrones. Los gráficos de datos se hacen en código.
- `web-3d-model` — Modelo 3D para tu web: Un producto u objeto en 3D (GLB) listo para tu web: visor interactivo con model-viewer o react-three-fiber, póster y snippet conectados.
- `cinema-film` — Película con Riftland Cine: Guion, elenco con voces diseñadas, storyboard con continuidad, tomas actuadas con lipsync y ambiente, y el montaje final con música a la imagen, grade y subtítulos.
- `music-video` — Videoclip: Tu canción como banda sonora: planos de performance e historia con el mismo artista, look audaz y montaje al ritmo.
- `motion-code` — Motion graphics escritos por tu IA: Tu IA escribe la composición HyperFrames en un sandbox de Riftland, la revisa con cuadros reales y la renderiza a MP4: pagás solo el render.
- `product-photoshoot` — Sesión de fotos de producto: Imágenes de un producto según lo que necesitás: catálogo, en uso, con manos, con modelo, pin vertical, banner, pack para anuncios o una versión nueva de una foto.
- `marketplace-cards` — Imágenes para publicaciones de marketplace: La imagen principal sobre blanco puro, una tarjeta de beneficios y dos looks de apoyo para tu publicación en Mercado Libre, Amazon o tu tienda.
- `youtube-thumbnail` — Miniaturas de YouTube: Primero te propongo de 3 a 5 conceptos distintos en una línea cada uno; después hago el que elijas, con tu cara y el texto exacto, y lo ajustamos sin rehacerlo.
- `my-character` — Mi personaje (desde tus fotos): Guardá a una persona real (vos o alguien que lo permitió) como personaje desde sus fotos y reusalo en imágenes, videos y avatares que hablan.
