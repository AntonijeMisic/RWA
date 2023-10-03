import { BehaviorSubject, Subject, Subscription, combineLatest, combineLatestAll, merge, takeUntil, zip } from "rxjs"
import { getArticleById, getArticles, getTypes, insertArticle } from "../observables/apiservice"
import { Korisnik } from "../models/korisnik"
import { handleAddArticleClick, handleArticleInput, handleTypeSelect } from "../observables/eventhandlers"
import { Clanak } from "../models/clanak"

export class ViewLogic{

    constructor(){}

    public popuniSelect(typeSelect: HTMLSelectElement) {

        const subscription: Subscription = getTypes()
            .subscribe(
                (tipovi) => {
                    tipovi.forEach((tip) => {
                        const option = document.createElement("option")
                        option.value = tip
                        option.textContent = tip
                        typeSelect.appendChild(option)
                    })
                })
    
    
        setTimeout(()=>{
            subscription.unsubscribe()
        }, 3000) //zatvaram tok podataka nakon sto prodje neko vreme 
    }

    public static getCurrentUser(): Korisnik
    {
        const storedUserJSON = localStorage.getItem('user');
        if(storedUserJSON)
        {
            const storedUser: Korisnik = JSON.parse(storedUserJSON);
            return storedUser
        } 

        return null
    }
}







