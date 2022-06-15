import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import NextIcon from '../../assets/images/icons/subject-type-next.svg';
import BackIcon from '../../assets/images/icons/subject-type-back.svg';

import { CloseOutlined } from '@mui/icons-material';
import { ExtendableSubjectTypeFormContainer } from './extendableSubjectType.styles';

const ExtendableSubjectTypeForm = ({
  onAddToRight,
  onAddToLeft,
  options,
  onRemove,
  onChange,
}) => {
  return (
    <ExtendableSubjectTypeFormContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Subject type</Typography>
        {onRemove && (
          <CloseOutlined
            style={{ cursor: 'pointer' }}
            onClick={onRemove}
            fontSize="medium"
          />
        )}
      </div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        style={{ width: '100%', background: 'white', padding: '0px' }}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <img src={BackIcon} onClick={onAddToLeft} alt="" />
        <img src={NextIcon} onClick={onAddToRight} alt="" />
      </div>
    </ExtendableSubjectTypeFormContainer>
  );
};

ExtendableSubjectTypeForm.propTypes = {
  options: PropTypes.array.isRequired,
  onAddToLeft: PropTypes.func,
  onAddToRight: PropTypes.func,
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
};

export default ExtendableSubjectTypeForm;
