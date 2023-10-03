import { Observable, Subject, combineLatest, filter, map, takeUntil, withLatestFrom } from "rxjs"
import { Korisnik } from "../../models/korisnik"
import { handleEmailInput, handlePasswordInput, handleTekstInput, handleEmailRegisterInput, handlePasswordRegisterInput, handleRegisterClick, handleConPasswordRegisterInput } from "../../observables/eventhandlers"
import { insertUser } from "../../observables/apiservice"

export class RegisterLogic {
    private $emailInput: Observable<string>
    private $passwordInput: Observable<string>
    private $imeInput: Observable<string>
    private $prezimeInput: Observable<string>
    private $btnRegister: Observable<string>
    private $conPassInput: Observable<string>

    private registrationSubject = new Subject<boolean>()
    private $isRegistered = this.registrationSubject.asObservable()

    constructor(
        imeInput: HTMLInputElement,
        prezimeINput: HTMLInputElement,
        emailInput: HTMLInputElement,
        passInput: HTMLInputElement,
        conpassInput: HTMLInputElement,
        registerBtn: HTMLButtonElement
    ) {
        this.$emailInput = handleEmailRegisterInput(emailInput);
        this.$passwordInput = handlePasswordRegisterInput(passInput);
        this.$imeInput = handleTekstInput(imeInput)
        this.$prezimeInput = handleTekstInput(prezimeINput)
        this.$conPassInput = handleConPasswordRegisterInput(conpassInput)
        this.$btnRegister = handleRegisterClick(registerBtn)

        this.handleUserRegister(imeInput, prezimeINput, emailInput, passInput, conpassInput)
        this.handleUnosLozinki(conpassInput)

        const btnGotoRegister: HTMLButtonElement = document.querySelector(".btn-go-to-register")
        btnGotoRegister.onclick = () => {
            this.openRegisterForm()
        }
    }

    handleUserRegister(imeInput: HTMLInputElement, prezimeINput: HTMLInputElement, emailInput: HTMLInputElement, passInput: HTMLInputElement, conpassInput: HTMLInputElement) {
        this.$btnRegister.pipe(
            withLatestFrom(this.$imeInput, this.$prezimeInput, this.$emailInput, this.$passwordInput, this.$conPassInput),
            map(([, ime, prezime, email, password, conPassword]) => ({ ime, prezime, email, password, conPassword }))
        ).pipe(
            takeUntil(this.$isRegistered.pipe(filter(isRegistered => isRegistered)))
        ).subscribe((user) => {

            if (user.password !== user.conPassword)
                return

            this.registerUser(user.ime, user.prezime, user.email, user.password)
            console.log(user)
            this.registrationSubject.next(true)
        });
    }

    registerUser(ime: string, prezime: string, email: string, password: string) {
        let k: Korisnik = {
            id: null,
            ime,
            prezime,
            email,
            password
        }

        insertUser(k)
    }

    handleUnosLozinki(conpassInput: HTMLInputElement) {

        combineLatest([this.$passwordInput, this.$conPassInput]).pipe(
            map(([password, confirmPassword]) => ({ password, confirmPassword }))
        ).subscribe(({ password, confirmPassword }) => {
            if (password === confirmPassword) {
                conpassInput.style.border = "2px solid #ccc";
            } else {
                conpassInput.style.border = "2px solid red";
            }
        });
    }

    openRegisterForm() {
        const registerDiv: HTMLDivElement = document.querySelector(".register-div")
        registerDiv.hidden = false
        const loginDiv: HTMLDivElement = document.querySelector(".login-div")
        loginDiv.hidden = true
        this.registrationSubject.next(false);
    }


}