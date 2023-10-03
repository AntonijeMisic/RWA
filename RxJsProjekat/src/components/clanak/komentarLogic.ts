import { BehaviorSubject, Observable } from "rxjs";
import { Komentar } from "../../models/komentar";
import { Korisnik } from "../../models/korisnik";
import { getArticlesComments, insertKomentar } from "../../observables/apiservice";
import { handleEnterCommentButton } from "../../observables/eventhandlers";
import { ClanakLogic } from "./articleLogic";
import { ClanakView } from "./clanakView";
import { ViewLogic } from "../../view/viewLogic";

export class KomentarLogic {

    public commentSubject: BehaviorSubject<Komentar[]> = new BehaviorSubject<Komentar[]>([])
    public $comments: Observable<Komentar[]>
    public $commentButton: Observable<string>

    constructor() {
    }
    public setCommentsSubject(comments: Komentar[])
    {
        this.commentSubject.next(comments)
        const komentariDiv: HTMLDivElement = document.querySelector(".clanak-komentari-div") //ovde ubacujemo sve komentare clanka
        this.commentSubject.subscribe((komentari) => {
           ClanakView.drawKomentar(komentariDiv, komentari)
        })
    }


    public dodajKomentar(tekstInput: HTMLInputElement, clanakId: number) {
        const user = ViewLogic.getCurrentUser()
        if (user!=null) {

            const tekst = tekstInput.value;

            if (tekst.trim() === '') {
                tekstInput.classList.add('invalid-input')
                return
            }

            tekstInput.classList.remove('invalid-input')
            let k: Komentar = {
                id: null,
                user: user,
                tekst: tekst,
                clanakID: clanakId
            }

            insertKomentar(k)
        }
        else {
            tekstInput.classList.add('invalid-input')
            return
        }

    }
}