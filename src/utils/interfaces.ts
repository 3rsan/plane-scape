export interface IconProps {
  size?: number;
  color?: string;
}

export interface FilterState {
  route: string;
  flightDirection: string;
  departureDate: string;
  arrivalDate: string;
  arrivalTime: ArrivalTime;
  numOfStops: number;
}

interface ArrivalTime {
  minVal: string;
  maxVal: string;
}

export interface Flight {
  flightName: string;
  scheduleTime: string;
  flightDirection: string;
  publicFlightState: FlightState;
  route: Route;
  prefixIATA: string;
  serviceType: string;
  destination: Destination;
  scheduleDateTime: Date;
  duration: number;
  airline: Airline;
}

interface FlightState {
  flightStates: string[];
}

interface Route {
  destinations: string[];
  eu: string;
  visa: boolean;
}

interface Destination {
  city: string;
  country: string;
  iata: string;
  publicName: DestinationPublicName;
}

interface DestinationPublicName {
  dutch: string;
  english: string;
}

interface Airline {
  iata: string;
  icao: string;
  nvls: number;
  publicName: string;
}
