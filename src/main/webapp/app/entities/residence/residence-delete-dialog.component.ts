import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResidence } from 'app/shared/model/residence.model';
import { ResidenceService } from './residence.service';

@Component({
  templateUrl: './residence-delete-dialog.component.html'
})
export class ResidenceDeleteDialogComponent {
  residence?: IResidence;

  constructor(protected residenceService: ResidenceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.residenceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('residenceListModification');
      this.activeModal.close();
    });
  }
}
