import CreateGroupDialog from "./createGroupDialog";
import DeleteGroupDialog from "./deleteGroupDialog";

export default class GroupsTab {
    locators = {
        createGrpBtn: 'a[qa-id="create-new-group-cust"]',
        editGroupBtn: 'a[qa-id="group-customizations-edit-a113yyqkgqogroup_Name"]',
        grpMoreOptions: 'a[qa-id="group-more-options"]'
    }

    // create group command to create group
    createGroup(grpName) {
        const creatGrpDialog = new CreateGroupDialog();
        cy.get(this.locators.createGrpBtn).click();
        cy.get(creatGrpDialog.locators.grpNameTxtBox).type(grpName);
        cy.get(creatGrpDialog.locators.createBtn).click();
        cy.get(`div[qa-id="div-${grpName}"]`).should('be.visible');
    }


    // delete grp command to delete te group
    deleteGroup(grpName) {
        const deleteGrpDlg = new DeleteGroupDialog();
        cy.get(`div[qa-id="div-${grpName}"]`).within(() => {
            cy.get(this.locators.grpMoreOptions).click();
            cy.get('ul#group-level-customization-menu-list a').contains('Delete Group').click();
        });
        cy.get(deleteGrpDlg.locators.deleteBtn).click();
        cy.get(`div[qa-id="div-${grpName}"]`).should('not.exist');
    }


    validateDuplicateError(grpName) {

        // creating first grp
        const creatGrpDialog = new CreateGroupDialog();
        cy.get(this.locators.createGrpBtn).click();
        cy.get(creatGrpDialog.locators.grpNameTxtBox).type(grpName);
        cy.get(creatGrpDialog.locators.createBtn).click();
        cy.get(`div[qa-id="div-${grpName}"]`).should('be.visible');

        // crating grp with duplicate name for verifying error
        cy.get(this.locators.createGrpBtn).click();
        cy.get(creatGrpDialog.locators.grpNameTxtBox).type(grpName);
        cy.get(creatGrpDialog.locators.createBtn).click();
        cy.get('div.toast.toast-error div.toast-message').should('be.visible');
        cy.get('div.toast.toast-error div.toast-message h4').should('have.text', "Group Name already exists");
        cy.get(creatGrpDialog.locators.cancelBtn).click();

    }
}