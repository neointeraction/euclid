import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

import { AlertContainer, AletBox } from './alert.styles';

import AlertErrorIcon from 'assets/images/icons/alert-error.svg';
import AlertWarningIcon from 'assets/images/icons/alert-warning.svg';
import AlertSuccessIcon from 'assets/images/icons/alert-success.svg';

const CusAlert = ({ type, onClose, message }) => {
  return (
    <AlertContainer type={type}>
      <AletBox>
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
      </AletBox>
      <CloseIcon
        style={{ cursor: 'pointer' }}
        onClick={onClose}
        fontSize="small"
      />
    </AlertContainer>
  );
};

CusAlert.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'error']),
  onClose: PropTypes.func,
  message: PropTypes.string.isRequired,
};

export default CusAlert;
