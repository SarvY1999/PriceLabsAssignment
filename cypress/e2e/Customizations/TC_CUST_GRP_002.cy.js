import CustomizationTab from "../../pageObjects/customizationPage/customizationTab/cutomizationTab";
import GroupsTab from "../../pageObjects/customizationPage/customizationTab/groupsTab";
import Command from "../../common/commands/commands";
const randomInteger = Math.floor(Math.random() * 100) + 1;


describe("Validate that duplicate group names cannot be created.", () => {
    it('Validate that duplicate group names cannot be created.', () => {
        const customization = new CustomizationTab();
        const grpTab = new GroupsTab();
        const command = new Command();

        cy.origin(Cypress.env('appUrl'), () => {
            const Main = Cypress.require('../../common/selectFeature');
            const Command = Cypress.require('../../common/commands/commands');
            const main = new Main();
            const command = new Command();

            // Step 2: Select Customization from Dynamic Pricing dropdown
            command.logger('Select Customization from Dynamic Pricing dropdown')
            main.selectFeature('Customizations');
        })

        // Step 3: Select Customizations Tab and then select Groups Tab
        command.logger('Select Customizations Tab and then select Groups Tab')
        customization.selectTab("Groups");

        // Step 4: Click on "+Create Group" button
        // Step 5: Add Group Name in the Group Name textbox and click Create Button
        // Step 6: Verify that the group is created successfully.
        // Step 7: Click on the "Create Group" button again.
        // Enter the same group name (e.g., "Group A") and attempt to save.
        command.logger(`Click on "+Create Group" button, Add Group Name in the Group Name textbox and click Create Button. Verify that the group is created successfully. ,Click on the "Create Group" button again.Enter the same group name (e.g., "Group A") and attempt to save.`)
        grpTab.validateDuplicateError(`Grp Test Duplicate Error ${randomInteger}`);
    })
});