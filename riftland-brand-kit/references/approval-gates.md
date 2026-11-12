# Approval gates for palette, logo and type

Palette, logo and type are the foundation of every studio output. The user approves each one before anything is built on it.

## The gates, in order
1. Palette. Show the colors with their hex values and their role (primary, accent, background, text). The user approves the palette or asks for changes.
2. Logo. Show the logo (its link). The user approves the logo: keep the one that was read, upload another and use `brand_update` with it, or, if there is none, offer to design one with `create` using the approved palette in words; show the result and wait for the user's yes before `brand_update` stores it.
3. Type. Show the heading and the body fonts by name. The user approves the type. Fonts are names that the studios use as direction; Riftland does not install fonts.

## What approval means
- Approval is the user's word in this conversation: "sí", "dale", "aprobado", or a correction followed by a yes. "Todo bien" approves what was just shown.
- Never approve on the user's behalf, never treat silence as a yes, and never infer approval from the user moving on to another question.
- Approve one gate at a time, or all three together when the user asks to go fast: still show all three before asking.

## What is blocked until the three are approved
Paid generations that read the kit: an ad campaign (`static-ads-campaign`), a motion promo (`motion-graphics-promo`), a Marketing Studio job with `brand_id`. Free steps stay open: `brand_create`, `brand_get`, `brand_update`, `products_add`.

## When something changes later
- The palette changes after the logo was approved: ask whether the logo still works on the new palette before moving on.
- The type changes: the palette and the logo are not reopened.
- The logo changes: the palette and the type are not reopened.
- A change after campaigns exist does not change the finished results: say which results used the old kit.

## Ask in one message
Present the gate you are on, show the values, and end with one question with options: Approve · Change something. At most 4 questions in the whole review.

## Record
Keep a one-line status in the conversation: "Paleta aprobada · Logo pendiente · Tipografía pendiente". Update it at each step.
