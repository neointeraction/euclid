import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

const ModalCloseIcon = ({ onCloseIconClick }) => {
  return (
    <div style={{ position: 'relative' }}>
      <CloseIcon
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '0px',
          right: '0px',
        }}
        onClick={onCloseIconClick}
        fontSize="small"
      />
    </div>
  );
};

ModalCloseIcon.propTypes = {
  onCloseIconClick: PropTypes.func,
};

export default ModalCloseIcon;
