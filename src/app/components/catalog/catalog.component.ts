import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CatalogService } from '../../services/catalog.service';
import { Catalog } from '../../models/catalog.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, CommonModule, NgbPaginationModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  private reload$ = new BehaviorSubject<void>(undefined);
  catalog$!: Observable<Catalog[]>;
  paginatedCatalog$!: Observable<Catalog[]>;

  page = 1;
  pageSize = 15;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalog$ = this.reload$.pipe(
      switchMap(() => this.catalogService.getVideoCatalog())
    );

    this.paginatedCatalog$ = this.catalog$.pipe(
      map(data => this.paginate(data))
    );
  }

  deleteGame(videoGameId: number): void {
    if (confirm('Are you sure you want to delete this game?')) {
      this.catalogService.delete(videoGameId).subscribe(() => {
        this.reload$.next(); //Trigger reload
      });
    }
  }

  onPageChange(page: number): void {
    this.page = page;
    this.paginatedCatalog$ = this.catalog$.pipe(
      map(data => this.paginate(data))
    );
  }

  private paginate(data: Catalog[]): Catalog[] {
    const start = (this.page - 1) * this.pageSize;
    return data.slice(start, start + this.pageSize);
  }
}
