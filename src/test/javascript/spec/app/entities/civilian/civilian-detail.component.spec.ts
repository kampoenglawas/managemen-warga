import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { CivilianManagementTestModule } from '../../../test.module';
import { CivilianDetailComponent } from 'app/entities/civilian/civilian-detail.component';
import { Civilian } from 'app/shared/model/civilian.model';

describe('Component Tests', () => {
  describe('Civilian Management Detail Component', () => {
    let comp: CivilianDetailComponent;
    let fixture: ComponentFixture<CivilianDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ civilian: new Civilian(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CivilianManagementTestModule],
        declarations: [CivilianDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CivilianDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CivilianDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load civilian on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.civilian).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
