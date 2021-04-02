import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private url = environment.apiUrl + "colors/";


  constructor(private httpClient: HttpClient) { }

  getColors():Observable<ListResponseModel<Color>> {
    return this.httpClient
      .get<ListResponseModel<Color>>(this.url + 'getall');
  }

  addColor(color:Color):Observable<ResponseModel>{
    let newPath = this.url + "add"
    return this.httpClient
    .post<ResponseModel>(newPath,color)
  }

  deleteColor(color:Color):Observable<ResponseModel>{
    let newPath = this.url + "delete"
    return this.httpClient
    .request<ResponseModel>("DELETE",newPath,{
      body: color
    })
  }
  
  updateColor(color:Color):Observable<ResponseModel>{
    let newPath = this.url + "update"
    return this.httpClient
    .put<ResponseModel>(newPath,color)
  }
}
