import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

import { ProvideEvidenceModalBoxContainer } from './modalboxes.styles';
import Input from 'components/Input';
import Button from 'components/Button';
import ModalCloseIcon from './ModalCloseIcon';

const ProvideEvidenceModalBox = ({ onClose }) => {
  return (
    <ProvideEvidenceModalBoxContainer>
      <ModalCloseIcon onCloseIconClick={onClose} />
      <Typography
        variant="h5"
        style={{ marginTop: '25px', marginBottom: '10px' }}
      >
        Provide Evidence
      </Typography>
      <Typography variant="subtitle1">Subject Type</Typography>
      <div style={{ marginTop: '-16px' }}>
        <Input
          style={{
            maxHeight: '134px',
            height: '134px',
          }}
          isMulti
          placeholder="Enter Here"
        />
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
            <Button variant="contained" btnText="Save" />
          </div>
        </div>
      </div>
    </ProvideEvidenceModalBoxContainer>
  );
};

ProvideEvidenceModalBox.propTypes = {
  onClose: PropTypes.func,
};

export default ProvideEvidenceModalBox;
