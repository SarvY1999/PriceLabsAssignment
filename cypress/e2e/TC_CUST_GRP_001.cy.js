import CustomizationTab from "../pageObjects/customizationPage/customizationTab/cutomizationTab";
import GroupsTab from "../pageObjects/customizationPage/customizationTab/GroupsTab";
const randomInteger = Math.floor(Math.random() * 100) + 1;


describe("Verify functionality of adding, Editing and Deleting Groups in Customization.", () => {
    it('Verify functionality of adding, Editing and Deleting Groups in Customization.', () => {
        const customization = new CustomizationTab();
        const grpTab = new GroupsTab();

        cy.origin(Cypress.env('appUrl'), () => {
            const Common = Cypress.require('../common/selectFeature');
            const main = new Common();

            // Step 2: Select Customization from Dynamic Pricing dropdown
            main.selectFeature('Customizations');
        })

        // Step 3: Select Customizations Tab and then select Groups Tab
        customization.selectTab("Groups");

        //Step 4: Click on "+Create Group" button
        //Step 5: Add Group Name in the Group Name textbox and click Create Button
        grpTab.createGroup(`Grp Test ${randomInteger}`);

        //step 6: Click on the more options button located on the Group
        //Step 7: Select "Delete Group" Option
        // Step 8: Click on Delete button in Delete Group Dialog
        grpTab.deleteGroup(`Grp Test ${randomInteger}`);

    })
})