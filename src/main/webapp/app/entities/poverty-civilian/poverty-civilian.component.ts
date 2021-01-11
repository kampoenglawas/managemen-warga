import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPovertyCivilian } from 'app/shared/model/poverty-civilian.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PovertyCivilianService } from './poverty-civilian.service';
import { PovertyCivilianDeleteDialogComponent } from './poverty-civilian-delete-dialog.component';

@Component({
  selector: 'jhi-poverty-civilian',
  templateUrl: './poverty-civilian.component.html'
})
export class PovertyCivilianComponent implements OnInit, OnDestroy {
  povertyCivilians?: IPovertyCivilian[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected povertyCivilianService: PovertyCivilianService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: JhiDataUtils,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.povertyCivilianService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IPovertyCivilian[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInPovertyCivilians();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPovertyCivilian): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInPovertyCivilians(): void {
    this.eventSubscriber = this.eventManager.subscribe('povertyCivilianListModification', () => this.loadPage());
  }

  delete(povertyCivilian: IPovertyCivilian): void {
    const modalRef = this.modalService.open(PovertyCivilianDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.povertyCivilian = povertyCivilian;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IPovertyCivilian[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/poverty-civilian'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.povertyCivilians = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
