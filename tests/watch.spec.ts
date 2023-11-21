import { test, expect } from '@playwright/test';
import process from "process";
import { createWorker } from 'tesseract.js';

test.beforeEach(async ({ page }) => {
  require("dotenv").config();
  await page.goto(process.env.URL!);
  await page.getByLabel('Email').fill("thomega35@gmail.com");
  await page.getByLabel('Password').fill(process.env.PASSWORD!);
  await page.getByText('Remember me').click();
  await page.getByRole('button', { name: 'Log In' }).click();
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
      console.log("content " + i + ": " + ret.data.text);
      txtbrut += ret.data.text;
      await worker.terminate();
    })();
    // await page.waitForTimeout(2000);
  }

  console.log(txtbrut);
  // get the 4 digits after matching "lidation code: "
  let codeOnVideo = txtbrut.match(/lidation code: \d{4}/)![0];
  codeOnVideo = codeOnVideo.substring(codeOnVideo.length - 4, codeOnVideo.length);
  console.log(codeOnVideo);

  await page.waitForSelector('#input');
  await page.locator('#input').fill(codeOnVideo);
  await page.getByRole('button', { name: 'Validate' }).click();
});
