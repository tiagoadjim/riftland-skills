<!-- generated from Riftland's knowledge base: workflow "product-to-ad", version acf1ebe9037f, checksum 238c9ce9. Do not edit. -->

# Product photo to product photos to a video ad

Start from a real product photo, make polished product images, then a video ad through the Marketing Studio.

## When to use

The user has a product photo and wants images for a listing or a campaign and a short video ad that shows the same product. For a quick product clip with no studio, use the image to video workflow with the chosen photo.

## You need

- A product photo: a public URL, a file the user uploads, or a saved product.
- What the product is and where it is sold, in a line.
- The kind of ad: a product-only video, a person using it, a language and a length.

## Steps

1. **Bring the product photo into Riftland**: `media_import_url`

```json
{
  "tool": "media_import_url",
  "arguments": {
    "url": "the public URL of the product photo",
    "kind": "image"
  }
}
```

- Produces: An asset id for the photo.
- Feeds: Step 2 `create` and step 5 `marketing_studio_generate`: the photo as a reference.
- If it fails: A photo with no public URL: call `media_upload` for a one-time link and a curl line, or `media_upload_widget` to let the user drop the file in the chat.

2. **Make product photos from it**: `create`

```json
{
  "tool": "create",
  "arguments": {
    "request": "the shot in the user's words: the kind (catalog, in use, hands, on a model, banner), the surface and the light; say the label and shape stay exact",
    "kind": "image",
    "references": "one entry: file is the product photo, role is reference",
    "count": "two to four options",
    "max_credits": "the most the user agreed to spend on this call"
  }
}
```

- Produces: Product photos with job ids.
- If it fails: The label or shape changed: say what must stay exact, or keep the real photo and change only the surroundings with `edit_image` (see the product photography guide).

3. **Compare them with the real photo**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the original photo and the new results"
  }
}
```

- Produces: The pictures at full detail.
- The user decides: Which photos to keep. Read the label letter by letter against the original: no tool checks it for you.

4. **Find the video format**: `marketing_studio_catalog`

```json
{
  "tool": "marketing_studio_catalog",
  "arguments": {
    "query": "product",
    "include": "formats, hooks and settings"
  }
}
```

- Produces: Format ids with what each needs (a product, an avatar), the durations and the aspect ratios.
- Feeds: Steps 5 and 6 `marketing_studio_generate`: format_id.

5. **Draft the video for free**: `marketing_studio_generate`

```json
{
  "tool": "marketing_studio_generate",
  "arguments": {
    "media": "video",
    "format_id": "from the catalog",
    "product_id": "the saved product, or product_url for a page",
    "images": "the chosen product photos, as extra references",
    "prompt": "the direction in the user's words",
    "language": "the language of speech and text",
    "dry_run": "true: nothing is created and no credits are charged"
  }
}
```

- Produces: A draft prompt, the references with their tags, the required tags and a quote.
- Feeds: Step 6 `marketing_studio_generate`: script, written from the draft.

6. **Make the video ad**: `marketing_studio_generate`

```json
{
  "tool": "marketing_studio_generate",
  "arguments": {
    "media": "video",
    "format_id": "the same format",
    "product_id": "the product id the draft returned, if it did",
    "images": "the same photos",
    "script": "your own version of the draft, keeping every required tag exactly as written",
    "consent": "true only when the references show real people and the user confirmed permission",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: The video job, with a signed link when it finishes in time.
- Feeds: Step 7 `jobs_wait`: job_ids.
- The user decides: The price from the draft's quote: tell the user and wait for a yes before this call.
- If it fails: A script that is missing a required tag is replaced by the draft, and the result says so.

7. **Wait while it renders**: `jobs_wait`

```json
{
  "tool": "jobs_wait",
  "arguments": {
    "job_ids": "the video job ids",
    "timeout_seconds": "how long to wait in this call"
  }
}
```

- Produces: The finished videos, or their status. Studio videos take minutes.

8. **Check the ad**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the video job id"
  }
}
```

- Produces: A contact sheet of the ad: check the product, the label and the speech.

## Spending

`create` takes `max_credits`. `marketing_studio_generate` has no cap: its dry run returns the quote, and `quote` with the tool name and the same arguments prices it again; tell the user and wait for a yes. `media_import_url`, `marketing_studio_catalog`, `media_view` and `jobs_wait` charge nothing.

## Limits

- `create` takes no product id and no brand: the product's exact label and shape rest on the reference photo and the words you write. No tool checks them.
- The Marketing Studio has its own formats and a short list of video models (`video_model`), not the whole video catalog.
- A video with people in the references needs the user's confirmation of permission (`consent`).

## See also

- `technique:product-photography`: Product photography looks
- `technique:references-and-roles`: References and their roles
- `workflow:image-to-video`: Image to video
- `workflow:brand-to-ads`: Brand kit to on-brand static ads
