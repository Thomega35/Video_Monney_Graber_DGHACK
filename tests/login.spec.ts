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