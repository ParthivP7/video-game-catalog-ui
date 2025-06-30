// src/app/services/catalog.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatalogService } from './catalog.service';
import { Catalog } from '../models/catalog.model';

describe('CatalogService', () => {
  let service: CatalogService;
  let http: HttpTestingController;
  const apiUrl = 'https://localhost:7154/api/video-games';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatalogService],
    });
    service = TestBed.inject(CatalogService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should fetch all games', () => {
    const mockData: Catalog[] = [{ videoGameId: 1, title: 'Halo', genre: 'Shooter', releaseDate: '2024-01-01' }];

    service.getVideoCatalog().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].title).toBe('Halo');
    });

    const req = http.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should delete a game by videoGameId', () => {
    service.delete(1).subscribe();
    const req = http.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
  });
});
