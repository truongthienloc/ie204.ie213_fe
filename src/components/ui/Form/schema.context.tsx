import { createContext, useContext, ReactNode } from 'react';

const SchemaContext = createContext<any>(null);

type SchemaProviderProps = {
  schema: any;
  children: ReactNode;
};

export const SchemaProvider = ({ schema, children }: SchemaProviderProps) => (
  <SchemaContext.Provider value={schema}>{children}</SchemaContext.Provider>
);

export const useSchema = () => useContext(SchemaContext);
