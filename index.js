const Discord = require("discord.js");
const puppeteer = require("puppeteer");
const {prefix,  w, h} = require("./config.json");
const client = new Discord.Client();

//on client successful build
client.on("ready", () => { 
    console.log(`${client.user.username} is online`),
    client.user.setPresence({ status: 'online', game: { name: 'Need help? | #help' } });   ;
});

//set date
const getDate = async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
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
const scrapeUber = async () => {
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
    try {
        if (message.content.startsWith(`${prefix}uber`)) {
            var date = await getDate();
            const values = await scrapeUber();
            message.channel.send(`Here is todays uber for ${date}\n${values} `);
        }
    }catch (err){
    console.error("Error has occured")
    }

})

client.on("message", async message => {
    try {
        if (message.content.startsWith(`${prefix}help`)) {
            message.channel.send("```#help - Help\n#uber - Show the current uber lab layout```");
        }
    }catch (err){
    console.error("Error has occured")
    }

})

client.login(process.env.BOT_TOKEN); 