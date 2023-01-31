import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { employee } from "../models/employee/employee.module"


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private employeeArray: employee[] = [];

  getemployeeArray() {
    return this.employeeArray;
  }
  constructor() {
   }
}
