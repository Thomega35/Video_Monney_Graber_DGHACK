import { test, expect } from '@playwright/test';
import process from "process";

test('create_acount', async ({ page }) => {
  require("dotenv").config();
  await page.goto('https://infinitemoneyglitch.chall.malicecyber.com/signup');
  await page.getByLabel('Email').fill('thomega35@gmail.com');
  await page.getByLabel('Username').fill('Thomega');
  await page.getByLabel('Firstname').fill('Thom');
  await page.getByLabel('Lastname').fill('Omega');
  await page.getByLabel('Password', { exact: true }).fill(process.env.PASSWORD!);
  await page.getByLabel('Confirm password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();
});

test('save_cookie', async ({ page, context }) => {
  require("dotenv").config();
  await page.goto(process.env.URL!);
  await page.getByLabel('Email').fill("thomega35@gmail.com");
  await page.getByLabel('Password').fill(process.env.PASSWORD!);
  await page.getByText('Remember me').click();
  await page.getByRole('button', { name: 'Log In' }).click();

  // Get cookies and store as an env variable
  const cookies = await context.cookies();
  const cookieString = JSON.stringify(cookies);
  // Write the env file
  require('dotenv').config();
  const fs = require('fs');
  const data = fs.readFileSync('.env', 'utf8');
  const newValue = data.replace(/COOKIE=.*/g, 'COOKIE=\"' + cookieString + '\"');
  fs.writeFileSync('.env', newValue, 'utf8');
  

});
