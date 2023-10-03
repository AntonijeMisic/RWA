import { Clanak } from "../../models/clanak"
import { Komentar } from "../../models/komentar"
import { Korisnik } from "../../models/korisnik"
import { getArticles } from "../../observables/apiservice"
import { handleEnterCommentButton } from "../../observables/eventhandlers"
import { ViewLogic } from "../../view/viewLogic"
import { DisplayArticleLogic } from "./displayArticleLogic"
import { KomentarLogic } from "./komentarLogic"


export class ClanakView {
    private viewLogic: ViewLogic
    static dispLog: DisplayArticleLogic

    constructor() {

        ClanakView.dispLog = new DisplayArticleLogic()
        this.viewLogic = new ViewLogic()
    }

    static drawArticle(container: HTMLElement, clanak: Clanak) { //mora da bude static da ne bi instancirao ClanakView jer mi treba samo ova metoda svakako

        const articleDiv = document.createElement("div")
        articleDiv.classList.add("article-div")
        articleDiv.setAttribute("data-id", clanak.id.toString())

        articleDiv.onclick = () =>
            this.dispLog.articleClick(articleDiv)

        const titleDiv = document.createElement("div")
        titleDiv.classList.add("title-article-div")
        titleDiv.textContent = clanak.title
        const autorDiv = document.createElement("div")
        autorDiv.classList.add("autor-div")
        autorDiv.textContent = clanak.autor.ime + " " + clanak.autor.prezime
        const tipDiv = document.createElement("div")
        tipDiv.classList.add("tip-div")
        tipDiv.textContent = clanak.tip

        articleDiv.appendChild(titleDiv)
        articleDiv.appendChild(autorDiv)
        articleDiv.appendChild(tipDiv)


        container.appendChild(articleDiv)
    }
    drawClanak(container: HTMLElement) //za veci prikaz sa komentarima 
    {
        const clanakInfoContainer = document.createElement("div")
        clanakInfoContainer.classList.add("clanak-info-container")
        const clanakKomentariContainer = document.createElement("div") //kontejner sa desne strane sa svim komentarima i formom za dodavanje komentara
        clanakKomentariContainer.classList.add("clanak-komentari-container")

        const clanakInfoDiv = document.createElement("div")
        clanakInfoDiv.classList.add("clanak-info-div")
        const clanakKomentariDiv = document.createElement("div")
        clanakKomentariDiv.classList.add("clanak-komentari-div")

        const titleDiv = document.createElement("div")
        titleDiv.classList.add("title-clanak")
        const autorDiv = document.createElement("div")
        autorDiv.classList.add("autor-clanak")
        const tipDiv = document.createElement("div")
        tipDiv.classList.add("tip-clanak")
        const contentDiv = document.createElement("div")
        contentDiv.classList.add("content-clanak")

        const dugmiciDiv = document.createElement("div")
        dugmiciDiv.classList.add("dugmici-clanak")
        dugmiciDiv.hidden = true
        const btnIzmeni = document.createElement("button")
        btnIzmeni.classList.add("button-izmeni")
        btnIzmeni.textContent = "Izmeni"
        const btnIzbrisi = document.createElement("button")
        btnIzbrisi.classList.add("button-izbrisi")
        btnIzbrisi.textContent = "Izbrisi"

        dugmiciDiv.appendChild(btnIzmeni)
        dugmiciDiv.appendChild(btnIzbrisi)


        clanakInfoDiv.appendChild(titleDiv)
        clanakInfoDiv.appendChild(autorDiv)
        clanakInfoDiv.appendChild(tipDiv)
        clanakInfoDiv.appendChild(contentDiv)
        clanakInfoDiv.appendChild(dugmiciDiv)




        const komentarInputDiv = document.createElement("div")
        komentarInputDiv.classList.add("konobar-input-div")
        const tekstInput: HTMLTextAreaElement = document.createElement("textarea")
        tekstInput.classList.add("komentar-input")
        tekstInput.placeholder = "Dodaj komentar"
        const btnObjavi = document.createElement("button")
        btnObjavi.classList.add("komentar-button")
        btnObjavi.textContent = "Objavi"
        const btnOIzadji = document.createElement("button")
        btnOIzadji.classList.add("izadji-button")
        btnOIzadji.textContent = "Izadji"

        clanakKomentariContainer.appendChild(clanakKomentariDiv)
        komentarInputDiv.appendChild(tekstInput)
        komentarInputDiv.appendChild(btnObjavi)
        komentarInputDiv.appendChild(btnOIzadji)

        clanakKomentariContainer.appendChild(komentarInputDiv)

        clanakInfoContainer.appendChild(clanakInfoDiv)

        container.appendChild(clanakInfoContainer)
        container.appendChild(clanakKomentariContainer)
    }
    static drawKomentar(container: HTMLDivElement, komentari: Komentar[]) {

        container.innerHTML = ""
        let duzina = 0
        let korisnikDiv
        let komentarTekst
        if (komentari.length > 0) {
            duzina = komentari.length
            komentari.forEach((komentar) => {
                const clanakKomentar = document.createElement("div")
                clanakKomentar.classList.add("komentar")
                korisnikDiv = document.createElement("div")
                korisnikDiv.classList.add("komentar-user")
                komentarTekst = document.createElement("div")
                komentarTekst.classList.add("komentar-tekst")
                korisnikDiv.textContent = komentar.user.ime + " " + komentar.user.prezime

                const storedUserJSON = localStorage.getItem('user');
                if (storedUserJSON) {
                    const storedUser: Korisnik = JSON.parse(storedUserJSON);
                    if (storedUser.id == komentar.user.id)
                        korisnikDiv.style.color = "yellow"

                }

                komentarTekst.textContent = komentar.tekst
                clanakKomentar.appendChild(korisnikDiv)
                clanakKomentar.appendChild(komentarTekst)

                container.appendChild(clanakKomentar)
            })
        }
    }

    drawAddArticleForm(container: HTMLElement) {

        const formaDiv = document.createElement("div")
        formaDiv.classList.add("add-form")
        const forma = document.createElement("div")
        forma.classList.add("add-dialog-form")
        const titleDiv = document.createElement("div")
        titleDiv.classList.add("title-form-div")
        const titleLabel = document.createElement("label")
        titleLabel.classList.add("title-label")
        titleLabel.textContent = "Title: "
        const titleAdd = document.createElement("input")
        titleAdd.classList.add("inputTitle")
        const contentDiv = document.createElement("div")
        contentDiv.classList.add("content-form-div")
        const contentLabel = document.createElement("label")
        contentLabel.classList.add("content-label")
        contentLabel.textContent = "Content: "
        const contentAdd = document.createElement("textarea")
        contentAdd.classList.add("inputContent")
        const typeDiv = document.createElement("div")
        typeDiv.classList.add("type-form-div")
        const typeLabel = document.createElement("label")
        typeLabel.classList.add("type-label")
        typeLabel.textContent = "Type: "
        const typeSelect = document.createElement("select")
        typeSelect.classList.add("type-select")
        //za taj select ja treba da dodam opcije na osnovu tipova koji se nalaze u db.json, znaci mogu da mu prenesem ceo niz stringova i posle da zatvorim tok
        this.viewLogic.popuniSelect(typeSelect)

        const dugmiciDiv = document.createElement("div")
        dugmiciDiv.classList.add("dugmici-form-div")
        const btnDodaj = document.createElement("button")
        btnDodaj.classList.add("button-add")
        btnDodaj.textContent = "Dodaj novi clanak"
        const btnIzmeni = document.createElement("button")
        btnIzmeni.classList.add("button-edit")
        btnIzmeni.textContent = "Izmeni clanak"
        btnIzmeni.hidden = true
        const btnOtkazi = document.createElement("button")
        btnOtkazi.classList.add("button-cancel")
        btnOtkazi.textContent = "Otkazi"

        const btnOpenForm: HTMLButtonElement = document.querySelector(".btnOpenForm")
        /*btnOtkazi.onclick = () => {
            cancelPreview()
            const addArticleContainer: HTMLDivElement = document.querySelector(".add-article-container")
            addArticleContainer.hidden = true
        }*/
        //btnDodaj.onclick = () => dodajClanak(titleAdd, contentAdd, typeSelect)

        const articleInnputDiv = document.createElement("div")
        articleInnputDiv.classList.add("article-input-div")

        this.drawPreviewDiv(articleInnputDiv)

        dugmiciDiv.appendChild(btnDodaj)
        dugmiciDiv.appendChild(btnIzmeni)
        dugmiciDiv.appendChild(btnOtkazi)

        titleDiv.appendChild(titleLabel)
        titleDiv.appendChild(titleAdd)
        contentDiv.appendChild(contentLabel)
        contentDiv.appendChild(contentAdd)
        typeDiv.appendChild(typeLabel)
        typeDiv.appendChild(typeSelect)

        forma.appendChild(titleDiv)
        forma.appendChild(contentDiv)
        forma.appendChild(typeDiv)
        forma.appendChild(dugmiciDiv)

        formaDiv.appendChild(forma)
        container.appendChild(formaDiv)
        container.appendChild(articleInnputDiv)
    }

    drawPreviewDiv(container: HTMLElement) {
        const titleDiv = document.createElement("div")
        titleDiv.classList.add("title-input-div") //osluskujem promene na inputu za title i tako menjam njegov textContent
        const autorDiv = document.createElement("div")
        autorDiv.classList.add("autor-input-div") //uzimam autora iz localstorage i stavljam ime i prezime u textcontent
        const tipDiv = document.createElement("div")
        tipDiv.classList.add("tip-div") //osluskujem promene na selektu za tip i tako menjam njegov textContent"
        const contentDiv = document.createElement("div")
        contentDiv.classList.add("content-input-div") //osluskujem promene na inputu za content i tako menjam njegov textContent

        container.appendChild(titleDiv)
        container.appendChild(autorDiv)
        container.appendChild(tipDiv)
        container.appendChild(contentDiv)
    }
}




