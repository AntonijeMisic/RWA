import { Observable, catchError, from, last, map, switchMap, take, tap } from "rxjs";
import { Clanak } from "../models/clanak";
import { Korisnik } from "../models/korisnik";
import { Komentar } from "../models/komentar";
import { ClanakView } from "../components/clanak/clanakView";

const BASE_URL = "http://localhost:3000";

export function getTypes(): Observable<string[]>
{
    return from(
        fetch(`${BASE_URL}/types`)
        .then((response)=>{
            if(response.ok)
                return response.json();
            else
                console.log("Types not ok");
        })
        .catch((err)=> console.log(err))
    );
}

export function getArticles(): Observable<Clanak[]>
{
    return from(
        fetch(`${BASE_URL}/articles`)
        .then((response)=>{
            if(response.ok)
                return response.json();
            else
                console.log("Articles not ok");
        })
        .catch((err)=> console.log(err))
    );
}
export function getUsers(): Observable<Korisnik[]>
{
    return from(
        fetch(`${BASE_URL}/korisnici`)
        .then((response)=>{
            if(response.ok)
                return response.json();
            else
                console.log("Articles not ok");
        })
        .catch((err)=> console.log(err))
    );
}
export function insertArticle(clanak: Clanak)
{
    fetch(`${BASE_URL}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clanak)
      })
        .then(response => response.json())
        .then((data: Clanak) => {
            console.log('Dodat je novi članak:', data);
            updateArticleList(data);
          })
        .catch(error => console.error('Greška:', error));
}
export function insertUser(korisnik: Korisnik)
{
    fetch(`${BASE_URL}/korisnici`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(korisnik)
      })
        .then(response => response.json())
        .then(data => console.log('Dodat je novi korisnik:', data))
        .catch(error => console.error('Greška:', error));
}

function updateArticleList(clanak: Clanak) {
    const clankoviDiv: HTMLElement = document.querySelector(".clankovi-div")

    if(clankoviDiv)
    {
        ClanakView.drawArticle(clankoviDiv, clanak)
    }
    
  }

export function getArticleById(id: string): Observable<Clanak>
{
    return from(
        fetch(`${BASE_URL}/articles/${id}`)
        .then((response)=>{
            if(response.ok)
                return response.json();
            else
                console.log("Article not ok");
        })
        .catch((err)=> console.log(err))
    );
}

export function getArticlesComments(id: string) : Observable<Komentar[]>
{
    return from(
        fetch(`${BASE_URL}/komentari?clanakID=${id}`)
        .then((response)=>{
            if(response.ok)
                return response.json();
            else
                console.log("Komentari not ok");
        })
        .catch((err)=> console.log(err))
    )
}
export function insertKomentar(komentar: Komentar)
{
    fetch(`${BASE_URL}/komentari`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(komentar)
      })
        .then(response => response.json())
        .catch(error => console.error('Greška:', error));
}

  export function getArticleByName(name:string): Observable<Clanak[]>
  {
    console.log(name)
      return from(
          fetch(`${BASE_URL}/articles/?title_like=${name}`)
          .then((res)=>{
              if(res.ok)
              {
                  console.log(res)
                  return res.json()//samo prosledjuje dalje ove podatke negde a mi cemo ih uzeti sa ovog toka i raditi nesto sa njima
              }
              else
                  console.log("Error msg");
          })
          .catch((err)=> console.log(err))
      );
  }

  export function getArticleByType(type: string): Observable<Clanak[]> {
    return from(
        fetch(`${BASE_URL}/articles/?tip=${type}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("Request failed");
            }
        })
        .catch(err => {
            console.error(err)
        })
    );
}
export function getArticleByAutor(autor:string): Observable<Clanak[]>
  {
      return from(
          fetch(`${BASE_URL}/articles/?autor.ime_like=${autor}`)
          .then((res)=>{
              if(res.ok)
              {
                  console.log(res)
                  return res.json()
              }
              else
                  console.log("Error msg");
          })
          .catch((err)=> console.log(err))
      );
  }
  export function deleteArticlebyId(id: string)
  {
    return new Promise((resolve, reject)=>{
        fetch(`${BASE_URL}/articles/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.json();
        })
        .then(() => {
            resolve("Clanak je obrisasn")
        })
        .catch(error => {
            reject(error)
        });
    })
  }

  export function updateArticle(clanak: Clanak): Observable<Clanak>
{
    return from(
        fetch(`${BASE_URL}/articles/${clanak.id.toString()}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(clanak)
          })
        .then((response)=>{
            if(response.ok)
                return response.json();
            else
                console.log("Article not ok");
        })
        .catch((err)=> console.log(err))
    );
}