import { test, expect } from '@playwright/test';
import process from "process";
import { createWorker } from 'tesseract.js';

test.beforeEach(async ({ page, context }) => {
  // Load cookies from env file
  // const cookies = JSON.parse(process.env.COOKIES!);
  require("dotenv").config();
  const cookies = JSON.parse(process.env.COOKIE!);
  await context.addCookies(cookies);
  await page.goto(process.env.URL!);
});


test('watch video', async ({ page }) => {
  await page.getByRole('link', { name: 'Make Money' }).click();
  await page.getByText('Your navigator is unable to').click();
  //mouse move to the video
  await page.mouse.move(500, 500);
  let txtbrut = "";
  //get current time
  let date = new Date();
  let time = date.getTime();
  let rand = Math.floor(Math.random() * 1000);
  // for while 30 seconds
  for (let i = 0; time + 30000 > new Date().getTime(); i++) {
    await page.getByText('Your navigator is unable to').screenshot({ path: 'screenshot' + rand + '.png' });
    await (async () => {
      const worker = await createWorker('eng');
      const ret = await worker.recognize('screenshot' + rand + '.png');
      // console.log("content " + i + ": " + ret.data.text);
      txtbrut += ret.data.text;
      await worker.terminate();
    })();
  }
  
  // console.log(txtbrut);
  // get the 4 digits after matching "lidation code: "
  let codeOnVideo = txtbrut.match(/lidation code: \d{4}/)![0];
  codeOnVideo = codeOnVideo.substring(codeOnVideo.length - 4, codeOnVideo.length);
  // console.log(codeOnVideo);
  
  await page.waitForSelector('#input');
  await page.locator('#input').fill(codeOnVideo);
  await page.getByRole('button', { name: 'Validate' }).click();
});
