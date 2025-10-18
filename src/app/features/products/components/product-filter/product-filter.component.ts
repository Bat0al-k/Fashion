
import { Component ,EventEmitter, Output ,Input, OnChanges,SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})

export class ProductFilterComponent {
  @Output() filtersChanged = new EventEmitter<any>();
 @Input() minPrice: number = 0;
  @Input() maxPrice: number = 1000;
 filters: {
    category: string;
    subcategory: string;
    size: string;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
    [key: string]: any;
  } = {
    category: '',
    subcategory: '',
    size: '',
    minPrice: 100,
    maxPrice: 1000000,
    sortBy: ''
  }
  categories = ['Men', 'Women', 'Kids'];
  subcategories = ['T-Shirts', 'Pants', 'Watches'];
  sizes = ['S', 'M', 'L', 'XL'];
  priceRanges = [
    { label: 'Under 300 EGP', min: 0, max: 300 },
    { label: '300 - 500 EGP', min: 300, max: 500 },
    { label: '500 - 700 EGP', min: 500, max: 700 },
    { label: '700 - 1000 EGP', min: 700, max: 1000 }
  ];
  onFilterChange() {
   this.filtersChanged.emit({ ...this.filters });
}
  onRadioSelect(type: string, value: string) {
    this.filters[type] = value;
    this.onFilterChange();
  }
onPriceRangeSelect(range: { min: number; max: number }) {
    this.filters.minPrice = range.min;
    this.filters.maxPrice = range.max;
    this.onFilterChange();
  }
}





