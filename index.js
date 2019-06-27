const Discord = require("discord.js");
const puppeteer = require("puppeteer");
const {prefix, token, w, h} = require("./config.json");
const client = new Discord.Client();

client.on("ready", () => { 
    console.log(`${client.user.username} is online`);
});

//create web browser
(async () => {
    browser = await puppeteer.launch({
        headless: true,
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

    const png = await page.$('#notesImg');
    const screenshot = await png.screenshot({ type: png});

    return screenshot;

    await page.close();
}



client.on("message", async message => {
    //console.log(message.content);
    try {
        if (message.content.startsWith(`${prefix}uber`)) {
            const screenshot = await scrape();
            message.channel.send("Here is today's uber", {file: screenshot});
            message.channel.send("The link is https://www.poelab.com/wfbra")
        }
    }
    catch {
        console.error(error);
        message.channel.send(error.message)
    }
        
})

client.login(process.env.BOT_TOKEN);