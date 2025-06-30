import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CatalogDetailsComponent } from './catalog-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CatalogService } from '../../services/catalog.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

describe('CatalogDetailsComponent', () => {
  let component: CatalogDetailsComponent;
  let fixture: ComponentFixture<CatalogDetailsComponent>;
  let mockService: jasmine.SpyObj<CatalogService>;

  const mockGame = {
    videoGameId: 1,
    title: 'Test Game',
    genre: 'Action',
    releaseDate: '2024-01-01'
  };

  beforeEach(() => {
    mockService = jasmine.createSpyObj('CatalogService', ['getById', 'create', 'update']);
    mockService.getById.and.returnValue(of(mockGame));
    mockService.update.and.returnValue(of(void 0));

    TestBed.configureTestingModule({
      imports: [
        CatalogDetailsComponent,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'catalog', component: DummyComponent } // ✅ Fake route to resolve navigation
        ])
      ],
      providers: [
        { provide: CatalogService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'videoGameId' ? '1' : null,
              },
              routeConfig: { path: ':videoGameId' },
            },
          },
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load data and populate form in edit mode', fakeAsync(() => {
    tick();
    expect(component.isNew).toBeFalse();
    expect(component.form.get('title')?.value).toBe('Test Game');
  }));

  it('should call update on submit when editing', fakeAsync(() => {
    tick();
    component.form.setValue({
      videoGameId: 1,
      title: 'Test Game',
      genre: 'Action',
      releaseDate: '2024-01-01'
    });

    component.onSubmit();
    expect(mockService.update).toHaveBeenCalledWith(component.form.value);
  }));
});
