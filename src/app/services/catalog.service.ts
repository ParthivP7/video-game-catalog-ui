import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalog } from '../models/catalog.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7154/api/video-games';

  // Get all games
  getVideoCatalog(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.apiUrl);
  }

  // Get a single game
  getById(videoGameId: number): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.apiUrl}/${videoGameId}`);
  }

  // Create a new game
  create(game: Catalog): Observable<any> {
    return this.http.post(this.apiUrl, game);
  }

  // Update existing game
  update(game: Catalog): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${game.videoGameId}`, game);
  }

  // Delete a game
  delete(videoGameId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${videoGameId}`);
  }
}
