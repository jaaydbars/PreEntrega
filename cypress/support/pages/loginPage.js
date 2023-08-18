export class LoginPage {
    constructor(){
        this.userInput = '#user';
        this.passInput = '#pass';
        this.loginButton = '#submitForm';
    };

    escribirUsuario(usuario) {
        cy.get(this.userInput).type(usuario);
    };

    escribirContraseña(contraseña) {
        cy.get(this.passInput).type(contraseña);
    };

    clickLoginButton() {
        cy.get(this.loginButton).click();
    };
};