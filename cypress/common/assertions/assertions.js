export default class Assertion{

    /* verifyDropddownItemsCount - 
        args: locator(string), txt(string) 
        verifies the label of element 
    */
    verifyLblTxt(locator, txt){
        cy.get(locator).should('have.text', txt);
    }


    /* verifyDropddownItemsCount - 
        args: locator(string), optionCount(number)
        verifies the count of dropdown options 
    */
    verifyDropddownItemsCount(locator, optionCount){
        cy.get(locator).find('option').should('have.length', optionCount);
    }



    /* verifyDropdownItems - 
        args: locator (string), options (string) - seprated by ~
        verifies the options available in dropdown 
    */
    verifyDropdownItems(locator, options){
        let optionArr = options.split("~");
        for(let i =0; i<optionArr.length; i++){
            cy.get(locator)
                .find('option')
                .eq(i)  // Get the first option
                .should('have.text', optionArr[i])  // Verify the text
        }
    }

    /* elementNotExist  
        args: locator(string)
        verifies if element exist on page or not
    */
    elementNotExist(locator){
        cy.get(locator).should('not.exist');
    }

}