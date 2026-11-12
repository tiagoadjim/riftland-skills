---
name: riftland-models
description: "Which model for what: how Riftland chooses an image or a video model, how to compare models, when to override the choice and when not to, how to read a model card, and a decision table by need that points to the family to open. Use when: \"¿qué modelo uso para esto?\", \"¿cuál es mejor para texto en una imagen?\", \"comparame dos modelos\", \"which model is best for…\", \"why did Riftland pick this model\", \"can I choose the model\". NOT for: making the image or the video itself (use create); how to word a prompt or fix a bad result (use prompting); a job of several steps (use workflows); the map of tools, credits and files (use riftland)."
version: 1.0.0
---

# Which model for what

Riftland has image and video models that are good at different things. This skill teaches how Riftland chooses one, how to compare models, when to override the choice and how to read a model card. The cards are generated from Riftland's knowledge base and live in the references: open the one you need, do not recite them from memory. Tools: `plan`, `create`, `models_explore` and `guide`. `create` spends credits, so it always carries a `max_credits` the user agreed to (the essentials at the end of this skill).

## How Riftland chooses
- `plan` (free) and `create` choose the model from the request: the kind of work, the references, words on the image, sound, length and format. The plan names the model and says why in `model_notes` (inside `direction`): `why` (the router's reason and what the model is for), `prompting` (two or three hints for asking it), `limits` (what matters for this request) and `card` (the ref `guide` opens).
- The same router answers `models_explore` with `recommended`, so what you read there is what `plan` picks today.
- Tell the user the choice in one line, from the `why` of `model_notes` ("Elijo un modelo que escribe bien el texto"). A plain request needs no card.

## Compare and look up
| You want | Call | You get |
|---|---|---|
| The pick for each kind of job, with the reason, the format and a faster and a cheaper alternative | `models_explore` with `action` `recommended` (`kind`, `priority` optional) | The router's current picks, live |
| The best models for a need in words | `models_explore` with `action` `recommend` and `need` | The director's choices, each with `best_for` and prompting hints |
| One model | `models_explore` with `action` `get` and `model_id` | Its card (`best_for`, `not_for`, `strengths`, `watch_out`, `prompting`, `examples`, `facts`, `siblings`) and its price |
| Every model, one line each | `models_explore` with `action` `list` | `best_for` and `family` of each model |
| A card as markdown, or the entries closest to a question | `guide` with `topic` (`model:<id>`) or `for` (free text) | The entry, free, no credits |

To compare two models, open both cards (`guide`, or the files under References) and set "Use it for" and "Pick something else when" side by side; a family file says when to pick which inside a family. Trust a card's Facts over memory: durations, formats, reference slots and audio are read from Riftland's live catalog when the card is built.

## Reading a card
Every card has the same sections:
- **Use it for** (what it is best for): the uses the model is best at. Match the request to this first.
- **Pick something else when**: cases where another kind of model is the better pick.
- **Strengths** and **Watch out for**: plain statements, each marked with its evidence: [V] the maker's own claim, [I] an independent report, [R] what Riftland's catalog or pipeline enforces. Take [V] as a hint, [R] as a fact.
- **How to prompt it**: order, length, exact words, edits, references, what to leave out, camera, sound. Follow it when you write a prompt yourself (skill `prompting`).
- **Examples**: a request and the prompt form that works.
- **Facts**: durations, resolutions, formats, reference slots, frames, audio and edit capability.
- **In its family**: when to pick this model and when a sibling.
A card that opens with a Preview or Deprecated status says so: prefer a current model for new work.

## When to override the choice
Override (`model` on `plan` and `create`) only when:
- the user names a model: use it, and keep it for follow-ups on the same work;
- the `limits` of `model_notes` say the chosen model cannot do something the user needs and a card says another can: tell the user, pass that model and plan again (the price may change);
- the user needs something only some models give (a vector file, a transparent background, an end frame) and the plan did not.

Do not override because a card sounds better than the pick: the router already weighs the request, the references, the format and the price. Do not choose from memory, and do not switch models in the middle of a series, because the look changes. If the plan answers "No pudimos cumplir lo que elegiste", drop `model` or relax the other choice.

## Which family for what
Starting points from the cards, by need. Open the family file to see its models and when to pick which, then the card of the one you consider. The plan still decides unless you override it.

| The user needs | Open |
|---|---|
| Text and layout: posters, signs, menus, infographics with the words right | [GPT Image](references/family-gpt-image.md), [Ideogram](references/family-ideogram.md), [Alibaba Qwen Image](references/family-qwen-image.md) |
| Photoreal photos and product shots | [ByteDance Seedream and Riftland](references/family-seedream.md), [Black Forest Labs FLUX](references/family-flux.md), [Krea](references/family-krea.md) |
| Precise edits of an image they have | [Google Nano Banana](references/family-nano-banana.md), [ByteDance Seedream and Riftland](references/family-seedream.md), [GPT Image](references/family-gpt-image.md) |
| The same person across images (a trained identity; see technique `consistency` in skill `prompting`) | [Riftland](references/family-flux-lora.md) |
| A vector file or a transparent background | [GPT Image](references/family-gpt-image.md) |
| A video with dialogue and sound | [Google Veo](references/family-veo.md), [Kuaishou Kling (Kling 3.0 Pro)](references/family-kling.md), [Alibaba Wan (Wan 3.0 Prime)](references/family-wan-3.md), [ByteDance Seedance](references/family-seedance.md), [MiniMax (MiniMax H3)](references/family-minimax-h3.md), [Black Forest Labs FLUX Video](references/family-flux-video.md) |
| Long clips that follow one subject | [Kuaishou Kling (Kling 4.0)](references/family-kling-4.md), [ByteDance Seedance](references/family-seedance.md) |
| Several shots in one clip | [Kuaishou Kling (Kling 3.0 Pro)](references/family-kling.md), [ByteDance Seedance](references/family-seedance.md), [Alibaba Wan (Wan 3.0 Prime)](references/family-wan-3.md), [Black Forest Labs FLUX Video](references/family-flux-video.md) |
| Animating an image | [Kuaishou Kling (Kling 2.6 Pro)](references/family-kling-2-6.md), [ByteDance Seedance](references/family-seedance.md), [Alibaba Wan (Wan 2.6)](references/family-wan-2-6.md), [MiniMax (Hailuo 2.3)](references/family-hailuo.md), [MiniMax (MiniMax H3)](references/family-minimax-h3.md) |
| Cheap or fast drafts before the final | [Google Nano Banana](references/family-nano-banana.md), [ByteDance Seedance](references/family-seedance.md), [Google Veo](references/family-veo.md) |

Every model, with its family and best use: [Models index](references/models-index.md). After choosing: how to ask it is skill `prompting`, a job of several steps is skill `workflows`, and making the image or video is skill `create`.

## Questions, spending and delivery
Nothing here changes them: the Riftland essentials at the end of this skill apply (at most 4 questions, an agreed `max_credits`, one summary line).

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
- [Models index](references/models-index.md) — read when choosing or comparing models: every model with its family, what it is best for and the file with its card.
- [Family: GPT Image](references/family-gpt-image.md) — read when a need points to the GPT Image models, or you are choosing between them.
- [Family: Google Nano Banana](references/family-nano-banana.md) — read when a need points to the Google Nano Banana models, or you are choosing between them.
- [Family: ByteDance Seedream and Riftland](references/family-seedream.md) — read when a need points to the ByteDance Seedream and Riftland models, or you are choosing between them.
- [Family: Black Forest Labs FLUX](references/family-flux.md) — read when a need points to the Black Forest Labs FLUX models, or you are choosing between them.
- [Family: Alibaba Qwen Image](references/family-qwen-image.md) — read when a need points to the Alibaba Qwen Image models, or you are choosing between them.
- [Family: Ideogram](references/family-ideogram.md) — read when a need points to the Ideogram models, or you are choosing between them.
- [Family: Krea](references/family-krea.md) — read when a need points to the Krea models, or you are choosing between them.
- [Family: Riftland](references/family-flux-lora.md) — read when a need points to the Riftland models, or you are choosing between them.
- [Family: Kuaishou Kling (Kling 3.0 Pro)](references/family-kling.md) — read when a need points to the Kuaishou Kling (Kling 3.0 Pro) models, or you are choosing between them.
- [Family: Kuaishou Kling (Kling 2.6 Pro)](references/family-kling-2-6.md) — read when a need points to the Kuaishou Kling (Kling 2.6 Pro) models, or you are choosing between them.
- [Family: Kuaishou Kling (Kling 4.0)](references/family-kling-4.md) — read when a need points to the Kuaishou Kling (Kling 4.0) models, or you are choosing between them.
- [Family: ByteDance Seedance](references/family-seedance.md) — read when a need points to the ByteDance Seedance models, or you are choosing between them.
- [Family: Google Veo](references/family-veo.md) — read when a need points to the Google Veo models, or you are choosing between them.
- [Family: Alibaba Wan (Wan 2.6)](references/family-wan-2-6.md) — read when a need points to the Alibaba Wan (Wan 2.6) models, or you are choosing between them.
- [Family: Alibaba Wan (Wan 3.0 Prime)](references/family-wan-3.md) — read when a need points to the Alibaba Wan (Wan 3.0 Prime) models, or you are choosing between them.
- [Family: Black Forest Labs FLUX Video](references/family-flux-video.md) — read when a need points to the Black Forest Labs FLUX Video models, or you are choosing between them.
- [Family: MiniMax (Hailuo 2.3)](references/family-hailuo.md) — read when a need points to the MiniMax (Hailuo 2.3) models, or you are choosing between them.
- [Family: MiniMax (MiniMax H3)](references/family-minimax-h3.md) — read when a need points to the MiniMax (MiniMax H3) models, or you are choosing between them.
- [Nano Banana 2.1](references/model-nano-banana-2-1.md) — read when the request fits or names Nano Banana 2.1: its uses, how to prompt it, its limits and facts.
- [GPT Image 2.6 Flare](references/model-gpt-image-2-6-flare.md) — read when the request fits or names GPT Image 2.6 Flare: its uses, how to prompt it, its limits and facts.
- [GPT Image 2.6 Sunburst](references/model-gpt-image-2-6-sunburst.md) — read when the request fits or names GPT Image 2.6 Sunburst: its uses, how to prompt it, its limits and facts.
- [GPT Image 2.5 Flare](references/model-gpt-image-2-5-flare.md) — read when the request fits or names GPT Image 2.5 Flare: its uses, how to prompt it, its limits and facts.
- [Seedream 5.5](references/model-seedream-5-5.md) — read when the request fits or names Seedream 5.5: its uses, how to prompt it, its limits and facts.
- [Seedream 5.0 Pro](references/model-seedream-5-pro.md) — read when the request fits or names Seedream 5.0 Pro: its uses, how to prompt it, its limits and facts.
- [FLUX 3 Image](references/model-flux-3.md) — read when the request fits or names FLUX 3 Image: its uses, how to prompt it, its limits and facts.
- [Qwen Image 3](references/model-qwen-image-3.md) — read when the request fits or names Qwen Image 3: its uses, how to prompt it, its limits and facts.
- [Ideogram 4](references/model-ideogram-4.md) — read when the request fits or names Ideogram 4: its uses, how to prompt it, its limits and facts.
- [Krea 2 Large](references/model-krea-2.md) — read when the request fits or names Krea 2 Large: its uses, how to prompt it, its limits and facts.
- [FLUX.2 Max](references/model-flux-2-max.md) — read when the request fits or names FLUX.2 Max: its uses, how to prompt it, its limits and facts.
- [Nano Banana 2](references/model-nano-banana-2.md) — read when the request fits or names Nano Banana 2: its uses, how to prompt it, its limits and facts.
- [Nano Banana Pro](references/model-nano-banana-pro.md) — read when the request fits or names Nano Banana Pro: its uses, how to prompt it, its limits and facts.
- [Seedream 4.5](references/model-seedream-4-5.md) — read when the request fits or names Seedream 4.5: its uses, how to prompt it, its limits and facts.
- [GPT Image 2](references/model-gpt-image-2.md) — read when the request fits or names GPT Image 2: its uses, how to prompt it, its limits and facts.
- [FLUX.2 Pro](references/model-flux-2-pro.md) — read when the request fits or names FLUX.2 Pro: its uses, how to prompt it, its limits and facts.
- [Rift ID · LoRA](references/model-rift-id-lora.md) — read when the request fits or names Rift ID · LoRA: its uses, how to prompt it, its limits and facts.
- [Riftland Rair](references/model-riftland-soul.md) — read when the request fits or names Riftland Rair: its uses, how to prompt it, its limits and facts.
- [Kling 3.0 Pro](references/model-kling-3.md) — read when the request fits or names Kling 3.0 Pro: its uses, how to prompt it, its limits and facts.
- [Kling 4.0](references/model-kling-4.md) — read when the request fits or names Kling 4.0: its uses, how to prompt it, its limits and facts.
- [Kling 2.6 Pro](references/model-kling-2-6.md) — read when the request fits or names Kling 2.6 Pro: its uses, how to prompt it, its limits and facts.
- [Seedance 2.5](references/model-seedance-2-5.md) — read when the request fits or names Seedance 2.5: its uses, how to prompt it, its limits and facts.
- [Seedance 2.0](references/model-seedance-2-0.md) — read when the request fits or names Seedance 2.0: its uses, how to prompt it, its limits and facts.
- [Seedance 2.0 Fast](references/model-seedance-2-0-fast.md) — read when the request fits or names Seedance 2.0 Fast: its uses, how to prompt it, its limits and facts.
- [Veo 3.1](references/model-veo-3-1.md) — read when the request fits or names Veo 3.1: its uses, how to prompt it, its limits and facts.
- [Veo 3.1 Fast](references/model-veo-3-1-fast.md) — read when the request fits or names Veo 3.1 Fast: its uses, how to prompt it, its limits and facts.
- [Wan 2.6](references/model-wan-2-6.md) — read when the request fits or names Wan 2.6: its uses, how to prompt it, its limits and facts.
- [Wan 3.0 Prime](references/model-wan-3-prime.md) — read when the request fits or names Wan 3.0 Prime: its uses, how to prompt it, its limits and facts.
- [FLUX.3 Video](references/model-flux-3-video.md) — read when the request fits or names FLUX.3 Video: its uses, how to prompt it, its limits and facts.
- [MiniMax H3](references/model-minimax-h3.md) — read when the request fits or names MiniMax H3: its uses, how to prompt it, its limits and facts.
- [Hailuo 2.3](references/model-hailuo-2-3.md) — read when the request fits or names Hailuo 2.3: its uses, how to prompt it, its limits and facts.
Load one: open the file under `references/` next to this SKILL.md when the skill is installed; over MCP call `skill_get` with `skill_id` `models` and `reference` set to a file name from the list above.
