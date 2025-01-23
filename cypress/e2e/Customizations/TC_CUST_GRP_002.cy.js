import CustomizationTab from "../../pageObjects/customizationPage/customizationTab/cutomizationTab";
import GroupsTab from "../../pageObjects/customizationPage/customizationTab/GroupsTab";
const randomInteger = Math.floor(Math.random() * 100) + 1;


describe("Validate that duplicate group names cannot be created.", () => {
    it('Validate that duplicate group names cannot be created.', () => {
        const customization = new CustomizationTab();
        const grpTab = new GroupsTab();

        cy.origin(Cypress.env('appUrl'), () => {
            const Common = Cypress.require('../../common/selectFeature');
            const main = new Common();

            // Step 2: Select Customization from Dynamic Pricing dropdown
            main.selectFeature('Customizations');
        })

        // Step 3: Select Customizations Tab and then select Groups Tab
        customization.selectTab("Groups");

        // Step 4: Click on "+Create Group" button
        // Step 5: Add Group Name in the Group Name textbox and click Create Button
        // Step 6: Verify that the group is created successfully.
        // Step 7: Click on the "Create Group" button again.
        // Enter the same group name (e.g., "Group A") and attempt to save.
        grpTab.validateDuplicateError(`Grp Test Duplicate Error ${randomInteger}`);
    })
});