import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { CarDetailService } from 'src/app/services/cardetail.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})

export class CardetailComponent implements OnInit {

  cardetails : CarDetail[] = [];
  carimages: CarImage[] = [];

  constructor( private carService: CarService, private carDetailService: CarDetailService,  private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsById(params["carId"]);
        this.getImagesByCarId(params["carId"]);
      } else {
        this.getImagesByCarId(params["carId"]);
      }
    })    
  }

  getCarDetailsById(carId:number){
    this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.cardetails = response.data;
    })
  }

  getImagesByCarId(carId:number){
    this.carDetailService.getImagesByCarId(carId).subscribe(response=>{
      this.carimages = response.data;
    })
  }

  getCurrentImageClass(image:CarImage){
    if(image == this.carimages[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  

}
