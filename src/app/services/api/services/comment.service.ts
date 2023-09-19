/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addCommentsToSpecificPost } from '../fn/comment/add-comments-to-specific-post';
import { AddCommentsToSpecificPost$Params } from '../fn/comment/add-comments-to-specific-post';
import { Comment } from '../models/comment';
import { deleteCommentById } from '../fn/comment/delete-comment-by-id';
import { DeleteCommentById$Params } from '../fn/comment/delete-comment-by-id';
import { editCommentById } from '../fn/comment/edit-comment-by-id';
import { EditCommentById$Params } from '../fn/comment/edit-comment-by-id';
import { getAllComments } from '../fn/comment/get-all-comments';
import { GetAllComments$Params } from '../fn/comment/get-all-comments';
import { getCommentsOfPost } from '../fn/comment/get-comments-of-post';
import { GetCommentsOfPost$Params } from '../fn/comment/get-comments-of-post';


/**
 * Comment handling
 */
@Injectable({ providedIn: 'root' })
export class CommentService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllComments()` */
  static readonly GetAllCommentsPath = '/comment/';

  /**
   * Get Comments For Post.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllComments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllComments$Response(params?: GetAllComments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Comment>>> {
    return getAllComments(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Comments For Post.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllComments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllComments(params?: GetAllComments$Params, context?: HttpContext): Observable<Array<Comment>> {
    return this.getAllComments$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Comment>>): Array<Comment> => r.body)
    );
  }

  /** Path part for operation `getCommentsOfPost()` */
  static readonly GetCommentsOfPostPath = '/comment/{post_id}';

  /**
   * Get Comments For Post Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCommentsOfPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentsOfPost$Response(params: GetCommentsOfPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Comment>>> {
    return getCommentsOfPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Comments For Post Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCommentsOfPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentsOfPost(params: GetCommentsOfPost$Params, context?: HttpContext): Observable<Array<Comment>> {
    return this.getCommentsOfPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Comment>>): Array<Comment> => r.body)
    );
  }

  /** Path part for operation `addCommentsToSpecificPost()` */
  static readonly AddCommentsToSpecificPostPath = '/comment/{post_id}';

  /**
   * Add Comment To Post.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCommentsToSpecificPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCommentsToSpecificPost$Response(params: AddCommentsToSpecificPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Comment>> {
    return addCommentsToSpecificPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Add Comment To Post.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addCommentsToSpecificPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCommentsToSpecificPost(params: AddCommentsToSpecificPost$Params, context?: HttpContext): Observable<Comment> {
    return this.addCommentsToSpecificPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Comment>): Comment => r.body)
    );
  }

  /** Path part for operation `editCommentById()` */
  static readonly EditCommentByIdPath = '/comment/{post_id}/{comment_id}';

  /**
   * Edit Comment.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editCommentById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editCommentById$Response(params: EditCommentById$Params, context?: HttpContext): Observable<StrictHttpResponse<Comment>> {
    return editCommentById(this.http, this.rootUrl, params, context);
  }

  /**
   * Edit Comment.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editCommentById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editCommentById(params: EditCommentById$Params, context?: HttpContext): Observable<Comment> {
    return this.editCommentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Comment>): Comment => r.body)
    );
  }

  /** Path part for operation `deleteCommentById()` */
  static readonly DeleteCommentByIdPath = '/comment/{post_id}/{comment_id}';

  /**
   * Delete Comment.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCommentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCommentById$Response(params: DeleteCommentById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteCommentById(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Comment.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCommentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCommentById(params: DeleteCommentById$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteCommentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
