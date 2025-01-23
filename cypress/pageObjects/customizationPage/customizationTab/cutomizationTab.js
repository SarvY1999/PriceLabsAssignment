export default class CustomizationTab {
    locators = {
        customizationTab: 'a[qa-id="cust-section"]',
        accountsTab: 'a[qa-id="accounts-tab"]',
        groupsTab: 'a[qa-id="groups-tab"]',
        listingTab: 'a[qa-id="listings-tab"]'
    }

    selectTab(tabName) {
        switch (tabName) {
            case "Groups":
                cy.get(this.locators.groupsTab).click();
                break;

            case "Accounts":
                cy.get(this.locators.accountsTab).click();
                break;

            case "Listing":
                cy.get(this.locators.listingTab).click();
                break;

            default:
                throw new Error(`Invalid tab name: ${tabName}. Valid options are: "Groups", "Accounts", "Listing".`);
        }
    }

}
