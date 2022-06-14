import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

import ChipCloseIcon from 'assets/images/icons/chip-close.svg';
import React from 'react';

const CustomChip = ({ content, onRemove, ...rest }) => {
  return (
    <div className="MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-filledDefault css-1fenuxh-MuiChip-root">
      <Chip style={{ display: 'none' }} {...rest} />
      <div
        style={{
          padding: '10px',
          color: '#262626',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        (
        {content.map(({ labelKey, labelValue }) => (
          <React.Fragment key={labelValue}>
            <span>{labelKey}:</span>
            <b style={{ fontWeight: 'bold' }}> {labelValue}</b>
          </React.Fragment>
        ))}
        )
        {onRemove && (
          <img
            src={ChipCloseIcon}
            alt=""
            style={{ marginLeft: '6px', cursor: 'pointer' }}
            onClick={onRemove}
          />
        )}
      </div>
    </div>
  );
};

CustomChip.propTypes = {
  onRemove: PropTypes.func, // func to remove the chip if it is removeable
  content: PropTypes.array, // array of object eg, [{labelKey:"key",labelValue:"Value"}]
};

export default CustomChip;
