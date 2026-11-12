# Recommended models (a snapshot)

This file is a snapshot generated from Riftland's router. Skills never rely on it: the live answer is `models_explore` with action `recommended` over MCP, or `riftland models --recommended` in the Riftland CLI. Do not hard-code a model from this table; ask the live catalog, or let `plan` and `create` choose.

The sections by family come from Riftland's model cards, the same ones the `riftland-models` skill carries in full: each entry links its card. The live answers are `models_explore` (action `get` shows a card) and `guide` (a card, a technique or a workflow, free).

Recommendations version: `bf497c68` · Generated on 2026-11-12.

Knowledge version: `acf1ebe9037f` (the version of the cards that the family sections and the generated references are built from).

The same data, for tools, is in `models.json`.

## Images

| What you want to make | Model Riftland picks today | Format | Why | Faster and cheaper alternatives |
|---|---|---|---|---|
| **Photo**: A realistic photograph of a subject or scene with no special style or product focus. | Seedream 5.5 (`seedream-5.5`) | 4:3 | Best for realistic photos | none |
| **Portrait**: A person is the subject: headshot, editorial or character portrait. | Riftland Rair (`riftland-soul`) | 3:4 | Best for portraits | cheaper: Qwen Image 3 (`qwen-image-3`) |
| **Cinematic still**: A single frame that looks taken from a feature film: mood, wide frame, motivated light. | FLUX.2 Pro (`flux-2-pro`) | 16:9 | Best for cinematic looks | none |
| **Product shot**: An object or packaged product is the hero: catalog, e-commerce or brand imagery. | Seedream 5.5 (`seedream-5.5`) | 1:1 | Best for realistic photos | none |
| **Lifestyle**: A product or person shown in a believable everyday situation, candid and warm. | Seedream 5.5 (`seedream-5.5`) | 4:3 | Best for realistic photos | none |
| **Social post**: A scroll-stopping image made for a feed: bold subject, clear focal point, room for a caption. | GPT Image 2.6 Sunburst (`gpt-image-2.6-sunburst`) | 3:4 | Best for graphic design layouts | faster: Ideogram 4 (`ideogram-4`); cheaper: GPT Image 2.5 Flare (`gpt-image-2.5-flare`) |
| **Poster & typography**: Legible text is the point: poster, cover, banner, title card or any layout with words. | GPT Image 2.6 Sunburst (`gpt-image-2.6-sunburst`) | 3:4 | Best for text on images | faster: Ideogram 4 (`ideogram-4`); cheaper: GPT Image 2.5 Flare (`gpt-image-2.5-flare`) |
| **Logo & vector**: A logo, icon, emblem or flat vector graphic on a plain background. | GPT Image 2.6 Sunburst (`gpt-image-2.6-sunburst`) | 1:1 | Best for logos and vector graphics | faster: GPT Image 2.6 Flare (`gpt-image-2.6-flare`) |
| **Illustration**: A drawn or painted image, not a photograph: cartoon, editorial, concept art, picture-book. | GPT Image 2.6 Sunburst (`gpt-image-2.6-sunburst`) | 1:1 | Best for graphic design layouts | faster: Ideogram 4 (`ideogram-4`); cheaper: GPT Image 2.5 Flare (`gpt-image-2.5-flare`) |
| **Edit image**: Change one thing in an existing image and keep everything else exactly as it is. | Seedream 5.5 (`seedream-5.5`) | 1:1 | Best for precise edits | cheaper: Seedream 4.5 (`seedream-4.5`) |

### Image models, by family

#### Google Nano Banana

**Nano Banana 2.1** (`nano-banana-2.1`): The newer release of Google's fast image model, with the same way of prompting as the earlier fast one.
- Best for: Fast drafts and many rounds of small changes; Posters, covers and social graphics with a short headline; Changing a photo you upload: remove, replace or restyle one thing
- Pick something else when: Dense small print or exact spelling in other languages: pick a model built for layout and typography.; A brand palette that must match exact hex colours: pick a model documented for hex-accurate colour.; One character that must stay identical across a long series: pick a character (LoRA) model.
- How to prompt it:
  - Use studio language for the look: the light setup, the lens, the film stock and the time of day, such as three-point softbox, golden hour backlighting or f/1.8.
  - Change one thing per round and say what stays, so the result does not drift.
  - Avoid: Long runs of small text, or exact spelling in other languages: Google lists both as weak points.
- Full card: [riftland-models/references/model-nano-banana-2-1.md](riftland-models/references/model-nano-banana-2-1.md)

**Nano Banana 2** (`nano-banana-2`): Google's fast image model: quick generation with readable text, studio-style control and edits from reference images.
- Best for: Fast drafts and many rounds of small changes; Posters, covers and social graphics with a short headline; Changing a photo you upload: remove, replace or restyle one thing
- Pick something else when: Dense small print or exact spelling in other languages: pick a model built for layout and typography.; A brand palette that must match exact hex colours: pick a model documented for hex-accurate colour.; One character that must stay identical across a long series: pick a character (LoRA) model.
- How to prompt it:
  - Use studio language for the look: the light setup, the lens, the film stock and the time of day, such as three-point softbox, golden hour backlighting or f/1.8.
  - Change one thing per round and say what stays, so the result does not drift.
  - Avoid: Long runs of small text, or exact spelling in other languages: Google lists both as weak points.
- Full card: [riftland-models/references/model-nano-banana-2.md](riftland-models/references/model-nano-banana-2.md)

**Nano Banana Pro** (`nano-banana-pro`): Google's premium image model: a thinking step helps it follow complex instructions and keep a brand look, so it suits final pieces.
- Best for: Final pieces where a brand look must stay consistent; Instructions with many parts that a quick model drops; Posters and covers with text and a studio-lit look
- Pick something else when: Quick drafts and many rounds of small tries: pick a fast model first and finish here.; Dense small print or exact spelling in other languages: pick a model built for layout and typography.; One character that must stay identical across a long series: pick a character (LoRA) model.
- How to prompt it:
  - Put the whole brief in one request: the model plans a complex instruction before drawing.
  - Use studio language for the look: the light setup, the lens, the film stock and the time of day, such as three-point softbox, golden hour backlighting or f/1.8.
  - Avoid: Long runs of small text, or exact spelling in other languages: Google lists both as weak points.
- Full card: [riftland-models/references/model-nano-banana-pro.md](riftland-models/references/model-nano-banana-pro.md)

#### GPT Image

**GPT Image 2.6 Flare** (`gpt-image-2.6-flare`): The speed-focused newer GPT Image: graphics and text, with vector, animated and transparent output, larger sizes and edits of a marked zone.
- Best for: Logos and icons as vector files; Stickers, cut-outs and overlays with a transparent background; Infographics, diagrams and posters with real text
- Pick something else when: The most detail and the most precise edits: pick the high-detail sibling of this family.; Dense small print: pick a model built for layout and very small text.; A photographic face that must stay the same across a series: pick a character (LoRA) model.
- How to prompt it:
  - Say "photorealistic" when you want a photo. Camera details are read loosely, so use them for the look, not for exact optics.
  - Name the intended use, such as an infographic or an ad, so the layout fits it.
  - Avoid: Small or dense blocks of text: they are the family's weak point.
- Full card: [riftland-models/references/model-gpt-image-2-6-flare.md](riftland-models/references/model-gpt-image-2-6-flare.md)

**GPT Image 2.6 Sunburst** (`gpt-image-2.6-sunburst`): The detail-focused newer GPT Image: precise edits and fine detail, with the same vector, animated and transparent output.
- Best for: Final graphics where detail and precise edits matter; Edits that must keep an identity or a layout; Logos and icons as vector files
- Pick something else when: Quick drafts and many rounds of small tries: pick the speed-focused sibling or a fast model.; Dense small print: pick a model built for layout and very small text.; A photographic face that must stay the same across a series: pick a character (LoRA) model.
- How to prompt it:
  - Say "photorealistic" when you want a photo. Camera details are read loosely, so use them for the look, not for exact optics.
  - Name the intended use, such as an infographic or an ad, so the layout fits it.
  - Avoid: Small or dense blocks of text: they are the family's weak point.
- Full card: [riftland-models/references/model-gpt-image-2-6-sunburst.md](riftland-models/references/model-gpt-image-2-6-sunburst.md)

**GPT Image 2.5 Flare** (`gpt-image-2.5-flare`): A fast GPT Image for everyday graphics, text and edits, from before the newer pair added more output options.
- Best for: Posters, logos and graphics where the words must be right; Infographics and diagrams; Ad and UI mock-ups where the layout matters
- Pick something else when: Vector files, transparent backgrounds or animated output: pick a newer model of this family that exports them.; Dense small print: pick a model built for layout and very small text.; A face that must stay the same across a series: pick a character (LoRA) model.
- How to prompt it:
  - Say "photorealistic" when you want a photo. Camera details are read loosely, so use them for the look, not for exact optics.
  - Name the intended use, such as an infographic or an ad, so the layout fits it.
  - Avoid: Small or dense blocks of text: they are the family's weak point.
- Full card: [riftland-models/references/model-gpt-image-2-5-flare.md](riftland-models/references/model-gpt-image-2-5-flare.md)

**GPT Image 2** (`gpt-image-2`): The first GPT Image model. Its maker marks it deprecated, so new work belongs on a newer sibling.
- Best for: Posters, logos and graphics where the words must be right; Infographics and diagrams; Ad and UI mock-ups where the layout matters
- Pick something else when: New work: pick a current model, because the maker deprecated this one.; Vector files, transparent backgrounds or animated output: pick a newer model of this family that exports them.; Quick drafts: pick a fast model; this one is rated slow.
- How to prompt it:
  - Say "photorealistic" when you want a photo. Camera details are read loosely, so use them for the look, not for exact optics.
  - Name the intended use, such as an infographic or an ad, so the layout fits it.
  - Avoid: Small or dense blocks of text: they are the family's weak point.
- Full card: [riftland-models/references/model-gpt-image-2.md](riftland-models/references/model-gpt-image-2.md)

#### ByteDance Seedream

**Seedream 5.5** (`seedream-5.5`): The newest Seedream: edits meant to hold over many rounds, and less corrupted text than the earlier ones.
- Best for: Edits you will repeat over many rounds; Images with a headline or a label that must stay legible; Product hero images with space left for a headline
- Pick something else when: Long passages of exact text: pick a model built for typography and check any result.; A face that must stay the same across a series: pick a character (LoRA) model.; Output that needs a vector file or a transparent background: pick a model that exports them.
- How to prompt it:
  - Name the intended use: a product hero, a poster, a thumbnail. It shapes the composition.
  - Leave open space where a headline will go if you plan to add one.
  - Avoid: Expecting a reference to reproduce a face or an object pixel for pixel: it guides, it does not copy.
- Full card: [riftland-models/references/model-seedream-5-5.md](riftland-models/references/model-seedream-5-5.md)

**Seedream 5.0 Pro** (`seedream-5-pro`): A Seedream release built around precise, interactive editing with references.
- Best for: Precise edits of an image you upload; Infographics and layouts that need controlled changes; Photoreal scenes from a clear brief
- Pick something else when: Pieces with a lot of exact text: pick a model built for typography.; Quick drafts: pick a fast model.; A face that must stay the same across a series: pick a character (LoRA) model.
- How to prompt it:
  - Name the intended use: a product hero, a poster, a thumbnail. It shapes the composition.
  - Leave open space where a headline will go if you plan to add one.
  - Avoid: Expecting a reference to reproduce a face or an object pixel for pixel: it guides, it does not copy.
- Full card: [riftland-models/references/model-seedream-5-pro.md](riftland-models/references/model-seedream-5-pro.md)

**Seedream 4.5** (`seedream-4.5`): An earlier Seedream: image generation from text, or from one or several references, with edits.
- Best for: Photoreal scenes and product shots from a clear brief; Changing an image you upload: replace one object, keep the rest; Pictures built from several references with different jobs
- Pick something else when: Pieces with a lot of exact text: pick a model built for typography.; Edits that must stay stable over many rounds: pick a newer model of this family.; A face that must stay the same across a series: pick a character (LoRA) model.
- How to prompt it:
  - Name the intended use: a product hero, a poster, a thumbnail. It shapes the composition.
  - Leave open space where a headline will go if you plan to add one.
  - Avoid: Expecting a reference to reproduce a face or an object pixel for pixel: it guides, it does not copy.
- Full card: [riftland-models/references/model-seedream-4-5.md](riftland-models/references/model-seedream-4-5.md)

#### Black Forest Labs FLUX

**FLUX 3 Image** (`flux-3`): The newest FLUX image model: better with complex prompts and text, and with changes to a whole image.
- Best for: Complex prompts with many parts; Whole-image changes: weather, relighting, colour grading and text edits; Images with a short title or sign
- Pick something else when: Long passages of text: pick a model built for layout and small text.; A face that must stay the same across a series: pick a character (LoRA) model.; Vector files or transparent backgrounds: pick a model that exports them.
- How to prompt it:
  - Whole-image changes work: weather, relighting, colour grading and text edits.
  - Start short and add detail only where the first result differs from what you meant.
  - Avoid: Writing a long prompt before you have seen what a short one gives.
- Full card: [riftland-models/references/model-flux-3.md](riftland-models/references/model-flux-3.md)

**FLUX.2 Max** (`flux-2-max`): The highest-quality FLUX.2 model, for final images where detail and consistency count.
- Best for: Final images where the highest quality is the goal; Brand graphics that need exact colours given as hex codes; Photoreal stills with fine detail
- Pick something else when: Quick drafts: pick a fast model and finish here.; Long passages of text: pick a model built for layout and small text.; Prompts that rely on a negative prompt: pick a model that takes one, or rephrase positively.
- How to prompt it:
  - Tie a hex colour to an object: an apple in color #0047AB works, a vague use #FF0000 somewhere is unreliable.
  - Put the most important element first and the context last.
  - Avoid: Long passages of text: the maker says to keep text short.
- Full card: [riftland-models/references/model-flux-2-max.md](riftland-models/references/model-flux-2-max.md)

**FLUX.2 Pro** (`flux-2-pro`): A FLUX.2 model for typography, exact colours and photorealism, with edits from several references.
- Best for: Brand graphics that need exact colours given as hex codes; Short text inside a picture, such as a sign or a title; Photoreal and cinematic stills
- Pick something else when: Long passages of text: pick a model built for layout and small text.; Prompts that rely on a negative prompt: pick a model that takes one, or rephrase positively.; A face that must stay the same across a series: pick a character (LoRA) model.
- How to prompt it:
  - Tie a hex colour to an object: an apple in color #0047AB works, a vague use #FF0000 somewhere is unreliable.
  - Put the most important element first and the context last.
  - Avoid: Long passages of text: the maker says to keep text short.
- Full card: [riftland-models/references/model-flux-2-pro.md](riftland-models/references/model-flux-2-pro.md)

#### Alibaba Qwen Image

**Qwen Image 3** (`qwen-image-3`): Alibaba's image model for complex layouts, very small text and long prompts, with edits from a few references.
- Best for: Newspaper pages, menus and storyboards with many regions; Posters with text in several languages; Very small text that must stay readable
- Pick something else when: Vector files or transparent backgrounds: pick a model that exports them.; One character across a long series: pick a character (LoRA) model.
- How to prompt it:
  - Describe a layout as regions: header, body columns, footer, caption.
  - Name the language of each piece of text.
  - Avoid: Mixing languages without naming the language of each text.
- Full card: [riftland-models/references/model-qwen-image-3.md](riftland-models/references/model-qwen-image-3.md)

#### Ideogram

**Ideogram 4** (`ideogram-4`): Ideogram's model for text, layout and palette: the one to pick when words and their placement are the point.
- Best for: Posters and flyers with a headline and supporting lines; Layouts where each element has a place: title, badge, caption; Graphics in a brand palette given as colour names or hex codes
- Pick something else when: Changing or restyling an image you already have: pick a model that takes reference images.; Keeping one character across several images: pick a character (LoRA) model.; Vector files or transparent backgrounds: pick a model that exports them.
- How to prompt it:
  - Give each element a place: left third, upper right corner, centred under the title.
  - Name the colours, or give hex codes, so the palette is fixed.
  - Avoid: A single run-on sentence that mixes layout, text and style.
- Full card: [riftland-models/references/model-ideogram-4.md](riftland-models/references/model-ideogram-4.md)

#### Krea

**Krea 2 Large** (`krea-2`): Krea's image model for photographic and art-directed looks, steered by style references.
- Best for: Photographs with raw texture, grain and motion blur; A look fixed by a style reference or a moodboard; Cinematic stills and art-directed scenes
- Pick something else when: Changing an image you already have: pick a model that edits reference images.; Exact words in the image: pick a model built for typography.; One character across a series: pick a character (LoRA) model.
- How to prompt it:
  - Use film and texture words for the look: grain, motion blur, raw texture, shallow depth of field.
  - Attach a style reference or a moodboard to hold one look across a set.
  - Avoid: Using a reference as a picture to edit: nothing in it is changed.
- Full card: [riftland-models/references/model-krea-2.md](riftland-models/references/model-krea-2.md)

#### Riftland

**Rift ID · LoRA** (`rift-id-lora`): Rift ID LoRA: your trained character in any scene, with the identity carried by the character's own model instead of a photo.
- Best for: The same character in many different scenes; A consistent series: a story, a campaign, a set of avatars; Portraits of a character in new outfits or places
- Pick something else when: A character that has no trained LoRA yet: train one first, or pick a reference-based model.; Changing an existing image: pick a model that edits references.; Exact words in the image: pick a model built for typography.
- How to prompt it:
  - Describe what is around the character, not the character's face: the LoRA already knows it.
  - Say the outfit and the place to vary a series.
  - Avoid: Writing the character's trigger word yourself: Riftland puts it first.
- Full card: [riftland-models/references/model-rift-id-lora.md](riftland-models/references/model-rift-id-lora.md)

**Riftland Rair** (`riftland-soul`): Riftland Rair: an editorial fashion look (real skin, studio light, film grain) that Riftland applies on top of a Seedream model.
- Best for: Portraits and fashion photos of people with an editorial look; Profile pictures and creator photos with real skin texture; Lookbook and magazine-style shots
- Pick something else when: Product shots or design with exact text: pick a typography or photoreal model.; Changing an existing image without restyling it: pick a model that edits references.; Illustration, anime or any non-photographic style: pick a model suited to it.
- How to prompt it:
  - Spend your words on the person, the wardrobe and the setting.
  - Describe the mood and the pose; the light and the grain come with the look.
  - Avoid: Describing the lens, the film stock, the skin texture or the lighting: Riftland adds them, and a second description fights the first.
- Full card: [riftland-models/references/model-riftland-soul.md](riftland-models/references/model-riftland-soul.md)

## Video

| What you want to make | Model Riftland picks today | Format | Why | Faster and cheaper alternatives |
|---|---|---|---|---|
| **Cinematic shot**: A film-like clip of one scene or a short sequence: deliberate camera move, mood, natural sound. | Seedance 2.5 (`seedance-2.5`) | 16:9 · 1080p · 8 s · audio on | Best for cinematic shots | none |
| **Vertical reel**: A short vertical clip for Reels, TikTok or Shorts: fast hook, strong motion, sound on. | Kling 3.0 Pro (`kling-3`) | 9:16 · 1080p · 8 s · audio on | Best for natural motion | none |
| **Product video**: A short clip that shows a product clearly: reveal, rotation, use in hand or on a surface. | Seedance 2.5 (`seedance-2.5`) | 16:9 · 1080p · 5 s · audio on | Best for animating an image | faster: Veo 3.1 Fast (`veo-3.1-fast`); cheaper: Veo 3.1 Fast (`veo-3.1-fast`) |
| **Animate image**: Bring a given still image to life while keeping its subject and look unchanged. | Seedance 2.5 (`seedance-2.5`) | 16:9 · 1080p · 5 s · audio on | Best for animating an image | none |
| **Seamless loop**: A short clip that ends where it starts, for backgrounds, banners or ambient visuals. | Kling 3.0 Pro (`kling-3`) | 1:1 · 1080p · 5 s · audio off | Best for animating an image | none |

### Video models, by family

#### Kuaishou Kling

**Kling 3.0 Pro** (`kling-3`): A Kling video model with sound, several shots in one request, text on screen and multilingual dialogue.
- Best for: Scenes with dialogue, where who speaks matters; Several shots in one request, with a camera plan for each; Believable physical motion: people moving, objects falling
- Pick something else when: Scenes that depend on strong or violent wording: pick a model from another family, because moderation here is strict.; Very long single takes: pick a model built for long clips.
- How to prompt it:
  - Say what the camera does over time, not only where it starts.
  - Give dialogue a speaker label and a voice description, so the right character speaks.
  - Avoid: Strong words such as burst or explosion in a harmless scene: moderation can block it.
- Full card: [riftland-models/references/model-kling-3.md](riftland-models/references/model-kling-3.md)

**Kling 4.0** (`kling-4`): The newest Kling: long clips, a wide cinematic frame, stable fast motion and orbit or tracking shots.
- Best for: Long clips that follow one subject; Fast action and orbit or tracking camera moves; A wide cinematic frame
- Pick something else when: Clips with dialogue or sound: pick a model that generates sound.; A quick draft: pick a fast model.
- How to prompt it:
  - Name the move in plain words: orbit, tracking, push in.
  - Describe the pace: steady, slow, abrupt.
  - Avoid: Asking for dialogue or sound design: it is a silent model here.
- Full card: [riftland-models/references/model-kling-4.md](riftland-models/references/model-kling-4.md)

**Kling 2.6 Pro** (`kling-2.6`): An earlier Kling with native sound for text-to-video and image-to-video, written as scene, element, movement and sound.
- Best for: Short clips with sound and some dialogue; Animating a still image; Simple scenes with one subject and one action
- Pick something else when: Several planned shots in one request: pick a newer model of this family or one built for shots.; Long clips: pick a model built for long clips.
- How to prompt it:
  - Write one scene and one action rather than a sequence.
  - Put the sound after the movement, in the same prompt.
  - Avoid: A list of events: it makes one clip, not a story.
- Full card: [riftland-models/references/model-kling-2-6.md](riftland-models/references/model-kling-2-6.md)

#### ByteDance Seedance

**Seedance 2.5** (`seedance-2.5`): The newest Seedance: long single takes with timed shot blocks and native sound.
- Best for: Long cinematic takes in one pass; A planned sequence of shots with time ranges; Clips with sound, speech and ambience
- Pick something else when: Complex, fast physical action with interacting subjects: the maker lists it as still weak, so pick a model known for motion.; Quick drafts: pick a fast model.
- How to prompt it:
  - Use a time range for each shot to control the pacing of a long take.
  - One camera move per shot, one clear action per shot.
  - Avoid: Several actions or several camera moves in one shot.
- Full card: [riftland-models/references/model-seedance-2-5.md](riftland-models/references/model-seedance-2-5.md)

**Seedance 2.0** (`seedance-2.0`): Seedance with native sound and better motion and physics for sport, dance and collisions.
- Best for: Sport, dance and collisions, where motion and physics matter; Short clips with sound; Animating a still image
- Pick something else when: Precise per-second timing: pick a model that supports timestamped shots.; Long takes: pick a model built for them.
- How to prompt it:
  - Prefer slow, gentle motion: walking, turning, pouring.
  - One camera move per shot, one clear action per shot.
  - Avoid: Sprinting, big jumps and violent rolls: the vendor advises slow, gentle motion.
- Full card: [riftland-models/references/model-seedance-2-0.md](riftland-models/references/model-seedance-2-0.md)

**Seedance 2.0 Fast** (`seedance-2.0-fast`): Seedance with the same abilities as the standard model, trading some quality for speed.
- Best for: Rehearsing a shot before a final render; Quick tests of a prompt or a camera move; Short clips with sound
- Pick something else when: The final version of an important clip: pick the standard or newest sibling.; Precise per-second timing: pick a model that supports timestamped shots.
- How to prompt it:
  - Prefer slow, gentle motion: walking, turning, pouring.
  - One camera move per shot, one clear action per shot.
  - Avoid: Sprinting, big jumps and violent rolls: the vendor advises slow, gentle motion.
- Full card: [riftland-models/references/model-seedance-2-0-fast.md](riftland-models/references/model-seedance-2-0-fast.md)

#### Google Veo

**Veo 3.1** (`veo-3.1`): Google's video model with strong native sound: dialogue, effects and ambience written into the prompt.
- Best for: Scenes with dialogue that must match the picture; Atmosphere: ambience and sound effects as part of the shot; Cinematic, realistic shots described in film language
- Pick something else when: Clips longer than a short beat: pick a model built for long clips.; Quick tries of many ideas: pick a fast model first.
- How to prompt it:
  - Write the dialogue as a quoted line with a speaker, so the voice matches the person.
  - Give effects and ambience their own labelled lines.
  - Avoid: Describing an ending as fading into silence: it produced dead air in an independent test.
- Full card: [riftland-models/references/model-veo-3-1.md](riftland-models/references/model-veo-3-1.md)

**Veo 3.1 Fast** (`veo-3.1-fast`): The faster Veo, with the same kind of sound and look, for trying a shot before the final render.
- Best for: Rehearsing a shot before the final render; Quick tries of a prompt, a camera move or a line of dialogue; Scenes with dialogue and ambience
- Pick something else when: The final version of an important clip: finish on the full model.; Clips longer than a short beat: pick a model built for long clips.
- How to prompt it:
  - Write the dialogue as a quoted line with a speaker, so the voice matches the person.
  - Give effects and ambience their own labelled lines.
  - Avoid: Describing an ending as fading into silence: it produced dead air in an independent test.
- Full card: [riftland-models/references/model-veo-3-1-fast.md](riftland-models/references/model-veo-3-1-fast.md)

#### Alibaba Wan

**Wan 2.6** (`wan-2.6`): An earlier Wan: silent clips from a simple entity, scene and motion formula, with shot blocks for longer ideas.
- Best for: Silent clips from a short description; A clip that changes scene, written as shot blocks; Animating a still image
- Pick something else when: Clips with dialogue, music or sound effects: pick a model that generates sound.; Final cinematic work: pick a model built for cinematic quality.
- How to prompt it:
  - Start with the formula: entity, scene, motion.
  - Use shot blocks with time ranges for a clip that changes scene.
  - Avoid: A long, unstructured paragraph: split it into shots.
- Full card: [riftland-models/references/model-wan-2-6.md](riftland-models/references/model-wan-2-6.md)

**Wan 3.0 Prime** (`wan-3-prime`): The accelerated Wan 3.0: native dialogue, music and effects in one pass.
- Best for: Clips with speech, music and sound effects in one pass; A planned sequence of timed shots; Animating a still image
- Pick something else when: A silent clip where the model might add speech: say No dialogue, or pick a silent model.; Long takes in one pass: pick a model built for long clips.
- How to prompt it:
  - Open with an overall description, then the shot blocks.
  - Say No dialogue when the clip should have none.
  - Avoid: Leaving dialogue unspecified: the model may add some.
- Full card: [riftland-models/references/model-wan-3-prime.md](riftland-models/references/model-wan-3-prime.md)

#### Black Forest Labs FLUX Video

**FLUX.3 Video** (`flux-3-video`): Black Forest Labs' preview video model: synchronised speech with lip-sync, several scenes, typography and stylised looks.
- Best for: A speaking person with lip-sync; Several scenes in one clip, with timed steps; Stylised looks and typography
- Pick something else when: Exact timing to the beat: its timing targets are not exact, so pick a model that documents timestamped shots.; Several speakers who must each be attributed correctly: expect to review every result, or split them into separate clips.
- How to prompt it:
  - Describe the subject identically in every shot so it stays the same.
  - Use HARD CUT between timed steps.
  - Avoid: A quoted line with no visible speaker: it may be drawn as text in the picture.
- Full card: [riftland-models/references/model-flux-3-video.md](riftland-models/references/model-flux-3-video.md)

#### MiniMax

**MiniMax H3** (`minimax-h3`): MiniMax's newest video model: native stereo sound that is always on, and text and brand rendering.
- Best for: Clips with their own sound track, such as ambience and speech; Product and brand clips with a name or label in view; Animating a still image
- Pick something else when: A silent clip: its sound cannot be switched off, so pick a model with a sound switch or without sound.; Strict camera control: pick a model that has native camera commands.
- How to prompt it:
  - One clear action and one camera move per shot.
  - Always describe the sound: it is generated either way.
  - Avoid: Leaving the sound unspecified: the model will add its own.
- Full card: [riftland-models/references/model-minimax-h3.md](riftland-models/references/model-minimax-h3.md)

**Hailuo 2.3** (`hailuo-2.3`): MiniMax Hailuo: character motion and expressions, with camera moves as bracketed commands that Riftland adds for you.
- Best for: Character motion and facial expressions; Action beats with a clear camera move; Animating a still image
- Pick something else when: Clips with sound or dialogue: pick a model that generates sound.; Long clips: pick a model built for long clips.
- How to prompt it:
  - Say the expression and the action: she hesitates, then smiles.
  - Use the camera picker instead of writing the camera.
  - Avoid: Writing bracketed camera commands yourself: Riftland adds them, and a second one fights the first.
- Full card: [riftland-models/references/model-hailuo-2-3.md](riftland-models/references/model-hailuo-2-3.md)

## Models that can change an existing image

- Nano Banana 2.1 (`nano-banana-2.1`)
- GPT Image 2.6 Flare (`gpt-image-2.6-flare`)
- GPT Image 2.6 Sunburst (`gpt-image-2.6-sunburst`)
- GPT Image 2.5 Flare (`gpt-image-2.5-flare`)
- Seedream 5.5 (`seedream-5.5`)
- Seedream 5.0 Pro (`seedream-5-pro`)
- FLUX 3 Image (`flux-3`)
- Qwen Image 3 (`qwen-image-3`)
- FLUX.2 Max (`flux-2-max`)
- Nano Banana 2 (`nano-banana-2`)
- Nano Banana Pro (`nano-banana-pro`)
- Seedream 4.5 (`seedream-4.5`)
- GPT Image 2 (`gpt-image-2`)
- FLUX.2 Pro (`flux-2-pro`)
