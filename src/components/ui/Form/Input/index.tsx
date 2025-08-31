import { useController, useFormContext } from 'react-hook-form';
import BaseInput, { AppInputProps } from '../../AppInput';
import { FocusEvent, useCallback } from 'react';
import { useSchema } from '../schema.context';

const Input = ({ id = '', onFocus, ...restProps }: AppInputProps) => {
  const { control, clearErrors } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: id,
    control,
  });

  const schema = useSchema();

  const isRequired: boolean = !schema?.describe()?.fields[id]?.optional;

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      clearErrors(id);
      onFocus?.(event);
    },
    [clearErrors, id, onFocus],
  );

  return (
    <BaseInput
      id={id}
      name={id}
      value={value}
      errorMessage={error?.message}
      onChange={onChange}
      onFocus={handleFocus}
      isRequired={isRequired}
      {...restProps}
    />
  );
};

export default Input;
