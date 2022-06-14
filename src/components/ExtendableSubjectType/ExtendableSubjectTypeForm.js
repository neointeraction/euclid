import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import NextIcon from '../../assets/images/icons/subject-type-next.svg';
import BackIcon from '../../assets/images/icons/subject-type-back.svg';

import { CloseOutlined } from '@mui/icons-material';

const ExtendableSubjectTypeForm = ({
  onAddToRight,
  onAddToLeft,
  options,
  onRemove,
}) => {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Subject type</Typography>
        {onRemove && <CloseOutlined onClick={onRemove} fontSize="medium" />}
      </div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        style={{ width: '100%', background: 'white', padding: '0px' }}
        onChange={(_e, value) => console.log('Selected value ---', value)}
        renderInput={(params) => <TextField {...params} />}
      />
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <img src={BackIcon} onClick={onAddToLeft} alt="" />
        <img src={NextIcon} onClick={onAddToRight} alt="" />
      </div>
    </React.Fragment>
  );
};

ExtendableSubjectTypeForm.propTypes = {
  options: PropTypes.array.isRequired,
  onAddToLeft: PropTypes.func,
  onAddToRight: PropTypes.func,
};

export default ExtendableSubjectTypeForm;
