import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CivilianManagementTestModule } from '../../../test.module';
import { ResidenceUpdateComponent } from 'app/entities/residence/residence-update.component';
import { ResidenceService } from 'app/entities/residence/residence.service';
import { Residence } from 'app/shared/model/residence.model';

describe('Component Tests', () => {
  describe('Residence Management Update Component', () => {
    let comp: ResidenceUpdateComponent;
    let fixture: ComponentFixture<ResidenceUpdateComponent>;
    let service: ResidenceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CivilianManagementTestModule],
        declarations: [ResidenceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ResidenceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResidenceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResidenceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Residence(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Residence();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
