import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

// Utility sleep
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (min, max) => Math.random() * (max - min) + min;

// ---------- CONSENT HANDLER ----------
async function handleConsent(page) {
  try {
    await page.waitForSelector("button", { timeout: 4000 });

    const buttons = await page.$$("button");

    for (const btn of buttons) {
      const text = await page.evaluate((el) => el.innerText?.toLowerCase() || "", btn);

      if (
        text.includes("accept") ||
        text.includes("agree") ||
        text.includes("i agree") ||
        text.includes("accept all")
      ) {
        await btn.click();
        console.log("✔ Consent clicked");
        await sleep(2000);
        return;
      }
    }
  } catch (err) {
    console.log("No consent popup detected.");
  }
}

// ---------- HUMAN MOVEMENTS ----------
async function humanBehavior(page) {
  // Small random mouse move to avoid fingerprint detection
  await page.mouse.move(rand(100, 800), rand(100, 600), {
    steps: Math.floor(rand(10, 25)),
  });

  // Small scrolls
  for (let i = 0; i < 3; i++) {
    await page.mouse.wheel({ deltaY: rand(150, 500) });
    await sleep(rand(500, 900));
  }
}

// ---------- MAIN RANK CHECK FUNCTION ----------
export async function checkKeywordRank(keyword, domain, proxy = null) {
  const args = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-blink-features=AutomationControlled",
  ];

  if (proxy) {
    args.push(`--proxy-server=${proxy}`);
  }

  const browser = await puppeteer.launch({
    headless: false,
    args,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // ---------- PROXY AUTH ----------
  if (proxy && proxy.includes("@")) {
    // Format: http://username:password@ip:port
    const auth = proxy.split("//")[1].split("@")[0];
    const [username, password] = auth.split(":");

    await page.authenticate({ username, password });
    console.log("✔ Proxy authenticated");
  }

  // ---------- USER AGENT ----------
  await page.setUserAgent(
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${
      Math.floor(Math.random() * 20) + 100
    }.0.0.0 Safari/537.36`
  );

  try {
    // Go to Google
    await page.goto("https://www.google.com", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await sleep(rand(1200, 1800));

    // Handle consent if appears
    await handleConsent(page);

    await sleep(rand(1000, 1500));
    await humanBehavior(page);

    // Type the keyword in the search box
    await page.type("textarea[name='q'], input[name='q']", keyword, { delay: rand(80, 140) });
    await sleep(400);
    await page.keyboard.press("Enter");

    await page.waitForNavigation({ waitUntil: "domcontentloaded" });

    await humanBehavior(page);

    // Extract result links
    const links = await page.$$eval("a", (as) => as.map((a) => a.href));

    let rank = -1;
    let pos = 1;

    for (const link of links) {
      if (link.includes(domain)) {
        rank = pos;
        break;
      }
      pos++;
    }

    console.log("Finished → Rank:", rank);

    await browser.close();
    return rank;
  } catch (error) {
    console.error("Error scraping:", error);
    await browser.close();
    return -1;
  }
}

// ----- RUN DIRECTLY -----
const keyword = "best running shoes 2025";
const domain = "nike.com";

// EXAMPLE PROXY FORMAT:
// http://username:password@123.45.67.89:8080
const proxy = "http://USERNAME:PASSWORD@PROXY_IP:PORT"; // <--- CHANGE THIS

checkKeywordRank(keyword, domain, proxy).then((r) => console.log("RESULT:", r));
