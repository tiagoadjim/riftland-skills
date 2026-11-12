# Reusing the character

Once saved, the character is a `character_id`. Find it with `characters_list` (name, kind, build state) and pass it where the tool takes a character.

## Images (`create`)
- `request`: the scene in the user's words ("Luna tomando un café en Palermo, luz de la mañana"), `character_id`, `count` 1 to 4, `max_credits`.
- Leave `model` out: the director picks one that keeps the person. With a ready trained identity, ask `models_explore` for the model that needs one (`requiresLoraCharacter`) and pass it as `model`.
- Keep one look across a series: reuse the first result's format and the same character in every call.
- `change_of` cannot be combined with `character_id`: to change one thing in an image that already has the person, use `change_of` alone; the person is already in it.

## Video (`create`)
- `kind` "video", `character_id`, the action in the user's words. The character's image is the first frame unless a start frame is given.
- The wait is longer: `jobs_wait` with the job id.

## A talking clip (`talking_avatar`)
- `character_id`, `script` (or `audio`), optional `voice`. The skill `talking-avatar` has the voices and limits.
- A character made from the user's photos needs `consent: true` again, on the user's word.

## In ads (Marketing Studio)
- `avatar_id` set to the character's id in `marketing_studio_generate`. The skills `ugc-video-ad` and `product-photoshoot` use it.
- Videos with a real person's character ask for the permission again.

## In clips with a driving video (`studio_video`)
- `character_id` for swap and motion. The skill `character-swap` has the steps. Permission again.

## Several characters in one image
- Use `consistent-elements` (@tags) or one reference per person in `create`; `character_id` takes one character.

## When the person does not look the same
- Look with `media_view`. Check the main photo first ([photo guide](photo-guide.md)).
- Add a supporting angle as `sheet_images` with another `character_save` call only if the user asks: it changes the stored character.
- Offer the trained identity if the user needs the exact face in many scenes.
