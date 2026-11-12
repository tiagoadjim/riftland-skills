<!-- generated from Riftland's knowledge base: model "flux-2-pro", version acf1ebe9037f, checksum d993745e. Do not edit. -->

# FLUX.2 Pro

A FLUX.2 model for typography, exact colours and photorealism, with edits from several references.

## Use it for

- Brand graphics that need exact colours given as hex codes
- Short text inside a picture, such as a sign or a title
- Photoreal and cinematic stills
- Changing an image with several references
- Medium-length, well-structured prompts

## Pick something else when

- Long passages of text: pick a model built for layout and small text.
- Prompts that rely on a negative prompt: pick a model that takes one, or rephrase positively.
- A face that must stay the same across a series: pick a character (LoRA) model.

## Strengths

- Strong at typography from quoted text, hex-accurate colour and photorealism. [V]
- Rated fast in Riftland's catalog. [R]

## Watch out for

- Takes no negative prompts, and text should stay short. [V]
- Each image in a set is its own request, so a set takes longer to finish. [R]

Evidence marks: [V] the vendor's own claim; [I] an independent report; [R] what Riftland's catalog or pipeline enforces.

## How to prompt it

- **Order:** Subject, action, style, context, with the key element first: word order matters.
- **Length:** A medium prompt. The maker calls a prompt of about thirty to eighty words usually ideal.
- **Exact words:** Put the words in quotes and say how they are set: The text 'OPEN' appears in red neon letters above the door. Keep the text short.
- **Changing an image:** Say what to change and what stays, and name a colour as a hex code tied to the object: change the colour of only the bird in the middle to #e01075, keep everything else the same.
- **References:** Refer to each reference by its position, image 1, image 2, and say its job.
- **Leaving things out:** No FLUX.2 model takes negative prompts. Describe what you want instead: an empty street, not no cars.

Tips:
- Tie a hex colour to an object: an apple in color #0047AB works, a vague use #FF0000 somewhere is unreliable.
- Put the most important element first and the context last.
- Use photographic and film vocabulary for the look: lens, light, grain.

Avoid:
- Long passages of text: the maker says to keep text short.
- Negative phrasing such as no people: say what is there instead.
- A colour request with no object to attach it to.

## Examples

**Ask:** A neon sign over a bar door that says OPEN.

```text
A narrow bar door at night in the rain. The text 'OPEN' appears in red neon letters above the door, lettering thin and slightly crooked. Wet pavement reflecting the red glow, a single passer-by under an umbrella. Cinematic, shallow depth of field.
```

**Ask:** A product poster in my exact brand blue.

```text
A glass perfume bottle standing on a pale stone slab, the bottle cap in color #0047AB, soft studio light from the left, clean white background. Minimal luxury product photograph.
```

The hex code is tied to one object.

**Ask:** Change the weather in my photo to a clear evening.

```text
Modify the sky by replacing the grey clouds with a clear golden-hour sky. Keep the rest of the image exactly unchanged.
```

From the vendor's own guide:

- "The text 'OPEN' appears in red neon letters above the door"
- "A vintage illustration of an apple in color #0047AB with a heart-shaped cutout…"

## Facts

- Reference images: up to 8
- Can change an existing image: yes
- Aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 21:9
- Speed: fast
- Repeatable with a seed: yes
- Director tags (provisional): cinematic, edit
- Recommended pick for: Cinematic still

## In its family

The quick FLUX.2: pick it for exact colours, short text and fast rounds. Pick the top-quality sibling for the final version, and the newest sibling for complex prompts and whole-image edits.

Same family: FLUX 3 Image, FLUX.2 Max.
