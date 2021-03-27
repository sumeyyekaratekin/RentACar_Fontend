import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car, CarDetail } from '../models/car';
import { ListResponseModel, ResponseModel, SingleResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  private url = environment.apiUrl + "Cars/";

  constructor(private httpClient: HttpClient) { }
  
  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.url + "getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailsById(carId:number):Observable<SingleResponseModel<CarDetail>> {
    let newPath = this.url + "getcardetailsbyid?id=" + carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.url + "getcardetailsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByColor(colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.url + "getcardetailsbycolorid?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.url + "getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailsByBrandAndColor(brandId:number, colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.url + "getcardetailsbybrandidandcolorid?brandId="+ brandId +"&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car: Car): Observable<ResponseModel> {
    let newPath = this.url + 'cars/add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  update(car: Car): Observable<ResponseModel> {
    let newPath = this.url + 'cars/update';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }


}
