export interface Planet {
    name: string;
    distance: number;
}

export interface Planets extends Array<Planet> { }

export interface Vehicle {
    name: string;
    total_no: number;
    max_distance: number;
    speed: number;
}

export interface Vehicles extends Array<Vehicle> { }

export interface Token {
    token: string;
}
