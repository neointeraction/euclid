import React from 'react';

import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { InputContainer, ErrorText } from './input.styles';

const CustomInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    fontSize: 16,
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #8C8C8C',
    fontSize: 14,
    width: '100%',
    padding: '6px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      borderColor: '#005585',
    },
  },
}));

const CustomTextArea = styled(TextareaAutosize)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    fontFamily: "'Nunito Sans', sans-serif",
    borderRadius: 4,
    fontSize: 14,
    padding: '6px 12px',
    border: '1px solid #8C8C8C',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    '&:focus': {
      borderColor: '#005585',
    },
    '&:placeholder': {
      color: '#005585',
    },
  },
}));

const Input = ({
  label,
  placeholder,
  value,
  defaultValue,
  isDisabled,
  isRequired,
  errorText,
  isMulti,
  ...rest
}) => {
  return (
    <InputContainer>
      <FormControl variant="standard" fullWidth>
        <InputLabel size="normal" shrink htmlFor="custom-input">
          {label}
        </InputLabel>
        {isMulti ? (
          <CustomTextArea
            className="TextArea-input"
            minRows={4}
            placeholder={placeholder ? placeholder : 'Enter Text'}
            style={{ maxWidth: '100%' }}
            value={value}
            defaultValue={defaultValue}
            disabled={isDisabled}
            required={isRequired}
            {...rest}
          />
        ) : (
          <CustomInput
            placeholder={placeholder ? placeholder : 'Enter Text'}
            value={value}
            defaultValue={defaultValue}
            disabled={isDisabled}
            required={isRequired}
            id="custom-input"
            size="small"
            {...rest}
          />
        )}

        {rest.error ? <ErrorText>{errorText}</ErrorText> : null}
      </FormControl>
    </InputContainer>
  );
};

export default Input;
