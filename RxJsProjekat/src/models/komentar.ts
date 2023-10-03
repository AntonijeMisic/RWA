import { Korisnik } from "./korisnik";

export interface Komentar
{
    id: number,
    user: Korisnik
    tekst: string
    clanakID: number //da bi na osnovu njega dobio komentare za clankove
    //moze dodamo i vreme objavljivanja
}