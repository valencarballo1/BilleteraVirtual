import { Component } from '@angular/core';
import { employee } from './models/employee/employee.module'
import { formatDate } from '@angular/common';

import { StoreService } from './services/store.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  today = new Date();
  jstoday = '';
  sueldo: number = 0;
  bool: boolean = false;

  total: number = parseInt("0");

  employeeArray: any[] = [];

  ngOnInit() { }

  constructor() {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US');
    this.sueldo = JSON.parse(localStorage.getItem('sueldo')!)
    if (this.sueldo > 0) {
      this.bool = JSON.parse(localStorage.getItem('bool')!)
    }
    this.employeeArray = JSON.parse(localStorage.getItem('employeeArray')!) || [];
    console.log(this.employeeArray);
  }

  selectedEmployee: employee = new employee();

  addOrEdit() {
    if (this.selectedEmployee.id === 0) {
      this.selectedEmployee.id = this.employeeArray.length + 1;
      this.employeeArray.push(this.selectedEmployee);
    }
    this.selectedEmployee = new employee();
    localStorage.setItem('employeeArray', JSON.stringify(this.employeeArray));
  };

  addOrEditSueldo(bool: boolean) {
    if (bool) {
      this.sueldo = this.sueldo
      console.log("Se agrego " + this.sueldo)
      this.bool = true;
      localStorage.setItem('sueldo', JSON.stringify(this.sueldo));
      localStorage.setItem('bool', JSON.stringify(this.bool));
    } else {
      this.sueldo = 0;
      this.bool = false
      localStorage.setItem('sueldo', JSON.stringify(this.sueldo));
      localStorage.setItem('bool', JSON.stringify(this.bool));
    }
  }

  openForEdit(employee: employee) {
    this.selectedEmployee = employee;
  }

  delete() {
    if (confirm("¿Deseas borrar esta tarea?")) {
      const productIndex = this.employeeArray.findIndex(item => item.id === this.selectedEmployee.id);
      this.employeeArray.splice(productIndex, 1);
      this.selectedEmployee = new employee();
      localStorage.setItem('employeeArray', JSON.stringify(this.employeeArray));
    }
  }

  deleteAll(){
    this.employeeArray = [];
    localStorage.setItem('employeeArray', JSON.stringify(this.employeeArray));
  }

  getTotal() {
    return this.total = this.employeeArray.reduce((sum, item) => sum + parseInt(item.cantidad), 0);
  }

  getDiferencia() {
    return this.sueldo - this.total;
  }
}
