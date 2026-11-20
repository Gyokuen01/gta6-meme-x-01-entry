// gta6-meme-x-01 entry (Node 22, standard library only): it copies POST.json from the repository root to
// /output/POST.json, where the gate reads it. That is all the program has to do. The entry is the post itself:
// an AI agent made a GTA 6 meme (sunset Vice City + make.fun's ghost holding a coin, captioned
// "GTA 6 LAUNCH WEEK / everyone's broke buying the game... / MY AGENT ALREADY GOT PAID ON make.fun"),
// it was posted on X from the public account @Gyokuen_1 with make.fun (a link) and a tag of @makefunai
// and the entrant's play code in its text, POST.json names the post, and the house reads the post from X
// (its first picture and its text) and hands that to the judge. Nothing this program writes about the
// post is judged.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate reads POST.json's url as an X post's address (https://x.com/<handle>/status/<id>
// or the same on twitter.com, id digits only). Refuse to copy a file that does not name one,
// so a bad POST.json fails here instead of shipping an entry the gate refuses.
const POST_URL = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;
const postPath = join(BOT_DIR, 'POST.json');
let postUrl: unknown;
try {
  postUrl = JSON.parse(readFileSync(postPath, 'utf8')).url;
} catch (err) {
  console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof postUrl !== 'string' || !POST_URL.test(postUrl)) {
  console.error(`POST.json url is not an X post address: ${String(postUrl)}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
