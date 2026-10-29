// Run against a production build: npm run start -- --port 3100
// Local lab measurements only; not field-performance or availability claims.
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const measurements = [];
try {
  for (const scenario of [
    { name: "mobile", width: 390, reducedMotion: "no-preference" },
    { name: "desktop-html", width: 1440, reducedMotion: "reduce" },
    { name: "desktop-enhanced", width: 1440, reducedMotion: "no-preference" },
  ]) {
    const page = await browser.newPage({ viewport: { width: scenario.width, height: 1000 }, reducedMotion: scenario.reducedMotion });
    await page.bringToFront();
    const session = await page.context().newCDPSession(page);
    await session.send("Network.enable");
    await session.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1_600_000 / 8, uploadThroughput: 750_000 / 8 });
    await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.addInitScript(() => {
      window.landingVitals = { lcp: 0, cls: 0 };
      new PerformanceObserver(list => { for (const entry of list.getEntries()) window.landingVitals.lcp = entry.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.landingVitals.cls += entry.value; }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(process.env.LANDING_URL || "http://localhost:3100", { waitUntil: "networkidle" });
    if (scenario.name === "desktop-enhanced") await page.locator("canvas").waitFor({ state: "visible" });
    await page.waitForFunction(() => window.landingVitals.lcp > 0);
    const values = await page.evaluate(() => ({
      ...window.landingVitals,
      javascriptBytes: performance.getEntriesByType("resource").filter(entry => entry.name.includes(".js")).reduce((total, entry) => total + entry.encodedBodySize, 0),
      canvasCount: document.querySelectorAll("canvas").length,
    }));
    measurements.push({ scenario: scenario.name, ...values });
    await page.close();
  }
  console.log(JSON.stringify({ conditions: "Chromium; cold context; 4x CPU throttle; 1.6Mbps down; 150ms latency; localhost production server; single run", measurements }, null, 2));
} finally {
  await browser.close();
}
