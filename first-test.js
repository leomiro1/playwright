// execute with command "node first-test.js"

const { chromium } = require('playwright');

( async() => {
const browser = await chromium.launch({ headless:false , slowMo: 300 });
const page = await browser.newPage();
await page.goto('http://www.google.com');
await browser.close();
})();