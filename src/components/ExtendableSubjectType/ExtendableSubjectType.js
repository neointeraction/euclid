import React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ExtendableSubjectTypeContainer } from './extendableSubjectType.styles';

import NextIcon from '../../assets/images/icons/subject-type-next.svg';
import BackIcon from '../../assets/images/icons/subject-type-back.svg';

import './overiding.styles.css';
import { top100Films } from './dummyData';

const ExtendableSubjectType = (props) => {
  return (
    <ExtendableSubjectTypeContainer>
      <Typography variant="body1">Subject type</Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} />}
      />
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <img src={BackIcon} alt="" />
        <img src={NextIcon} alt="" />
      </div>
    </ExtendableSubjectTypeContainer>
  );
};

ExtendableSubjectType.propTypes = {};

export default ExtendableSubjectType;
