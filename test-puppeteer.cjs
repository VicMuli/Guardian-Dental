const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
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
        await page.goto('http://localhost:3001/admin/index.html', { waitUntil: 'networkidle2', timeout: 15000 });
        const html = await page.content();
        console.log('HTML CONTENT:', html.substring(0, 500) + '...');
        console.log('Done.');
    } catch (e) {
        console.error('ERROR:', e.message);
    }
    await browser.close();
})();
