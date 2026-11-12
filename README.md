# Riftland skills

[Riftland](https://riftland.io) makes images, videos, audio and 3D with AI, from a chat or a terminal, with your own credits.
These skills teach an AI agent (Claude, Claude Code, Codex, Cursor and others) to use it end to end: which tool to call, what to ask you, how to spend, what to hand back.

## What is here

46 skills: 42 workflows, one per thing you may want to make; three guides (`riftland-models`, `riftland-prompting`, `riftland-workflows`) that teach what each model is for, how to ask it and how to run a job of several steps; and `riftland`, the guide that maps Riftland's tools, credits, files and jobs and says which skill to load for each request. Long material lives in a `references/` folder next to a skill and is read only when needed.

`riftland`: The map of Riftland's MCP: how its tools, credits, files and jobs fit together, and which skill to load for each request.

### Guides: which model, how to ask, multi-step jobs

- `riftland-models`: Which model for what: how Riftland chooses an image or a video model, how to compare models, when to override the choice and when not to, how to read a model card, and a decision table by need that points to the family to open.
- `riftland-prompting`: How to ask Riftland's models: when to write a prompt yourself and when to pass the user's words, the short rules that hold for every model, and one guide per technique (an image, text on an image, edits, references, consistency, video, camera moves, image to video, shots and timing, dialogue and sound, product photography, troubleshooting).
- `riftland-workflows`: Multi-step jobs across Riftland's tools: how to run a chain (price each spending step, carry ids from one step to the next, where the user decides, what to do when a step fails, one agreed total), a recipe per job, and what Riftland cannot chain today.

### Images and design

- `riftland-create`: Default entry for any make-me-X request: plan (free, shows the plan and its price), then create within the budget the user agreed to; Riftland's director picks the model and format and writes the prompt.
- `riftland-social-carousel`: A coherent series of images with one style, character or product for a carousel, grid or lookbook, made with create.
- `riftland-relight-and-angles`: Change the lighting of a photo or clip, see an image from another camera angle, get a shot sheet from one image, restore skin or upscale with new detail.
- `riftland-photo-retouch`: Fix a photo without design skills: erase objects or people, expand a photo to another format, put a subject on a new background or restore an old photo.
- `riftland-pro-headshot`: A professional headshot from a casual selfie, keeping the same face, with a new backdrop and outfit.
- `riftland-consistent-elements`: Keep the same character, product, location or style identical across many images or videos without training, by saving it once as an element and mentioning its @tag.
- `riftland-youtube-thumbnail`: A YouTube thumbnail made from concepts: 3 to 5 distinct ideas first, then one image per chosen concept at 16:9 with the person's own photo and exact words, and surgical tweaks afterwards.

### UGC and creators

- `riftland-ugc-video-ad`: A vertical creator-style video ad in which an AI creator presents the user's product, with native audio, through Marketing Studio.

### Ads and brand

- `riftland-static-ads-campaign`: A batch of on-brand static ad creatives with headline, text and call to action in 1:1, 4:5 and 9:16, through Ads Studio.
- `riftland-ad-remix`: Variants of a video ad that already works: recreate it with the user's cast and product, or regenerate only its hook or its call to action, through Ad Multiplier.
- `riftland-brand-kit`: The user's brand kit, set up and reviewed with evidence labels and their approval: palette, logo, type, tone, audience and products, so the studios that read it stay on-brand.

### Product and e-commerce

- `riftland-product-shots`: Studio-style product photography in batches through Marketing Studio formats, from a product link or photo.
- `riftland-product-link-video`: A promotional video made from a product page link with minimal input, through Marketing Studio's product-link tool.
- `riftland-app-promo-video`: A promo, launch or walkthrough video of an app, SaaS or website from screenshots, through Marketing Studio's app-video tool or Motion Studio.
- `riftland-product-mockup`: A logo, print or design shown on real products (t-shirts, mugs, bags, boxes, billboards), or a product photo placed on a clean or lifestyle background.
- `riftland-virtual-try-on`: Dress a person or model photo in one to three garments from product or flat-lay photos, keeping the person's face, pose and body.
- `riftland-product-photoshoot`: Brand-quality images of one product, chosen by intent: clean catalog shot, in use, hands, on a model, vertical pin, wide banner, ad stills, a conceptual scene or a new version of an existing image.
- `riftland-marketplace-cards`: A listing image set for a marketplace or store page: the main image on pure white, a benefits card with up to three callouts, and styled supporting looks, through Marketing Studio's marketplace format.

### Film and AI video

- `riftland-cinematic-shot`: One cinematic video shot with a real camera package and look: keyframe first, then the take and an optional graded finish, through Riftland Cine.
- `riftland-storyboard-film`: A quick short film of 4 to 6 shots in one pass: script, storyboard with a consistent character, takes and the cut with music, through Riftland Cine.
- `riftland-character-swap`: Replace a person, object or outfit in an existing clip with the user's character, copy a clip's motion onto a character, or restyle a clip, through Riftland Studio with an approval step before the paid render.
- `riftland-video-cleanup`: Clean up a video: remove its background, erase an object, logo or person from a clip, or add matching sound to a silent clip.
- `riftland-cinema-film`: A real film made with AI: script, cast with designed voices, a storyboard checked for continuity, acted takes with lip sync, sound and a mastered cut, through Riftland Cine.
- `riftland-music-video`: A music video for the user's song or beat: performance and story shots with a consistent artist, cut to the track, through Riftland Cine.

### Motion graphics

- `riftland-motion-graphics-promo`: A motion-graphics video built from the user's brand kit (titles, kinetic type, logo reveal, launch promo), rendered by Riftland Motion Studio, not AI footage.
- `riftland-explainer-video`: A faceless narrated video with a script agreed first, voice-over, captions and music, built as motion graphics in Motion Studio.
- `riftland-motion-code`: Motion graphics you design and code yourself in a Riftland sandbox (HyperFrames: HTML and GSAP), checked with real frames and rendered to MP4; only the render is billed.

### Avatars and influencers

- `riftland-ai-influencer`: An invented consistent character, influencer or mascot designed from a description, saved and reused across photos, videos and ads.
- `riftland-talking-avatar`: A photo or saved character that speaks a script or an audio file, with synced lips, through Riftland's talking-avatar engines.
- `riftland-my-character`: A reusable character made from the user's own photos of a real person, saved once and reused in images, videos and talking clips, with the consent the product requires.

### Voice, music and sound

- `riftland-voiceover-and-music`: Audio for a video or an ad: a voice-over read from a script, original music or a short sound effect.

### 3D and scenes

- `riftland-3d-model`: A 3D model (GLB, STL, OBJ) of a product, character or prop from a description or photos, picking the right Riftland 3D engine.
- `riftland-product-spin`: A 360-degree product spin, an orbiting or dolly product shot with an exact camera path, or a consistent set of product angles, from a photo or a 3D model.

### Web and app development

- `riftland-logo-to-svg`: An SVG version of a logo, icon or flat illustration, a new vector logo from a description, or a transparent cut-out.
- `riftland-ui-icon-set`: A consistent icon or illustration set for an app or website, exported as transparent PNGs, WebP or SVG into the repo with a name-to-path map.
- `riftland-app-icon`: An app icon, favicon, PWA icon set, apple-touch icon or Android adaptive icon, with the link tags and manifest wired into the project.
- `riftland-scroll-video`: A scroll-driven video for a website (Apple-style scrubbing hero), generated or reused and made scrub-ready, with a component wired into the repo.
- `riftland-hero-video-loop`: A seamless looping background or hero video for a website or app, exported light with posters and wired in as a component.
- `riftland-web-images`: Production images for a website or app: heroes, Open Graph cards, thumbnails and covers, exported as responsive AVIF, WebP and JPEG with a typed images file.
- `riftland-placeholder-images`: Realistic placeholder images for an app under construction: avatars, product photos, covers and listings, exported with a typed file and wired into seed data.
- `riftland-app-graphics`: The graphics around a web app's UI: empty states, onboarding, 404 and error pages, feature illustrations and share cards, as one consistent set wired into the repo.
- `riftland-web-3d-model`: An interactive 3D model on a website: a viewer the visitor can rotate, with a poster image and the embed code wired into the codebase.

## Install

Any agent that reads skills:

```sh
npx skills add tiagoadjim/riftland-skills
gh skill install tiagoadjim/riftland-skills
```

Claude Code, as a plugin (it also connects the MCP server):

```
/plugin marketplace add tiagoadjim/riftland-skills
/plugin install riftland@riftland
```

Only the MCP server, with no skills installed (the same recipes are served through its `skills_list` and `skill_get` tools):

```sh
claude mcp add --transport http riftland https://riftland.io/mcp
```

Agents installing this for a user: follow [INSTALL_FOR_AGENTS.md](INSTALL_FOR_AGENTS.md).

## Connect your account

Skills do not generate anything by themselves: they use the Riftland MCP server, https://riftland.io/mcp. Add it to your client and sign in with OAuth in the browser, or create an API key in Account → Connections (Cuenta → Conexiones) and send it as a bearer token. A key is shown once and can be revoked there at any time. Never paste a key into a skill or into a prompt: keep it in the client's configuration or an environment variable.

## How spending works

- `plan` is free: it shows what the agent understood, the format and the price.
- `create` spends credits, never more than the `max_credits` you agreed to. If the price is higher, the agent shows it and asks.
- The studios (ads, UGC, short films, motion graphics, avatars) give a quote before they spend.
- In Account → Connections you can set a credit limit per connection; the server enforces it.
- If a job fails, its credits return to your balance.

## What each model is for

Riftland's knowledge base has one card per image and video model: what it is best for, when to pick something else, how to prompt it, its facts and the evidence behind each claim. The skills teach it through references generated from Riftland's knowledge base: `riftland-models` has one file per model and a short index per family, `riftland-prompting` one guide per technique and `riftland-workflows` one recipe per multi-step job. Every generated file starts with a marker line that names its source and the knowledge version. Nothing is hand-written twice: a card is written once, in Riftland, and every file here is generated from it.

Which model is best for a request still changes as models improve, so the live answer is one call away: `models_explore` over MCP (action `get` shows a card, `recommended` the router's picks) and `guide` (a card, a technique or a workflow), or `riftland models --recommended` in the Riftland CLI. Riftland's router picks the model for each request. [MODELS.md](MODELS.md) and `models.json` are a dated snapshot of the picks and the cards, for people and tools that cannot call it.

`scripts/validate.mjs` keeps model ids out of hand-written text: a skill file that names a model outside `model-allowlist.json` (the few studio tools that take a model field of their own) fails. A generated file is exempt only while its marker's version equals `knowledgeVersion` in `models.json` and its checksum matches its text.

## This repository is generated

Everything here is exported from Riftland's source, so a change made here would be overwritten by the next export. Changes are made in Riftland and exported, and pull requests here are not merged directly. Issues are welcome: see [CONTRIBUTING.md](CONTRIBUTING.md).

`node scripts/validate.mjs` checks the skills, the manifests and the links; it runs on every push and pull request.

## License

License: not yet chosen; all rights reserved until a LICENSE file is added.

## En español

[Riftland](https://riftland.io) crea imágenes, videos, audio y 3D con IA con tus propios créditos. Este repositorio reúne sus 46 skills para agentes de IA: recetas que dicen qué herramienta usar, qué preguntarte, cómo gastar y qué entregarte.

- **Instalar:** `npx skills add tiagoadjim/riftland-skills`, o en Claude Code `/plugin marketplace add tiagoadjim/riftland-skills` y después `/plugin install riftland@riftland`.
- **Conectar tu cuenta:** el servidor MCP es https://riftland.io/mcp; entrás con OAuth o con una API key de Cuenta → Conexiones. Nunca pegues una key en una skill ni en un prompt.
- **Gasto:** `plan` es gratis; `create` gasta hasta el `max_credits` que aceptaste; podés fijar un límite por conexión.
- **Modelos:** las skills enseñan para qué sirve cada modelo con tarjetas generadas desde el código de Riftland (`riftland-models`); la respuesta en vivo sigue siendo `models_explore` y `guide`, y `MODELS.md` es una foto con fecha.
- **Repositorio generado:** se exporta desde el código de Riftland; los pull requests no se mergean acá, los issues sí son bienvenidos.
