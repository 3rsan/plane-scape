import { atom } from 'recoil';
import { FilterState } from './interfaces';

export const tripState = atom({
  key: 'tripState',
  default: 'Round Trip',
});

export const filterState = atom<FilterState>({
  key: 'filterState',
  default: {
    route: '',
    flightDirection: '',
    departureDate: '',
    arrivalDate: '',
    arrivalTime: {
      minVal: '',
      maxVal: '',
    },
    numOfStops: 0,
  },
});
