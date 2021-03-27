import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerDetail } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})

export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  customers: CustomerDetail[] = [];
  currentCar: CarDetail;
  rentDate: Date;
  returnDate: Date;
  totalPrice:number = 0;
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private cartService : CartService
  ) {}

  ngOnInit(): void {
    this.rentDate = new Date();
    this.returnDate = new Date();

    this.getCustomerDetails();
    this.createRentalAddForm();

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.carId) {
        this.getCarDetailsById(params.carId);
      }
    });
  }

  getCarDetailsById(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.currentCar = response.data;
    });
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      carId: [''],
      returnDate: [''],
    });
  }
  addToCart() {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      rentalModel.carId = this.currentCar.id;
      this.cartService.addToCart(rentalModel);
      this.toastrService.success("Sepete Eklendi", this.currentCar.carName);
    } else {
      this.toastrService.error('Formunuz eksik', 'Hata');
    }
  }

  getCustomerDetails() {
    this.customerService.getCustomerDetails().subscribe((response) => {
      this.customers = response.data;
      this.dataLoaded = true;
    });
  }
  
  calcTotalPrice() {
    let startDate = new Date(this.rentalAddForm.value.rentDate);
    let endDate = new Date(this.rentalAddForm.value.returnDate);
    if( isNaN(startDate.getTime()) || isNaN(endDate.getTime())   ){
      this.totalPrice = 0;
    } else if ( startDate > endDate ) {
      this.totalPrice = 0;    
    } else {
      let dateDiff = Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);
      this.totalPrice = dateDiff * this.currentCar.dailyPrice;
    }
  }

}
