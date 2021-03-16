import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailModel } from '../models/modelResponses/rentaldetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentaldetailService {

  apiUrl='https://localhost:44327/api/rentals/getallrentaldetails';
  constructor(private httpClient:HttpClient) { }

  getRentalDetails():Observable<RentalDetailModel>{
    return this.httpClient.get<RentalDetailModel>(this.apiUrl);
  }
}
