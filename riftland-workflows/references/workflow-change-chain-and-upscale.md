<!-- generated from Riftland's knowledge base: workflow "change-chain-and-upscale", version acf1ebe9037f, checksum 23f7743a. Do not edit. -->

# Change chain, then upscale

Take an accepted result, make targeted changes one at a time with change_of, then upscale the final.

## When to use

The user has an image they mostly like and wants a few specific changes, then a sharper, larger final.

## You need

- The accepted result's id: a job (job_…, or job_…#2 for its second image) or an asset (ast_…).
- The list of changes, in the user's words, one per item.

## Steps

1. **Make the first change**: `create`

```json
{
  "tool": "create",
  "arguments": {
    "request": "only the change, for example: change only the background to a beach; keep everything else the same",
    "kind": "image",
    "change_of": "the accepted result's id",
    "max_credits": "the most the user agreed to spend on this call"
  }
}
```

- Produces: The same image with just that change, in the same format, with a new job id.
- Feeds: Step 3 `create`: change_of is this job id.
- If it fails: `change_of` is for images only, needs the director, and cannot be combined with `character_id`. If it refuses, see the editing guide.

2. **Compare it with the source**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the source and the new result"
  }
}
```

- Produces: Both images at full detail.
- The user decides: Whether the change is right and nothing else moved. If it is not, ask again for the same change rather than adding a second one.

3. **Make the next change on the new result**: `create`

```json
{
  "tool": "create",
  "arguments": {
    "request": "the next single change, with the preserve list repeated",
    "kind": "image",
    "change_of": "the new job id from step 1",
    "max_credits": "the most the user agreed to spend on this call"
  }
}
```

- Produces: A new result with its own job id. Repeat steps 2 and 3 for each remaining change.
- If it fails: If edits start to pile up artifacts, start over with one fresh request that holds every change.

4. **Check the final**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the final result"
  }
}
```

- Produces: The image at full detail.
- The user decides: That this is the final. Upscaling does not fix mistakes: it only makes the picture larger.

5. **Price the upscale**: `quote`

```json
{
  "tool": "quote",
  "arguments": {
    "tool": "upscale_media",
    "arguments": "media is the final result's id; upscaler as chosen in step 6"
  }
}
```

- Produces: The price and the balance.
- The user decides: Whether to go ahead at that price.

6. **Upscale the final**: `upscale_media`

```json
{
  "tool": "upscale_media",
  "arguments": {
    "media": "the final result's id",
    "upscaler": "optional; the tool description says which one suits faces and products and which stays most faithful",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: The enlarged image (2 times larger), with a signed link.

7. **Look at the upscaled image**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the upscaled result"
  }
}
```

- Produces: The enlarged image for a last check of faces, text and edges.

## Spending

`create` takes `max_credits` on every change. `upscale_media` has no cap: price it with `quote` (tool upscale_media, the same arguments) and tell the user first. `media_view` is free.

## Limits

- `change_of` works on images only; a video cannot be changed this way.
- It cannot be combined with `character_id`, and it needs the director (not mode raw).
- Upscaling is 2 times, one file per call, and it does not repair what is wrong in the picture.

## See also

- `technique:editing-and-changes`: Editing and changing a result
- `technique:troubleshooting`: Troubleshooting: what went wrong and what to change
- `technique:references-and-roles`: References and their roles
