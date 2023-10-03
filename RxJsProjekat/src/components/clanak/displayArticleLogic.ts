import { Observable, Subject, distinct, filter, merge, take, takeUntil, zip } from "rxjs"
import { Clanak } from "../../models/clanak"
import { Korisnik } from "../../models/korisnik"
import { deleteArticlebyId, getArticleById, getArticles, getArticlesComments } from "../../observables/apiservice"
import { handleAuthorInput, handleButton, handleEnterCommentButton, handleSearchInput, handleTypeInput } from "../../observables/eventhandlers"
import { EditArticleLogic } from "./editArticleLogic"
import { KomentarLogic } from "./komentarLogic"
import { ClanakView } from "./clanakView"
import { ViewLogic } from "../../view/viewLogic"

export class DisplayArticleLogic
{
    private clankoviDiv: HTMLDivElement
    public editArticleLogic: EditArticleLogic
    public komentariLogic: KomentarLogic

    private exitSubject = new Subject<boolean>()
    private $articleClickTrigger = this.exitSubject.asObservable()

    private filterSubject = new Subject<boolean>()

    constructor(){
        this.komentariLogic = new KomentarLogic()
    }
    
    displayArticles(container: HTMLElement) {
        container.innerHTML = ''
        getArticles().subscribe((artikli) => {
            artikli.forEach((clanak) => {
               ClanakView.drawArticle(container, clanak)
            })
        })
    }
    
    setClanak(clanak: Clanak) {
        const clanakDiv: HTMLDivElement = document.querySelector(".clanak-container")
    
        clanakDiv.hidden = false
        const titleDiv: HTMLDivElement = document.querySelector(".title-clanak")
        const autorDiv: HTMLDivElement = document.querySelector(".autor-clanak")
        const tipDiv: HTMLDivElement = document.querySelector(".tip-clanak")
        const contentDiv: HTMLDivElement = document.querySelector(".content-clanak")
        const dugmiciDiv: HTMLDivElement = document.querySelector(".dugmici-clanak")
    
        titleDiv.textContent = clanak.title
        autorDiv.textContent = clanak.autor.ime + " " + clanak.autor.prezime
        tipDiv.textContent = clanak.tip
        contentDiv.textContent = clanak.content
    

        //prebaci u funkciju i dobij prihavljenog korisnika
        const user = ViewLogic.getCurrentUser()
        if (user) {
            if (clanak.autor.id == user.id) {
                dugmiciDiv.hidden = false
            }
        }
    }
    
    articleClick(articleDiv: HTMLDivElement) {


        this.exitSubject.next(true)

        const dugmiciDiv: HTMLDivElement = document.querySelector(".dugmici-clanak")
        dugmiciDiv.hidden = true
        const id = articleDiv.getAttribute("data-id")
        const $article = getArticleById(id)
        this.komentariLogic.$comments = getArticlesComments(id)
        
    
        zip($article, this.komentariLogic.$comments)
        .pipe(
            takeUntil(this.$articleClickTrigger.pipe(filter(isClicked => !isClicked))) // Zatvaranje tokova nakon klika
        )
        .subscribe(([article, comments]) => {
    
            this.setClanak(article)
            const headerDiv: HTMLDivElement = document.querySelector(".headerDiv")
            this.scrollToElement(headerDiv)
            
            this.komentariLogic.setCommentsSubject(comments)
        })


        const btnObjaviKomentar: HTMLButtonElement = document.querySelector(".komentar-button")
        const tekstInput: HTMLInputElement = document.querySelector(".komentar-input")
       
        btnObjaviKomentar.onclick = () =>{
            this.komentariLogic.dodajKomentar(tekstInput, parseInt(id))
        }
    
        const btnIzbrisi: HTMLButtonElement = document.querySelector(".button-izbrisi")
        btnIzbrisi.onclick = () => {
            deleteArticlebyId(id)
                .then(message => {
                    console.log(message);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        const btnIzmeni: HTMLButtonElement = document.querySelector(".button-izmeni")
        let izmeniLogic: EditArticleLogic = new EditArticleLogic()
        btnIzmeni.onclick = () => {
            //iz edit ja mora zovem ovo kao neku funkciju
            const addArticleContainer: HTMLDivElement = document.querySelector(".add-article-container")
            addArticleContainer.hidden = false
            $article.subscribe((clanak) => {
                izmeniLogic.displayEditPreview(clanak)
            })
        }

        const btnIzadji: HTMLButtonElement = document.querySelector(".izadji-button")
        btnIzadji.onclick=()=>{
            const clanakDiv: HTMLDivElement = document.querySelector(".clanak-container")
            tekstInput.value = ""
            clanakDiv.hidden = true
            tekstInput.classList.remove('invalid-input')
            this.exitSubject.next(false)
        }

    }

    scrollToElement(element: HTMLDivElement) {
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    filterArticles(searchInput: HTMLInputElement, authorInput: HTMLInputElement, typeInput: HTMLSelectElement, btnResetuj: HTMLButtonElement) {

        const leviDiv = document.querySelector(".levi-div")

        const isLeviDivAktivan = leviDiv.classList.contains("active");
        if(!isLeviDivAktivan)
            this.filterSubject.next(false)
        

        const $searchResults: Observable<Clanak[]> = handleSearchInput(searchInput)
        const $authorResults: Observable<Clanak[]> = handleAuthorInput(authorInput)
        const $typeResults: Observable<Clanak[]> = handleTypeInput(typeInput)
        const $btnReset = handleButton(btnResetuj)
    
        $btnReset
        .pipe(
            takeUntil(this.filterSubject.pipe(filter(isActive => !isActive))) 
        )
        .subscribe(() => {
            const clanakContainer: HTMLDivElement = document.querySelector(".clanak-container")
            const addArticleContainer: HTMLDivElement = document.querySelector(".add-article-container")
            addArticleContainer.hidden = true
            clanakContainer.hidden = true
            searchInput.value = ""
            authorInput.value = ""
            typeInput.selectedIndex = 0
            this.displayArticles(this.clankoviDiv)
        })
    
        merge(
            $searchResults,
            $authorResults,
            $typeResults
        ).pipe(
            takeUntil(this.filterSubject.pipe(filter(isActive => !isActive))),
            distinct()
        ).subscribe((clankovi: Clanak[]) => {
            this.clankoviDiv = document.querySelector(".clankovi-div")
            const clanakContainer: HTMLDivElement = document.querySelector(".clanak-container")
            const addArticleContainer: HTMLDivElement = document.querySelector(".add-article-container")
            this.clankoviDiv.innerHTML = ""
            clanakContainer.hidden = true
            addArticleContainer.hidden = true
            this.displayFilteredArticles(clankovi)
    
        })

        if(isLeviDivAktivan)
        {
            this.filterSubject.next(true);
        }
            
    
    }
    displayFilteredArticles(clankovi: Clanak[]) {
        clankovi.forEach((clanak) => {
            ClanakView.drawArticle(this.clankoviDiv, clanak)
        })
    }
}
