/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Post } from '../../models/post';

export interface GetPostById$Params {
  '_id': string;
}

export function getPostById(http: HttpClient, rootUrl: string, params: GetPostById$Params, context?: HttpContext): Observable<StrictHttpResponse<(Post | {
})>> {
  const rb = new RequestBuilder(rootUrl, getPostById.PATH, 'get');
  if (params) {
    rb.path('_id', params['_id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<(Post | {
      })>;
    })
  );
}

getPostById.PATH = '/post/{_id}';
