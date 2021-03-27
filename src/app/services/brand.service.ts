import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})

export class BrandService {

  private url = environment.apiUrl + "Brands/";

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.url + "getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getById(id: number): Observable<ListResponseModel<Brand>> {
    let newPath = this.url + "getbyid?id=" + id;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  addToBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.url + 'brands/add', brand);
  }

  addBrand(brand: Brand) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url + "brands/add", brand);
  }

  updateBrand(brand: Brand) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url + "brands/update", brand);
  }

}
