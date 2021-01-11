import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CivilianService } from 'app/entities/civilian/civilian.service';
import { ICivilian, Civilian } from 'app/shared/model/civilian.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { MemberStatus } from 'app/shared/model/enumerations/member-status.model';

describe('Service Tests', () => {
  describe('Civilian Service', () => {
    let injector: TestBed;
    let service: CivilianService;
    let httpMock: HttpTestingController;
    let elemDefault: ICivilian;
    let expectedResult: ICivilian | ICivilian[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CivilianService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Civilian(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        Gender.Male,
        MemberStatus.PassAway,
        'AAAAAAA',
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateOfBirth: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Civilian', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateOfBirth: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfBirth: currentDate
          },
          returnedFromService
        );

        service.create(new Civilian()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Civilian', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            identityNo: 'BBBBBB',
            identityCardImage: 'BBBBBB',
            dateOfBirth: currentDate.format(DATE_FORMAT),
            placeOfBirth: 'BBBBBB',
            contact: 'BBBBBB',
            gender: 'BBBBBB',
            status: 'BBBBBB',
            additionalInfo: 'BBBBBB',
            yearlyIncome: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfBirth: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Civilian', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            identityNo: 'BBBBBB',
            identityCardImage: 'BBBBBB',
            dateOfBirth: currentDate.format(DATE_FORMAT),
            placeOfBirth: 'BBBBBB',
            contact: 'BBBBBB',
            gender: 'BBBBBB',
            status: 'BBBBBB',
            additionalInfo: 'BBBBBB',
            yearlyIncome: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfBirth: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Civilian', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
