// import PropTypes from 'prop-types';
import { ButtonGroupContainer } from './button.styles';
import ButtonGroup from '@mui/material/ButtonGroup';

const CustomButtonGroup = ({ children, variant = '', ...rest }) => {
  return (
    <ButtonGroupContainer>
      <ButtonGroup
        variant={variant}
        aria-label="outlined primary button group"
        {...rest}
      >
        {children}
      </ButtonGroup>
    </ButtonGroupContainer>
  );
};

CustomButtonGroup.propTypes = {};

export default CustomButtonGroup;
