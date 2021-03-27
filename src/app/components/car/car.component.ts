import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {

  cardetails: CarDetail[] = [];  
  
  brands: Brand[] = [];
  colors: Color[] = [];
  
  carFilterText = "";
  currentBrand:number;
  currentColor:number;

  dataLoaded = false;

  constructor(private carService: CarService, 
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {

    this.getBrands(); 
    this.getColors(); 

    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarDetailsByBrandAndColor(params["brandId"], params["colorId"]);
      } else if(params["colorId"]){
        this.getCarDetailsByColor(params["colorId"]);
      } else if (params["brandId"]){
        this.getCarDetailsByBrand(params["brandId"]);
      } else {
        this.getCarDetails();
      }
    });

  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsByBrand(brandId:number) {
    this.carService.getCarDetailsByBrand(brandId).subscribe((response) => {
      this.cardetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsByColor(colorId:number) {
    this.carService.getCarDetailsByColor(colorId).subscribe((response) => {
      this.cardetails = response.data;
      this.dataLoaded = true;
    });
  }

    getCarDetailsByBrandAndColor(brandId:number, colorId:number) {
    this.carService.getCarDetailsByBrandAndColor(brandId, colorId).subscribe((response) => {
      this.cardetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.cardetails = response.data;
      this.dataLoaded = true;
    });
  }
}
