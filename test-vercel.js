const run = async () => {
    const html = await (await fetch('https://guardian-dental.vercel.app/')).text();
    const match = html.match(/src="(\/assets\/[^"]+)"/);
    if (match) {
        console.log("Found asset URL:", match[1]);
        const r = await fetch('https://guardian-dental.vercel.app' + match[1]);
        console.log("Asset status:", r.status, r.headers.get('content-type'));
        const text = await r.text();
        console.log("Asset content snippet:", text.substring(0, 50));
    } else {
        console.log("No asset found in HTML.");
    }
}
run();
