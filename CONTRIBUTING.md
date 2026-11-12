# Contributing

This repository is generated. Its content is exported from Riftland's source (the skills, the model snapshot, the manifests and the validation script), and the next export overwrites any edit made here. For that reason pull requests are not merged directly.

## Report a problem with a skill

Open an issue with:

- the skill folder (for example `riftland-create`) and the file;
- what you asked your agent, what it did, and what you expected;
- the client you use (Claude Code, Codex, Cursor…) and the version in `VERSION`.

Do not include API keys, account details or private media. A proposed wording is welcome in the issue text; it will be applied in Riftland's source and exported here.

## Check the repository

```sh
node scripts/validate.mjs
```
