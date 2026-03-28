# BioBankTest
This test suite automates end-to-end scenarios for Google Keep using Playwright.
BioBankTest
This test suite automates end-to-end scenarios for Google Keep using Playwright.

📒 Google Keep E2E & Performance Tests (Playwright)

This repository contains end-to-end (E2E) and non-functional (performance) tests for Google Keep built with Playwright.

It follows the Page Object Model (POM) design pattern for maintainability and readability, separating page logic into dedicated classes (e.g., LoginPage, KeepHomePage).

🚀 Features

🔑 Secure login with credentials managed via .env (dotenv)

✅ Functional tests:

Login to Google Keep

Create a new note (title + body)

Navigate to Archive tab

Navigate to Reminders tab

🖼️ Automatic full-page screenshots on test failures

📊 Performance test for login:

Login page load time (<5s)

Login completion time (<7s)

Screenshot capture + DOM readiness check

📈 Allure reporting support (optional)

Test Artifacts

Screenshots on failure → stored in screenshots/

Debug screenshots → debug.png (performance test)

Allure Reports (if enabled):

🛠️ Tech Stack

Playwright

dotenv for secrets management

Allure Playwright for reporting

├── pages/ │ ├── BasePage.js # Common reusable methods for all page objects (navigation, waits, etc.) │ ├── LoginPage.js # Page Object for Google login flow │ ├── KeepHomePage.js # Page Object for Google Keep home actions (notes, archive, reminders) │ ├── tests/ │ ├── functional_Test.spec.js # Functional tests (login, create note, archive, reminders) │ ├── nonFunctional_Test.spec.js # Performance test for login (page load + response times) │ ├── screenshots/ # Auto-generated screenshots on failure/debug ├── .env # Environment variables (credentials) - not committed ├── package.json # Project dependencies, scripts, and metadata ├── package-lock.json # Locked dependency tree for consistent installs ├── playwright.config.js # Playwright test configuration (browser, reporter, timeouts) └── README.md # Project documentation

About
This test suite automates end-to-end scenarios for Google Keep using Playwright.

Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Languages
JavaScript
94.6%
 
HTML
4.0%
 
CSS
1.4%
Suggested workflows
Based on your tech stack
Webpack logo
Webpack
Build a NodeJS project with npm and webpack.
Gulp logo
Gulp
Build a NodeJS project with npm and gulp.
Grunt logo
Grunt
Build a NodeJS project with npm and grunt.
More workflows
Footer
© 2025 GitHub, Inc.