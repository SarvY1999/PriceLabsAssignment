export default class PricingPage {
    searchListingSrchBox = "input[qa-id='mc-search-listings-input']";
    calendarTab = 'div[role="tablist"] button[data-index="0"]';
    neighborhoodDataTab = 'button[qa-id="rp-nd-tab"]';
    hotelDataTab = 'button[qa-id="rp-hotel-data"]';

    filterAndSelectListing(obj) {
        cy.get(this.searchListingSrchBox).type(obj.listingName);
        cy.get('div#mc-main tbody tr td.css-11vrr50 a').contains(obj.listingName).click();
    }
}
