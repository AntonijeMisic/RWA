import { BehaviorSubject, Subject, combineLatest, takeUntil } from "rxjs";
import { Clanak } from "../../models/clanak";
import { Korisnik } from "../../models/korisnik";
import { insertArticle } from "../../observables/apiservice";
import { handleArticleInput, handleTypeSelect } from "../../observables/eventhandlers";

export class InsertArticleLogic {
    private titleInputSubject: BehaviorSubject<string> 
    private contentInputSubject: BehaviorSubject<string> 
    private typeSelectSubject: BehaviorSubject<string>  
    private $cancelPreview: Subject<void> 

    constructor()
    {
        this.titleInputSubject = new BehaviorSubject<string>('');
        this.contentInputSubject = new BehaviorSubject<string>('');
        this.typeSelectSubject = new BehaviorSubject<string>('');
        this.$cancelPreview = new Subject<void>();

    }

    public dodajClanak(titleAdd: HTMLInputElement, contentAdd: HTMLTextAreaElement, typeSelect: HTMLSelectElement) {
        const storedUserJSON = localStorage.getItem('user');
        if (storedUserJSON) {
            const user: Korisnik = JSON.parse(storedUserJSON);

            let title: string
            let content: string
            let type: string

            title = titleAdd.value
            content = contentAdd.value
            type = typeSelect.value

            if (title.trim() === '' || content.trim() === '' || type.trim() === '') {

                if (title.trim() === '') {
                    titleAdd.classList.add('invalid-input');
                }
                if (content.trim() === '') {
                    contentAdd.classList.add('invalid-input');
                }
                if (type.trim() === '') {
                    typeSelect.classList.add('invalid-input');
                }
                return;
            }

            /*titleAdd.classList.remove('invalid-input');
            contentAdd.classList.remove('invalid-input');
            typeSelect.classList.remove('invalid-input');*/

            let artikal: Clanak = {
                id: null,
                title: title,
                content: content,
                autor: user,
                tip: type
            }
            insertArticle(artikal)
        }
        else {
            titleAdd.classList.add('invalid-input');
            contentAdd.classList.add('invalid-input');
            typeSelect.classList.add('invalid-input');
            return
        }
    }

    public displayPreview() {
        const titleDiv = document.querySelector(".title-input-div")
        const autorDiv = document.querySelector(".autor-input-div")
        const tipDiv = document.querySelector(".tip-div")
        const contentDiv = document.querySelector(".content-input-div")
    
        const titleAdd: HTMLInputElement = document.querySelector(".inputTitle")
        const contentAdd: HTMLTextAreaElement = document.querySelector(".inputContent")
        const typeSelect: HTMLSelectElement = document.querySelector(".type-select")
        const btnIzmeni: HTMLButtonElement = document.querySelector(".button-edit")
        const btnAdd: HTMLButtonElement = document.querySelector(".button-add")
        btnAdd.style.display = "inline-block"
        btnIzmeni.style.display = "none"
    
        // Pratim promene u input poljima i select polju
        handleArticleInput(titleAdd).subscribe(value => {
            this.titleInputSubject.next(value);
        });
    
        handleArticleInput(contentAdd).subscribe(value => {
            this.contentInputSubject.next(value);
        });
    
        handleTypeSelect(typeSelect).subscribe(value => {
            this.typeSelectSubject.next(value);
        });
    
        const storedUserJSON = localStorage.getItem('user');
        if (storedUserJSON) {
            const user: Korisnik = JSON.parse(storedUserJSON);
            combineLatest([this.titleInputSubject, this.contentInputSubject, this.typeSelectSubject]).pipe(
                takeUntil(this.$cancelPreview)
            ).subscribe({
                next: ([title, content, type]) => {
                    titleDiv.textContent = title
                    tipDiv.textContent = type
                    autorDiv.textContent = user.ime + " " + user.prezime
                    contentDiv.textContent = content
                }
            })
            if (btnAdd) {
                btnAdd.onclick = () => {
                    console.log("Kliknuo sam dodavanje clanka")
                    this.dodajClanak(titleAdd, contentAdd, typeSelect)
                }
            }
            const btnCancel: HTMLButtonElement = document.querySelector(".button-cancel")
            if (btnCancel) {
                btnCancel.onclick = () =>{
                    console.log("Kliknuo sam cancel")
                    this.$cancelPreview.next()
                    this.cancelPreview()
                    const addArticleContainer: HTMLDivElement = document.querySelector(".add-article-container")
                    addArticleContainer.hidden = true
                }
            }
        }
    }

    public cancelPreview() {

        const titleDiv = document.querySelector(".title-input-div")
        const autorDiv = document.querySelector(".autor-input-div")
        const tipDiv = document.querySelector(".tip-div")
        const contentDiv = document.querySelector(".content-input-div")

        const titleAdd: HTMLInputElement = document.querySelector(".inputTitle")
        const contentAdd: HTMLTextAreaElement = document.querySelector(".inputContent")
        const typeSelect: HTMLSelectElement = document.querySelector(".type-select")

        titleAdd.value = ""
        contentAdd.value = ""
        typeSelect.selectedIndex = 0

        this.titleInputSubject.next("")
        this.contentInputSubject.next("")
        this.typeSelectSubject.next("")


        titleDiv.textContent = ""
        tipDiv.textContent = ""
        contentDiv.textContent = ""

        titleAdd.classList.remove('invalid-input');
        contentAdd.classList.remove('invalid-input');
        typeSelect.classList.remove('invalid-input');

    }
}