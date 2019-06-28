const Discord = require("discord.js");
const puppeteer = require("puppeteer");
const {prefix, token, w, h} = require("./config.json");
const client = new Discord.Client();

client.on("ready", () => { 
    console.log(`${client.user.username} is online`);
});

const getDate = async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return today;
}

//create web browser
(async () => {
    browser = await puppeteer.launch({
        headless: true,
        handleSIGHUP: true,
        args: [
            '--window-size=1980,1080',
            '--no-sandbox', 
            '--disable-setuid-sandbox', 
            '--disable-dev-shm-usage'
          ]
    });
})();

//scraping function
const scrape = async () => {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.setViewport({
        width: w,
        height: h
    });

    await page.goto('https://www.poelab.com/wfbra');
    await page.setViewport({
    width: w,
    height: h
    });

    await page.waitForSelector('#notesImg');
    const getImgSrc = await page.$eval('#notesImg', img => img.getAttribute('src'));
    console.log(getImgSrc);

    //const png = await page.$('#notesImg');
    //const screenshot = await png.screenshot({type: 'png'});

    return getImgSrc;

}

client.on("message", async message => {
    console.log(message.content);
    try {
        if (message.content.startsWith(`${prefix}uber`)) {
            var date = await getDate();
            const values = await scrape();
            message.channel.send(`Here is today's uber for ${date}\n${values} `);
        }
    }catch (err){
    console.error("Error has occured")
    }

})

client.login(process.env.BOT_TOKEN); 