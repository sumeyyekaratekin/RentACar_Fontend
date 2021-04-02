import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private url = environment.apiUrl + "cars/";


  constructor(private httpClient: HttpClient) { }

  getCarById(id:Number):Observable<SingleResponseModel<Car>>{
    let newPath = this.url + "GetById?id=" + id
    return this.httpClient
    .get<SingleResponseModel<Car>>(newPath)
  }

  getCarsDetails(brands?:number[],colors?:number[],carId?:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.url + "getcarsdetails"
    let queryParams = new HttpParams()
    brands?.forEach(element => {
      let brand = String(element)
      queryParams = queryParams.append("brandid",brand)
    });
    colors?.forEach(element => {
      let color = String(element)
      queryParams = queryParams.append("colorid",color)
    })
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath, {params: queryParams});
  }

  addCar(car:Car):Observable<ResponseModel>{
    let newPath = this.url + "add"
    return this.httpClient
    .post<ResponseModel>(newPath,car)
  }

  deleteCar(car:Car):Observable<ResponseModel>{
    let newPath = this.url + "delete"
    return this.httpClient
    .request<ResponseModel>("DELETE",newPath,{
      body: car
    })
  }

  updateCar(car:Car):Observable<ResponseModel>{
    let newPath = this.url + "update"
    return this.httpClient
    .put<ResponseModel>(newPath,car)
  }
}
