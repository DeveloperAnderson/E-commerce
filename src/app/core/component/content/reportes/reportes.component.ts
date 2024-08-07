import { Component, OnInit,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProductReportService } from '../../../services/ProductReportService';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  productosActivos: any[] = [];
  productosVendidos: any[] = [];
  clientFrencuent: any[] = [];


  constructor(
    private productReportService: ProductReportService
    
  ) { }

  ngOnInit() {
    console.log('ReportesComponent constructor');
    this.loadProductosActivos();
    this.obtenerProductosVendidos();
    this.obtenerClientesFrecuentes();
  }

  loadProductosActivos(): void {
    this.productReportService.obtenerProductosActivos().subscribe(
      (data) => {
        console.log('Productos activos:', data);
        this.productosActivos = data;
      },
      (error) => {
        console.error('Error fetching productos activos:', error);
      }
    );
  }


  obtenerProductosVendidos(): void {
    this.productReportService.obtenerProductosVendidos().subscribe(
      (data) => {
        console.log('Productos vendidos:', data);
        this.productosVendidos = data;
      },
      (error) => {
        console.error('Error fetching productos vendidos:', error);
      }
    );
  }

  obtenerClientesFrecuentes(): void {
    this.productReportService.obtenerClientesFrecuentes().subscribe(
      (data) => {
        console.log('Clientes frecuentes:', data);
        this.clientFrencuent = data;
      },
      (error) => {
        console.error('Error fetching clientes frecuentes:', error);
      }
    );
  }




}
