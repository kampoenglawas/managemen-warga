import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CivilianManagementTestModule } from '../../../test.module';
import { ResidenceDetailComponent } from 'app/entities/residence/residence-detail.component';
import { Residence } from 'app/shared/model/residence.model';

describe('Component Tests', () => {
  describe('Residence Management Detail Component', () => {
    let comp: ResidenceDetailComponent;
    let fixture: ComponentFixture<ResidenceDetailComponent>;
    const route = ({ data: of({ residence: new Residence(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CivilianManagementTestModule],
        declarations: [ResidenceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ResidenceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ResidenceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load residence on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.residence).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
