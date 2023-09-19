/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteCommentById$Params {
  post_id: string;
  comment_id: string;
}

export function deleteCommentById(http: HttpClient, rootUrl: string, params: DeleteCommentById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, deleteCommentById.PATH, 'delete');
  if (params) {
    rb.path('post_id', params.post_id, {});
    rb.path('comment_id', params.comment_id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

deleteCommentById.PATH = '/comment/{post_id}/{comment_id}';
