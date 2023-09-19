/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Comment } from '../../models/comment';

export interface GetCommentsOfPost$Params {
  post_id: string;
}

export function getCommentsOfPost(http: HttpClient, rootUrl: string, params: GetCommentsOfPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Comment>>> {
  const rb = new RequestBuilder(rootUrl, getCommentsOfPost.PATH, 'get');
  if (params) {
    rb.path('post_id', params.post_id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Comment>>;
    })
  );
}

getCommentsOfPost.PATH = '/comment/{post_id}';
