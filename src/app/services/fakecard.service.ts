import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FakeCard } from '../models/fakeCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FakecardService {

  constructor(private httpClient: HttpClient) { }

  private url = environment.apiUrl + "fakecards/";

  isCardExist(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.url + "iscardexist"
    return this.httpClient.post<ResponseModel>(newPath,fakeCard);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.url + "getbycardnumber?cardnumber=" + cardNumber
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }

  getCardById(id:number):Observable<SingleResponseModel<FakeCard>>{
    let newPath = this.url + "getbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<FakeCard>>(newPath);
  }

  updateCard(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.url + "update"
    return this.httpClient.put<ResponseModel>(newPath,fakeCard)
  }
}
