import { Component,OnInit  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private router: Router) {}

  categories = [
    { image: 'assets/photo9.jpg',
        name: 'Men',
        description: 'Discover the latest trends for men',
        // route: '/products?cat=men'
      },

    { image: 'assets/photo6.jpg',
        name: 'Women',
        description: 'Stylish & elegant collections for women',
        // route: '/products?cat=women'
       },

    { image: 'assets/photo11.jpg',
       name: 'Kids',
       description: 'Fun and comfy outfits for kids',
      //  route: '/products?cat=kids'
       }
  ];

  menAll: string[] = ['assets/photo1.jpg', 'assets/photo2.jpg', 'assets/photo3.jpg', 'assets/photo4.jpg'];
  menVisible: string[] = [];

  menIndex = 0;

   brands = [
    { title: 'Brand A', text: 'Lorem ipsum dolor sit amet consectetur...', link: 'https://example.com/a' },
    { title: 'Brand B', text: 'Lorem ipsum dolor sit amet consectetur...', link: 'https://example.com/b' }
  ];

  ngOnInit() {
    this.menVisible = this.menAll.slice(0, 3);
  }

  goToCategory(route: string) {
    this.router.navigateByUrl(route);
  }

   currentMen = 0;
  currentWomen = 0;
  currentKids = 0;

   menProducts = [
    { img: 'assets/image9.jpg', name: 'BOmber jacket', price: 199 },
    { img: 'assets/image6.jpg', name: 'Chinos Pants', price: 299 },
    { img: 'assets/image7.jpg', name: 'Casual Shirt', price: 399 },
    { img: 'assets/image8.jpg', name: 'Denim Jacket', price: 499 }
  ];

  womenProducts = [
    { img: 'assets/image10.jpg', name: ' T-Shirt', price: 250 },
    { img: 'assets/image11.jpg', name: 'Wide Leg Pants', price: 320 },
    { img: 'assets/image12.jpg', name: ' Jacket', price: 370 },
    { img: 'assets/image13.jpg', name: 'Blouse & Skirt', price: 430 }
  ];

  kidsProducts = [
    { img: 'assets/image1.jpg', name: 'Jeans', price: 150 },
    { img: 'assets/image2.jpg', name: 'cotton Trousers', price: 180 },
    { img: 'assets/image3.jpg', name: 'striped shirt', price: 210 },
    { img: 'assets/image4.jpg', name: 'Casual Shirt', price: 260 }
  ];
   getVisible(products: any[], current: number) {
    const count = 3;
    return Array.from({ length: count }, (_, i) => {
      const index = (current + i) % products.length;
      return products[index];
    });
  }

  next(category: 'men' | 'women' | 'kids') {
    if (category === 'men') this.currentMen = (this.currentMen + 1) % this.menProducts.length;
    if (category === 'women') this.currentWomen = (this.currentWomen + 1) % this.womenProducts.length;
    if (category === 'kids') this.currentKids = (this.currentKids + 1) % this.kidsProducts.length;
  }
   prev(category: 'men' | 'women' | 'kids') {
    if (category === 'men') this.currentMen = (this.currentMen - 1 + this.menProducts.length) % this.menProducts.length;
    if (category === 'women') this.currentWomen = (this.currentWomen - 1 + this.womenProducts.length) % this.womenProducts.length;
    if (category === 'kids') this.currentKids = (this.currentKids - 1 + this.kidsProducts.length) % this.kidsProducts.length;
 }
goToLink(url: string) {
    window.open(url, '_blank');
  }

}






