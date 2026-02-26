const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    page.on('response', response => {
        if (!response.ok()) {
            console.log('NETWORK ERROR:', response.status(), response.url());
        }
    });

    try {
        console.log('Navigating...');
        await page.goto('https://guardian-dental.vercel.app/admin/', { waitUntil: 'networkidle2', timeout: 30000 });
        console.log('Taking screenshot...');
        await page.screenshot({ path: 'screenshot.png' });
        console.log('Done.');
    } catch (e) {
        console.error(e);
    }
    await browser.close();
})();
