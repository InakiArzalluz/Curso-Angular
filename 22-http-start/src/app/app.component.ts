import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription; // Asi se desuscribe al destroy

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    // Aca recibo el error en base al Subject. Es el metodo que estoy usando para pasarme
    // el error que pueda ocurrir en onCreatePost. Es util xq las Subscriptions son Multicast
    // (Los Observables comunes son Unicast)
    this.errorSub = this.postsService.error.subscribe(error => {
      this.isFetching = false;
      this.error = error
    })
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request, subscribo al OBSERVABLE
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe( () => {
      // SI NO ME SUBSCRIBO, EL REQUEST NO SE MANDA. NO OLVIDARLO.
      this.loadedPosts = [];
    });    
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
