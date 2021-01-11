import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFamilyMember, FamilyMember } from 'app/shared/model/family-member.model';
import { FamilyMemberService } from './family-member.service';
import { ICivilian } from 'app/shared/model/civilian.model';
import { CivilianService } from 'app/entities/civilian/civilian.service';
import { IFamily } from 'app/shared/model/family.model';
import { FamilyService } from 'app/entities/family/family.service';

type SelectableEntity = ICivilian | IFamily;

@Component({
  selector: 'jhi-family-member-update',
  templateUrl: './family-member-update.component.html'
})
export class FamilyMemberUpdateComponent implements OnInit {
  isSaving = false;
  civilians: ICivilian[] = [];
  families: IFamily[] = [];

  editForm = this.fb.group({
    id: [],
    role: [null, [Validators.required]],
    civilian: [],
    family: []
  });

  constructor(
    protected familyMemberService: FamilyMemberService,
    protected civilianService: CivilianService,
    protected familyService: FamilyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ familyMember }) => {
      this.updateForm(familyMember);

      this.civilianService
        .query({ filter: 'familymember-is-null' })
        .pipe(
          map((res: HttpResponse<ICivilian[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICivilian[]) => {
          if (!familyMember.civilian || !familyMember.civilian.id) {
            this.civilians = resBody;
          } else {
            this.civilianService
              .find(familyMember.civilian.id)
              .pipe(
                map((subRes: HttpResponse<ICivilian>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICivilian[]) => (this.civilians = concatRes));
          }
        });

      this.familyService.query().subscribe((res: HttpResponse<IFamily[]>) => (this.families = res.body || []));
    });
  }

  updateForm(familyMember: IFamilyMember): void {
    this.editForm.patchValue({
      id: familyMember.id,
      role: familyMember.role,
      civilian: familyMember.civilian,
      family: familyMember.family
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const familyMember = this.createFromForm();
    if (familyMember.id !== undefined) {
      this.subscribeToSaveResponse(this.familyMemberService.update(familyMember));
    } else {
      this.subscribeToSaveResponse(this.familyMemberService.create(familyMember));
    }
  }

  private createFromForm(): IFamilyMember {
    return {
      ...new FamilyMember(),
      id: this.editForm.get(['id'])!.value,
      role: this.editForm.get(['role'])!.value,
      civilian: this.editForm.get(['civilian'])!.value,
      family: this.editForm.get(['family'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFamilyMember>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
