import { createContext, useContext, ReactNode } from 'react';
import * as yup from 'yup';

type SchemaShape = Record<string, unknown>;
type SchemaType<T extends SchemaShape = SchemaShape> = yup.ObjectSchema<T>;

const SchemaContext = createContext<SchemaType | null>(null);

type SchemaProviderProps = {
  schema: SchemaType;
  children: ReactNode;
};

export const SchemaProvider = ({ schema, children }: SchemaProviderProps) => (
  <SchemaContext.Provider value={schema}>{children}</SchemaContext.Provider>
);

export const useSchema = () => useContext(SchemaContext);
