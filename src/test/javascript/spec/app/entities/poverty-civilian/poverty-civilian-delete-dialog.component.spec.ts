import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CivilianManagementTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { PovertyCivilianDeleteDialogComponent } from 'app/entities/poverty-civilian/poverty-civilian-delete-dialog.component';
import { PovertyCivilianService } from 'app/entities/poverty-civilian/poverty-civilian.service';

describe('Component Tests', () => {
  describe('PovertyCivilian Management Delete Component', () => {
    let comp: PovertyCivilianDeleteDialogComponent;
    let fixture: ComponentFixture<PovertyCivilianDeleteDialogComponent>;
    let service: PovertyCivilianService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CivilianManagementTestModule],
        declarations: [PovertyCivilianDeleteDialogComponent]
      })
        .overrideTemplate(PovertyCivilianDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PovertyCivilianDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PovertyCivilianService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
