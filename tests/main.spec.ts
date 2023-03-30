import { test, expect } from '@playwright/test';

test('Page loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Kessoku Band/);
});

test('Check members and if clicking loads, twice in case Bocchi is visible already', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('link', { name: 'Members' }).click();
  await expect(page).toHaveURL(/#members/);
  await page.getByAltText('Gotoh', { exact: true }).click();
  await expect(page.getByText('An extremely timid and introverted first-year student in high school.')).toBeVisible()
  await page.getByAltText('Kita', { exact: true }).click();
  await expect(page.getByText('A bright and popular first year of high school.')).toBeVisible()
});

test('Expect music to play and pause properly, for both starting and different song', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('link', { name: 'Music', exact: true } ).click();
  await expect(page).toHaveURL(/#music/);
  await page.getByTestId('mainaudio').click();
  await expect(page.getByTestId('main audio')).toHaveJSProperty('paused', false)
  await expect(page.getByTestId('main audio')).toHaveJSProperty('src', 'http://localhost:3000/Guitar,%20Loneliness%20and%20Blue%20Planet.mp3')
  await page.getByTestId('Seiza ni Naretara').click()
  await expect(page.getByTestId('main audio')).toHaveJSProperty('paused', true)
  await expect(page.getByRole('heading', { name: 'Seiza ni Naretara' } )).toBeVisible()
  await page.getByTestId('mainaudio').click();
  await expect(page.getByTestId('main audio')).toHaveJSProperty('paused', false)
  await expect(page.getByTestId('main audio')).toHaveJSProperty('src', 'http://localhost:3000/If%20I%20could%20be%20a%20constellation.mp3')
});

test('Check if the links are present', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('link', { name: 'Support', exact: true } ).click();
  await expect(page).toHaveURL(/#support/);
  const platformLink = page.locator('a[href="https://open.spotify.com/artist/2nvl0N9GwyX69RRBMEZ4OD"]');
  await expect(platformLink).toBeInViewport()
});
