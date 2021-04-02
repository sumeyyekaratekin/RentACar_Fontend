import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = environment.apiUrl + "customers/";
  
  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>> {
    let newPath = this.url + 'getall'
    return this.httpClient
      .get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerById(id:number):Observable<SingleResponseModel<Customer>>{
    let newPath = this.url + "getbyid?id=" + id
    return this.httpClient
    .get<SingleResponseModel<Customer>>(newPath)
  }

  update(customer:Customer):Observable<ResponseModel>{
    let newPath = this.url + "update"
    return this.httpClient
    .put<ResponseModel>(newPath,customer)
  }
}
