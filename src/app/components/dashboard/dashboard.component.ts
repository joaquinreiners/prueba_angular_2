import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    NgbModalModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'actions'];
  products: any[] = [];
  selectedProduct: any;
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  limit: number = 20;

  constructor(
    private http: HttpClient,
    @Inject(NgbModal) private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<any[]>('https://fakestoreapi.com/products')
      .subscribe({
        next: (data) => {
          this.products = data;
          this.extractCategories();
          this.filterProducts();
        },
        error: (error) => console.error('Error obtaining products:', error)
      });
  }

  extractCategories(): void {
    const allCategories = this.products.map(product => product.category);
    this.categories = [...new Set(allCategories)];
  }

  filterProducts(): void {
    this.filteredProducts = this.selectedCategory
      ? this.products.filter(product => product.category === this.selectedCategory)
      : this.products;
  }

  onCategoryChange(): void {
    this.filterProducts();
  }

  onLimitChange(): void {
    this.fetchProducts();
  }

  openProductModal(product: any, content: any) {
    this.selectedProduct = product;
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
