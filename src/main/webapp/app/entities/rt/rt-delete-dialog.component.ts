import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRT } from 'app/shared/model/rt.model';
import { RTService } from './rt.service';

@Component({
  templateUrl: './rt-delete-dialog.component.html'
})
export class RTDeleteDialogComponent {
  rT?: IRT;

  constructor(protected rTService: RTService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rTService.delete(id).subscribe(() => {
      this.eventManager.broadcast('rTListModification');
      this.activeModal.close();
    });
  }
}
