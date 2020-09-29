import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  @Input() item: any;
  @Input() index: any;
  @Input() availablePlanets: any;
  @Output() readonly selectOption: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectDestination(destinationIndex, planetObj): void {
    this.selectOption.emit({ destinationIndex, planetObj });
  }

}
