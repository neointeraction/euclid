import { ButtonGroupContainer } from './buttonGrp.styles';
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

export default CustomButtonGroup;
