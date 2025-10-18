import { Component  , EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls:['./pagination.component.css']
})
export class PaginationComponent { 
  @Input() totalItems: number = 0;
@Input() itemsPerPage: number = 8;
@Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  
  get totalPages(): number[] {
    const pages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: pages }, (_, i) => i + 1);
  }

    changePage(page: number) {
    this.pageChanged.emit(page);
  }

}
