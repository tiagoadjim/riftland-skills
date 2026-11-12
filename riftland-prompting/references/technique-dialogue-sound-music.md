<!-- generated from Riftland's knowledge base: technique "dialogue-sound-music", version acf1ebe9037f, checksum 3133ac8f. Do not edit. -->

# Dialogue, sound and music

Quote the speech with a speaker, name sound sources on their own lines, say no dialogue when you want none, and check which models make sound.

Applies to: video.

## Rules

1. Quote the speech and say who speaks and how: Character A, an exhausted partner, in a trembling frustrated voice: "You never listen to me." On the Wan family the form is: X says: "...". Write the words in the language they should be spoken in.
   - Why: The Kling guide uses the bracketed speaker line; the Wan guide uses says. The Kling vendor also lists multilingual dialogue.
2. Put each sound source on its own line: SFX: thunder cracks in the distance. Ambient noise: traffic far away, a clock ticking. Name the source, not just the mood.
   - Why: The Veo, FLUX Video, Kling and Wan guides all name sound sources; the Veo guide gives the SFX and Ambient noise lines.
3. Say no dialogue when you want none, because the Wan family may add some on its own. Say lip sync when you need it.
   - Applies to the families: Wan.
   - Why: The Wan guide gives both instructions.
4. Do not end the description on silence: an independent report found that describing an ending as decaying into silence produced dead air on the Veo family. Describe what is heard instead.
   - Applies to the families: Veo.
5. Make the speaker visible when you want lip sync, and cue off-screen speech as a voiceover. A quoted line with no visible speaker may be treated as text that belongs in the picture.
   - Applies to the families: FLUX Video.
   - Why: The FLUX Video vendor says a visible speaker gets lip sync, off-screen speech needs a voiceover cue, and a quoted line with no visible speaker may be drawn as text. It also calls attribution with several speakers review-heavy, so keep to one or two speakers per shot and label each.
6. Sound is a switch, and it is a model property. `audio` on `generate_video` turns native audio on (it is off unless you ask, or the director decides), and sound costs more. Some video models make no sound at all and some always make it with no switch: check the model's facts (nativeAudio, audioAlwaysOn) in models_explore before you plan a spoken scene.
7. When the model has no sound, or you want a voice you choose, make the audio separately: `generate_audio` makes a voice-over from a script (voice and quality are options), music from a description (instrumental by default, or with your lyrics) and a short sound effect, each as an MP3. `edit_video` with the action add_sound adds synced sound effects to a silent clip. `talking_avatar` makes a speaking portrait from a script or from an audio file.
8. Write a music request like a brief: genre, mood, instruments and what it is for (background for a product ad, calm, no vocals).
9. Look and listen before accepting. media_view shows a clip as a contact sheet and an audio file as its waveform with a player; check that the lips match the speech and that no sound is missing.

## Do and don't

- Don't: A man says hello and there is rain and some music.
  Do: A man in a doorway, rain behind him. Man, low tired voice: "You came back." SFX: steady rain on a tin roof. Ambient noise: distant traffic. No music.
- Don't: "Welcome to the show!" (a quoted line, nobody on screen)
  Do: A host in a red jacket faces the camera, smiling. Host, warm and energetic: "Welcome to the show!" Or, with nobody on screen: voiceover, warm and energetic: "Welcome to the show!"

## Checklist

- [ ] Does the model make sound, and is `audio` on?
- [ ] Is each spoken line in quotes with a speaker?
- [ ] Is each sound on its own line?
- [ ] Did you say no dialogue where there should be none?

## See also

- `technique:video-prompting`: Prompting a video
- `technique:multi-shot-and-timing`: Multi-shot clips and timing
- `technique:troubleshooting`: Troubleshooting: what went wrong and what to change
- `workflow:voice-and-music-for-video`: Voice-over and music for a video
- `workflow:portrait-to-talking-avatar`: Portrait to talking avatar
