export class LoginView {

    constructor() { }

    drawLogin(container: HTMLElement) {
        const formaDiv = document.createElement("div")
        formaDiv.classList.add("forma-div")
        const emailInput = document.createElement("input")
        emailInput.type = "email"
        emailInput.placeholder = "Email"
        emailInput.classList.add("email-input")
        const passwordInput = document.createElement("input")
        passwordInput.type = "password"
        passwordInput.placeholder = "Password"
        passwordInput.classList.add("password-input")
        const btnPrijava = document.createElement("button")
        btnPrijava.classList.add("btnPrijava")
        btnPrijava.textContent = "Prijavi se"

        formaDiv.appendChild(emailInput)
        formaDiv.appendChild(passwordInput)
        formaDiv.appendChild(btnPrijava)

        const noRegisterDiv = document.createElement("div")
        noRegisterDiv.classList.add("tekst-no-register")
        const tekstic = document.createElement("div")
        tekstic.classList.add("tekstic")
        tekstic.textContent = "Ukoliko nemate nalog: "
        const btnGotoRegister = document.createElement("button")
        btnGotoRegister.classList.add("btn-go-to-register")
        btnGotoRegister.textContent = "Registruj se"

        noRegisterDiv.appendChild(tekstic)
        noRegisterDiv.appendChild(btnGotoRegister)

        container.appendChild(formaDiv)
        container.appendChild(noRegisterDiv)
    }

}
