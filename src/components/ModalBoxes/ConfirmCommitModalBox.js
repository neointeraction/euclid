import Typography from '@mui/material/Typography';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import { ProvideEvidenceModalBoxContainer } from './modalboxes.styles';
import ModalCloseIcon from './ModalCloseIcon';

const ConfirmCommitModalBox = ({ onClose }) => {
  return (
    <ProvideEvidenceModalBoxContainer>
      <ModalCloseIcon onCloseIconClick={onClose} />
      <Typography variant="h5" className="modal-heading">
        Confirm Commit
      </Typography>
      <Typography variant="subtitle1">
        Are you sure you want to confirm commit ?
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div />
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '8px',
          }}
        >
          <Button
            style={{ background: '#E3E6E8' }}
            variant="primary"
            btnText="Cancel"
          />
          <Button variant="contained" btnText="Commit" />
        </div>
      </div>
    </ProvideEvidenceModalBoxContainer>
  );
};

ConfirmCommitModalBox.propTypes = {
  onClose: PropTypes.func,
};

export default ConfirmCommitModalBox;
