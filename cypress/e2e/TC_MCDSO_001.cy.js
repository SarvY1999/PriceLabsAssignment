describe("Verify functionality of Date Specific Override.", () => {
    it("Verify functionality of Date Specific Override. ", () => {
        cy.origin(Cypress.env('appUrl'), () => {
            const Common = Cypress.require('../common/selectFeature');
            const PricingPage = Cypress.require('../pageObjects/pricingPage/pricingPage');
            const DateSpecificOverridePage = Cypress.require('../pageObjects/pricingPage/dateSpecificOverridePage');
            const today = new Date();
            const currentDay = today.getDate();  // Get the current day of the month
            today.setDate(today.getDate() + 2);  // Get the date, two days ahead of the current date
            const futureDay = today.getDate();

            const pricingPage = new PricingPage()
            const dateSpcOvdPage = new DateSpecificOverridePage();
            const main = new Common();

            // Step 2: Select Pricing Dashboard from Dynamic Pricing dropdown
            main.selectFeature('Pricing Dashboard');

            // step 3: In the Search box enter listing name
            cy.fixture('Listing').then((data) => {
                pricingPage.filterAndSelectListing(data);
            });

            // Step 4: Select the listing
            cy.get(pricingPage.calendarTab).should('have.attr', "aria-selected", "true");

            //Step 5: Select any available date
            cy.get('div.fc-daygrid-day-top p').contains(currentDay).click();

            // Step 6 & 7: Verify following controls on Date Specific Override window
            // Start Date & End Date 
            cy.get(dateSpcOvdPage.dateSpecificOverrideLbl).should('have.text', "Date Specific Overrides");
            cy.get(dateSpcOvdPage.startDateDatePicker).click();
            cy.get('.react-datepicker__day').contains(currentDay).should('not.have.class', "--disabled").click();
            cy.get('.react-datepicker__day').contains(futureDay).should('not.have.class', "--disabled").click();

            // Step 7:   Price Settings Sections
            // Final Price Dropdown - Fixed, % change on recommended price, Textbox for price
            cy.get(dateSpcOvdPage.dateSpecificOverrideLbl).should('have.text', "Date Specific Overrides");

            cy.get(dateSpcOvdPage.finalPriceDrpDwn)
                .find('option')
                .should('have.length', 2);  // Verify there are 2 options

            // Verify the first option's text and value
            cy.get(dateSpcOvdPage.finalPriceDrpDwn)
                .find('option')
                .eq(0)  // Get the first option
                .should('have.text', 'Fixed')  // Verify the text
                .and('have.value', 'fixed');  // Verify the value attribute

            // Verify the second option's text and value
            cy.get(dateSpcOvdPage.finalPriceDrpDwn)
                .find('option')
                .eq(1)  // Get the second option
                .should('have.text', '% change on recommended price')  // Verify the text
                .and('have.value', 'percent');

            cy.get(dateSpcOvdPage.finalPriceTxtBox).type(300);


            // Step 7: Minimun Price - Fixed, % change on min price, change on base price, Textbox for price
            cy.get(dateSpcOvdPage.minimumPriceDrpDwn)
                .find('option')
                .should('have.length', 3);  // Verify there are 2 options

            // Verify the first option's text and value
            cy.get(dateSpcOvdPage.minimumPriceDrpDwn)
                .find('option')
                .eq(0)  // Get the first option
                .should('have.text', 'Fixed')  // Verify the text
                .and('have.value', 'fixed');  // Verify the value attribute

            // Verify the second option's text and value
            cy.get(dateSpcOvdPage.minimumPriceDrpDwn)
                .find('option')
                .eq(1)  // Get the second option
                .should('have.text', '% change on min price')  // Verify the text
                .and('have.value', 'percent_min');

            // Verify the second option's text and value
            cy.get(dateSpcOvdPage.minimumPriceDrpDwn)
                .find('option')
                .eq(2)  // Get the third option
                .should('have.text', '% change on base price')  // Verify the text
                .and('have.value', 'percent_base');


            cy.get(dateSpcOvdPage.minimumPriceTxtBox).type(100);


            // Step 7: Maximum Price - Fixed, % change on max price, change on base price, Textbox for price Base Price Textbox
            cy.get(dateSpcOvdPage.maximumPriceDrpDwn)
                .find('option')
                .should('have.length', 3);  // Verify there are 2 options

            // Verify the first option's text and value
            cy.get(dateSpcOvdPage.maximumPriceDrpDwn)
                .find('option')
                .eq(0)  // Get the first option
                .should('have.text', 'Fixed')  // Verify the text
                .and('have.value', 'fixed');  // Verify the value attribute

            // Verify the second option's text and value
            cy.get(dateSpcOvdPage.maximumPriceDrpDwn)
                .find('option')
                .eq(1)  // Get the second option
                .should('have.text', '% change on max price')  // Verify the text
                .and('have.value', 'percent_max');

            // Verify the second option's text and value
            cy.get(dateSpcOvdPage.maximumPriceDrpDwn)
                .find('option')
                .eq(2)  // Get the third option
                .should('have.text', '% change on base price')  // Verify the text
                .and('have.value', 'percent_base');


            cy.get(dateSpcOvdPage.maximumPriceTxtBox).type(400);

            cy.get(dateSpcOvdPage.basePriceTxtBox).type(220);

            // Step 8: Minimum Stay textbox, with text "Can be overridden by orphan day customization"
            cy.get(dateSpcOvdPage.minimunStayTxtBox).type(5);

            // Step 9: Click on Add button
            cy.get(dateSpcOvdPage.addBtn).click()
            cy.get(dateSpcOvdPage.dateSpecificOverrideLbl).should('not.exist');

            // step 10: Verify if the Date contains added values
            cy.get('div.fc-daygrid-day-top p') // Find all the day elements
                .contains(currentDay) // Locate the one with the current day
                .closest('td') // Go to the parent <td>
                .within(() => {
                    // Find the events div and click it
                    cy.get('div.fc-daygrid-day-events').click();

                    // Retrieve and assert the price text
                    cy.get('div.fc-event-title')
                        .invoke('text') // Extract the text content
                        .then((text) => {
                            expect(text).to.contain('Price: 300 $, 5 ☾, Base Price: 220 $, Min Price: 100 $, Max Price: 400 $');
                        });
                });

            // Step 10: Delete the added Date Specific Override
            cy.get(dateSpcOvdPage.removeBtn).click();
        })
    })
})