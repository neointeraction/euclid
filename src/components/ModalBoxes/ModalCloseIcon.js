import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { ModalCloseIconContainer } from './modalboxes.styles';

const ModalCloseIcon = ({ onCloseIconClick }) => {
  return (
    <ModalCloseIconContainer>
      <CloseIcon
        className="icon-itself"
        onClick={onCloseIconClick}
        fontSize="small"
      />
    </ModalCloseIconContainer>
  );
};

ModalCloseIcon.propTypes = {
  onCloseIconClick: PropTypes.func,
};

export default ModalCloseIcon;
