#!/usr/bin/env node
// Validates this repository: skills, manifests, links, models. Plain Node, no dependencies.
//
//   node scripts/validate.mjs [repository-dir]      (default: the folder above scripts/)
//
// This repository is generated from Riftland's source: this file is copied as it is. Do not edit it here.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);

const MAX_SKILL_LINES = 300;
const MAX_REFERENCE_LINES = 200;
const MAX_DESCRIPTION = 1024;
const SKILL_FOLDER = /^riftland(?:-[a-z0-9]+)*$/;
const TEXT_FILE = /\.(md|json|ya?ml|mjs)$/;
// The names are stored encoded so that this file does not name them itself: nothing public may.
// Case matters for the one that is also an ordinary English word: its entry is stored with a leading "=".
const PROVIDERS = ["RW5oYW5jb3I=", "UnVud2FyZQ==", "ZmFsLmFp", "V2F2ZVNwZWVk", "Qnl0ZVBsdXM=", "RWxldmVuTGFicw==", "SGV5R2Vu", "=UmVwbGljYXRl", "T3BlbkFJ", "QW50aHJvcGlj"]
  .map((b) => ({ name: Buffer.from(b.replace(/^=/, ""), "base64").toString("utf8"), exact: b.startsWith("=") }));
const MONEY = [new RegExp(["US\\$", "\\bUS" + "D\\b"].join("|")), new RegExp("\\$" + "\\s?\\d")];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const lineCount = (text) => text.replace(/\n$/, "").split("\n").length;

function read(rel) {
  try { return fs.readFileSync(path.join(root, rel), "utf8"); } catch { return null; }
}
function readJson(rel) {
  const text = read(rel);
  if (text === null) { fail(rel, "missing"); return null; }
  try { return JSON.parse(text); } catch (e) { fail(rel, `not valid JSON (${e.message})`); return null; }
}
function walk(rel = "") {
  const out = [];
  for (const entry of fs.readdirSync(path.join(root, rel), { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const child = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(child));
    else if (entry.isFile()) out.push(child);
  }
  return out.sort();
}

function parseFrontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!m) return { error: "no frontmatter block (--- … ---) at the top" };
  const fields = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([A-Za-z][A-Za-z0-9_-]*): (.*)$/.exec(line);
    if (!kv) return { error: `frontmatter line "${line.slice(0, 60)}" is not "key: value"` };
    let value = kv[2].trim();
    if (value.startsWith('"')) {
      try { value = JSON.parse(value); } catch { return { error: `frontmatter value of ${kv[1]} is not a valid quoted string` }; }
    }
    fields[kv[1]] = value;
  }
  return { fields };
}

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`${root}: not a directory`);
  process.exit(1);
}

// ---------------------------------------------------------------- VERSION
const versionText = read("VERSION");
let version = null;
if (versionText === null) fail("VERSION", "missing");
else if (!/^\d+\.\d+\.\d+\n$/.test(versionText)) fail("VERSION", "must be one line, X.Y.Z");
else version = versionText.trim();

// ---------------------------------------------------------------- models
const models = readJson("models.json");
const catalogIds = new Set();
if (models) {
  for (const kind of ["image", "video"]) for (const m of models.catalog?.[kind] ?? []) catalogIds.add(m.id);
  if (!catalogIds.size) fail("models.json", "has no catalog of model ids");
  for (const r of models.recommended ?? []) {
    for (const id of [r.model, r.alternatives?.fast, r.alternatives?.cheap].filter(Boolean)) {
      if (!catalogIds.has(id)) fail("models.json", `${r.mode}: ${id} is not in its own catalog`);
      catalogIds.add(id);
    }
  }
  const modelsMd = read("MODELS.md");
  if (modelsMd === null) fail("MODELS.md", "missing");
  else {
    const hash = /Recommendations version: `([0-9a-f]+)`/.exec(modelsMd)?.[1];
    const date = /Generated on (\d{4}-\d{2}-\d{2})/.exec(modelsMd)?.[1];
    if (!hash) fail("MODELS.md", "does not state its recommendations version");
    else if (hash !== models.recommendationsVersion) fail("MODELS.md", `recommendations version ${hash} differs from models.json (${models.recommendationsVersion})`);
    if (date !== models.generatedOn) fail("MODELS.md", `date ${date} differs from models.json (${models.generatedOn})`);
  }
}
const allowlist = readJson("model-allowlist.json") ?? {};

// ---------------------------------------------------------------- skills
const folders = fs.readdirSync(root, { withFileTypes: true }).filter((e) => e.isDirectory() && SKILL_FOLDER.test(e.name)).map((e) => e.name).sort();
if (!folders.length) fail("skills", "no skill folder (riftland, riftland-<id>…) found");
const skillId = (folder) => (folder === "riftland" ? "riftland" : folder.slice("riftland-".length));

for (const [id, ids] of Object.entries(allowlist)) {
  if (!folders.includes(id === "riftland" ? "riftland" : `riftland-${id}`)) fail("model-allowlist.json", `${id} is not a skill`);
  for (const m of ids) if (!catalogIds.has(m)) fail("model-allowlist.json", `${id}: ${m} is not in models.json`);
}

function checkLinks(rel, text) {
  for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("#")) continue;
    const file = target.split("#")[0];
    const abs = path.resolve(root, path.dirname(rel), file);
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) fail(rel, `link ${target} does not resolve`);
  }
}

for (const folder of folders) {
  const skillMd = `${folder}/SKILL.md`;
  const text = read(skillMd);
  if (text === null) { fail(folder, "has no SKILL.md"); continue; }

  const fm = parseFrontmatter(text);
  if (fm.error) fail(skillMd, fm.error);
  else {
    const { name, description, version: v } = fm.fields;
    if (name !== folder) fail(skillMd, `name "${name}" must equal the folder name "${folder}"`);
    if (version && v !== version) fail(skillMd, `version "${v}" differs from VERSION (${version})`);
    if (!description) fail(skillMd, "has no description");
    else {
      // The umbrella skill (`riftland`) is not exempt: its description routes too (what it is for, "Use when", "NOT for").
      if (description.length > MAX_DESCRIPTION) fail(skillMd, `description is ${description.length} characters (max ${MAX_DESCRIPTION})`);
      if (!description.includes("Use when")) fail(skillMd, 'description lacks "Use when"');
      if (!description.includes("NOT for")) fail(skillMd, 'description lacks "NOT for"');
    }
  }
  if (lineCount(text) > MAX_SKILL_LINES) fail(skillMd, `${lineCount(text)} lines (max ${MAX_SKILL_LINES})`);
  checkLinks(skillMd, text);

  const refDir = path.join(root, folder, "references");
  const refs = fs.existsSync(refDir) ? fs.readdirSync(refDir).filter((f) => f.endsWith(".md")).sort() : [];
  for (const file of refs) {
    const rel = `${folder}/references/${file}`;
    const body = read(rel);
    if (!text.includes(`](references/${file})`)) fail(rel, "is not linked from its SKILL.md");
    if (lineCount(body) > MAX_REFERENCE_LINES) fail(rel, `${lineCount(body)} lines (max ${MAX_REFERENCE_LINES})`);
    checkLinks(rel, body);
  }

  const allowed = new Set(allowlist[skillId(folder)] ?? []);
  for (const rel of walk(folder)) {
    if (!TEXT_FILE.test(rel)) continue;
    const body = read(rel);
    if (body.includes("../")) fail(rel, 'contains "../": a skill is self-contained');
    for (const id of catalogIds) {
      if (allowed.has(id)) continue;
      if (new RegExp(`(?<![a-z0-9.-])${esc(id)}(?![a-z0-9-])`).test(body)) fail(rel, `names the model ${id}: ask the live catalog (models_explore, action recommended) instead`);
    }
  }
}

// ---------------------------------------------------------------- manifests
const market = readJson(".claude-plugin/marketplace.json");
if (market) {
  if (!Array.isArray(market.plugins) || !market.plugins.length) fail(".claude-plugin/marketplace.json", "lists no plugin");
  for (const p of market.plugins ?? []) {
    if (version && p.version !== version) fail(".claude-plugin/marketplace.json", `plugin ${p.name} version "${p.version}" differs from VERSION (${version})`);
    const listed = (p.skills ?? []).map((s) => String(s).replace(/^\.\//, "")).sort();
    const missing = folders.filter((f) => !listed.includes(f));
    const extra = listed.filter((f) => !folders.includes(f));
    if (missing.length) fail(".claude-plugin/marketplace.json", `does not list the skill folders: ${missing.join(", ")}`);
    if (extra.length) fail(".claude-plugin/marketplace.json", `lists folders that are not skills: ${extra.join(", ")}`);
    if (new Set(listed).size !== listed.length) fail(".claude-plugin/marketplace.json", "lists a skill twice");
  }
}
const plugin = readJson(".claude-plugin/plugin.json");
if (plugin && version && plugin.version !== version) fail(".claude-plugin/plugin.json", `version "${plugin.version}" differs from VERSION (${version})`);
const mcp = readJson(".mcp.json");
if (mcp && !mcp.mcpServers?.riftland?.url) fail(".mcp.json", "has no riftland server");

// ---------------------------------------------------------------- nothing public may say which providers run behind Riftland, or what they cost
for (const rel of walk()) {
  if (!TEXT_FILE.test(rel)) continue;
  const body = read(rel);
  for (const p of PROVIDERS) {
    const re = new RegExp(`(?<![A-Za-z])${esc(p.name)}(?![A-Za-z])`, p.exact ? "" : "i");
    if (re.test(body)) fail(rel, "names a provider");
  }
  if (MONEY.some((re) => re.test(body))) fail(rel, "has a dollar amount");
}

if (errors.length) {
  console.error(`${errors.length} problem${errors.length === 1 ? "" : "s"} found:\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  process.exit(1);
}
console.log(`OK: ${folders.length} skills, version ${version}, recommendations ${models?.recommendationsVersion}`);
