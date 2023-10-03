import { Komentar } from "./komentar";
import { Korisnik } from "./korisnik";

export interface Clanak{
    id: number,
    title: string,
    content: string,
    autor: Korisnik,
    tip: string
    //moze dodamo i vreme objavljivanja
}