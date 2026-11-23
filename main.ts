import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original dad joke, written for the Dad Joke Showdown.
// A ceiling fan is above everyone's heads and keeps the room cool:
// both turns of the joke land on the fan itself.
const JOKE =
  "I told the ceiling fan a joke. It said the punchline went right over everyone's heads, but at least it kept its cool.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

// The gate requires UTF-8 text of 1-200 characters, not only whitespace.
// Count code points so the check matches the gate's character count.
const charCount = [...JOKE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`joke is ${charCount} characters, must be 1-200`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be only whitespace");
}

const outPath = join(outDir, "entry.txt");
// No trailing newline: the file holds exactly the joke, nothing else.
writeFileSync(outPath, JOKE, "utf8");
console.log(`wrote ${charCount} characters to ${outPath}`);
