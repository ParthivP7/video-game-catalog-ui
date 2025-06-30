import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../../services/catalog.service';

@Component({
  standalone: true,
  selector: 'app-catalog-details',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './catalog-details.component.html',
})
export class CatalogDetailsComponent implements OnInit {
  form!: FormGroup;
  isNew = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    const urlSegment = this.route.snapshot.routeConfig?.path;

    if (urlSegment === 'new') {
      this.isNew = true;
      this.form = this.fb.group({
        title: ['', Validators.required],
        genre: ['', Validators.required],
        releaseDate: ['', Validators.required],
      });
    } else {
      const videoGameId = this.route.snapshot.paramMap.get('videoGameId');
      if (videoGameId) {
        this.isNew = false;
        this.form = this.fb.group({
          videoGameId: [null],
          title: ['', Validators.required],
          genre: ['', Validators.required],
          releaseDate: ['', Validators.required],
        });

        this.catalogService.getById(+videoGameId).subscribe(data => {
          const dateOnly = data.releaseDate?.split('T')[0] || '';
          this.form.patchValue({
            videoGameId: data.videoGameId,
            title: data.title,
            genre: data.genre,
            releaseDate: dateOnly,
          });
        });
      }
    }
  }

  onSubmit(): void {
    const game = this.form.value;

    if (this.isNew) {
      const newGame = { ...game };
      delete newGame.videoGameId;
      this.catalogService.create(newGame).subscribe(() => {
        this.router.navigate(['/catalog']);
      });
    } else {
      this.catalogService.update(game).subscribe(() => {
        this.router.navigate(['/catalog']);
      });
    }
  }
}
