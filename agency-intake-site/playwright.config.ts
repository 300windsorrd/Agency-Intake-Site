import { defineConfig } from '@playwright/test'

export default defineConfig({
	testDir: './tests',
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
		env: {
			N8N_CONTACT_WEBHOOK_URL: process.env.N8N_CONTACT_WEBHOOK_URL || 'http://127.0.0.1:9999/webhook/contact',
			N8N_INTAKE_WEBHOOK_URL: process.env.N8N_INTAKE_WEBHOOK_URL || 'http://127.0.0.1:9999/webhook/intake'
		}
	},
	use: {
		headless: true,
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry'
	}
})


