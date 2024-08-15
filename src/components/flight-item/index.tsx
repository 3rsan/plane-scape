import AirplaneIcon from '../icons/airplane-icon';
import LandingIcon from '../icons/landing-icon';
import TakeOffIcon from '../icons/take-off-icon';
import './styles.scss';
import { tripState } from '../../utils/recoilStates';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Flight } from '../../utils/interfaces';

interface FlightItemProps {
  flightInfo: Flight;
}

const FlightItem = ({ flightInfo }: FlightItemProps) => {
  const [tripStateValue] = useRecoilState(tripState);
  const navigate = useNavigate();
  const {
    scheduleTime,
    scheduleDateTime,
    duration,
    flightDirection,
    airline: { publicName: airline },
    flightName,
    destination: { iata, city, country },
  } = flightInfo;
  const scheduleTimeValue = scheduleTime.substring(0, 5);

  const bookFlight = () => {
    const requestData = {
      flightName,
      airline,
      departureIata: flightDirection === 'A' ? iata : 'AMS',
      arrivalIata: flightDirection === 'A' ? 'AMS' : iata,
      duration,
      departureTime:
        flightDirection === 'A' ? arrivalTimeString : scheduleTimeValue,
      arrivalTime:
        flightDirection === 'A' ? scheduleTimeValue : arrivalTimeString,
    };

    axios
      .post('http://localhost:9000/api/v1/flightReservations', requestData)
      .then((res) => {
        console.log(res);
        navigate('/my-reservations');
      });
  };

  const addMinutesToDate = (date: any, n: number) => {
    const d = new Date(
      date.toLocaleString('en-US', {
        timeZone: '+02:00',
      })
    );
    d.setTime(d.getTime() + n * 60_000);
    return d;
  };

  const calculateLandingTime = () => {
    let date = new Date(
      scheduleDateTime.toLocaleString('en-US', {
        timeZone: '+02:00',
      })
    );

    if (flightDirection === 'A') {
      return addMinutesToDate(date, -duration);
    } else {
      return addMinutesToDate(date, duration);
    }
  };

  const arrivalTime = calculateLandingTime();
  const arrivalTimeString = `${arrivalTime
    .getHours()
    .toString()
    .padStart(2, '0')}:${arrivalTime.getMinutes().toString().padStart(2, '0')}`;

  const getDuration = () => {
    return duration > 60
      ? Math.floor(duration / 60) + 'h ' + (duration % 60) + 'm'
      : duration + 'm';
  };

  let departureAirportCode = 'AMS',
    arrivalAirportCode = 'AMS';

  let departureCity = 'Amsterdam',
    arrivalCity = 'Amsterdam';

  if (flightDirection === 'A') {
    departureAirportCode = iata;
    departureCity = city || country;
  } else {
    arrivalAirportCode = iata;
    arrivalCity = city || country;
  }

  return (
    <>
      <div className="flight-item-container">
        <div className="cities">{`${departureCity} - ${arrivalCity}`}</div>

        <div className="flight-card">
          <div className="from-content">
            <div className="departure">
              <TakeOffIcon></TakeOffIcon> Departure
            </div>
            <div className="take-off-time">
              {flightDirection === 'A' ? arrivalTimeString : scheduleTimeValue}
            </div>
            <div className="airport">{`Airport: ${departureAirportCode}`}</div>
          </div>

          <div className="divider-line"></div>

          <div className="flight-info">
            <div className="flight-company">{airline}</div>
            <AirplaneIcon color="#4B0097"></AirplaneIcon>
            <div className="duration">{`${getDuration()}`}</div>
          </div>

          <div className="divider-line"></div>

          <div className="to-content">
            <div className="arrival">
              <LandingIcon></LandingIcon> Arrival
            </div>
            <div className="landing-time">
              {flightDirection === 'A' ? scheduleTimeValue : arrivalTimeString}
            </div>
            <div className="airport">{`Airport: ${arrivalAirportCode}`}</div>
          </div>
        </div>

        <div className="flight-footer">
          <div className="price-content">
            <div className="price">{`Price: ${'$200'}`}</div>
            <div className="trip-type">{tripStateValue}</div>
          </div>
          <div className="book-flight-button" onClick={bookFlight}>
            Book Flight
          </div>
        </div>
      </div>
      <div className="flight-detail-button">Check the details</div>
    </>
  );
};

export default FlightItem;
