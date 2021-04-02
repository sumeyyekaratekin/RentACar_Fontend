import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalDetail } from '../models/rentalDetail';
import { Rental } from '../models/rental';
import { Customer } from '../models/customer';
import { CustomerService } from './customer.service';
import { Car } from '../models/car';
import { environment } from 'src/environments/environment';
import { ResponseModel ,ListResponseModel,SingleResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private url = environment.apiUrl + "rentals/";
  constructor(
    private httpClient: HttpClient,
    private customerService: CustomerService) { }

  getAllRentalDetail():Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.url + "getallrentaldetails"
    return this.httpClient
      .get<ListResponseModel<RentalDetail>>(this.url);
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.url + "getallbycarid?carid=" + carId
    return this.httpClient
    .get<ListResponseModel<Rental>>(newPath);
  }
  
  addRental(rental:Rental){
    let newPath = this.url + "add"
    this.httpClient.post(newPath,rental).subscribe()
  }

  getLastByCarId(carId:number):Observable<Rental>{
    let newPath = this.url + "getlastbycarid?carid=" + carId
    return this.httpClient.get<Rental>(newPath);
  }

  isRentable(rental:Rental):Observable<ResponseModel>{
    let newPath = this.url + "isrentable"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
