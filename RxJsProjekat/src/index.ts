import { ClanakLogic } from "./components/clanak/articleLogic";
import { UserLogic } from "./components/login/loginLogic";
import { RegisterLogic } from "./components/register/registerLogic";
import { View } from "./view/view";
import { ViewLogic } from "./view/viewLogic";


const view = new View()

view.drawSite(document.body)

const emailInput: HTMLInputElement = document.querySelector(".email-input")
const passwordInput: HTMLInputElement = document.querySelector(".password-input")
const buttonLogin: HTMLButtonElement  = document.querySelector(".btnPrijava")

const imeInput: HTMLInputElement = document.querySelector(".ime-input")
const prezimeINput: HTMLInputElement = document.querySelector(".prezime-input")
const emailRegisterInput: HTMLInputElement = document.querySelector(".email-register-input")
const passwordRegisterInput: HTMLInputElement = document.querySelector(".password-register-input")
const confirmPassInput: HTMLInputElement = document.querySelector(".confirm-password-input")
const buttonRegister: HTMLButtonElement  = document.querySelector(".btnRegister")

const loginLogic = new UserLogic(emailInput, passwordInput, buttonLogin)
const registerLogic = new RegisterLogic(imeInput, prezimeINput, emailRegisterInput, passwordRegisterInput, confirmPassInput, buttonRegister)

const clankoviDiv: HTMLDivElement = document.querySelector(".clankovi-div")
const btnOpenDodajClanak: HTMLButtonElement = document.querySelector(".btnOpenForm")
const searchInput: HTMLInputElement = document.querySelector(".search-input")
const autorInput: HTMLInputElement = document.querySelector(".autor-input")
const tipSelect: HTMLSelectElement = document.querySelector(".type-filter")
const btnResetuj: HTMLButtonElement = document.querySelector(".button-resetuj-filter")
const clanakLog=new ClanakLogic(clankoviDiv, btnOpenDodajClanak, searchInput, autorInput, tipSelect, btnResetuj)
