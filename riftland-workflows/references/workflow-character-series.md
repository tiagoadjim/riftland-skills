<!-- generated from Riftland's knowledge base: workflow "character-series", version acf1ebe9037f, checksum 9c3c6e27. Do not edit. -->

# A character, then a consistent series

Design or save a character, then make a series of images and a video that keep the same person.

## When to use

The user wants the same person across several images and a clip: a brand ambassador, a story character, a mascot. For one image, a reference photo is enough (see the references guide).

## You need

- Who the character is: age, look, wardrobe, vibe, or photos to base it on.
- If a photo is of a real person the user brought: their confirmation that they have that person's permission (`consent`). Ask; never assume.
- Whether the user wants the closest likeness, which means training a character (about 25 minutes, charged).

## Steps

1. **Design the character**: `avatar_generate`

```json
{
  "tool": "avatar_generate",
  "arguments": {
    "kind": "rift for a realistic person, influencer for a stylized character",
    "prompt": "who the person is: age, look, wardrobe, vibe",
    "count": "options to choose from, up to four",
    "reference_images": "optional photos to base the character on",
    "consent": "true only when the user confirmed permission for a photo they brought",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: Up to four options, each with a job id.
- Feeds: Step 3 `character_save`: image is the chosen option.
- The user decides: Whether to spend: `quote` the call first and tell the user the price.

2. **Look at the options**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the option job ids"
  }
}
```

- Produces: The options at full detail.
- The user decides: Which option is the character.

3. **Save the chosen option as a character**: `character_save`

```json
{
  "tool": "character_save",
  "arguments": {
    "name": "the character's name",
    "image": "the chosen option",
    "description": "what must stay the same: face, hair, wardrobe",
    "kind": "the same kind as in step 1",
    "build_lora": "true only when the user wants the closest likeness; training is charged and takes about 25 minutes",
    "consent": "true when the image is a photo the user brought and they confirmed permission"
  }
}
```

- Produces: The character with its id.
- Feeds: Steps 5 `create` and 7 `generate_video`: character_id.
- The user decides: Whether to train: `quote` character_save with the same arguments and tell the user the price first.

4. **Check the character and its training**: `characters_list`

```json
{
  "tool": "characters_list",
  "arguments": {}
}
```

- Produces: The saved characters with their ids and, for a trained one, its status (ready, or still building).
- If it fails: A training that is not ready yet is waited for: check again later. Meanwhile the series can use the character's image as a reference.

5. **Make the series, one request per scene**: `create`

```json
{
  "tool": "create",
  "arguments": {
    "request": "the scene in the user's words; keep the wardrobe line the same each time",
    "kind": "image",
    "character_id": "the saved character",
    "count": "up to four",
    "max_credits": "the most the user agreed to spend on this call"
  }
}
```

- Produces: Images of the same person in each scene.
- If it fails: To keep the exact face with a trained character, call `generate_image` with the image model that needs a trained identity (check the model's facts) and the character_id.

6. **Compare the series with the character**: `media_view`

```json
{
  "tool": "media_view",
  "arguments": {
    "ids": "the character's image and the new results"
  }
}
```

- Produces: The images side by side.
- The user decides: Which results to keep. Riftland does not score identity: you and the user judge it.

7. **Make a clip with the character**: `generate_video`

```json
{
  "tool": "generate_video",
  "arguments": {
    "prompt": "the motion, with the wardrobe line repeated",
    "character_id": "the saved character: its image becomes the first frame when you give no start_image",
    "start_image": "optional: one of the series results, to start from that exact picture",
    "max_credits": "the most the user agreed to spend on this call",
    "wait_seconds": "how long to wait inside the call"
  }
}
```

- Produces: The video job, with a signed link when it finishes in time.
- Feeds: Step 8 `jobs_wait`: job_ids.

8. **Wait while it renders**: `jobs_wait`

```json
{
  "tool": "jobs_wait",
  "arguments": {
    "job_ids": "the video job id",
    "timeout_seconds": "how long to wait in this call"
  }
}
```

- Produces: The finished clip, or its status.

## Spending

`avatar_generate` and `character_save` have no cap: run `quote` with the tool name and the same arguments first and tell the user the price. Training a character is the dearest part. `create` and `generate_video` take `max_credits`. `characters_list`, `media_view` and `jobs_wait` are free.

## Limits

- A character guides the result but does not guarantee the face. The closest likeness needs a trained character, which takes about 25 minutes.
- `change_of` cannot be combined with `character_id`, because the character is already in the image.
- Nothing in the generate tools checks identity: compare the results yourself.
- A character photo of a real person the user brought needs their confirmation of permission on the tools that ask for `consent`.

## See also

- `technique:consistency`: Keeping a character, a product or a brand the same
- `technique:references-and-roles`: References and their roles
- `workflow:portrait-to-talking-avatar`: Portrait to talking avatar
- `workflow:image-to-video`: Image to video
