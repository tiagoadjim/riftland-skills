---
name: riftland-prompting
description: "How to ask Riftland's models: when to write a prompt yourself and when to pass the user's words, the short rules that hold for every model, and one guide per technique (an image, text on an image, edits, references, consistency, video, camera moves, image to video, shots and timing, dialogue and sound, product photography, troubleshooting). Use when: \"escribí el prompt vos\", \"el texto salió mal escrito\", \"cómo le pido esto a un video\", \"how do I prompt this\", \"the hands look wrong\", \"the product changed in the result\", \"send this exact prompt\". NOT for: choosing a model (use models); a plain request that Riftland's director can word itself (use create); a job of several steps (use workflows)."
version: 1.0.0
---

# How to ask: prompts and techniques

For an image or a video, Riftland's director writes the prompt when you pass the user's words to `plan` and `create` (skill `create`). This skill is for when the words are yours to write, and for fixing a result that came out wrong. The technique guides are generated from Riftland's knowledge base and live in the references: open the one that matches the situation. Tools: `guide`, `create`, `plan`, `models_explore`.

## Who writes the prompt
| Situation | Who writes it | What you do |
|---|---|---|
| Any image or video request in the user's words | The director | Pass the words as said to `plan` and `create`. Do not rewrite, translate or embellish them. |
| The user gives an exact prompt and wants it sent as written | Nobody changes it | `create` with `mode` `raw` (and `kind`), or `generate_image` and `generate_video` with `prompt_mode` `raw`. Raw is sent unchanged, so write for the model: open its card first. |
| A tool with a prompt field and no director: the studios, editing, 3D, Cine frames and takes, or `generate_image` and `generate_video` when the director is off | You | Write it from the user's words with the technique for the job. When the tool takes a model, read that model's card. |
| The user asks you to write, improve or explain a prompt | You | Use the techniques below, show the prompt, and send it only on their word. |

Spending, questions and delivery do not change in any row: the Riftland essentials at the end of this skill apply, and a `create`, `generate_image` or `generate_video` call always carries an agreed `max_credits`.

## Before you write by hand
1. Ask `guide` with `for` set to the situation in the user's words (or what went wrong): it returns the closest entries, free.
2. If a model is chosen, read its card (`guide` with `topic` `model:<id>`, or `models_explore` with `action` `get`): "How to prompt it" wins over the general rules below.
3. Open the technique for the situation (next section).

## Rules that hold for every model
1. Say what the picture or the clip shows first, then how it looks: one subject, one action, one place per shot.
2. Exact words go in quotes, short, spelled as they must appear. Check every character in the result.
3. Say what you want rather than what you do not; the card says how a model takes things to leave out.
4. To change a result, say only the change and what stays. Riftland attaches the original (`change_of`).
5. A video prompt describes motion and the camera, not a still: one camera move per shot.
6. Say what each reference is for (the subject, the style, the layout, a first frame) in the order you pass them.
7. Change one thing at a time when a result is wrong, then open the troubleshooting guide.

## Which technique for which situation
| Situation | Open |
|---|---|
| A new image | [Prompting an image](references/technique-image-prompting.md) |
| Words on the image | [Text on an image](references/technique-text-on-image.md) |
| A product photo (catalog, in use, hands, on a model, banner) | [Product photography looks](references/technique-product-photography.md) |
| Changing a result | [Editing and changing a result](references/technique-editing-and-changes.md) |
| Reference images and what each is for | [References and their roles](references/technique-references-and-roles.md) |
| The same character, product or brand again | [Keeping a character, a product or a brand the same](references/technique-consistency.md) |
| A new video | [Prompting a video](references/technique-video-prompting.md) |
| Camera movement | [Camera movement vocabulary](references/technique-camera-moves.md) |
| Animating an image | [Image to video](references/technique-image-to-video.md) |
| Several shots, or timing inside a clip | [Multi-shot clips and timing](references/technique-multi-shot-and-timing.md) |
| Speech, sound and music in a video | [Dialogue, sound and music](references/technique-dialogue-sound-music.md) |
| A result went wrong | [Troubleshooting: what went wrong and what to change](references/technique-troubleshooting.md) |

A job of several steps (an image that becomes a video, a series, an ad) is skill `workflows`; which model suits the job is skill `models`.

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
- [Prompting an image](references/technique-image-prompting.md) — read when you are writing or fixing a prompt and the work is about prompting an image.
- [Text on an image](references/technique-text-on-image.md) — read when you are writing or fixing a prompt and the work is about text on an image.
- [Editing and changing a result](references/technique-editing-and-changes.md) — read when you are writing or fixing a prompt and the work is about editing and changing a result.
- [References and their roles](references/technique-references-and-roles.md) — read when you are writing or fixing a prompt and the work is about references and their roles.
- [Keeping a character, a product or a brand the same](references/technique-consistency.md) — read when you are writing or fixing a prompt and the work is about keeping a character, a product or a brand the same.
- [Prompting a video](references/technique-video-prompting.md) — read when you are writing or fixing a prompt and the work is about prompting a video.
- [Camera movement vocabulary](references/technique-camera-moves.md) — read when you are writing or fixing a prompt and the work is about camera movement vocabulary.
- [Image to video](references/technique-image-to-video.md) — read when you are writing or fixing a prompt and the work is about image to video.
- [Multi-shot clips and timing](references/technique-multi-shot-and-timing.md) — read when you are writing or fixing a prompt and the work is about multi-shot clips and timing.
- [Dialogue, sound and music](references/technique-dialogue-sound-music.md) — read when you are writing or fixing a prompt and the work is about dialogue, sound and music.
- [Product photography looks](references/technique-product-photography.md) — read when you are writing or fixing a prompt and the work is about product photography looks.
- [Troubleshooting: what went wrong and what to change](references/technique-troubleshooting.md) — read when you are writing or fixing a prompt and the work is about troubleshooting: what went wrong and what to change.
Load one: open the file under `references/` next to this SKILL.md when the skill is installed; over MCP call `skill_get` with `skill_id` `prompting` and `reference` set to a file name from the list above.
