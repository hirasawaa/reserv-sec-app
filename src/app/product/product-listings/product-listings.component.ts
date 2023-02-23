import { Component } from '@angular/core';
import { products } from '../../products'

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListingsComponent {
  products: any = [1, 2, 3, 4]

  ngOnInit(){
		this.products = products //class内で定義したproductsに、importしたproductsを入れる。
	  }

}
