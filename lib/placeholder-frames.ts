/**
 * PLACEHOLDER ONLY. Real product pages need a real 360° on-model frame
 * sequence per the PRD's photography brief (crop to the relevant body part,
 * nothing more). Until that exists, this generates a small rotating
 * faceted-shape SVG sequence — self-contained (data URIs, no network
 * dependency), and at least honestly demonstrates SpinViewer's rotate/zoom
 * behavior instead of showing a broken or mismatched image set.
 */
function facetFrame(angleDeg: number, hue: string): string {
  const rad = (angleDeg * Math.PI) / 180;
  const scaleX = Math.max(0.12, Math.abs(Math.cos(rad)));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="#F1EBDE"/>
    <g transform="translate(200,200) scale(${scaleX.toFixed(3)},1)">
      <polygon points="0,-92 58,-18 38,92 -38,92 -58,-18" fill="${hue}" stroke="#0F0D0A" stroke-width="2"/>
      <line x1="0" y1="-92" x2="0" y2="92" stroke="#0F0D0A" stroke-width="1" opacity="0.3"/>
      <line x1="-58" y1="-18" x2="58" y2="-18" stroke="#0F0D0A" stroke-width="1" opacity="0.3"/>
    </g>
    <text x="200" y="380" text-anchor="middle" font-family="monospace" font-size="11" fill="#8B8578">PLACEHOLDER — awaiting product photography</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function generatePlaceholderFrames(count = 24, hue = "#7A2F3D"): string[] {
  return Array.from({ length: count }, (_, i) => facetFrame((360 / count) * i, hue));
}
