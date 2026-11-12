<!-- generated from Riftland's knowledge base: model "nano-banana-pro", version acf1ebe9037f, checksum 64435da0. Do not edit. -->

# Nano Banana Pro

Google's premium image model: a thinking step helps it follow complex instructions and keep a brand look, so it suits final pieces.

## Use it for

- Final pieces where a brand look must stay consistent
- Instructions with many parts that a quick model drops
- Posters and covers with text and a studio-lit look
- Compositions built from several references
- Edits where the details around the change must hold

## Pick something else when

- Quick drafts and many rounds of small tries: pick a fast model first and finish here.
- Dense small print or exact spelling in other languages: pick a model built for layout and typography.
- One character that must stay identical across a long series: pick a character (LoRA) model.

## Strengths

- A thinking step helps it follow complex instructions and keep a brand look consistent. [V]
- Renders words inside the image and follows studio-style direction: lighting, lens and film stock. [V]
- Composes one picture from several reference images, each with its own job. [V]

## Watch out for

- Small text, fine detail, exact spelling and grammar in other languages are weak points. [V]
- Complex blends or changes of lighting can leave artifacts, and character consistency may vary between images. [V]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Subject first, then the action, the location, the composition and the style, written as one short paragraph.
- **Length:** A few sentences that cover those five parts. Add detail only where it changes the picture.
- **Exact words:** Put the exact words in quotes and name the lettering: weight, colour and style, for example bold, white, sans-serif. Keep the text short and read the spelling in the result.
- **Changing an image:** Start with a strong verb and say what to change, then say what must stay the same: "Remove the man from the photo, keep the lighting and the background unchanged."
- **References:** Name each reference by its order and its job: Image 1 for the pose, Image 2 for the art style, Image 3 for the product.
- **Leaving things out:** There is no separate field for exclusions. Say what you want instead of what you do not want: an empty street, not no cars.

Tips:
- Put the whole brief in one request: the model plans a complex instruction before drawing.
- Use studio language for the look: the light setup, the lens, the film stock and the time of day, such as three-point softbox, golden hour backlighting or f/1.8.
- Change one thing per round and say what stays, so the result does not drift.

Avoid:
- Long runs of small text, or exact spelling in other languages: Google lists both as weak points.
- Counting on the same character to match across many images: consistency may vary.

## Examples

**Ask:** A poster for the Saturday market of a neighbourhood bakery.

```text
A poster for a neighbourhood bakery's Saturday market. A wooden stall piled with loaves in warm morning light, seen from slightly above. The headline "SATURDAY BREAD" in bold, white, sans-serif letters across the top, centred, with open space around it. Flat warm palette, soft shadows.
```

**Ask:** Take the parked car out of my street photo.

```text
Remove the parked car on the left side of the street. Keep the buildings, the people, the light and the camera angle exactly as they are.
```

A strong verb, then what to change, then what stays.

**Ask:** Put my mug on a marble counter, in the style of my moodboard.

```text
Image 1 is the product: a matte ceramic mug. Image 2 is the style reference: pale, soft, minimal. Place the mug from Image 1 on a white marble counter, lit by a three-point softbox, in the style of Image 2. Keep the mug's shape and colour unchanged.
```

From the vendor's own guide:

- "Using the attached napkin sketch as the structure and the attached fabric sample as the texture, transform this into a high-fidelity 3D armchair render."

## Facts

- Reference images: up to 8
- Can change an existing image: yes
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Speed: normal
- Repeatable with a seed: yes
- Director tags (provisional): character, typography, edit
- Recommended pick for: no mode today

## In its family

The premium pick of the family: use it for the final version of a piece, once a fast sibling has settled the idea.

Same family: Nano Banana 2.1, Nano Banana 2.
