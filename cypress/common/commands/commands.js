export default class Command{

    /*
         setText - 
         args: locator(string), value(string) 
         For entering text in textboxes
    */
    setText(locator, value){
        cy.get(locator).type(value);
    }

    /*
    doClick - 
         args: locator(string), value(string) 
         For clicking on elements
    */
    doClick(locator){
        cy.get(locator).click();
    }

    /*
        logger -
        args: txt(string)
        for priting text
    */
    logger(txt){
        cy.log(txt)
    }

}