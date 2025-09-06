import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode } from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';

import { AppFormValue } from '~/types';

import { SchemaProvider } from './schema.context';

type FormProps = {
  defaultValues?: Object;
  onSubmit: SubmitHandler<AppFormValue>;
  children: ReactNode;
  className?: string;
  validationSchema: yup.ObjectSchema<any>;
};

const Form = ({ defaultValues = {}, onSubmit, children, className, validationSchema }: FormProps) => {
  const useFormReturn = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { handleSubmit } = useFormReturn;

  return (
    <FormProvider {...useFormReturn}>
      <SchemaProvider schema={validationSchema}>
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
          {children}
        </form>
      </SchemaProvider>
    </FormProvider>
  );
};

export default Form;
