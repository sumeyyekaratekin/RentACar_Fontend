import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel ,ListResponseModel,SingleResponseModel } from '../models/responseModel';
import { Brand } from '../models/brand';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private url = environment.apiUrl +"Brands/";

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient
      .get<ListResponseModel<Brand>>(this.url + 'getall');
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.url + "add"
    return this.httpClient
    .post<ResponseModel>(newPath,brand)
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.url + "delete"
    return this.httpClient
    .request<ResponseModel>("DELETE",newPath,{
      body: brand
    })
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.url + "update"
    return this.httpClient
    .put<ResponseModel>(newPath,brand)
  }
}
