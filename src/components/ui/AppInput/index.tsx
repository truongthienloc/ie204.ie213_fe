import { useState } from 'react';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import COLORS from '~/constants/colors';
import cn from '~/lib/cn';
import { InputAdornment } from '@mui/material';

export type AppInputProps = TextFieldProps & {
  errorMessage?: string;
  isRequired?: boolean;
  label?: string;
};

function AppInput({
  variant = 'outlined',
  className = '',
  type = 'text',
  name,
  id,
  placeholder,
  value,
  onChange,
  onFocus,
  label = '',
  errorMessage = '',
  isRequired = false,
  ...rest
}: AppInputProps) {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);

  return (
    <>
      <div className={cn('flex w-full flex-col [&+&]:mt-4', className)}>
        {label?.trim() && (
          <InputLabel
            htmlFor={id}
            className={cn('text-base font-medium', {
              'text-secondary': !errorMessage,
              'text-red-500': errorMessage,
            })}
          >
            {label}
            {isRequired && <span className="text-red-500"> (*)</span>}
          </InputLabel>
        )}
        <TextField
          {...rest}
          fullWidth
          className="mt-1 active:border-primary"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: COLORS.secondary.DEFAULT,
              },
              '&:hover fieldset': {
                borderColor: COLORS.secondary.DEFAULT,
              },
              '&.Mui-focused fieldset': {
                borderColor: COLORS.secondary.DEFAULT,
              },
            },
          }}
          FormHelperTextProps={{
            className: 'text-sm mt-1 mx-0',
          }}
          InputProps={{
            endAdornment: type === 'password' && (
              <InputAdornment position="end">
                <span onClick={() => setIsShowContent(!isShowContent)} className="cursor-pointer text-secondary">
                  {isShowContent ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </span>
              </InputAdornment>
            ),
          }}
          variant={variant}
          id={id}
          spellCheck={false}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          value={value}
          error={!!errorMessage}
          helperText={errorMessage}
          type={type === 'password' && isShowContent ? 'text' : type}
        />
      </div>
    </>
  );
}

export default AppInput;
