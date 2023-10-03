import { ClanakView } from "../components/clanak/clanakView";
import { LoginView } from "../components/login/loginView";
import { RegisterView } from "../components/register/registerView";
import { Korisnik } from "../models/korisnik";
import { ViewLogic } from "./viewLogic";

export class View{

    private viewLogic: ViewLogic
    private registerView: RegisterView
    private loginView: LoginView
    private clanakView: ClanakView
    constructor()
    {
        this.viewLogic = new ViewLogic()
        this.registerView = new RegisterView()
        this.loginView = new LoginView()
        this.clanakView = new ClanakView()
    }

    drawSite(host: HTMLElement) {
        const container = document.createElement("div");
        container.classList.add("main-container");
        const headerDiv = document.createElement("div")
        headerDiv.classList.add("headerDiv")
        this.drawHeader(headerDiv)
        container.appendChild(headerDiv)
    
        const divIzmedjuDivova = document.createElement("div")
        divIzmedjuDivova.classList.add("div-login-register")
        container.appendChild(divIzmedjuDivova)
    
        const mainDiv = document.createElement("div")
        mainDiv.classList.add("main-div")
        container.appendChild(mainDiv)
    
        const leviDiv= document.createElement("div")
        leviDiv.classList.add("levi-div")
    
        this.drawFilter(leviDiv)
       
        mainDiv.appendChild(leviDiv)
        
    
        const desniDiv = document.createElement("div")
        desniDiv.classList.add("desni-div")
        mainDiv.appendChild(desniDiv)
    
        const loginDiv = document.createElement("div")
        loginDiv.classList.add("login-div")
        this.loginView.drawLogin(loginDiv)
        loginDiv.hidden = true
        divIzmedjuDivova.appendChild(loginDiv)
    
        //isto ovako i za registraciju
        const registerDiv = document.createElement("div")
        registerDiv.classList.add("register-div")
        this.registerView.drawRegister(registerDiv)
        registerDiv.hidden = true
        divIzmedjuDivova.appendChild(registerDiv)
    
        const inputDiv = document.createElement("div")
        inputDiv.classList.add("input-article-div")
        //inputDiv.style.display = "none"
        inputDiv.hidden = true 
    
        //dugme za otvaranje forme za dodavanje clanka
        const btnOpenDiv = document.createElement("div")
        btnOpenDiv.classList.add("btnOpenDiv")
        const btnOpenForm = document.createElement("button")
        btnOpenForm.classList.add("btnOpenForm") ///////////////////////////// mora to u viewLogic da odradim
        btnOpenForm.textContent = "Dodaj novi clanak"
        btnOpenDiv.appendChild(btnOpenForm)
        inputDiv.appendChild(btnOpenDiv)
        
        //div za dodavanje novog clanka sa sve preview
        const addArticleContainer = document.createElement("div")
        addArticleContainer.classList.add("add-article-container")
        const addArticleDiv = document.createElement("div")
        addArticleDiv.classList.add("add-article-div")
        this.clanakView.drawAddArticleForm(addArticleDiv)
        addArticleContainer.appendChild(addArticleDiv)
        addArticleContainer.hidden= true
        inputDiv.appendChild(addArticleContainer)
        desniDiv.appendChild(inputDiv)
    
    
        //ovde treba da dodam div za prikazivanje vise informacije o clankovima 
        const clanakContainer = document.createElement("div")
        clanakContainer.classList.add("clanak-container")
        clanakContainer.hidden=true
        const clanakDiv = document.createElement("div")
        clanakDiv.classList.add("clanak-div")
        this.clanakView.drawClanak(clanakDiv)
        clanakContainer.appendChild(clanakDiv)
        desniDiv.appendChild(clanakContainer)
    
        //ovo su svi clankovi
        const clankoviDiv = document.createElement("div")
        clankoviDiv.classList.add("clankovi-div")
    
        desniDiv.appendChild(clankoviDiv)
    
        host.appendChild(container)
    
        //prikaz ukoliko imamo ulogovanog korisnika
        if(ViewLogic.getCurrentUser()!=null)
        {
            inputDiv.hidden = false
        }
        else
        {
            inputDiv.hidden=true
        }
    }

    private drawHeader(header: HTMLDivElement) {

        const meniButtonDiv = document.createElement("div")
        meniButtonDiv.classList.add("meni-btn-div")
        const btnOpenMeni: HTMLButtonElement = document.createElement("button")
        btnOpenMeni.classList.add("btnOpenMeni")
        btnOpenMeni.textContent = "Meni"

        btnOpenMeni.onclick = ()=>{
            //otvara div sa leve strane sa filterima
            this.prikaziSidebar()
        }
    
        meniButtonDiv.appendChild(btnOpenMeni)
    
    
        const prijavaDiv = document.createElement("div")
        prijavaDiv.classList.add("prijava-button")
        prijavaDiv.hidden = true
    
        const btnPrijava: HTMLButtonElement = document.createElement("button")
        btnPrijava.classList.add("btnLogIn")
        btnPrijava.textContent = "Prijavi se"
        let isLoginDivVisible = false
        btnPrijava.onclick = () => {
            const loginDiv: HTMLDivElement = document.querySelector(".login-div")
            isLoginDivVisible = !isLoginDivVisible // Invertujemo stanje
            loginDiv.hidden = !isLoginDivVisible
            const registerDiv: HTMLDivElement = document.querySelector(".register-div");
            if(loginDiv.hidden && registerDiv.hidden==false)
                registerDiv.hidden=true
            else
                loginDiv.hidden= !isLoginDivVisible
        }
        prijavaDiv.appendChild(btnPrijava)
    
        const headerProfileDiv = document.createElement("div") 
        headerProfileDiv.classList.add("header-profile-div")
        headerProfileDiv.hidden = true
    
        const profileDiv = document.createElement("div") 
        profileDiv.classList.add("profile-div")
        
        const podaciDiv = document.createElement("div")
        podaciDiv.classList.add("podaci-div")
        const ime = document.createElement("label")
        ime.classList.add("ime-label")
        const prezime = document.createElement("label")
        prezime.classList.add("prezime-label")
    
        podaciDiv.appendChild(ime)
        podaciDiv.appendChild(prezime)
    
        const logoutDiv = document.createElement("div")
        logoutDiv.classList.add("logout-div")
        const btnLogout = document.createElement("button")
        btnLogout.classList.add("btnLogout")
        btnLogout.textContent = "Odjavi se"
        
        logoutDiv.appendChild(btnLogout)
    
        profileDiv.appendChild(podaciDiv)
        profileDiv.appendChild(logoutDiv)
    
        headerProfileDiv.appendChild(profileDiv)
    
        header.appendChild(meniButtonDiv)
        header.appendChild(prijavaDiv)
        header.appendChild(headerProfileDiv)


        if(ViewLogic.getCurrentUser()!=null)
        {
            headerProfileDiv.hidden = false
            ime.textContent = ViewLogic.getCurrentUser().ime
            prezime.textContent = ViewLogic.getCurrentUser().prezime
        }
        else
        {
            prijavaDiv.hidden=false
        }
        
    }
    
    private prikaziSidebar() {
        const sidebar = document.querySelector(".levi-div");
        sidebar.classList.toggle("active");
    }
    private drawFilter(leviDiv: HTMLDivElement)
    {
        const filterDiv = document.createElement("div")
        filterDiv.classList.add("filter-div")
    
        const searchDiv = document.createElement("div")
        searchDiv.classList.add("search-div")
        const searchInput = document.createElement("input")
        searchInput.classList.add("search-input")
        searchInput.placeholder = "Pretrazi clankove:"
        searchDiv.appendChild(searchInput)
    
        const filtrirajDiv =document.createElement("div")
        filtrirajDiv.classList.add("filtriraj-div")
        const autorInput = document.createElement("input")
        autorInput.classList.add("autor-input")
        autorInput.placeholder = "Pretrazi autora:"
        const typeLabel = document.createElement("label")
        typeLabel.classList.add("type-label-filter")
        typeLabel.textContent = "Type: "
        const typeSelect = document.createElement("select")
        typeSelect.classList.add("type-filter")
        this.viewLogic.popuniSelect(typeSelect)
        const btnResetuj = document.createElement("button")
        btnResetuj.classList.add("button-resetuj-filter")
        btnResetuj.textContent = "Resetuj parametre"
    
    
        filtrirajDiv.appendChild(autorInput)
        filtrirajDiv.appendChild(typeLabel)
        filtrirajDiv.appendChild(typeSelect)
        filtrirajDiv.appendChild(btnResetuj)
    
    
        filterDiv.appendChild(searchDiv)
        filterDiv.appendChild(filtrirajDiv)
    
        leviDiv.appendChild(filterDiv)
    }
}