import './styles.scss';
import AirplaneIcon from '../icons/airplane-icon';
import TakeOffIcon from '../icons/take-off-icon';
import LandingIcon from '../icons/landing-icon';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarIcon from '../icons/calendar-icon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';
import ColorToggleButton from '../toggle-button';
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { filterState } from '../../utils/recoilStates';
import { useRecoilState } from 'recoil';
import { FilterState } from '../../utils/interfaces';

const SearchBar = () => {
  const [fromCity, setFromCity] = useState<null | string>(null);
  const [toCity, setToCity] = useState<null | string>(null);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(
    dayjs(new Date().toString())
  );
  const [arrivalDate] = useState<Dayjs | null>(dayjs(new Date().toString()));
  const [fromCityOptions, setFromCityOptions] = useState<Array<any>>([
    { iata: 'AMS', name: 'Amsterdam Airport Schiphol' },
  ]);
  const [toCityOptions, setToCityOptions] = useState<Array<any>>([
    { iata: 'AMS', name: 'Amsterdam Airport Schiphol' },
  ]);
  const [isArrivalDateDisabled, setIsArrivalDateDisabled] = useState(false);
  const [filterData, setFilterData] = useRecoilState<FilterState>(filterState);

  const baseURL = 'http://localhost:9000/api/v1';

  const getAirportOptions = (value: string, type: string) => {
    axios
      .get(`${baseURL}/airports?name=${value}`)
      .then((res) => {
        const airportsData = res.data.data.airports;
        type === 'from'
          ? setFromCityOptions(airportsData)
          : setToCityOptions(airportsData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFromCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFromCity(newValue);
    getAirportOptions(newValue, 'from');
  };

  const handleToCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setToCity(newValue);
    getAirportOptions(newValue, 'to');
  };

  const handleFromCitySelect = (
    event: React.ChangeEvent<{}>,
    newValue: string
  ) => {
    setFromCity(newValue);
    setToCity('Amsterdam Airport Schiphol');
  };

  const handleToCitySelect = (
    event: React.ChangeEvent<{}>,
    newValue: string
  ) => {
    setToCity(newValue);
    setFromCity('Amsterdam Airport Schiphol');
  };

  const onToggleButtonChange = (isOneWay: boolean) => {
    setIsArrivalDateDisabled(isOneWay);
  };

  const searchFlights = () => {
    if (fromCity !== null && toCity !== null) {
      const { iata: fromCityValue }: any = fromCityOptions.find(
        (option: any) => {
          return option.name === fromCity;
        }
      );

      const { iata: toCityValue }: any = toCityOptions.find((option: any) => {
        return option.name === toCity;
      });

      let flightDirection = 'A';
      let route = fromCityValue;
      if (fromCity === 'Amsterdam Airport Schiphol') {
        flightDirection = 'D';
        route = toCityValue;
      }

      var departureDateValue = departureDate
        ? departureDate.toDate()
        : new Date();
      departureDateValue.setHours(
        0,
        -departureDateValue.getTimezoneOffset(),
        0,
        0
      ); //removing the timezone offset.

      // Set filter data
      setFilterData({
        ...filterData,
        route,
        flightDirection,
        departureDate: departureDateValue.toISOString().substring(0, 10),
        arrivalDate: '',
        numOfStops: 0,
      });
    }
  };

  return (
    <div className="search-container">
      <div className="title-area">
        <div>
          <div className="logo">
            <AirplaneIcon size={16} color="black" />
          </div>
          <h3>BOOK YOUR FLIGHT</h3>
        </div>
        <div className="switch">
          <ColorToggleButton
            onChange={onToggleButtonChange}
          ></ColorToggleButton>
        </div>
      </div>
      <div className="flight-search">
        <div className="flight-places">
          <Autocomplete
            id="free-solo-demo"
            value={fromCity}
            onChange={handleFromCitySelect}
            sx={{
              width: 200,
              marginRight: 1,
              '& fieldset': {
                borderTopLeftRadius: 33,
                borderBottomLeftRadius: 33,
              },
              '& .MuiInputBase-root': {
                height: '40px',
              },
            }}
            freeSolo
            options={fromCityOptions.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleFromCityChange}
                inputProps={{
                  ...params.inputProps,
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <TakeOffIcon size={20} color="#4B0097" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Autocomplete
            id="free-solo-demo2"
            value={toCity}
            onChange={handleToCitySelect}
            sx={{
              width: 200,
              height: 1,
              '& fieldset': {
                borderTopRightRadius: 33,
                borderBottomRightRadius: 33,
              },
              '& .MuiInputBase-root': {
                height: '40px',
              },
            }}
            freeSolo
            options={toCityOptions.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                onChange={handleToCityChange}
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LandingIcon size={20} color="#4B0097" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>
        <div className="flight-dates">
          <Box
            sx={{
              marginRight: 1,
              marginLeft: 2,
              '& .MuiStack-root': {
                paddingTop: 0,
              },
              '& .MuiInputBase-root': {
                height: '40px',
                overflowY: 'hidden',
              },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  value={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  minDate={dayjs()}
                  slots={{
                    openPickerIcon: () => (
                      <CalendarIcon size={16} color="#4B0097"></CalendarIcon>
                    ),
                  }}
                  slotProps={{
                    // Targets the `InputAdornment` component.
                    inputAdornment: {
                      position: 'start',
                    },
                  }}
                  sx={{
                    width: 200,
                    '& fieldset': {
                      borderTopLeftRadius: 33,
                      borderBottomLeftRadius: 33,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              '& .MuiStack-root': {
                paddingTop: 0,
              },
              '& .MuiInputBase-root': {
                height: '40px',
                overflowY: 'hidden',
              },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  disabled={isArrivalDateDisabled}
                  value={arrivalDate}
                  minDate={dayjs(departureDate)}
                  slots={{
                    openPickerIcon: () => (
                      <CalendarIcon size={16} color="#4B0097"></CalendarIcon>
                    ),
                  }}
                  slotProps={{
                    // Targets the `InputAdornment` component.
                    inputAdornment: {
                      position: 'start',
                    },
                  }}
                  sx={{
                    width: 200,
                    '& fieldset': {
                      borderTopRightRadius: 33,
                      borderBottomRightRadius: 33,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </div>
      </div>
      <div className="search-button">
        <button onClick={searchFlights}>Show Flights</button>
      </div>
    </div>
  );
};

export default SearchBar;
