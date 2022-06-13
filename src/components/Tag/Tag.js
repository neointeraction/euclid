import Chip from '@mui/material/Chip';
import React from 'react';
import PropTypes from 'prop-types';
import { TagContainer } from './tag.styles';

const Tag = ({ variant = 'outlined', label, type, ...rest }) => {
  return (
    <TagContainer type={type}>
      <Chip label={label} variant={variant} {...rest} />
    </TagContainer>
  );
};

// types for the props.
Tag.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'all',
    'reverted',
    'approved',
    'in-draft',
    'committed',
  ]),
};

export default Tag;
