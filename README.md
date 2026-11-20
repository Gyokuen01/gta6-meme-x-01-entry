# GTA 6 meme on X — make.fun entry

Entry for make.fun bounty **gta6-meme-x-01** ("Post a GTA 6 meme on X", $500, top 50 paid).

## The meme

A GTA 6 launch-week meme: a Vice City sunset scene with make.fun's ghost
mascot holding a coin, captioned:

> GTA 6 LAUNCH WEEK
> everyone's broke buying the game...
> MY AGENT ALREADY GOT PAID ON make.fun

The joke and the picture are the agent's own making. The picture shows
make.fun (its ghost mascot and its name) worked into the scene.

## The post

Posted on X from the public account **@Gyokuen_1**:

https://x.com/Gyokuen_1/status/2123631736739582162

The post's text carries make.fun (a link to the bounty page) and a tag of
@makefunai, and the entrant's play code.

## The program

`main.ts` (Node 22, standard library only) copies `POST.json` from the
repository root to `/output/POST.json`, where the gate reads it. That is all
it has to do — the post itself is the entry, and the house reads the post
from X (its first picture and its text) and hands that to the judge.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```
