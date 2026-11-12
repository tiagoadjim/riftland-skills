---
name: riftland-static-ads-campaign
description: "A batch of on-brand static ad creatives with headline, text and call to action in 1:1, 4:5 and 9:16, through Ads Studio. Use when: \"una campaña de anuncios\", \"12 anuncios para Meta\", \"variantes A/B de anuncios\", \"static ads for my brand\", \"ad creatives from my website\". NOT for: product photos without text (use product-photoshoot); a video ad (use ugc-video-ad); variants of an existing video ad (use ad-remix); setting up the brand only (use brand-kit)."
version: 1.0.0
---

# Static ads campaign

A batch of static ad creatives — image plus headline, primary text, description and CTA — for Meta, TikTok or display, on-brand, in 1:1, 4:5 and 9:16. Engine: Riftland Ads Studio.

## Ask only if missing
The brand (website or an existing brand) and how many ads. Default the rest: objective `ventas`, the brand's hero products, 4:5 and 9:16.

## Workflow
1. Brand: `brands_list`. Not there: `brand_create` with `url` (reads the site in about a minute; if it comes back `researching`, poll `brand_get` every ~20 s). Show a 3-line summary (palette, tone, audience, language) and fix obvious errors with `brand_update`: the ad copy is written from this kit.
2. Products: `brand_get` lists them. None yet: `products_add` with `brand_id` and `import_from_brand: true` (reads up to 12 from the store), or with a product `url`. Choose `product_ids`: what the user named, else their best sellers (ask once) or 1–3 hero products, saying which.
   - A business that sells services (salon, clinic, gym, trade, firm, school, software, agency…): the same calls with `kind: "service"`. `import_from_brand` then lists the services on its site; `manual` needs no images (photos of the place, the team or finished work help). The strategy picks angles, visuals and CTAs (book, quote, sign up) for services by itself.
3. Size the run: total ads = (products, plus one if `include_brand`) × `per_item` (1–20), at most 60 per run. With no products, the brand itself is the subject.
   - `aspect_ratios` (any of "1:1", "4:5", "9:16") rotate across the ads; they don't multiply. To get every ad in every format, run once and then call `ads_studio_variations` with only `aspect_ratio` for each missing format.
   - `objective`: `ventas`, `trafico`, `awareness`, `leads`, `app` or `engagement`.
   - `prompt` (up to 1000 characters): offer, season, tone, must-say claims, banned words, the price or discount exactly as it must read.
   - Copy in the brand kit's `language` (change it with `brand_update`) and the audience's regional voice (Rioplatense voseo for Argentina and Uruguay).
4. Write the ads yourself in `concepts` (Riftland runs no LLM over MCP; without concepts the copy comes from generic rules). Plan first: for each ad one audience, its awareness stage, one insight and an angle (Oferta, Ingrediente, Cómo se usa, Lifestyle, Prueba social, Comparación, Problema → solución, Resultado, Autoridad, Objeción, Cómo funciona, Beneficio clave, Testimonio, Dato, Garantía, Historia de marca — products, services and software each fit some), all different across the run. Then per ad:
   - `product_id` (omit for a brand-level ad), `angle`, `headline` (about 45 characters), `primary_text` (up to ~220; the first line is the hook), `description` (~40), `cta_type` and `cta_text` (~20) that fit the objective and how the offering is bought (book, quote, sign up for services), `in_image_text` (1–3 strings of up to 6 words, drawn in the image), `scene` (English, 2–3 sentences: who or what is shown, setting, composition, light) and optionally `aspect`.
   - Write like someone who knows this business: concrete nouns, the customer's own words, specific situations; never filler ("calidad que se nota", "llevá tu negocio al siguiente nivel"). Cite only facts, prices, offers and guarantees from the kit, the products or the user. The scene must fit what is sold: a service shows people and outcomes, software its interface or the result, a venue the place, a product the product.
   - Each product takes its concepts in order; without `per_item` it equals the most concepts you wrote for one product, and slots you leave empty get rules copy.
5. `quote` with `tool: "ads_studio_generate"` and the same arguments, `concepts` included (about 19 credits per ad, images only), then confirm.
6. `ads_studio_generate`: one image renders per ad (30–90 s, in parallel). Read `notes` (numbers it couldn't find in the brand data are flagged: check them). `jobs_wait` on the returned job ids; `ads_studio_concepts` (`brand_id`, `run_id`) lists the ads with copy and image.
7. Deliver a compact table: # · angle · headline · primary text · CTA · format · image link. Point out the 2–3 strongest and why.

## Iterate
- `ads_studio_variations` (`concept_id`, `count` 1–4):
  - with `instruction`: edits the image (background, season, colors, props) and keeps the copy;
  - with only `aspect_ratio`: the same ad laid out for another format;
  - with `copy` (your new versions, one entry each, same fields as `concepts`; what you leave out stays): text variations for A/B tests, rendered fresh; add `keep_image: true` for new headlines, primary texts and CTAs on the same image (free).
  - Localize: `instruction` "translate every text in the image into Portuguese exactly as given; local models from Brazil" plus `copy` with your translation (including `in_image_text`).
- `ads_studio_chat` is the in-app assistant for people without their own AI: over MCP it has no LLM and only routes simple requests with rules copy. Do the thinking yourself and call the tools above.

## Platform specs
- Meta feed: 4:5 (best on mobile) or 1:1. Stories, Reels and TikTok: 9:16; keep the top ~14% and the bottom ~20–35% free of key text.
- Headline up to ~40 characters; the first 125 characters of the primary text carry the message.
- CTA types: SHOP_NOW, LEARN_MORE, SIGN_UP, GET_OFFER, ORDER_NOW, DOWNLOAD, BOOK_NOW, CONTACT_US.

## Gotchas
- Without `concepts`, angles rotate automatically and the copy is generic: write the concepts.
- Product images drive fidelity: fix wrong or low-resolution product photos before a big run.
- Never invent reviews, ratings or prices: put the real ones in `prompt` or leave them out.
- Start with 6–12 ads, review, then scale the winners with variations.

## Go deeper
Free to read, no credits. Open only what this request needs: call `guide` with `topic` set to the ref, or, when the skill is installed from the repository, open the file named after it.
- `technique:text-on-image`: Text on an image. File: `riftland-prompting/references/technique-text-on-image.md`
- `technique:consistency`: Keeping a character, a product or a brand the same. File: `riftland-prompting/references/technique-consistency.md`
- `workflow:brand-to-ads`: Brand kit to on-brand static ads. File: `riftland-workflows/references/workflow-brand-to-ads.md`

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
