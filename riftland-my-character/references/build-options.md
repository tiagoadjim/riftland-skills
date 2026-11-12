# Sheet and trained identity

Saving a character is free and often enough. Builds are extra steps the user chooses.

## Save only
- The main photo becomes `character_id`. Every tool that takes a character uses it as the person to keep.
- Good for most images and videos, and the only step needed for talking clips.

## Turnaround sheet (`build_sheet`)
- One image with the person from several views, drawn from the main image.
- Helps full-body shots, clothing consistency and videos where the person turns.
- Quick (about a minute) and cheaper than the trained identity. `quote` it with `character_save`.
- The sheet is added to the character: `characters_list` shows it in `sheets`.

## Trained identity (`build_lora`)
- Riftland generates a set of new shots of the person from the main image (and the sheet), then trains a small identity model on that generated set. It does not train on the user's photos directly.
- About 25 minutes. The character's `build` and LoRA `status` in `characters_list` tell where it is (training, ready, failed).
- Worth it when the user wants the exact face in many different scenes with the lowest price per image afterwards.
- Used through the image model that needs one: `models_explore` (kind image) lists it with `requiresLoraCharacter`. The director never picks it by itself; pass it as `model` together with the `character_id`.
- Not worth it for a handful of images: the saved character is enough.

## Following a build
1. After `character_save`, say that the build is running and about how long.
2. When the user comes back, `characters_list`: a LoRA `status` of ready means it can be used.
3. Failed: the credits come back. Tell the user, offer to retry once, and check the main photo first.

## Permission
Any build from photos the user brought needs `consent: true` on the user's word (see the skill). Ask once for the whole request.

## Pricing
`quote` with `tool` `character_save` and the build flags you will send; the quote names what it includes. Present sheet and trained identity as separate choices with their separate credits.
