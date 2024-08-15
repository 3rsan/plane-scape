import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';
import { tripState } from '../../utils/recoilStates';
import { useRecoilState } from 'recoil';

export default function ColorToggleButton({ onChange }: any) {
  const [tripStateValue, setTripStateValue] = useRecoilState(tripState);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setTripStateValue(newAlignment);
      onChange(newAlignment === 'One Way');
    }
  };

  const toggleButtonStyle = {
    '&.MuiToggleButton-root': {
      backgroundColor: '#F0ECF2',
      color: '#4B0097',
      height: '30px',
      marginBottom: '10px',
      fontSize: '10px',
      textTransform: 'none',
      width: '90px',
    },
    '&.Mui-selected,&.Mui-selected:hover': {
      backgroundColor: '#4B0097',
      color: 'white',
    },
  };

  return (
    <ToggleButtonGroup
      value={tripStateValue}
      size="small"
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton
        value="Round Trip"
        sx={{
          borderRadius: '20px 0 0 20px',
          ...toggleButtonStyle,
          marginRight: '2px',
        }}
      >
        Round Trip
      </ToggleButton>
      <ToggleButton
        value="One Way"
        sx={{
          borderRadius: '0px 20px 20px 0px',
          ...toggleButtonStyle,
        }}
      >
        One Way
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
