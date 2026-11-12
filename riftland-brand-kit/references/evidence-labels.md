# Evidence labels

A brand kit mixes three kinds of facts. Tell the user which is which, field by field, so they correct the right ones and nobody builds on a guess.

## The three labels
- `declared`: the user said it in this conversation, or it was passed in `manual`. The user is the source. It wins over everything else.
- `read`: Riftland took it from the user's website or files (`brand_create` with `url`): the name, the logo, the colors, the fonts, the socials, the language, the products. Trust it until the user has seen it: a site can show a cookie-banner color, a partner's logo or a template font.
- `inferred`: guessed. Over MCP the written fields of a site-based kit (tagline, description, audience, tone, selling points, competitors, industry) are rule-based guesses, and anything you deduce from the site's text is also inferred. It stays inferred until the user confirms it.

## Which field is usually which
| Field | After `brand_create` with `url` | After `manual` |
|---|---|---|
| Name | `read` | `declared` |
| Logo | `read` | `declared` (the file they gave) |
| Colors | `read` | `declared` |
| Fonts | `read` | `declared` |
| Language | `read` | `declared` |
| Products | `read` | `declared` |
| Tagline, description | `inferred` | `declared` |
| Audience, tone, selling points | `inferred` | `declared` |
| Competitors, industry | `inferred` | `declared` |

If you read the website yourself and wrote a field, it is still `inferred`: you are the guesser, even when the text is on the site.

## How to present
Show a compact table and ask for corrections:

| Field | Value | Evidence |
|---|---|---|
| Name | Finanzas Simples | `read` |
| Palette | #0F172A #22C55E #F8FAFC | `read` |
| Tone | claro, cercano | `inferred` |
| Audience | 18 a 30 años | `declared` |

Then one question: "¿Corrijo algo?" Group the `inferred` rows together and say they are guesses.

## Rules
- Never show an `inferred` field as `read`.
- When the user confirms or edits a field, it becomes `declared`: say so ("lo dejo como tuyo").
- Write corrections with `brand_update` (only the fields that change).
- The labels live in the conversation. The kit stores values, not labels: if the conversation is long, re-show the table before a big step.
- If a `read` value looks wrong (a generic palette, a logo that is a partner's), say what looks off and ask; do not silently fix it.

## Conflicts
- Declared against read: the declared one wins; update the kit.
- Two read sources disagree (the site says one font, the logo file another): show both and ask.
- A field is missing: leave it empty and say so; do not fill it with a guess unless the user asks for a proposal, and then label it `inferred`.
