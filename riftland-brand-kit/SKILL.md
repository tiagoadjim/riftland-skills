---
name: riftland-brand-kit
description: "The user's brand kit, set up and reviewed with evidence labels and their approval: palette, logo, type, tone, audience and products, so the studios that read it stay on-brand. Use when: \"armá mi brand kit\", \"leé mi web y sacá la marca\", \"revisá la paleta y la tipografía\", \"set up my brand\", \"update my brand colors\". NOT for: a campaign built on the brand (use static-ads-campaign); a logo as SVG (use logo-to-svg); a one-off image or video (use create)."
version: 1.0.0
---

# Brand kit

Set up, review or fix the user's brand kit (name, logo, palette, fonts, tone of voice, audience, selling points, language and products) so the studios that read it stay on-brand. Free. Three habits make it trustworthy: every field carries an evidence label, the user approves palette, logo and type before anything is built on them, and you promise only what the tools do with the kit.

## When to use
The user wants to set up, read from a website, review or edit their brand. Also before any Ads, Marketing or Motion workflow when no brand exists yet.

## Modes
| Request | People say | Do |
|---|---|---|
| New kit from a website | "leé mi web y armá la marca", "set up my brand" | `brand_create` with `url`, then review it field by field |
| New kit without a website | "no tengo web", "armemos la marca" | `brand_create` with `manual`, from what the user declares |
| Review or fix a kit | "revisá mi marca", "cambiá el color" | `brand_get`, the labels, then `brand_update` |
| Add products or services | "importá mis productos" | `products_add` |

Tie-breakers:
- A kit for this brand already exists (`brands_list`): review it, never create a second one.
- What the user says beats what the site says. A kit read from a site is a draft until the user approves it.
- Products and services can be imported at any time; paid work that reads the kit waits for the three approvals.

## Evidence labels
Show every field with where it came from: `declared` (the user said it, or it came in `manual`), `read` (taken from their site: name, logo, colors, fonts, socials, language, products) or `inferred` (guessed by rules or by you: tagline, description, audience, tone, selling points, competitors, industry). Never present an `inferred` field as `read`; a field the user confirms becomes `declared`. The labels live in the conversation: the kit stores values only. Table, rules and conflicts: [Evidence labels](references/evidence-labels.md).

## Approval gates
Approve the palette first, then the logo, then the type (heading and body fonts), each shown with its values before you ask. Nothing is built on the kit before the user approved all three: no ad campaign, no motion promo, no Marketing Studio job with `brand_id`. Never approve on the user's behalf, and never treat silence or an answer about something else as a yes. If the palette changes after the logo was approved, ask again about the logo. Details: [Approval gates](references/approval-gates.md).

## Interview
Skip what the conversation already answers. At most 4 questions per request type, as labeled options, in the user's language.

**A website is given ("leé mi web")**
1. Import the products too? Products · Services · No
2. Language of the kit? The site's · Spanish · English · Portuguese

**No website ("no tengo web")**
1. Tone? Close and friendly · Professional · Bold · Premium
2. Palette? I send the colors · Propose one from my logo · Propose one for my industry
3. Fonts? Modern sans · Classic serif · Rounded and friendly · Keep my current ones
4. Language? Spanish · English · Portuguese

**An existing kit to review**
1. What do you want to fix? Colors · Logo · Fonts · Texts · Products

## What you pass and what the server decides
- You pass: `url` or `manual`; fields you wrote yourself after reading the site (they override what the site gave); `brand_id` and only the fields that change in `brand_update`.
- Riftland does: reads the site (logo, colors, fonts, products, socials, language), normalizes colors to #RRGGBB and keeps one kit per brand. Over MCP Riftland runs no LLM, so the written fields from a site (tagline, description, audience, tone, selling points, competitors, industry) are generic guesses: if you can read the site, write them in `manual` and label them `inferred`.
- Later tools: `brand_id` goes to `marketing_studio_generate`, `ads_studio_generate` and `motion_studio_generate`. `create` and `plan` have no brand field and there is no brand lock in them: if the user wants the brand's look in a plain image, say the palette in their words or use a studio. What each tool reads: [How each tool uses the brand](references/how-studios-use-the-brand.md).

## Calls
Shapes only:
```json
{ "url": "https://mimarca.com", "manual": { "tagline": "<tu frase>", "audience": "<a quién le hablás>", "tone": ["claro", "cercano"] } }
{ "brand_id": "<id>", "fields": { "colors": ["#0F172A", "#22C55E", "#F8FAFC"], "fonts": { "heading": "Space Grotesk", "body": "Inter" }, "language": "es" } }
{ "kind": "product", "brand_id": "<id>", "import_from_brand": true }
```
They are `brand_create`, `brand_update` and `products_add`. If `brand_create` returns `researching`, poll `brand_get` every 20 seconds. A new logo: upload it, then pass its media id in `fields` as `logo`. Services: `kind` `service`, read the services page yourself and add each one with `manual` (name, what it includes, the price exactly as published).

## Spending
Everything here is free: `brand_create`, `brand_get`, `brand_update` and `products_add` charge no credits, so no `quote` is needed. Site research is limited to 5 analyses an hour, one at a time (a 429 means wait). Tell the user that what is built later (campaigns, promos) is priced by its own skill.

## Delivery
The kit as the evidence table (field, value, label) with the logo link and the kit's `appUrl`, then one summary line: what was set up, which gates are approved and which are pending, and that it was free ("Listo: Finanzas Simples, paleta y logo aprobados, tipografía pendiente, 6 productos; sin costo."). Offer one next step: `static-ads-campaign`, `ugc-video-ad` or `motion-graphics-promo`, once the three approvals are in.

## Retries and caps
- Poll a research for at most 3 minutes, then report what is there and fill the rest with `manual`.
- At most 1 re-read of the site per request (5 an hour is the limit). A site that blocks bots gives a kit deduced from the URL: review every field and fill the gaps by hand.
- A hard cap of 3 review rounds per gate. After the third, show the current values and ask what is blocking the approval.
- At most 2 retries of a failed call, and only when the error says it is transient.

## Does not do
- Design a logo on its own: it can offer one with `create` (the approved palette in words, and the `max_credits` the user agreed to) and store it only after the user approves it.
- Install fonts: fonts are names that the studios use as direction.
- Apply the brand in `create` or `plan`, or promise that every image will carry it.
- Invent prices, claims or selling points the site and the user did not give.
- Create a second kit for a brand that has one.

## Common mistakes
- Showing guessed fields (`inferred`) as if the site said them.
- Moving on after "ok" said about something else: that is not an approval.
- Building a campaign before palette, logo and type are approved.
- Forgetting the kit's language: Ads Studio writes in it.
- More than 6 colors or 5 selling points: the kit holds up to 6 colors (#RRGGBB) and 5 selling points.
- Creating a duplicate kit instead of updating the existing one.

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

## References
Read a reference only when its line applies; none is needed for a plain request.
- [Evidence labels](references/evidence-labels.md) — read when presenting a kit field by field, or when a field's origin is in doubt.
- [Approval gates for palette, logo and type](references/approval-gates.md) — read when the user is about to approve or change the palette, the logo or the type.
- [How each tool uses the brand](references/how-studios-use-the-brand.md) — read when the user asks what the brand will affect, or a generation should look on-brand.
Load one: open the file under `references/` next to this SKILL.md when the skill is installed; over MCP call `skill_get` with `skill_id` `brand-kit` and `reference` set to a file name from the list above.
