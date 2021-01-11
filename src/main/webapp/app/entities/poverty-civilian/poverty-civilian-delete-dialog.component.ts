import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPovertyCivilian } from 'app/shared/model/poverty-civilian.model';
import { PovertyCivilianService } from './poverty-civilian.service';

@Component({
  templateUrl: './poverty-civilian-delete-dialog.component.html'
})
export class PovertyCivilianDeleteDialogComponent {
  povertyCivilian?: IPovertyCivilian;

  constructor(
    protected povertyCivilianService: PovertyCivilianService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.povertyCivilianService.delete(id).subscribe(() => {
      this.eventManager.broadcast('povertyCivilianListModification');
      this.activeModal.close();
    });
  }
}
