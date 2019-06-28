# POELAB

A bot that scrapes the current lab layout from https://www.poelab.com/. Credit goes to SuitSizeSmall for running the lab.

## How it works

This project uses the puppeteer library to automatically navigate to poelab. It will load up the uber page in headless chromium and take the src attribute link of the image and send it in chat. Also uses discord.js library.
