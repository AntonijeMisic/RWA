export class RegisterView {

    constructor() { }

    drawRegister(container: HTMLElement) {
        const formaDiv = document.createElement("div")
        formaDiv.classList.add("register-forma-div")
        const imeInput = document.createElement("input")
        imeInput.type = "text"
        imeInput.placeholder = "Ime"
        imeInput.classList.add("ime-input")
        const prezimeInput = document.createElement("input")
        prezimeInput.type = "text"
        prezimeInput.placeholder = "Prezime"
        prezimeInput.classList.add("prezime-input")
        const emailInput = document.createElement("input")
        emailInput.type = "email"
        emailInput.placeholder = "Email"
        emailInput.classList.add("email-register-input")
        const passwordInput = document.createElement("input")
        passwordInput.type = "password"
        passwordInput.placeholder = "Password"
        passwordInput.classList.add("password-register-input")
        const conpasswordInput = document.createElement("input")
        conpasswordInput.type = "password"
        conpasswordInput.placeholder = "Potvrdi password"
        conpasswordInput.classList.add("confirm-password-input")
        const btnRegister = document.createElement("button")
        btnRegister.classList.add("btnRegister")
        btnRegister.textContent = "Registruj se"

        formaDiv.appendChild(imeInput)
        formaDiv.appendChild(prezimeInput)
        formaDiv.appendChild(emailInput)
        formaDiv.appendChild(passwordInput)
        formaDiv.appendChild(conpasswordInput)
        formaDiv.appendChild(btnRegister)

        const imasLOginDiv = document.createElement("div")
        imasLOginDiv.classList.add("tekst-login")
        const tekstic = document.createElement("div")
        tekstic.classList.add("tekstic2")
        tekstic.textContent = "Ukoliko imate nalog: "
        const btnGotoLogin = document.createElement("button")
        btnGotoLogin.classList.add("btn-go-to-login")
        btnGotoLogin.textContent = "Prijavi se"
        btnGotoLogin.onclick = () => {
            const registerDiv: HTMLDivElement = document.querySelector(".register-div")
            registerDiv.hidden = true
            const loginDiv: HTMLDivElement = document.querySelector(".login-div")
            loginDiv.hidden = false
        }
        imasLOginDiv.appendChild(tekstic)
        imasLOginDiv.appendChild(btnGotoLogin)

        container.appendChild(formaDiv)
        container.appendChild(imasLOginDiv)
    }
}
