import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataService } from '../../services/data.service';
import { Data, GitHubIssue } from '../../common/interfaces/data.interface';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Pagination } from '../../common/interfaces/pagination.interface';

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss',
})
export class TablePageComponent implements OnInit {
  public displayedColumns: string[] = ['created_at', 'updated_at', 'title'];
  public dataSource = new MatTableDataSource<GitHubIssue>([]);
  public data!: Data;
  public loading$: Observable<boolean>;

  public pagination: Pagination = {
    page: 0,
    per_page: 100,
    total: 0,
  }

  public sort: Sort = {
    active: '',
    direction: ''
  }

  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(private dataService: DataService) {
    this.loading$ = this.dataService.loading$;
  }

  public ngOnInit(): void {
    this.getData();
  }

  public onSortChange(sortState: Sort) {
    this.sort = sortState;
    this.getData();
  }

  public onPageChange(event: PageEvent): void {
    this.pagination.page = event.pageIndex + 1;
    this.getData();
  }

  private getData(): void {
    this.dataService.getAllData(this.sort, this.pagination).subscribe({
      next: (res: Data) => {
        if (!this.data) {
          this.data = res;
          this.pagination.total = res.total_count;
        }

        this.dataSource.data = res.items;
        this.dataSource.sort = this.empTbSort;
      },
    })
  }
}
