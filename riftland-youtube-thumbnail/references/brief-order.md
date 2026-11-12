# The ordered brief and tweaks

The request for a chosen concept is plain language in a fixed order. The director turns it into a model prompt; you give it the parts, in order, with nothing missing.

## The order
1. Frame. The shot size and where the main element sits: "tight close-up, face on the right third".
2. Subject. Who or what, and the expression or action: "the person from the photo, wide eyes, mouth open".
3. The exact words. In quotes, in the video's language, as they must be written: “SE ROMPIÓ”. If there are no words, write "No text."
4. Supporting element. One thing that tells the story: "a cracked phone in the left hand".
5. Background. A color or a simple scene: "solid red-orange with a soft vignette".
6. Light. Source and quality: "strong from the front, a bright edge on the hair".

## Rules
- One supporting element only. Two elements compete and shrink at small size.
- The subject is the person from the photo, never a description of a face: the photo carries the face.
- Colors in plain names, not codes. Two main colors at most.
- Leave the bottom-right corner empty.
- Write the brief in the user's language; the exact words stay as they must appear, never translated.

## Worked examples
Reaction close-up:
Frame: tight close-up, face on the right third. Subject: the person from the photo, wide eyes, mouth open. Exact words: “SE ROMPIÓ”. Supporting element: a cracked phone in the left hand. Background: solid red-orange with a soft vignette. Light: strong from the front, bright edge on the hair.

Big number:
Frame: the number fills the left two thirds, face small in the top-right corner. Subject: the person from the photo, smiling, thumbs up. Exact words: “30 DÍAS”. Supporting element: a calendar page behind the number. Background: deep blue. Light: soft from the front, a glow behind the number.

Clean statement:
Frame: centered subject with space above. Subject: the object from the photo on a plain surface. Exact words: “LO ÚNICO QUE NECESITÁS”. Supporting element: none. Background: warm off-white. Light: soft window light from the left.

## Tweaks with change_of
The request is only the change, in the user's words, and `change_of` is the id of the result (`job_…` or `job_…#2`). The rest of the image stays. One change per request.
- "Cambiá la palabra a amarillo."
- "Hacé el fondo más oscuro."
- "Mové el texto a la izquierda."
- "Sacá el objeto de la mano."
A tweak that touches the face is not a tweak: make a new request with a better photo. `change_of` cannot be combined with `character_id`; for a saved character, tweak the other parts or start a new concept.

## Counting generations
Every image of every call counts toward the cap of 8 per thumbnail, including each tweak. Keep a running count: "van 5 de 8".
