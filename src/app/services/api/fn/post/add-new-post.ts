/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Post } from '../../models/post';

export interface AddNewPost$Params {
      body: Post
}

export function addNewPost(http: HttpClient, rootUrl: string, params: AddNewPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Post>> {
  const rb = new RequestBuilder(rootUrl, addNewPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Post>;
    })
  );
}

addNewPost.PATH = '/post/';
