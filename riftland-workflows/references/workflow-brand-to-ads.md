<!-- generated from Riftland's knowledge base: workflow "brand-to-ads", version acf1ebe9037f, checksum 4a6b60c9. Do not edit. -->

# Brand kit to on-brand static ads

Set up the brand kit and its products, then make static ads that use its logo, palette, fonts and tone.

## When to use

The user has a business or a brand and wants a batch of static ads (feed, story) that look like it. The tools that read the brand kit (`brand_id`) are the Ads Studio, the Marketing Studio and the Motion Studio, plus the UI assets and Motion sandbox tools; `create`, `generate_image` and `generate_video` do not read it.

## You need

- The brand's website, or its details: name, colours, tone, audience, what it sells.
- The products or services to advertise.
- The objective (sales, traffic, leads) and the formats.

## Steps

1. **Create the brand kit (free)**: `brand_create`

```json
{
  "tool": "brand_create",
  "arguments": {
    "url": "the brand's website: Riftland reads the logo, palette, fonts and products",
    "manual": "the fields you write after reading the site: tagline, description, audience, tone, selling points, language"
  }
}
```

- Produces: The brand kit with its id.
- Feeds: Steps 2 `brand_get`, 4 `products_add` and 6 `ads_studio_generate`: brand_id.
- If it fails: Riftland runs no model on this path: what it guessed from the site is rule-based, so read the site yourself and write the text fields.

2. **Read the kit back and check it**: `brand_get`

```json
{
  "tool": "brand_get",
  "arguments": {
    "brand_id": "the brand"
  }
}
```

- Produces: The palette, fonts, logo, tone, audience, selling points and the products with their images.
- The user decides: Whether the kit is right: the colours, the tone and the claims. Everything the ads say comes from here.

3. **Correct the kit**: `brand_update`

```json
{
  "tool": "brand_update",
  "arguments": {
    "brand_id": "the brand",
    "fields": "only the fields to change: colours as hex, tone, audience, selling points"
  }
}
```

- Produces: The kit updated.

4. **Add the products or services**: `products_add`

```json
{
  "tool": "products_add",
  "arguments": {
    "brand_id": "the brand",
    "import_from_brand": "true to import from the brand's site",
    "kind": "product, or service for something done for the customer",
    "manual": "or add one by hand: name, description, price exactly as published"
  }
}
```

- Produces: Products with ids and images.
- Feeds: Steps 5 `quote` and 6 `ads_studio_generate`: product_ids.
- If it fails: Services cannot be picked out of a page reliably, and thin product data needs you: add each one with manual and never invent a price.

5. **Price the batch**: `quote`

```json
{
  "tool": "quote",
  "arguments": {
    "tool": "ads_studio_generate",
    "arguments": "the same arguments you will pass to ads_studio_generate"
  }
}
```

- Produces: The price for the whole batch and the balance.
- The user decides: The size of the batch and the price.

6. **Make the ads**: `ads_studio_generate`

```json
{
  "tool": "ads_studio_generate",
  "arguments": {
    "brand_id": "the brand",
    "product_ids": "the products to advertise; empty for brand-level ads",
    "aspect_ratios": "1:1, 4:5 or 9:16: the ads rotate through them",
    "objective": "the campaign objective",
    "prompt": "the direction: offer, season, angle, tone, audience",
    "concepts": "the ads you write: angle, headline, primary text, call to action, in-image text (one to three short strings) and the scene",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: The copy right away and the images as they render, grouped in a run.
- Feeds: Step 7 `ads_studio_concepts`: run_id.
- If it fails: Without your concepts the copy comes from generic rules. Cite only facts, prices and offers that are in the brand kit or from the user.

7. **Read the results as they finish**: `ads_studio_concepts`

```json
{
  "tool": "ads_studio_concepts",
  "arguments": {
    "brand_id": "the brand",
    "run_id": "the run"
  }
}
```

- Produces: Each ad's copy, format, render status and image.
- The user decides: Which ads to keep, and whether any needs a variation.

8. **Make variations of a winner**: `ads_studio_variations`

```json
{
  "tool": "ads_studio_variations",
  "arguments": {
    "concept_id": "the ad",
    "instruction": "an image change in plain words: a new background, a season",
    "copy": "new copy you write, one entry per version, for A/B tests",
    "keep_image": "true with copy: only the text changes, on the same image, for free",
    "count": "versions, 1 to 4"
  }
}
```

- Produces: New versions of the ad.
- The user decides: The number of versions before you call: this tool has no cap and no quote.

## Spending

`brand_create`, `brand_update`, `products_add`, `brand_get` and `ads_studio_concepts` charge nothing. `ads_studio_generate` has no cap: run `quote` with the tool name and the same arguments, and tell the user. `ads_studio_variations` has neither a cap nor a quote: it charges for every version it renders, so tell the user how many you will make before you call it (a copy-only version with keep_image is free).

## Limits

- Static ads only, in 1:1, 4:5 and 9:16. For a video ad see the product to ad workflow.
- Riftland runs no model for MCP calls, so you write the copy and the concepts, and the kit's written fields from a website are only rule-based guesses.
- `create` and `generate_image` take no brand: to keep a brand's look in a plain image, put its details in the request and pass its logo or product photo as references.

## See also

- `technique:consistency`: Keeping a character, a product or a brand the same
- `technique:text-on-image`: Text on an image
- `workflow:product-to-ad`: Product photo to product photos to a video ad
