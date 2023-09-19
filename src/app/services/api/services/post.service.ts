/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addNewPost } from '../fn/post/add-new-post';
import { AddNewPost$Params } from '../fn/post/add-new-post';
import { deletePostById } from '../fn/post/delete-post-by-id';
import { DeletePostById$Params } from '../fn/post/delete-post-by-id';
import { editPostById } from '../fn/post/edit-post-by-id';
import { EditPostById$Params } from '../fn/post/edit-post-by-id';
import { getAllPosts } from '../fn/post/get-all-posts';
import { GetAllPosts$Params } from '../fn/post/get-all-posts';
import { getPostById } from '../fn/post/get-post-by-id';
import { GetPostById$Params } from '../fn/post/get-post-by-id';
import { Post } from '../models/post';


/**
 * Post handling
 */
@Injectable({ providedIn: 'root' })
export class PostService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllPosts()` */
  static readonly GetAllPostsPath = '/post/';

  /**
   * Get.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPosts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPosts$Response(params?: GetAllPosts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Post>>> {
    return getAllPosts(this.http, this.rootUrl, params, context);
  }

  /**
   * Get.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPosts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPosts(params?: GetAllPosts$Params, context?: HttpContext): Observable<Array<Post>> {
    return this.getAllPosts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Post>>): Array<Post> => r.body)
    );
  }

  /** Path part for operation `addNewPost()` */
  static readonly AddNewPostPath = '/post/';

  /**
   * Add Post.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addNewPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewPost$Response(params: AddNewPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Post>> {
    return addNewPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Add Post.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addNewPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewPost(params: AddNewPost$Params, context?: HttpContext): Observable<Post> {
    return this.addNewPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Post>): Post => r.body)
    );
  }

  /** Path part for operation `getPostById()` */
  static readonly GetPostByIdPath = '/post/{_id}';

  /**
   * Get Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPostById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostById$Response(params: GetPostById$Params, context?: HttpContext): Observable<StrictHttpResponse<(Post | {
})>> {
    return getPostById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPostById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostById(params: GetPostById$Params, context?: HttpContext): Observable<(Post | {
})> {
    return this.getPostById$Response(params, context).pipe(
      map((r: StrictHttpResponse<(Post | {
})>): (Post | {
}) => r.body)
    );
  }

  /** Path part for operation `editPostById()` */
  static readonly EditPostByIdPath = '/post/{_id}';

  /**
   * Edit Post.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editPostById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editPostById$Response(params: EditPostById$Params, context?: HttpContext): Observable<StrictHttpResponse<Post>> {
    return editPostById(this.http, this.rootUrl, params, context);
  }

  /**
   * Edit Post.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editPostById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editPostById(params: EditPostById$Params, context?: HttpContext): Observable<Post> {
    return this.editPostById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Post>): Post => r.body)
    );
  }

  /** Path part for operation `deletePostById()` */
  static readonly DeletePostByIdPath = '/post/{_id}';

  /**
   * Delete Post.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePostById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePostById$Response(params: DeletePostById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deletePostById(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Post.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePostById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePostById(params: DeletePostById$Params, context?: HttpContext): Observable<{
}> {
    return this.deletePostById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
