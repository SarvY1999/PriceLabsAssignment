export default class DateSpecificOverride {
locators = {
        dateSpecificOverrideLbl  : 'p[qa-id="dso-modal-title"]',
        startDateDatePicker  : "div.css-1w6kuph div.css-o46mrb",
        endDateDatePicker  : "div.css-fs1ew6 div.css-o46mrb",
        
        // Price Settings Sections
        finalPriceDrpDwn  : 'select[qa-id="price-select"]',
        finalPriceTxtBox  : 'input[qa-id="dso-price"]',
        minimumPriceDrpDwn  : 'select[qa-id="min-price-select"]',
        minimumPriceTxtBox  : 'input[qa-id="dso-min-price"]',
        maximumPriceDrpDwn  : 'select[qa-id="max-price-select"]',
        maximumPriceTxtBox  : 'input[qa-id="dso-max-price"]',
        basePriceTxtBox  : 'input[qa-id="dso-base-price"]',
        
        // Stay Restrictions
        minimunStayTxtBox  : 'input[qa-id="dso-min-stay"]',
        minimumStayTxt  : 'p.chakra-text.css-16yyrvl',
        chkInChkOutDrpDwn  : 'select[qa-id="check-in-check-out-enabled"]:nth-child(1)',
        enforceWeeklyDrpDwn  : 'div#dso-modal-inforce-weekly',
        reasonForOverrideTxtArea  : 'textarea[qa-id="custom-price-reason"]',
        
        // Add Button
        addBtn : 'p[qa-id="add-dso"]',
        removeBtn  : 'button[qa-id="remove-dso"]'

    }

    selectStartAndEndDate(curentDate, futureDate){
        cy.get(this.locators.startDateDatePicker, { timeout: 10000 }).click();
        cy.get('.react-datepicker__day').contains(curentDate).should('not.have.class', "--disabled").click();
        cy.get('.react-datepicker__day').contains(futureDate).should('not.have.class', "--disabled").click();
    }

    verifyDSO(date, txt){
        cy.get('div.fc-daygrid-day-top p') // Find all the day elements
                .contains(date) // Locate the one with the current day
                .closest('td') // Go to the parent <td>
                .within(() => {
                    // Retrieve and assert the price text
                    cy.get('div.fc-event-title')
                        .invoke('text') // Extract the text content
                        .then((text) => {
                            expect(text).to.contain(txt);
                        });
                });
    }

    openExistingDSO(date){
        cy.get('div.fc-daygrid-day-top p') // Find all the day elements
                .contains(date) // Locate the one with the current day
                .closest('td') // Go to the parent <td>
                .within(() => {
                    // Find the events div and click it
                    cy.get('div.fc-daygrid-day-events').click();
                });
    }

}