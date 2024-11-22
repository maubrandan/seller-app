import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      stock: [0]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProduct(+id).subscribe(product => {
        this.productForm.patchValue(product);
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.isEditMode) {
        this.productService.updateProduct(
          //this.route.snapshot.paramMap.get('id'),
          0,
          this.productForm.value
        ).subscribe(() => {
          this.router.navigate(['/products']);
        });
      } else {
        this.productService.createProduct(this.productForm.value).subscribe(() => {
          this.router.navigate(['/products']);
        });
      }
    }
  }
}
