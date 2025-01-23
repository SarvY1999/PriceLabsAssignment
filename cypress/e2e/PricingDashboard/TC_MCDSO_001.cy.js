describe("Verify functionality of Date Specific Override.", () => {
    it("Verify functionality of Date Specific Override. ", () => {
        cy.origin(Cypress.env('appUrl'), () => {
            const Command = Cypress.require('../../common/commands/commands');
            const Assert = Cypress.require('../../common/assertions/assertions');
            const PricingPage = Cypress.require('../../pageObjects/pricingPage/pricingPage');
            const DateSpecificOverridePage = Cypress.require('../../pageObjects/pricingPage/dateSpecificOverridePage');
            const today = new Date();
            const currentDay = today.getDate();  // Get the current day of the month
            today.setDate(today.getDate() + 2);  // Get the date, two days ahead of the current date
            const futureDay = today.getDate();

            const pricingPage = new PricingPage()
            const dateSpcOvdPage = new DateSpecificOverridePage();
            const command = new Command();
            const assert = new Assert();

            // Step 2: In the Search box enter listing name
            // Step 3: Select the Listing
            command.logger("Filtering and selecting listing");
            cy.fixture('Listing').then((data) => {
                pricingPage.filterAndSelectListing(data);
            });

            command.logger("Checking if Calendar Tab is selected by default");
            pricingPage.isTabSelected("Calendar", "true");

            //Step 4: Select any available date
            command.logger("Selecting Current Date");
            pricingPage.selectDate(currentDay);

            // Step 5: Verify following controls on Date Specific Override window -
            // Step 6 & 7: Verify following controls on Date Specific Override window
            // Start Date & End Date 
            command.logger("Verifying label of DSO Page");
            assert.verifyLblTxt(dateSpcOvdPage.locators.dateSpecificOverrideLbl, "Date Specific Overrides");

            // Enter Start Date and End Date
            command.logger("Entering Start Date and End Date");
            dateSpcOvdPage.selectStartAndEndDate(currentDay, futureDay);

            // Step 7: Price Settings Sections
            // Final Price Dropdown - Fixed, % change on recommended price, Textbox for price
            command.logger("Checking Final Price Dropdown's option count");
            assert.verifyDropddownItemsCount(dateSpcOvdPage.locators.finalPriceDrpDwn, 2); // Verify there are 2 options

            command.logger("Verifying Final Price Dropdown values - Fixed, % change on recommended price, Textbox for price");
            assert.verifyDropdownItems(dateSpcOvdPage.locators.finalPriceDrpDwn, 'Fixed~% change on recommended price');

            // Enter price in final Price txtbox
            command.logger("Entering price in final Price txtbox");
            command.setText(dateSpcOvdPage.locators.finalPriceTxtBox, 300);

            // Step 7: Minimun Price - Fixed, % change on min price, change on base price, Textbox for price
            command.logger("Entering price in final Price txtbox");
            assert.verifyDropddownItemsCount(dateSpcOvdPage.locators.minimumPriceDrpDwn, 3);

            // Verify the first option's text
            command.logger("Verifying Minimun Price dropdown's options");
            assert.verifyDropdownItems(dateSpcOvdPage.locators.minimumPriceDrpDwn, 'Fixed~% change on min price~% change on base price');

            // Enter price in minimum Price txtbox
            command.logger("Entering price in minimum Price txtbox");
            command.setText(dateSpcOvdPage.locators.minimumPriceTxtBox, 100);

            // Step 7: Maximum Price - Fixed, % change on max price, change on base price, Textbox for price Base Price Textbox
            command.logger("Verifying Maximum Price dropdown's option count");
            assert.verifyDropddownItemsCount(dateSpcOvdPage.locators.maximumPriceDrpDwn, 3);// Verify there are 3 options

            // Verify the first option's text
            command.logger("Verifying Maximum Price dropdown's options");
            assert.verifyDropdownItems(dateSpcOvdPage.locators.maximumPriceDrpDwn, 'Fixed~% change on max price~% change on base price');

            command.logger("Entering Values in maximum Price");
            command.setText(dateSpcOvdPage.locators.maximumPriceTxtBox, 400);

            command.logger("Entering Values in base Price");
            command.setText(dateSpcOvdPage.locators.basePriceTxtBox, 220);

            // Step 8: Minimum Stay textbox 
            command.logger("Entering Values in Minimum Stay text box");
            command.setText(dateSpcOvdPage.locators.minimunStayTxtBox, 5);

            // Step 9: Click on Add button
            command.logger("Adding DSO");
            command.doClick(dateSpcOvdPage.locators.addBtn);

            assert.elementNotExist(dateSpcOvdPage.locators.dateSpecificOverrideLbl);

            // step 10: Verify if the Date contains added values
            command.logger("Verify if added values are reflecting in DSO or not");
            dateSpcOvdPage.verifyDSO(currentDay, 'Price: 300 $, 5 ☾, Base Price: 220 $, Min Price: 100 $, Max Price: 400 $');
            dateSpcOvdPage.openExistingDSO(currentDay);

            // Step 11: Delete the added Date Specific Override
            command.logger("Deleting DSO");
            command.doClick(dateSpcOvdPage.locators.removeBtn);

        })
    })
})