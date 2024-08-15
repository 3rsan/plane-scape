import { useEffect, useState } from 'react';
import './styles.scss';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRecoilState } from 'recoil';
import { filterState } from '../../utils/recoilStates';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { get } from 'http';

interface FilterAreaProps {
  airlines: Array<any>;
  routes: any;
}

const FilterArea = ({ airlines, routes }: FilterAreaProps) => {
  const [sort, setSort] = useState('Lowest Price');
  const [filterData, setFilterData] = useRecoilState<any>(filterState);
  const [arrivalTimeChecked, setArrivalTimeChecked] = useState({
    night: true,
    morning: true,
    noon: true,
    evening: true,
  });

  const { night, morning, noon, evening } = arrivalTimeChecked;
  const [airlineChecked, setAirlineChecked] = useState('');
  const [stopsChecked, setStopsChecked] = useState('nonStop');

  const stopOptions = [
    { optionName: 'nonStop', label: 'Nonstop' },
    { optionName: 'oneStop', label: '1 Stop' },
    { optionName: 'twoPlusStop', label: '2+ Stops' },
  ];

  const onStopsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStopsChecked(event.target.value);
  };

  const getTimeInterval = (time: string) => {
    switch (time) {
      case 'night':
        return '00:00-05:59';
      case 'morning':
        return '06:00-11:59';
      case 'noon':
        return '12:00-17:59';
      case 'evening':
        return '18:00-23:59';
      default:
        return '';
    }
  };

  const onArrivalTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArrivalTimeChecked({
      ...arrivalTimeChecked,
      [event.target.name]: event.target.checked,
    });
  };

  const onAirlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAirlineChecked(event.target.value);
  };

  const onSortSelected = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const getNumberOfStops = () => {
    if (stopsChecked === 'nonStop') {
      return 0;
    } else if (stopsChecked === 'oneStop') {
      return 1;
    } else {
      return 2;
    }
  };

  useEffect(() => {
    const arrivalTimeValues: Array<string> = [];
    Object.entries(arrivalTimeChecked).forEach(([key, value]) => {
      if (value) {
        arrivalTimeValues.push(getTimeInterval(key));
      }
    });

    setFilterData({
      ...filterData,
      arrivalTime: {
        minVal: arrivalTimeValues[0].split('-')[0],
        maxVal: arrivalTimeValues[arrivalTimeValues.length - 1].split('-')[1],
      },
      selectedAirline: airlineChecked,
      numOfStops: getNumberOfStops(),
    });
  }, [arrivalTimeChecked, airlineChecked, stopsChecked]);

  return (
    <div className="filter-area-container">
      <div className="sorting">
        <h4>Sort by:</h4>
        <div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            sx={{ backgroundColor: 'white', borderColor: 'white' }}
            onChange={onSortSelected}
          >
            <MenuItem value={'Lowest Price'}>Lowest Price</MenuItem>
            <MenuItem value={'xHighest Price'}>Highest Price</MenuItem>
          </Select>
        </div>
      </div>
      <div className="arrival-time">
        <h4>Arrival Time</h4>
        <FormControlLabel
          control={
            <Checkbox
              checked={night}
              onChange={onArrivalTimeChange}
              defaultChecked
              name={'night'}
              sx={{
                '&.Mui-checked': {
                  color: '#4B0097',
                },
              }}
            />
          }
          label={`${'00:00'} - ${'05:59'}`}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={morning}
              onChange={onArrivalTimeChange}
              defaultChecked
              name={'morning'}
              sx={{
                '&.Mui-checked': {
                  color: '#4B0097',
                },
              }}
            />
          }
          label={`${'06:00'} - ${'11:59'}`}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={noon}
              onChange={onArrivalTimeChange}
              name={'noon'}
              sx={{
                '&.Mui-checked': {
                  color: '#4B0097',
                },
              }}
            />
          }
          label={`${'12:00'} - ${'17:59'}`}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={evening}
              onChange={onArrivalTimeChange}
              name={'evening'}
              sx={{
                '&.Mui-checked': {
                  color: '#4B0097',
                },
              }}
            />
          }
          label={`${'18:00'} - ${'23:59'}`}
        />
      </div>
      <div className="stops-container">
        <h4>Stops</h4>
        <RadioGroup
          name="selectedAirline"
          onChange={onStopsChange}
          value={stopsChecked}
        >
          {stopOptions.map((option: any, i: number) => (
            <FormControlLabel
              key={i}
              value={option.optionName}
              control={
                <Radio
                  sx={{
                    '&.Mui-checked': {
                      color: '#4B0097',
                    },
                  }}
                />
              }
              label={option.label}
            />
          ))}
        </RadioGroup>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={nonStop}
              onChange={onStopsChange}
              sx={{
                '&.Mui-checked': {
                  color: '#4B0097',
                },
              }}
              name="nonStop"
            />
          }
          label="Nonstop"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={oneStop}
              onChange={onStopsChange}
              sx={{
                '&.Mui-checked': {
                  color: '#4B0097',
                },
              }}
              name="oneStop"
            />
          }
          label="1 Stop"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={twoPlusStop}
              onChange={onStopsChange}
              sx={{
                '&.Mui-checked': {
                  color: '#4B0097',
                },
              }}
              name="twoPlusStop"
            />
          }
          label="2+ Stops"
        /> */}
      </div>
      <div className="airlines-included">
        <h4>Airlines Included</h4>
        <RadioGroup
          name="selectedAirline"
          onChange={onAirlineChange}
          value={airlineChecked}
        >
          {airlines.map((airline: any, i: number) => (
            <FormControlLabel
              key={i}
              value={airline.iata}
              control={
                <Radio
                  sx={{
                    '&.Mui-checked': {
                      color: '#4B0097',
                    },
                  }}
                />
              }
              label={airline.publicName}
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterArea;
