import { Observable, withLatestFrom, map, take, Subject, filter, takeUntil } from "rxjs"
import { Korisnik } from "../../models/korisnik"
import { getUsers } from "../../observables/apiservice"
import { handleEmailInput, handlePasswordInput, handleLoginClick } from "../../observables/eventhandlers"

export class UserLogic {

    private $users: Observable<Korisnik[]> = getUsers()
    private listaKorisnika: Korisnik[]
    private $emailInput: Observable<string>
    private $passwordInput: Observable<string>
    private $btnLogIn: Observable<string>
    private currentKorisnik: Korisnik

    private emailInput: HTMLInputElement;
    private passInput: HTMLInputElement;
    
    //za otvaranje i zatvaranje toka nakon logovanja
    private userLoggedInSubject = new Subject<boolean>();
    private $userLoggedIn = this.userLoggedInSubject.asObservable();

    constructor(
        emailInput: HTMLInputElement,
        passInput: HTMLInputElement,
        loginBtn: HTMLButtonElement,
        ) 
        {
        this.$emailInput = handleEmailInput(emailInput);
        this.$passwordInput = handlePasswordInput(passInput);
        this.$users.subscribe((korisnici) => this.listaKorisnika = korisnici)
        this.$btnLogIn = handleLoginClick(loginBtn)
        
        this.emailInput = emailInput
        this.passInput=passInput

        this.handleUserLogin(this.emailInput, this.passInput)
        const btnLogout: HTMLButtonElement= document.querySelector(".btnLogout")
        btnLogout.onclick = () =>{
            this.logoutUser()
        }
    }

    loginUser(email: string, password: string) {
        let k = this.listaKorisnika.find(k => k.email == email && k.password == password)
        if (k !== undefined)
        {
            console.log(k)
            this.currentKorisnik = k
            const userJSON = JSON.stringify(this.currentKorisnik);


            // Čuvanje korisničkih podataka u localStorage
            localStorage.setItem('user', userJSON)            
            this.displayAfterLogin()
            this.userLoggedInSubject.next(true)
        }
        else
            console.log("Neuspesna prijava")
    }

    handleUserLogin(emailInput: HTMLInputElement, passInput: HTMLInputElement) {
        this.$btnLogIn.pipe(
            withLatestFrom(this.$emailInput, this.$passwordInput),
            map(([, email, password]) => ({ email, password })),
            takeUntil(this.$userLoggedIn.pipe(filter(isLoggedIn => isLoggedIn)))
          ).subscribe((user) => {
            this.loginUser(user.email, user.password)
            emailInput.value=""
            passInput.value=""
        });
    }
    logoutUser() {
        localStorage.removeItem("user")
        const headerProfileDiv: HTMLDivElement = document.querySelector(".header-profile-div")
        const inputDiv: HTMLDivElement = document.querySelector(".input-article-div")
        const prijavaDiv: HTMLDivElement = document.querySelector(".prijava-button")
        const clanakDiv: HTMLDivElement = document.querySelector(".clanak-container")
        prijavaDiv.hidden = false
        inputDiv.hidden = true
        headerProfileDiv.hidden = true
        if(clanakDiv.hidden==false)
        {
            clanakDiv.hidden=true
        }
    

        this.userLoggedInSubject.next(false)
        this.handleUserLogin(this.emailInput, this.passInput)
    }

    displayAfterLogin() {
        const storedUserJSON = localStorage.getItem('user');
    
        if (storedUserJSON) {
            const storedUser: Korisnik = JSON.parse(storedUserJSON);
            const headerProfileDiv: HTMLDivElement = document.querySelector(".header-profile-div")
            const inputDiv: HTMLDivElement = document.querySelector(".input-article-div")
            const prijavaDiv: HTMLDivElement = document.querySelector(".prijava-button")
            const loginDiv: HTMLDivElement = document.querySelector(".login-div")
            loginDiv.hidden = true
            prijavaDiv.hidden = true
            inputDiv.hidden = false
            headerProfileDiv.hidden = false
    
            const ime = document.querySelector(".ime-label")
            const prezime = document.querySelector(".prezime-label")
    
            ime.textContent = storedUser.ime
            prezime.textContent = storedUser.prezime
        }
    }
}