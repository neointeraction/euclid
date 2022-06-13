import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

import { AlertContainer } from './alert.styles';

import AlertErrorIcon from 'assets/images/icons/alert-error.svg';
import AlertWarningIcon from 'assets/images/icons/alert-warning.svg';
import AlertSuccessIcon from 'assets/images/icons/alert-success.svg';

const CusAlert = ({ type, onClose, message }) => {
  return (
    <AlertContainer type={type}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <img
          src={
            type === 'success'
              ? AlertSuccessIcon
              : type === 'warning'
              ? AlertWarningIcon
              : AlertErrorIcon
          }
          alt=""
        />
        <p>{message}</p>
      </div>
      <CloseIcon
        style={{ cursor: 'pointer' }}
        onClick={onClose}
        fontSize="small"
      />
    </AlertContainer>
  );
};

CusAlert.propTypes = {
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  message: PropTypes.string.isRequired,
};

export default CusAlert;
