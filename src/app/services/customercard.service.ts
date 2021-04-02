import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerCard } from '../models/customerCard';
import { FakeCard } from '../models/fakeCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomercardService {

  constructor(
    private httpClient:HttpClient,
    private authService:AuthService) { }

    private url = environment.apiUrl + "customercards/";

  saveCard(fakeCard:FakeCard): Observable<ResponseModel>{
    let customerCard:CustomerCard = {customerId:this.authService.currentUserId,cardId:fakeCard.id}
    let newPath = this.url + "add"
    return this.httpClient.post<ResponseModel>(newPath,customerCard)
  }

  deleteCard(fakeCard:FakeCard):Observable<ResponseModel>{
    let customerCard:CustomerCard = {customerId:this.authService.currentUserId,cardId:fakeCard.id}
    let newPath = this.url + "delete"
    return this.httpClient
      .request<ResponseModel>("DELETE",newPath,{
      body: customerCard
    })
  }

  getByCustomerId(customerId:number):Observable<ListResponseModel<CustomerCard>>{
    let newPath = this.url + "getbycustomerid?customerId=" + customerId
    return this.httpClient
      .get<ListResponseModel<CustomerCard>>(newPath)
  }
}
