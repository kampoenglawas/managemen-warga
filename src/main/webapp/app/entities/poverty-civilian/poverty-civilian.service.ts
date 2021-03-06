import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPovertyCivilian, IPovertyRatio } from 'app/shared/model/poverty-civilian.model';

type EntityResponseType = HttpResponse<IPovertyCivilian>;
type EntityArrayResponseType = HttpResponse<IPovertyCivilian[]>;

@Injectable({ providedIn: 'root' })
export class PovertyCivilianService {
  public resourceUrl = SERVER_API_URL + 'api/poverty-civilians';

  constructor(protected http: HttpClient) {}

  create(povertyCivilian: IPovertyCivilian): Observable<EntityResponseType> {
    return this.http.post<IPovertyCivilian>(this.resourceUrl, povertyCivilian, { observe: 'response' });
  }

  update(povertyCivilian: IPovertyCivilian): Observable<EntityResponseType> {
    return this.http.put<IPovertyCivilian>(this.resourceUrl, povertyCivilian, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPovertyCivilian>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRatio(): Observable<HttpResponse<IPovertyRatio>> {
    return this.http.get<IPovertyRatio>(`${this.resourceUrl}/ratio`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPovertyCivilian[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
