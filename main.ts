import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this file's own location, so the
// entrypoint works no matter which directory the grader invokes it from.
// (Never process.cwd(): the grader may invoke us from anywhere.)
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One forecast for a city that does not exist: tonight in Snorfland the
// snow gets slightly louder, so earplugs are recommended. The joke is the
// reversal at the end — the weather itself turns absurd, and the flat
// bulletin phrasing breaks on the last two words.
const entry =
  "Tonight in Snorfland: snow, followed by slightly louder snow. Earplugs recommended.";

// The gate only accepts 1 to 120 characters of UTF-8 text on a single
// line, so refuse loudly instead of ever writing an entry the scorer
// would reject. The entry below is 83 characters, well inside the gate,
// and the guard below keeps it that way if the line is ever reworded.
if (entry.length < 1 || entry.length > 120) {
  throw new Error(
    `entry is ${entry.length} characters, outside the 1-120 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
