import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError } from 'rxjs/operators';
import { Subject } from "rxjs";

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
        ).subscribe(
            responseData => {
                console.log(responseData);
            },
            error => {
                this.error.next(error.message)
            }
        );
    }

    fetchPosts() {
        // Retorno el observable
        return this.http
            .get<{ [key: string]: Post }>('https://ng-complete-guide-3b842-default-rtdb.firebaseio.com/posts.json')
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
                })
            );
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-3b842-default-rtdb.firebaseio.com/posts.json');
    }
}