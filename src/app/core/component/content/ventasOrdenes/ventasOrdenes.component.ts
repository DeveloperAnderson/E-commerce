import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../user-management/imports';
import { firstValueFrom } from 'rxjs';
import { ProductService } from '../../../services/productservice';
import { UserService } from '../../../services/auth/user.service';
import { VentasOrdenes } from '../../../services/ventasOrdenes';
import { VentaDto } from '../../model/ventas';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ventasOrdenes',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './ventasOrdenes.component.html',
  styleUrl: './ventasOrdenes.component.css'
  
})
export class VentasOrdenesComponent implements OnInit {
  
  isCreating: boolean = false;
  visible: boolean = false;
  ventasOrdenes: any = [];
  selectedProduct: any;
  products: any = [];
  users: any = []; // Lista de usuarios
  selectedUser: any;
  cantidad : number = 0;


  constructor(
    private productService: ProductService,
    private userService: UserService,
    private ventasOrdeneService: VentasOrdenes,
    private toastr: ToastrService
  ) {
    this.visible = true;
  }

  ngOnInit(): void {
    this.isCreating = true;
    console.log('VentasOrdenesComponent');
    firstValueFrom(this.productService.getProductsSmallBackend()).then((products) => {
      this.products = products;
      console.log('products', this.products);
    });

    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data; // Asigna los datos a la lista de usuarios
        console.log('users', this.users);
      },
      (error) => console.error('Error fetching users', error)
    );
  }

  crearOrdenVentas(): void {
    console.log('crearOrdenVentas');
    this.isCreating = true;
    this.visible = true;
  }

  saveUser(): void {
    console.log('saveUser');
  
    if (!this.selectedProduct || !this.selectedUser) {
      console.error('selectedProduct or selectedUser is null or undefined');
      return;
    }
  
    if (!this.cantidad || this.cantidad <= 0) {
      console.error('cantidad is invalid');
      return;
    }
  
    console.log('selectedProduct', this.selectedProduct);
    console.log('selectedUser', this.selectedUser);
    console.log('cantidad', this.cantidad);
  
    // const ventaDto: VentaDto = {
    //   idProducto: this.selectedProduct.id, 
    //   precioProducto: this.selectedProduct.precio,
    //   username: this.selectedUser.username, 
    //   cantidad: this.cantidad
    // };
  
    //console.log('ventaDto', ventaDto);
  
    this.ventasOrdeneService.createOrder({
      idProducto: this.selectedProduct.id,
      precioProducto: this.selectedProduct.precio,
      username: this.selectedUser.username,
      cantidad: this.cantidad
    })
      .subscribe(
        (data) => {
          console.log('data', data);
          this.toastr.success('Orden de venta creada con éxito');
          this.isCreating = false;
          this.visible = false;
        },
        (error) => {
          this.visible = false;
          console.error('error.status', error.status);
          console.error('Error creating order', error);
        }
      );
  }
}