import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-car-collection',
  templateUrl: './car-collection.component.html',
  styleUrls: ['./car-collection.component.css']
})
export class CarCollectionComponent implements OnInit {

  carsData: any;

  companyName: string = '';
  modelName: string = '';
  color: string = '';

  showModels: boolean = false;
  showColors: boolean = false;

  showResult: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((res) => {
      this.carsData = res;
    });
  }

  onCompanyChange(): void {
    this.showModels = true;
    this.showColors = false;
    this.showResult = false;

    this.modelName = '';
  }

  onModelChange(): void {
    this.showColors = true;
    this.showResult = false;

    this.color = '';
  }

  onColorChange(): void {
    this.showResult = true;
  }
}
