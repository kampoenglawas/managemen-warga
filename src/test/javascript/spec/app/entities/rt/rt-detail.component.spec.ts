import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CivilianManagementTestModule } from '../../../test.module';
import { RTDetailComponent } from 'app/entities/rt/rt-detail.component';
import { RT } from 'app/shared/model/rt.model';

describe('Component Tests', () => {
  describe('RT Management Detail Component', () => {
    let comp: RTDetailComponent;
    let fixture: ComponentFixture<RTDetailComponent>;
    const route = ({ data: of({ rT: new RT(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CivilianManagementTestModule],
        declarations: [RTDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RTDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RTDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load rT on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rT).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
