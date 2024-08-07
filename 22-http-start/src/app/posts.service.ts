import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {
    // Acá voy a hacer los requests
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content};
        this.http.post<{ name: string }>(
            'https://ng-complete-guide-3b842-default-rtdb.firebaseio.com/posts.json',
            postData,
            {
                observe: 'response', // Obtengo la httpReponse completa, en lugar de solo el Body
                headers: new  HttpHeaders({
                    'Custom-Header1': 'HelloThere',
                    'Custom-Header2': 'GeneralKenobi',
                }),
                params: new HttpParams().set('print', 'pretty'), 
                // Parametro de la url, entonces pasa de ser:
                //              'https://FirebaseUrl.com/posts.json'
                // A ser:
                //              'https://FirebaseUrl.com/posts.json?print=pretty'
            }
        ).subscribe(
            responseData => {
                console.log(responseData.body);
            },
            error => {
                this.error.next(error.message)
            }
        );
    }

    fetchPosts() {
        // Retorno el observable
        return this.http
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-3b842-default-rtdb.firebaseio.com/posts.json',
                {
                    responseType: 'json',
                }
            )
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData){
                        if (responseData.hasOwnProperty(key)){
                        postsArray.push( {...responseData[key], id:key} );
                        // llaves crean nuevo objeto, "..." es spread operator, que expande un iterable
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => { // Otra funcion que se puede ejecutar para atajar errores
                    // sen to analytics server
                   return throwError(errorRes);
                })
            );
    }

    deletePosts() {
        return this.http.delete(
            'https://ng-complete-guide-3b842-default-rtdb.firebaseio.com/posts.json',
            {
                observe:'events', //Observo los eventos ¿?
                responseType: 'text',
            }
        ).pipe(tap(event => {
            // El operador tap sirve para ejecutar codigo sin modificar la response
            console.log(event);
            if (event.type === HttpEventType.Sent) { /* ... */ }
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    }
}