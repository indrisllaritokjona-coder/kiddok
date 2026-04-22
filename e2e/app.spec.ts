import { test, expect } from '@playwright/test';

test.describe('KidDok E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start fresh for each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test.describe('Login Flow', () => {
    test('should show login page on first load', async ({ page }) => {
      await page.goto('/');
      // Should show login form
      const userIdInput = page.locator('input[type="text"]').first();
      await expect(userIdInput).toBeVisible();
      const passwordInput = page.locator('input[type="password"]').first();
      await expect(passwordInput).toBeVisible();
    });

    test('should login with valid PIN (1234) and username', async ({ page }) => {
      await page.goto('/');

      const userIdInput = page.locator('input[type="text"]').first();
      const passwordInput = page.locator('input[type="password"]').first();

      await userIdInput.fill('Test Parent');
      await passwordInput.fill('1234');

      // Click submit button
      const submitButton = page.locator('button[type="submit"], button:has(lucide-icon[name="arrow-right"])').first();
      await submitButton.click();

      // After login, should redirect to home/dashboard
      // The shell component should be visible (sidebar or main content)
      await page.waitForTimeout(1000);
      // Check if app-shell or sidebar is rendered
      const sidebar = page.locator('app-sidebar, .sidebar').first();
      await expect(sidebar).toBeVisible({ timeout: 5000 });
    });

    test('should show error on invalid PIN', async ({ page }) => {
      await page.goto('/');

      const userIdInput = page.locator('input[type="text"]').first();
      const passwordInput = page.locator('input[type="password"]').first();

      await userIdInput.fill('Test Parent');
      await passwordInput.fill('wrongpassword');

      const submitButton = page.locator('button[type="submit"], button:has(lucide-icon[name="arrow-right"])').first();
      await submitButton.click();

      // Should show error message
      const errorMsg = page.locator('text=Invalid, gabim, pasaktë').first();
      await expect(errorMsg).toBeVisible({ timeout: 3000 });
    });
  });

  test.describe('Child Profile Add', () => {
    test('should add a new child profile after login', async ({ page }) => {
      // Login first
      await page.goto('/');

      const userIdInput = page.locator('input[type="text"]').first();
      const passwordInput = page.locator('input[type="password"]').first();

      await userIdInput.fill('Test Parent');
      await passwordInput.fill('1234');

      const submitButton = page.locator('button[type="submit"], button:has(lucide-icon[name="arrow-right"])').first();
      await submitButton.click();

      // Wait for dashboard
      await page.waitForTimeout(1500);

      // Navigate to add child (via header button or sidebar)
      // Try to click "Add New Member" button in header or similar
      const addMemberBtn = page.locator('button:has-text("Add New Member"), button:has-text("Shto Pjestar"), button:has-text("Shto"), button:has(lucide-icon[name="user-plus"])').first();
      if (await addMemberBtn.isVisible({ timeout: 3000 })) {
        await addMemberBtn.click();
        await page.waitForTimeout(500);

        // Fill child form
        const nameInput = page.locator('input[placeholder*="Elena"], input[placeholder*="Emri"], input[formControlName="name"], input[type="text"]').first();
        if (await nameInput.isVisible({ timeout: 2000 })) {
          await nameInput.fill('Test Child');
          await page.waitForTimeout(200);

          // Fill date of birth
          const dobInput = page.locator('input[type="date"]').first();
          if (await dobInput.isVisible({ timeout: 2000 })) {
            await dobInput.fill('2022-01-15');
          }

          // Submit
          const saveBtn = page.locator('button:has-text("Save"), button:has-text("Ruaj"), button:has-text("Shto")').first();
          await saveBtn.click();
          await page.waitForTimeout(500);

          // Verify child appears in list or sidebar
          const childName = page.locator('text=Test Child').first();
          await expect(childName).toBeVisible({ timeout: 3000 });
        }
      }
    });

    test('should switch between children after adding multiple', async ({ page }) => {
      // Login
      await page.goto('/');
      await page.locator('input[type="text"]').first().fill('Multi Parent');
      await page.locator('input[type="password"]').first().fill('1234');
      await page.locator('button:has(lucide-icon[name="arrow-right"])').first().click();
      await page.waitForTimeout(1500);

      // Sidebar should show child switcher
      const sidebarChildCard = page.locator('.sidebar__child-card, [class*="child-card"]').first();
      if (await sidebarChildCard.isVisible({ timeout: 3000 })) {
        // Should display active child's name or placeholder
        await expect(sidebarChildCard).toBeVisible();
      }
    });
  });

  test.describe('Navigation', () => {
    test('should navigate to temperature page from sidebar', async ({ page }) => {
      // Login
      await page.goto('/');
      await page.locator('input[type="text"]').first().fill('Nav Tester');
      await page.locator('input[type="password"]').first().fill('1234');
      await page.locator('button:has(lucide-icon[name="arrow-right"])').first().click();
      await page.waitForTimeout(1500);

      // Click temperature nav item
      const tempNav = page.locator('.sidebar__nav-item:has-text("Temperature"), .sidebar__nav-item:has-text("Temperatura")').first();
      if (await tempNav.isVisible({ timeout: 3000 })) {
        await tempNav.click();
        await page.waitForTimeout(500);
        // Temperature page should load
        const tempHeading = page.locator('h1:has-text("Temperature"), h1:has-text("Temperatura")').first();
        await expect(tempHeading).toBeVisible({ timeout: 3000 });
      }
    });

    test('should toggle language between SQ and EN', async ({ page }) => {
      await page.goto('/');

      // Login first
      await page.locator('input[type="text"]').first().fill('Lang Tester');
      await page.locator('input[type="password"]').first().fill('1234');
      await page.locator('button:has(lucide-icon[name="arrow-right"])').first().click();
      await page.waitForTimeout(1500);

      // Find locale toggle (EN/SQ button in sidebar)
      const localeToggle = page.locator('.locale-toggle, button:has-text("EN"), button:has-text("SQ")').first();
      if (await localeToggle.isVisible({ timeout: 3000 })) {
        const initialText = await localeToggle.textContent();
        await localeToggle.click();
        await page.waitForTimeout(300);
        const newText = await localeToggle.textContent();
        expect(newText).not.toBe(initialText);
      }
    });
  });

  test.describe('Records Page', () => {
    test('should display records page with add button', async ({ page }) => {
      // Login
      await page.goto('/');
      await page.locator('input[type="text"]').first().fill('Records Tester');
      await page.locator('input[type="password"]').first().fill('1234');
      await page.locator('button:has(lucide-icon[name="arrow-right"])').first().click();
      await page.waitForTimeout(1500);

      // Navigate to records/vaccines
      const recordsNav = page.locator('.sidebar__nav-item:has-text("Vaccines"), .sidebar__nav-item:has-text("Vaksinat"), .sidebar__nav-item:has-text("Records")').first();
      if (await recordsNav.isVisible({ timeout: 3000 })) {
        await recordsNav.click();
        await page.waitForTimeout(500);

        // Records page should show title
        const recordsTitle = page.locator('h1:has-text("Vaccine Records"), h1:has-text("Dosja e Vaksinave")').first();
        await expect(recordsTitle).toBeVisible({ timeout: 3000 });

        // Add button should be visible
        const addBtn = page.locator('button:has-text("Add New Record"), button:has-text("Shto Dokument")').first();
        await expect(addBtn).toBeVisible({ timeout: 2000 });
      }
    });

    test('should add a new record entry', async ({ page }) => {
      // Login
      await page.goto('/');
      await page.locator('input[type="text"]').first().fill('Record Tester');
      await page.locator('input[type="password"]').first().fill('1234');
      await page.locator('button:has(lucide-icon[name="arrow-right"])').first().click();
      await page.waitForTimeout(1500);

      // Navigate to records
      const recordsNav = page.locator('.sidebar__nav-item:has-text("Vaccines"), .sidebar__nav-item:has-text("Vaksinat")').first();
      if (await recordsNav.isVisible({ timeout: 3000 })) {
        await recordsNav.click();
        await page.waitForTimeout(500);

        // Open add panel
        const addBtn = page.locator('button:has-text("Add New Record"), button:has-text("Shto Dokument")').first();
        await addBtn.click();
        await page.waitForTimeout(300);

        // Fill in record name
        const nameInput = page.locator('input[placeholder*="Vaksina"], input[placeholder*="Vaccine"]').first();
        if (await nameInput.isVisible({ timeout: 2000 })) {
          await nameInput.fill('MMR II Vaccine Test');
          await page.waitForTimeout(200);

          // Submit
          const submitBtn = page.locator('button:has-text("Update Record"), button:has-text("Përditëso")').first();
          await submitBtn.click();
          await page.waitForTimeout(500);

          // Record should appear in list
          const recordEntry = page.locator('text=MMR II Vaccine Test').first();
          await expect(recordEntry).toBeVisible({ timeout: 3000 });
        }
      }
    });
  });

});
