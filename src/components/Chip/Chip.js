import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

import ChipCloseIcon from 'assets/images/icons/chip-close.svg';

const CustomChip = ({ labelKey, labelValue, onRemove }) => {
  return (
    <div className="MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-filledDefault css-1fenuxh-MuiChip-root">
      <Chip style={{ display: 'none' }} />
      <div
        style={{
          padding: '10px',
          color: '#262626',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        (<span>{labelKey}:</span>
        <b style={{ fontWeight: 'bold' }}> {labelValue}</b>)
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
  labelKey: PropTypes.string.isRequired,
  labelValue: PropTypes.string.isRequired,
  onRemove: PropTypes.func, // func to remove the chip if it is removeable
};

export default CustomChip;
