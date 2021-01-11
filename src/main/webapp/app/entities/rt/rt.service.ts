import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRT } from 'app/shared/model/rt.model';

type EntityResponseType = HttpResponse<IRT>;
type EntityArrayResponseType = HttpResponse<IRT[]>;

@Injectable({ providedIn: 'root' })
export class RTService {
  public resourceUrl = SERVER_API_URL + 'api/rts';

  constructor(protected http: HttpClient) {}

  create(rT: IRT): Observable<EntityResponseType> {
    return this.http.post<IRT>(this.resourceUrl, rT, { observe: 'response' });
  }

  update(rT: IRT): Observable<EntityResponseType> {
    return this.http.put<IRT>(this.resourceUrl, rT, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRT>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRT[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
