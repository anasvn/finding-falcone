import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  @Input() item: any;
  @Input() index: any;
  @Input() availableVehicles: any;
  @Output() readonly selectOption: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  selectVehicle(destinationIndex, vehicleObj): void {
    this.selectOption.emit({ destinationIndex, vehicleObj });

  }

}
