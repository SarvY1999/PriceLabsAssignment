export default class PricingPage {

    locators = {
        searchListingSrchBox: "input[qa-id='mc-search-listings-input']",
        calendarTab: 'div[role="tablist"] button[data-index="0"]',
        neighborhoodDataTab: 'button[qa-id="rp-nd-tab"]',
        hotelDataTab: 'button[qa-id="rp-hotel-data"]'
    }

    filterAndSelectListing(obj) {
        cy.get(this.locators.searchListingSrchBox).click();
        cy.get(this.locators.searchListingSrchBox).type(obj.listingName);
        cy.get('div#mc-main tbody tr td.css-11vrr50 a').contains(obj.listingName).click();
    }

    isTabSelected(tabName, isSelected){

       switch (tabName) {
        case "Calendar":
            cy.get(this.locators.calendarTab).should('have.attr', "aria-selected", isSelected);
        break;

        case  "Neighborhood Data":
            cy.get(this.locators.neighborhoodDataTab).should('have.attr', "aria-selected", isSelected);
        break;

        case "Hotel Data":
            cy.get(this.locators.hotelDataTab).should('have.attr', "aria-selected", isSelected);
        break;

        default:
            throw new Error(`Invalid tab name: ${tabName}. Valid options are: "Calendar", "Neighborhood Data", "Hotel Data".`);
       }
    }

    selectDate(date){
        cy.get('div.fc-daygrid-day-top p').contains(date).click();
    }

}
