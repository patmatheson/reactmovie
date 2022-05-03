import React from 'react';
import logo from './logo.svg';
import Chip from '@mui/material/Chip';

interface patprops{
  message: string
}

function Pat(props: patprops) {
  return (
    <div className="Pat">
      <Chip label={props.message} />
    </div>
  );
}

export default Pat;
