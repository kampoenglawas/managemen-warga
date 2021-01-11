import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CivilianManagementTestModule } from '../../../test.module';
import { CivilianUpdateComponent } from 'app/entities/civilian/civilian-update.component';
import { CivilianService } from 'app/entities/civilian/civilian.service';
import { Civilian } from 'app/shared/model/civilian.model';

describe('Component Tests', () => {
  describe('Civilian Management Update Component', () => {
    let comp: CivilianUpdateComponent;
    let fixture: ComponentFixture<CivilianUpdateComponent>;
    let service: CivilianService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CivilianManagementTestModule],
        declarations: [CivilianUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CivilianUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CivilianUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CivilianService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Civilian(123);
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
        const entity = new Civilian();
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
