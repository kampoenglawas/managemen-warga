import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { CivilianManagementTestModule } from '../../../test.module';
import { FamilyMemberComponent } from 'app/entities/family-member/family-member.component';
import { FamilyMemberService } from 'app/entities/family-member/family-member.service';
import { FamilyMember } from 'app/shared/model/family-member.model';

describe('Component Tests', () => {
  describe('FamilyMember Management Component', () => {
    let comp: FamilyMemberComponent;
    let fixture: ComponentFixture<FamilyMemberComponent>;
    let service: FamilyMemberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CivilianManagementTestModule],
        declarations: [FamilyMemberComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(FamilyMemberComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FamilyMemberComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FamilyMemberService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FamilyMember(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.familyMembers && comp.familyMembers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FamilyMember(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.familyMembers && comp.familyMembers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
