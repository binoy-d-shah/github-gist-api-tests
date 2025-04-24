
# GitHub Gist API Automation

This repository contains Playwright automation scripts for testing GitHub Gist API endpoints. The project includes test cases for creating, updating, deleting, and managing GitHub Gists, as well as scenarios for handling valid and invalid authentication.

---

## Project Structure

- `utils/authHeaders.ts`: Contains headers for valid and invalid authentication tokens.
- `utils/apihelper.ts`: Contains API functions to interact with GitHub Gist endpoints such as create, update, delete, get, and more.
- `config/env.ts`: Configuration file for API endpoint and tokens.
- `tests/`: Directory containing test files for API scenarios.
- `testData/`: Directory containing test data for API scenarios.
- `package.json`: Contains dependencies for the project.

---

## Prerequisites

- Node.js (v16.x or higher)
- Playwright (for browser automation)
- GitHub account (for generating tokens)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/binoy-d-shah/github-gist-api-tests.git
cd github-gist-api-tests
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory and set the following variables:

```env
GITHUB_GIST_API_ENDPOINT=https://api.github.com
GITHUB_GIST_TOKEN=your-valid-token
```

---

## ▶️ Running Tests

### Run All Tests

```bash
npx playwright test tests --workers=3
```

### Run Specific API Test Suite

```bash
npx playwright test tests/e2eTestSuite.spec.ts --workers=3
```

---

## 📊 Reporting

After tests complete, an HTML report is generated:

```bash
npx playwright show-report
```

---

## 📆 Scheduled Test Execution (CI/CD)

This project includes a GitHub Actions workflow to automatically run tests every day at **8:00 AM CEST**.

### 🔧 Workflow File Location
The schedule configuration is defined in:

```
.github/workflows/playwright.yml
```

### 🕒 Schedule Details
- The workflow runs once a day at **08:00 CEST**
- GitHub Actions uses UTC internally, so the cron is set to `0 6 * * *` (06:00 UTC = 08:00 CEST)

### ⚙️ What It Does
- Installs project dependencies
- Sets up Playwright and required browsers
- Runs all defined Playwright test suites
- Uploads the test report as an artifact (visible in GitHub Actions tab)

### ✅ Manual Trigger
You can also trigger the workflow manually via the GitHub Actions UI using the **"Run workflow"** button.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Playwright for API testing.
- GitHub API for providing Gist functionality.
