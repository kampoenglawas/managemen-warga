import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CivilianManagementTestModule } from '../../../test.module';
import { PovertyCivilianUpdateComponent } from 'app/entities/poverty-civilian/poverty-civilian-update.component';
import { PovertyCivilianService } from 'app/entities/poverty-civilian/poverty-civilian.service';
import { PovertyCivilian } from 'app/shared/model/poverty-civilian.model';

describe('Component Tests', () => {
  describe('PovertyCivilian Management Update Component', () => {
    let comp: PovertyCivilianUpdateComponent;
    let fixture: ComponentFixture<PovertyCivilianUpdateComponent>;
    let service: PovertyCivilianService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CivilianManagementTestModule],
        declarations: [PovertyCivilianUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PovertyCivilianUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PovertyCivilianUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PovertyCivilianService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PovertyCivilian(123);
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
        const entity = new PovertyCivilian();
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
