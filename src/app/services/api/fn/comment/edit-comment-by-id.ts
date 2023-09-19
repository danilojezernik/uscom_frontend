/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Comment } from '../../models/comment';

export interface EditCommentById$Params {
  post_id: string;
  comment_id: string;
      body: Comment
}

export function editCommentById(http: HttpClient, rootUrl: string, params: EditCommentById$Params, context?: HttpContext): Observable<StrictHttpResponse<Comment>> {
  const rb = new RequestBuilder(rootUrl, editCommentById.PATH, 'put');
  if (params) {
    rb.path('post_id', params.post_id, {});
    rb.path('comment_id', params.comment_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Comment>;
    })
  );
}

editCommentById.PATH = '/comment/{post_id}/{comment_id}';
