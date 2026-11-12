# Install Riftland for an agent

Steps for an AI agent that is setting Riftland up for a user. Run only what you can see below, and ask the user before anything that needs their account.

## 1. Install the skills

Pick the first route your environment supports.

1. Any agent that reads skills: `npx skills add tiagoadjim/riftland-skills`
2. GitHub CLI: `gh skill install tiagoadjim/riftland-skills`
3. Claude Code plugin: `/plugin marketplace add tiagoadjim/riftland-skills`, then `/plugin install riftland@riftland`
4. None of these: skip this step. The same recipes are served by the MCP server in step 2 through `skills_list` and `skill_get`.

Do not download a script and run it. Everything above is a documented command of the tool named in it.

## 2. Connect the MCP server

The server is https://riftland.io/mcp.

- Claude Code: `claude mcp add --transport http riftland https://riftland.io/mcp`, then open `/mcp` and sign in to Riftland in the browser (OAuth).
- Other clients: add a remote MCP server of type http with that URL and sign in when the client asks.
- With an API key instead of OAuth: the user creates it in Account → Connections (Cuenta → Conexiones) and puts it in an environment variable or the client's secret store. Send it as `Authorization: Bearer <key>`. Never ask the user to paste a key into the chat, never write one into a file of the project, and never print it.

## 3. Verify

1. Call `account_overview`. It returns the user's credits and plan. If it fails with an authorization error, the sign-in is not done: go back to step 2.
2. Call `skills_list`. It lists 42 workflows; the general guide `riftland` is loaded with `skill_get` and is not in that list.
3. Tell the user what you checked and their credit balance. Do not create anything yet.

## 4. First request

For an image or a video, load the skill `riftland-create`: `plan` (free) shows the plan and its price, and `create` spends no more than the `max_credits` the user agreed to.

If a skill names a tool that is not in your tool list, it still works when called by name; `tools_profile` with `profile` `full` lists every tool.
