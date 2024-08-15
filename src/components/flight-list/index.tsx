import { useEffect, useState } from 'react';
import FilterArea from '../filter-area';
import FlightItem from '../flight-item';
import './styles.scss';
import { useRecoilValue } from 'recoil';
import { filterState } from '../../utils/recoilStates';
import axios from 'axios';
import { Flight } from '../../utils/interfaces';

const FlightList = () => {
  const [flights, setFlights] = useState<Array<Flight>>([]);
  const [airlines, setAirlines] = useState<Array<any>>([]);
  const [routes, setRoutes] = useState<Array<any>>([]);
  const filterData = useRecoilValue<any>(filterState);

  const baseURL = 'http://localhost:9000/api/v1';

  const removeDuplicates = (arr: any[]) => {
    return arr.filter(
      (item, index) =>
        arr.findIndex((i) => item.publicName === i.publicName) === index
    );
  };

  const searchFlights = () => {
    const {
      route,
      flightDirection,
      departureDate,
      arrivalDate,
      arrivalTime,
      selectedAirline,
      numOfStops,
    } = filterData;
    let minArrivalTime = arrivalTime ? arrivalTime.minVal : '';
    let maxArrivalTime = arrivalTime ? arrivalTime.maxVal : '';

    let url = `${baseURL}/flights?route=${route}&flightDirection=${flightDirection}&departureDate=${departureDate}&arrivalDate=${arrivalDate}&minArrivalTime=${minArrivalTime}&maxArrivalTime=${maxArrivalTime}`;

    if (selectedAirline) {
      url += `&selectedAirline=${selectedAirline}`;
    }
    if (numOfStops !== undefined) {
      url += `&numOfStops=${numOfStops}`;
    }

    axios
      .get(url)
      .then((res) => {
        const allAirlines = res.data.flights.map(
          (flight: any) => flight.airline
        );
        if (airlines.length === 0) {
          setAirlines(removeDuplicates(allAirlines));
          setRoutes(res.data.flights.map((item: Flight) => item));
        }

        setFlights(res.data.flights);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searchFlights();
  }, [filterData]);
  return (
    <div className="flight-list-container">
      <div className="flight-list-content">
        {flights.map((flight: Flight, i: number) => (
          <FlightItem key={i} flightInfo={flight}></FlightItem>
        ))}
      </div>
      <div className="filter-area-content">
        <FilterArea airlines={airlines} routes={routes}></FilterArea>
      </div>
    </div>
  );
};

export default FlightList;
