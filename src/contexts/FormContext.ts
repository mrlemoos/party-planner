'use client';

import { createContext } from 'react';

import type useForm from '@root/hooks/useForm';

type FormContextSchema = ReturnType<typeof useForm>;

const FormContext = createContext<FormContextSchema | null>(null);

export default FormContext;
