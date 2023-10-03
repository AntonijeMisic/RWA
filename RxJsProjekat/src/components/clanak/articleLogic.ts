import { BehaviorSubject, Observable, Subject, zip } from "rxjs";
import { Clanak } from "../../models/clanak";
import { Komentar } from "../../models/komentar";
import { getArticleById, getArticles, getArticlesComments } from "../../observables/apiservice";
import { Korisnik } from "../../models/korisnik";
import { InsertArticleLogic } from "./insertArticleLogic";
import { DisplayArticleLogic } from "./displayArticleLogic";
import { EditArticleLogic } from "./editArticleLogic";
import { handleButton } from "../../observables/eventhandlers";

export class ClanakLogic
{
    public displayArticleLogic:DisplayArticleLogic
    public insertArticleLogic: InsertArticleLogic
    public editArticleLogic:EditArticleLogic
    private $addArticleButton: Observable<string>

    constructor(
        clankoviDiv: HTMLDivElement, 
        addArticleBtn: HTMLButtonElement,
        searchInput: HTMLInputElement,
        autorInput: HTMLInputElement,
        typeSelect: HTMLSelectElement,
        btnResetuj: HTMLButtonElement
        )
    {
        //inicijalizujemo ove logike
        this.displayArticleLogic=new DisplayArticleLogic()
        this.insertArticleLogic =new InsertArticleLogic()
        this.editArticleLogic = new EditArticleLogic()

        this.displayArticleLogic.displayArticles(clankoviDiv)
        this.$addArticleButton = handleButton(addArticleBtn)
        this.handleDodavanjeClanka()
        this.displayArticleLogic.filterArticles(searchInput, autorInput, typeSelect, btnResetuj)
    }

    handleDodavanjeClanka()
    {
        const addArticleContainer: HTMLDivElement = document.querySelector(".add-article-container")
        this.$addArticleButton.subscribe(()=>{

            addArticleContainer.hidden=false
            this.insertArticleLogic.displayPreview()
        })
    }
}