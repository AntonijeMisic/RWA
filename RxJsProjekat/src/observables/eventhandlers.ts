import { Observable, catchError, debounceTime, filter, from, fromEvent, map, switchMap, tap } from "rxjs";
import { getArticleByAutor, getArticleByName, getArticleByType } from "./apiservice";
import { Clanak } from "../models/clanak";

export function handleEmailInput(inputField: HTMLInputElement): Observable<string> {
    return fromEvent(
        inputField, "blur"
    ).pipe(
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        catchError((err) => {
            console.log("Los format maila");
            throw err;
        }),
        tap((email) => {
            if (email.includes('@') && email.trim() !== '') {
                inputField.style.border = '2px solid #ccc';
            } else {
                inputField.style.border = '2px solid red';
            }
        })
    );
}
export function handlePasswordInput(inputField: HTMLInputElement): Observable<string> {
    return fromEvent(
        inputField, "blur"
    ).pipe(
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        //filter((password) => password.length >= 5 && /^[A-Z]/.test(password)), 
        catchError((err) => {
            console.log("Los format passworda");
            throw err;
        }),
        tap((password) => {
            console.log(password)
            if (password.length >= 5 && /^[A-Z]/.test(password)) {
                inputField.style.border = '2px solid #ccc';
            } else {
                inputField.style.border = '2px solid red';
            }
        })
    );
}
export function handleTekstInput(inputField: HTMLInputElement): Observable<string> //za ime prezime
{
    return fromEvent(
        inputField, "blur"
    ).pipe(
        map((ev) => (<HTMLInputElement>ev.target).value),
        filter((tekst) => tekst.trim() !== ''),
        catchError((err) => {
            console.log("Los format");
            throw err;
        })
    );
}
export function handleLoginClick(btn: HTMLButtonElement): Observable<string> {
    return fromEvent(btn, "click").pipe(
        map(() => "Login clicked"),
    );
}
export function handleRegisterClick(btn: HTMLButtonElement): Observable<string> {
    return fromEvent(btn, "click").pipe(
        map(() => "Register clicked"),
    );
}

export function handleAddArticleClick(btn: HTMLButtonElement): Observable<string> {
    return fromEvent(btn, "click").pipe(
        map(() => "Add article clicked"),
    );
}
export function handleArticleInput(inputField: HTMLInputElement | HTMLTextAreaElement): Observable<string> {
    return fromEvent(
        inputField, "blur"
    ).pipe(
        map((ev) => (<HTMLInputElement | HTMLTextAreaElement>ev.target).value),
        filter((tekst) => tekst.trim() !== ''),
        catchError((err) => {
            console.log("Los format");
            throw err;
        }),
        tap((value)=>{
            if(value.trim() === '')
                inputField.classList.add('invalid-input');
            else
                inputField.classList.remove('invalid-input');
        })
    );
}
export function handleTypeSelect(typeSelect: HTMLSelectElement): Observable<string> {
    return fromEvent(typeSelect, "change").pipe(
        map((ev) => (<HTMLSelectElement>ev.target).value),
        catchError((err) => {
            console.log("Los format");
            throw err;
        }),
        tap((value)=>{
            if(value.trim() === '')
                typeSelect.classList.add('invalid-input');
            else
                typeSelect.classList.remove('invalid-input');
        })
    )
}
export function handleEmailRegisterInput(inputField: HTMLInputElement): Observable<string> {
    return fromEvent(
        inputField, "blur"
    ).pipe(
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        catchError((err) => {
            console.log("Los format maila");
            throw err;
        }),
        tap((email) => {
            console.log(email);
            if (email.includes('@') && email.trim() !== '') {
                inputField.style.border = '2px solid #ccc';
            } else {
                inputField.style.border = '2px solid red';
            }
        })
    );
}
export function handlePasswordRegisterInput(inputField: HTMLInputElement): Observable<string> {
    return fromEvent(
        inputField, "blur"
    ).pipe(
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        catchError((err) => {
            console.log("Los format passworda");
            throw err;
        }),
        tap((password) => {
            console.log(password)
            if (password.length >= 5 && /^[A-Z]/.test(password)) {
                inputField.classList.remove('invalid-input');
            } else {
                inputField.classList.add('invalid-input');
            }
        })
    );
}
export function handleConPasswordRegisterInput(inputField: HTMLInputElement): Observable<string> {
    return fromEvent(
        inputField, "blur"
    ).pipe(
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        //filter((password) => password.length >= 5 && /^[A-Z]/.test(password)), 
        catchError((err) => {
            console.log("Los format passworda");
            throw err;
        }),
        tap((password) => {
            console.log(password)
            if (password.length >= 5 && /^[A-Z]/.test(password)) {
                inputField.classList.remove('invalid-input');
            } else {
                inputField.classList.add('invalid-input');
            }
        })
    );
}
export function handleEnterCommentButton(btn: HTMLButtonElement) {
    return fromEvent(btn, "click").pipe(
        map(() => "Add article clicked")
    )
}
export function handleButton(btn: HTMLButtonElement) {
    return fromEvent(btn, "click").pipe(
        map(() => "clicked")
    )
}
export function handleSearchInput(inputField: HTMLInputElement): Observable<Clanak[]>
{
    return fromEvent(
        inputField, "input"
    ).pipe(
        debounceTime(500),
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        tap((value)=> console.log(value)),
        filter((title: string) => title.length >= 3),
        switchMap((title:string)=>getArticleByName(title))
    )
}

export function handleAuthorInput(inputField: HTMLInputElement): Observable<Clanak[]> {
    return fromEvent(inputField, "input").pipe(
        debounceTime(500),
        map((ev: Event) => (<HTMLInputElement>ev.target).value),
        filter((author: string) => author.length >= 3),
        switchMap((author: string) => getArticleByAutor(author))
    );
}
export function handleTypeInput(typeSelect: HTMLSelectElement): Observable<Clanak[]> {
    return fromEvent(typeSelect, "change").pipe(
        map((ev) => (<HTMLSelectElement>ev.target).value),
        switchMap((type: string) => getArticleByType(type)),
        catchError((err) => {
            console.log("Los format");
            throw err;
        })
    )
}