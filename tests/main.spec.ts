import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Kessoku Band/);
});

test('test members, test two image clicks incase one is visible on load', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('link', { name: 'Members' }).click();
  await expect(page).toHaveURL(/#members/);

  await page.getByAltText('Gotoh', { exact: true }).click();
  await expect(page.getByText('An extremely timid and introverted first-year student in high school.')).toBeVisible()

  await page.getByAltText('Kita', { exact: true }).click();
  await expect(page.getByText('A bright and popular first year of high school.')).toBeVisible()
});

test('test music', async ({ page }) => {
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

test('test links', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('link', { name: 'Support', exact: true } ).click();
  await expect(page).toHaveURL(/#support/);
  const platformLink = page.locator('a[href="https://open.spotify.com/artist/2nvl0N9GwyX69RRBMEZ4OD"]');
  await expect(platformLink).toBeInViewport()
});
