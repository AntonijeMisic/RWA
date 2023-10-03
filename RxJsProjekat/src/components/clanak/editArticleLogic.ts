import { BehaviorSubject, Subject, combineLatest, takeUntil } from "rxjs";
import { Clanak } from "../../models/clanak"
import { Korisnik } from "../../models/korisnik";
import { updateArticle } from "../../observables/apiservice"
import { handleArticleInput, handleTypeSelect } from "../../observables/eventhandlers";

export class EditArticleLogic
{

    private titleInputSubject = new BehaviorSubject<string>('');
    private contentInputSubject = new BehaviorSubject<string>('');
    private typeSelectSubject = new BehaviorSubject<string>('');
    private $cancelPreview = new Subject<void>();

    constructor()
    {
        
    }

    public displayEditPreview(clanak: Clanak) {
        const titleDiv = document.querySelector(".title-input-div")
        const autorDiv = document.querySelector(".autor-input-div")
        const tipDiv = document.querySelector(".tip-div")
        const contentDiv = document.querySelector(".content-input-div")
    
        const titleAdd: HTMLInputElement = document.querySelector(".inputTitle")
        const contentAdd: HTMLTextAreaElement = document.querySelector(".inputContent")
        const typeSelect: HTMLSelectElement = document.querySelector(".type-select")
    
        const btnIzmeni: HTMLButtonElement = document.querySelector(".button-edit")
        const btnAdd: HTMLButtonElement = document.querySelector(".button-add")
        btnIzmeni.style.display = "inline-block"
        btnAdd.style.display = "none"
    
        titleAdd.value = clanak.title
        contentAdd.value = clanak.content
        typeSelect.selectedIndex = 0
    
        this.titleInputSubject.next(clanak.title)
        this.contentInputSubject.next(clanak.content)
        this.typeSelectSubject.next(clanak.tip)
    
        // Pratite promene u input poljima i select polju
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
    
    
            if (btnIzmeni) {
                btnIzmeni.addEventListener('click', () => {
                    this.izmeniClanak(clanak, titleAdd, contentAdd, typeSelect)
                })
            }
            const btnCancel: HTMLButtonElement = document.querySelector(".button-cancel")
            if (btnCancel) {
                btnCancel.addEventListener('click', () => {
                    this.$cancelPreview.next()
                    this.cancelPreview()
                    const addArticleContainer: HTMLDivElement = document.querySelector(".add-article-container")
                    addArticleContainer.hidden = true
                });
            }
        }
    }
    public izmeniClanak(clanak: Clanak, titleAdd: HTMLInputElement, contentAdd: HTMLTextAreaElement, typeSelect: HTMLSelectElement) {

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
    
        titleAdd.classList.remove('invalid-input');
        contentAdd.classList.remove('invalid-input');
        typeSelect.classList.remove('invalid-input');
    
        let artikal: Clanak = {
            id: clanak.id,
            title: title,
            content: content,
            autor: clanak.autor,
            tip: type
        }
    
        //insertArticle(artikal)
        //console.log(artikal)
        updateArticle(artikal)
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