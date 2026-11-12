# How each tool uses the brand

Say only what the tools do. Several tools take a `brand_id`; the plain image and video tools do not.

## Tools that take `brand_id`
| Tool | What it reads from the kit |
|---|---|
| `marketing_studio_generate` | Name, tagline, up to 4 colors, the spirit of the heading font, tone and the logo as a reference. Only for the formats that support a brand kit: `product-standalone`, `marketplace`, `posters`, `ads`, the services formats, and the product-link tool. |
| `ads_studio_generate` (required) | Everything: copy from tone, audience, selling points and language; images from palette, logo, fonts and product photos. |
| `motion_studio_generate` (required) | The whole visual system: palette by role, fonts, logo, and the tone for the copy. |
| `ads_studio_chat`, `ads_studio_concepts` | The same kit, by `brand_id`. |

## Where the brand is ignored
- `marketing_studio_generate` with `product-with-model`, the UGC and TikTok formats, the motion formats and the ad-reference and app-video tools: the `brand_id` is dropped. Put the brand's name, offer and tone in `prompt`.
- `create`, `plan`, `generate_image` and `generate_video` have no brand field. The director's modes list a brand block as data, but nothing passes a brand to it today, so there is no brand lock in these tools. To get the brand's look in a plain image, write the palette and the logo's role in the user's words, or use a studio that reads the kit.

## What to promise
- "Los anuncios y los videos de Motion salen con tu paleta, tu logo y tu tono."
- "Las imágenes de producto de Marketing Studio usan tu paleta y tu logo en los formatos de producto, marketplace, póster y anuncio."
- Not: "todas mis imágenes van a salir con tu marca". A plain `create` does not know the kit.

## Language
The kit's `language` is the language Ads Studio writes in. Check it before an ad run: a wrong language ruins the copy. Change it with `brand_update`.

## Products
Products belong to a brand (`brand_id` in `products_add`). Marketing Studio and Ads Studio read their name, price, selling points and photos by `product_id`.
