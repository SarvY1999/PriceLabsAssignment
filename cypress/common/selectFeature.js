export default class Common {
    logo = "div.chakra-stack > a > img";
    dynamicPricingDrpDwn = "button.chakra-menu__menu-button.css-1ai65wj";

    selectFeature(featureName) {
        cy.get(this.dynamicPricingDrpDwn).click();
        cy.get('div.css-19smzeu a[role="menuitem"] p.chakra-text.css-23zmd7').contains(featureName).click();
    }
}