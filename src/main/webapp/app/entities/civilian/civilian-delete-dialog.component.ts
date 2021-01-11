import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICivilian } from 'app/shared/model/civilian.model';
import { CivilianService } from './civilian.service';

@Component({
  templateUrl: './civilian-delete-dialog.component.html'
})
export class CivilianDeleteDialogComponent {
  civilian?: ICivilian;

  constructor(protected civilianService: CivilianService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.civilianService.delete(id).subscribe(() => {
      this.eventManager.broadcast('civilianListModification');
      this.activeModal.close();
    });
  }
}
