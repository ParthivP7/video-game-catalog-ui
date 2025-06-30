// src/app/components/catalog/catalog.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { CatalogService } from '../../services/catalog.service';
import { of } from 'rxjs';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let mockService: jasmine.SpyObj<CatalogService>;

  const mockCatalog = [
    { videoGameId: 1, title: 'Zelda', genre: 'Adventure', releaseDate: '2023-01-01' },
    { videoGameId: 2, title: 'Doom', genre: 'Shooter', releaseDate: '2022-06-15' }
  ];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('CatalogService', ['getVideoCatalog', 'delete']);
    mockService.getVideoCatalog.and.returnValue(of(mockCatalog));
    mockService.delete.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [CatalogComponent, NgbPaginationModule, RouterTestingModule],
      providers: [{ provide: CatalogService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load catalog and paginate', fakeAsync(() => {
    tick(); // simulate observable emission
    component.paginatedCatalog$.subscribe(paged => {
      expect(paged.length).toBe(2);
      expect(paged[0].title).toBe('Zelda');
    });
  }));

  it('should delete a game and reload catalog', () => {
    const reloadSpy = spyOn(component['reload$'], 'next').and.callThrough();
    component.deleteGame(1);
    expect(mockService.delete).toHaveBeenCalledWith(1);
    expect(reloadSpy).toHaveBeenCalled();
  });
});
