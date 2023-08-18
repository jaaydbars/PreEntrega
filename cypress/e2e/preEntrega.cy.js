import {LoginPage} from "../support/pages/loginPage";
import {HomePage} from "../support/pages/homePage";
import {ProductsPage} from "../support/pages/productsPage";
import {ShoppingCartPage, shoppingCartPage} from "../support/pages/shoppingCartPage";
const constants = require('../support/constants');

describe('Pre-Entrega', () => {
    let datos;
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();

    before('Cargando fixture', () =>{
        cy.fixture('datos').then(data => {
            datos = data;
        });
    });

beforeEach('Login-in', () => {
    cy.log('Login-in');
    cy.visit('');
    cy.xpath(`//span[contains(text(), 'sesi')]`).dblclick();
    loginPage.escribirUsuario(Cypress.env('username'));
    loginPage.escribirContraseña(Cypress.env('password'));
    loginPage.clickLoginButton();
    homePage.clickOnlineShopButton();
});

it('Ingresar y verificar el precio acumulado de 2 productos', () =>{
    
    productsPage.clickAddToCartButton(datos.primerProducto.productName,{timeout:constants.TIMEOUT});
    productsPage.clickClosePopupButton();
    productsPage.clickAddToCartButton(datos.segundoProducto.productName, {timeout:constants.TIMEOUT});
    productsPage.clickClosePopupButton();
    productsPage.clickShoppingCartButton();
    shoppingCartPage.clickShowTotalPriceButton();
    shoppingCartPage.clickVerifyProduct(datos.primerProducto.productName).should('exist');
    shoppingCartPage.clickVerifyPrice(datos.primerProducto.productName, datos.primerProducto.price).should('exist');
    shoppingCartPage.clickVerifyProduct(datos.segundoProducto.productName).should('exist');
    shoppingCartPage.clickVerifyPrice(datos.segundoProducto.productName, datos.segundoProducto.price).should('exist');
    cy.get('#price > b').invoke('text').then(parseInt).should('eq', datos.primerProducto.price + datos.segundoProducto.price);
});
});