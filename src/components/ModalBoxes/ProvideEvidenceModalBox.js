import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

import { ProvideEvidenceModalBoxContainer } from './modalboxes.styles';
import { Typography } from '@mui/material';
import Input from 'components/Input';
import Button from 'components/Button';

const ProvideEvidenceModalBox = ({ onClose }) => {
  return (
    <ProvideEvidenceModalBoxContainer>
      <div style={{ position: 'relative' }}>
        <CloseIcon
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: '0px',
            right: '0px',
          }}
          onClick={onClose}
          fontSize="small"
        />
      </div>
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
            <Button variant="outlined" btnText="Cancel" />
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
