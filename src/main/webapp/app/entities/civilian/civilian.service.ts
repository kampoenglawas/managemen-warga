import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICivilian } from 'app/shared/model/civilian.model';

type EntityResponseType = HttpResponse<ICivilian>;
type EntityArrayResponseType = HttpResponse<ICivilian[]>;

@Injectable({ providedIn: 'root' })
export class CivilianService {
  public resourceUrl = SERVER_API_URL + 'api/civilians';

  constructor(protected http: HttpClient) {}

  create(civilian: ICivilian): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(civilian);
    return this.http
      .post<ICivilian>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(civilian: ICivilian): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(civilian);
    return this.http
      .put<ICivilian>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICivilian>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICivilian[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(civilian: ICivilian): ICivilian {
    const copy: ICivilian = Object.assign({}, civilian, {
      dateOfBirth: civilian.dateOfBirth && civilian.dateOfBirth.isValid() ? civilian.dateOfBirth.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfBirth = res.body.dateOfBirth ? moment(res.body.dateOfBirth) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((civilian: ICivilian) => {
        civilian.dateOfBirth = civilian.dateOfBirth ? moment(civilian.dateOfBirth) : undefined;
      });
    }
    return res;
  }
}
