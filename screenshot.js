const captureWebsite = require('capture-website');
var cron = require('node-cron');


const path = './client/public/card.jpg';

(async () => {
	await captureWebsite.file('https://covid19.si', path, {
		launchOptions: {
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox'
			]
        },
        type: 'jpeg',
        width: 1200,
        height: 585,
        overwrite: true
	});
})();
