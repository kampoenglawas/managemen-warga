import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { CivilianManagementTestModule } from '../../../test.module';
import { PovertyCivilianDetailComponent } from 'app/entities/poverty-civilian/poverty-civilian-detail.component';
import { PovertyCivilian } from 'app/shared/model/poverty-civilian.model';

describe('Component Tests', () => {
  describe('PovertyCivilian Management Detail Component', () => {
    let comp: PovertyCivilianDetailComponent;
    let fixture: ComponentFixture<PovertyCivilianDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ povertyCivilian: new PovertyCivilian(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CivilianManagementTestModule],
        declarations: [PovertyCivilianDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PovertyCivilianDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PovertyCivilianDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load povertyCivilian on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.povertyCivilian).toEqual(jasmine.objectContaining({ id: 123 }));
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
