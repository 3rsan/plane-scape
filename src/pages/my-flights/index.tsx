import axios from 'axios';
import { useEffect, useState } from 'react';
import './styles.scss';

const MyFlights = () => {
  const [flightList, setFlightList] = useState([]);

  useEffect(() => {
    if (!flightList.length) {
      axios
        .get('http://localhost:9000/api/v1/flightReservations')
        .then((res) => {
          setFlightList(res.data.data.reservations);
        });
    }
  }, []);

  return (
    <div className="reservation-container">
      <div className="reservation-search">
        <div className="reservation-filter-options">
          <p>Times</p>
          <p>Stops</p>
          <p>Airlines</p>
          <p>Airports</p>
          <p>Amenities</p>
          <div className="edit-search-button">Edit Search</div>
        </div>
        <div className="fligths-stars-container">
          <div className="fligths-stars"></div>
          <div className="stars-divider"></div>
        </div>
      </div>
      <div className="reservation-sorting-container">
        <p>
          Sort by: <span>Recommended</span>
        </p>
        <div className="average-price">
          <p>
            Avg Fare: <span>$225</span>
          </p>
        </div>
      </div>
      {flightList.map((flight: any, i: number) => {
        const {
          flightName,
          departureIata,
          arrivalIata,
          departureTime,
          arrivalTime,
          duration,
          airline,
        } = flight;
        return (
          <div key={i} className="reservation-item">
            <div className="reservation-item-detail">
              <div className="flight-time-container">
                <div className="reservation-flight-logo">LOGO</div>
                <div className="reservation-departure-time">
                  {departureTime}
                </div>
                <p className="time-divider"></p>
                <div className="reservation-arrival-time">{arrivalTime}</div>
              </div>
              <div className="flight-detail-container">
                <div className="flight-company-container">
                  <div className="flight-company">{airline}</div>
                  <div className="flight-company-detail-button">
                    Flight Details
                  </div>
                </div>
                <div className="flight-duration-container">
                  <div className="flight-type">Nonstop</div>
                  <div className="flight-duration">{duration}</div>
                </div>
                <div className="iata-container">
                  <div className="iata-detail">
                    <div className="departure-iata">{departureIata}</div>
                    <div>to</div>
                    <div className="arrival-iata">{arrivalIata}</div>
                  </div>
                  <div className="flight-name">{flightName}</div>
                </div>
              </div>
            </div>
            <div className="reservation-item-package">
              <div className="package-price">$125</div>
              <div className="package-price">$180</div>
              <div className="package-price">$240</div>
              <div className="package-price">$280</div>
              <div className="package-price">$350</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyFlights;
