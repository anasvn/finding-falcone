import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Planets, Vehicles, Token } from 'src/app/static-data/interfaces';
import { Constants } from 'src/app/static-data/constants';

@Component({
  selector: 'app-find-falcon',
  templateUrl: './find-falcon.component.html',
  styleUrls: ['./find-falcon.component.scss'],
})
export class FindFalconComponent implements OnInit {
  numberOfDestination = Constants.numberOfDestination;
  selectedItems: Array<any> = [];
  planets: Planets = [];
  vehicles: Vehicles = [];
  availablePlanets: any = [];
  availableVehicles: any = [];
  arrivalTimeByPlanet: any = [];
  constructor(
    private readonly dataService: DataService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.isLoading.next(true);
    this.dataService.getPlanets().subscribe((data: Planets) => {
      this.planets = data;
      this.dataService.isLoading.next(false);
      this.planets.forEach((element) => {
        this.availablePlanets.push({
          name: element.name,
          distance: element.distance,
          available: true,
        });
      });
    });
    this.dataService.isLoading.next(true);
    this.dataService.getVehicles().subscribe((data: Vehicles) => {
      this.dataService.isLoading.next(false);
      this.vehicles = data;
      this.availableVehicles = this.vehicles;
    });
    for (let index = 0; index < this.numberOfDestination; index++) {
      this.selectedItems[index] = {
        planets: {
          name: Constants.notAvailableValue,
          distance: Constants.notAvailableValue,
          imageUrl: Constants.planetUnknownImage,
          isSet: false,
        },
        vehicles: {
          name: Constants.notAvailableValue,
          speed: Constants.notAvailableValue,
          maxDistance: Constants.notAvailableValue,
          imageUrl: Constants.vehicleUnknownImage,
          isSet: false,
        },
      };
    }
  }
  /**
   * On selecting destination planet
   */
  selectDestination({ destinationIndex, planetObj }) {
    this.availablePlanets.forEach((element) => {
      if (element.name === planetObj.name) {
        element.available = false;
      }
      if (this.selectedItems[destinationIndex].planets.isSet) {
        if (
          element.name === this.selectedItems[destinationIndex].planets.name
        ) {
          element.available = true;
        }
      }
    });
    this.selectedItems[destinationIndex].planets.name = planetObj.name;
    this.selectedItems[destinationIndex].planets.distance =
      planetObj.distance;
    this.selectedItems[destinationIndex].planets.imageUrl =
      'assets/img/planets/' + planetObj.name + '.png';
    this.selectedItems[destinationIndex].planets.isSet = true;
    this.resetVehiclesOnDestinationChange(destinationIndex);
  }
  /**
   * function to write selected vehicle
   */
  selectVehicle({ destinationIndex, vehicleObj }) {
    this.availableVehicles.forEach((element) => {
      if (element.name === vehicleObj.name) {
        element.total_no = --element.total_no;
      }
      if (this.selectedItems[destinationIndex].vehicles.isSet) {
        if (
          element.name === this.selectedItems[destinationIndex].vehicles.name
        ) {
          element.total_no = ++element.total_no;
        }
      }
    });
    this.selectedItems[destinationIndex].vehicles.imageUrl =
      'assets/img/vehicles/' + vehicleObj.name + '.png';
    this.selectedItems[destinationIndex].vehicles.name = vehicleObj.name;
    this.selectedItems[destinationIndex].vehicles.speed = vehicleObj.speed;
    this.selectedItems[destinationIndex].vehicles.maxDistance =
      vehicleObj.max_distance;
    this.selectedItems[destinationIndex].vehicles.isSet = true;
    this.arrivalTimeByPlanet[destinationIndex] =
      this.selectedItems[destinationIndex].planets.distance /
      this.selectedItems[destinationIndex].vehicles.speed;
  }
  /**
   * function to reset vehicle selection on destination change
   * @param destinationIndex index value of destination
   */
  resetVehiclesOnDestinationChange(destinationIndex) {
    this.availableVehicles.forEach((element) => {
      if (this.selectedItems[destinationIndex].vehicles.isSet) {
        if (
          element.name === this.selectedItems[destinationIndex].vehicles.name
        ) {
          element.total_no = ++element.total_no;
        }
      }
    });
    this.selectedItems[destinationIndex].vehicles = {
      name: Constants.notAvailableValue,
      speed: Constants.notAvailableValue,
      maxDistance: Constants.notAvailableValue,
      imageUrl: Constants.vehicleUnknownImage,
      isSet: false,
    };
  }
  /**
   * function to validate selected data
   */
  get checkAllDestinationAndVehiclesAreSet(): boolean {
    let isReadyToFindFalcone = true;
    this.selectedItems.forEach((item) => {
      if (!item.vehicles.isSet || !item.planets.isSet) {
        isReadyToFindFalcone = false;
      }
    });
    return isReadyToFindFalcone;
  }
  /**
   * function to get available non selected planets
   */
  get getAvailablePlanets(): any {
    const result = this.availablePlanets.filter((item) => item.available);
    return result;
  }
  /**
   * function to get vehicle which is available in numbers and are able to cover the distance
   */
  getAvailableVehicles(distance) {
    let result = [];
    result = this.availableVehicles.filter(
      (item) => item.max_distance >= distance && item.total_no > 0
    );
    return result;
  }
  /**
   * function to retrive selected vehicles and planets
   */
  get getSelectedDestinationAndVehicles() {
    const result = {
      planet_names: [],
      vehicle_names: [],
      token: null
    };
    this.selectedItems.forEach((item) => {
      result.planet_names.push(item.planets.name);
      result.vehicle_names.push(item.vehicles.name);
    });
    return result;
  }
  /**
   * function to calculate est time
   */
  get getTotalTime() {
    let totalTime = 0;
    this.arrivalTimeByPlanet.forEach((element) => {
      totalTime += element;
    });
    return totalTime;
  }
  /**
   *  function to get token and serach falcone
   */
  findFalcone() {
    this.dataService.isLoading.next(true);
    if (this.checkAllDestinationAndVehiclesAreSet) {
      this.dataService.getToken().subscribe((data: Token) => {
        const requestData = this.getSelectedDestinationAndVehicles;
        requestData.token = data.token;
        this.dataService.findFalcone(requestData).subscribe((falconeData: any) => {
          this.dataService.isLoading.next(false);
          if (falconeData.status === 'success') {
            falconeData.time = this.getTotalTime;
            falconeData.search_data = this.selectedItems.filter((item) => {
              if (falconeData.planet_name === item.planets.name) {
                return item;
              }
            });
            falconeData.search_data = falconeData.search_data[0];
          }
          this.dataService.updateLatestResult(falconeData);
          this.router.navigate(['/result']);
        });
      });
    }
  }
  /**
   * funtion to reset selected data
   */
  resetData() {
    this.availablePlanets = [];
    this.availableVehicles = [];
    this.selectedItems = [];
    this.arrivalTimeByPlanet = [];
    this.availableVehicles = this.vehicles;
    this.planets.forEach((element) => {
      this.availablePlanets.push({
        name: element.name,
        distance: element.distance,
        available: true,
      });
    });
    for (let index = 0; index < this.numberOfDestination; index++) {
      this.selectedItems[index] = {
        planets: {
          name: Constants.notAvailableValue,
          distance: Constants.notAvailableValue,
          imageUrl: Constants.planetUnknownImage,
          isSet: false,
        },
        vehicles: {
          name: Constants.notAvailableValue,
          speed: Constants.notAvailableValue,
          maxDistance: Constants.notAvailableValue,
          imageUrl: Constants.vehicleUnknownImage,
          isSet: false,
        },
      };
    }
  }
}
