import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CivilianManagementTestModule } from '../../../test.module';
import { RTUpdateComponent } from 'app/entities/rt/rt-update.component';
import { RTService } from 'app/entities/rt/rt.service';
import { RT } from 'app/shared/model/rt.model';

describe('Component Tests', () => {
  describe('RT Management Update Component', () => {
    let comp: RTUpdateComponent;
    let fixture: ComponentFixture<RTUpdateComponent>;
    let service: RTService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CivilianManagementTestModule],
        declarations: [RTUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RTUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RTUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RTService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RT(123);
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
        const entity = new RT();
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
