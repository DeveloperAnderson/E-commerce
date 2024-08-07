import { Component } from '@angular/core';
import { ImportsModule } from './imports';
import { Product } from '../../model/product.model';
import { ProductService } from '../../../services/productservice';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [ProductService]
})
export class ProductComponent {

  products!: Product[];
  selectedUser: any = {};
  isEditing: boolean = false;
  isCreating: boolean = false;
  visible: boolean = false;
  update: boolean = false;

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    firstValueFrom(this.productService.getProductsSmallBackend()).then((product) => {
      this.products = product;
      this.selectedUser = this.products[0];
      console.log('products', this.products);
    });

    this.loginForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      cantidad: ['', [Validators.required]]
    });
      

    
  }


  createUser(): void {
    this.isCreating = true;
    this.visible = true;
    this.selectedUser = {};
  }


  editar(product: Product): void {
    this.selectedUser = product;
    this.isEditing = true;
    this.visible = true;

  }


  saveUser(): void {
    
    if(this.isEditing){
      //Actualizar usuario existente
      this.productService.updateProduct(this.selectedUser).subscribe({
        next: (data) => {
          this.toastr.success('Actualizado con éxito');
          firstValueFrom(this.productService.getProductsSmallBackend()).then((product) => (this.products = product));
          this.visible = false; // Ocultar el diálogo
          this.isEditing = false;
        },
        
        error: (error) => {
          var code = error.status;
          if(code == 403){
            this.toastr.warning('Usted no esta permito realizar esta accion', 'Advertencia');
          }else if(code == 500 || code == 0){
            this.toastr.error('Error en el servidor', 'Error');
          }
          console.log('error ' ,error);
          firstValueFrom(this.productService.getProductsSmallBackend()).then((product) => (this.products = product));          
        },
        complete() {
          console.info('complete');
        },
      
      });

    }

    if (this.isCreating) {

     

      var locked = this.selectedUser.locked;
      var disabled = this.selectedUser.disabled;
      if(locked == undefined){
        this.selectedUser.locked = false;
      }
      if(disabled == undefined){
        this.selectedUser.disabled = false;
      }
      
      console.log('selectedUser', this.selectedUser);
      if(this.selectedUser.nombre == undefined || 
        this.selectedUser.descripcion == undefined || 
        this.selectedUser.precio == undefined || 
        this.selectedUser.categoria == undefined || 
        this.selectedUser.activo == undefined ||
        this.selectedUser.cantidad == undefined){
        
      
          this.toastr.warning('Porfavor llene todos los campos', 'Advertencia');
      }else{


        // Crear un nuevo usuario

        this.productService.postRegisterProducts(this.selectedUser).subscribe({
          next: (data) => {
            this.toastr.success('Creado con éxito');
            firstValueFrom(this.productService.getProductsSmallBackend()).then((product) => (this.products = product));
            this.visible = false; 
          },
          error: (error) => {
            var code = error.status;
            if(code == 403){
              this.toastr.warning('Usted no esta permito realizar esta accion', 'Advertencia');
            }else if(code == 500 || code == 0){
              this.toastr.error('Error en el servidor', 'Error');
            }
            console.log('error ' ,error);
            firstValueFrom(this.productService.getProductsSmallBackend()).then((product) => (this.products = product));
            this.isCreating = false;
            this.visible = false;
          },
          complete() {
          },
        
        });
      }
      
  
  
    }
  }

}
