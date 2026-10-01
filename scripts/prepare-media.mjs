// Generates the optimised media used by the site from the source files.
// Run with: node scripts/prepare-media.mjs
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const SRC_FRAMES = path.join(root, "assets/images/ezgif-7c913b6e2c54639c-jpg");
const OUT_FRAMES = path.join(root, "public/images/hero/seq");
const FRAME_COUNT = 40;
const FRAME_WIDTHS = [
  { w: 640, q: 70 },
  { w: 960, q: 70 },
  { w: 1280, q: 72 },
];

const pad = (n) => String(n).padStart(2, "0");
const frameSrc = (i) =>
  path.join(SRC_FRAMES, `ezgif-frame-${String(i).padStart(3, "0")}.jpg`);

async function heroSequence() {
  await rm(OUT_FRAMES, { recursive: true, force: true });
  for (const { w, q } of FRAME_WIDTHS) {
    const dir = path.join(OUT_FRAMES, String(w));
    await mkdir(dir, { recursive: true });
    for (let i = 1; i <= FRAME_COUNT; i++) {
      await sharp(frameSrc(i))
        .resize({ width: w })
        .webp({ quality: q, effort: 6 })
        .toFile(path.join(dir, `${pad(i)}.webp`));
    }
  }
}

// Crops for the services hover previews (Astro optimises them at build time).
const crops = [
  { out: "mechanic", src: "src/assets/about/garage_old.webp", box: [1500, 450, 1252, 782] },
  { out: "itv", src: "src/assets/about/garage_new.webp", box: [700, 150, 1200, 750] },
  { out: "brakes", src: frameSrc(15), box: [114, 310, 512, 320] },
  { out: "diagnosis", src: "src/assets/about/garage_new.webp", box: [0, 560, 1100, 688] },
  { out: "oil", src: "src/assets/about/garage_new.webp", box: [1450, 650, 1302, 814] },
  { out: "tires", src: frameSrc(20), box: [629, 310, 512, 320] },
];

async function serviceCrops() {
  const dir = path.join(root, "src/assets/services");
  await mkdir(dir, { recursive: true });
  for (const { out, src, box } of crops) {
    const [left, top, width, height] = box;
    await sharp(path.isAbsolute(src) ? src : path.join(root, src))
      .extract({ left, top, width, height })
      .resize({ width: Math.min(960, width) })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(dir, `${out}.jpg`));
  }
}

async function ogImage() {
  await sharp(path.join(root, "src/assets/hero/hero_bg.jpeg"))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(root, "public/og.jpg"));
}

await heroSequence();
await serviceCrops();
await ogImage();
console.log("Media ready");
