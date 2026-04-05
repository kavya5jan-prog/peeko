#!/usr/bin/env node
/**
 * Dump Figma JSON for Splash node 83:627 (API id 83-627 → 83:627).
 * Usage: FIGMA_ACCESS_TOKEN=figd_... node scripts/figma-fetch-splash-node.mjs
 * Compare fills, style, layoutMode, padding, itemSpacing, fontSize in output to src/theme/splash.ts
 */
const FILE = "H1c88ILL19tErXVaBHqOAF";
const NODE = "83:627";
const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
  console.error("Set FIGMA_ACCESS_TOKEN (Figma → Settings → Security → Personal access tokens)");
  process.exit(1);
}
const url = `https://api.figma.com/v1/files/${FILE}/nodes?ids=${encodeURIComponent(NODE)}&depth=8`;
const res = await fetch(url, { headers: { "X-Figma-Token": token } });
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
const data = await res.json();
console.log(JSON.stringify(data, null, 2));
