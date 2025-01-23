

---

# PriceLabs Automation Testing Assignment

This project is an automation testing assignment for PriceLabs. The objective was to automate the testing of the application using Cypress and generate detailed reports using Mochawesome.

## Technologies Used

- **JavaScript**: Programming language used for writing the tests.
- **Cypress**: End-to-end testing framework used to automate the tests.
- **Mochawesome Reporter**: A custom reporter to generate and format test reports.

## Project Setup

Follow these steps to set up the project on your local machine:

### Prerequisites

Ensure you have the following installed:

- **Node.js**: To install Node.js, visit [nodejs.org](https://nodejs.org/).
- **npm (Node Package Manager)**: This comes with Node.js.

### Steps to Set Up

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/SarvY1999/PriceLabsAssignment.git priceLabsAssignment
   cd priceLabsAssignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. After installation is complete, you can run the tests.

### Running the Tests

To execute the tests using Cypress, run the following command:

```bash
npx cypress open
```

This will open the Cypress Test Runner. From here, you can select and run individual tests or run all tests.

### Generating Test Reports

The tests are configured to generate reports using the Mochawesome reporter. After running the tests, the reports will be saved in the `cypress/results` directory. To run the tests and generate reports, use the following command:

```bash
npx cypress run
```

The reports will be available in the `reports` directory. You can open the `reports/index.html` file to view the detailed report in your browser.
