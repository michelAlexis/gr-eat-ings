import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { CreateIngredientInput } from '../../API';

export interface IngredientFormProps {}

export const CreateIngredientForm = (props: IngredientFormProps) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateIngredientInput>();
  const onSubmit = (data: CreateIngredientInput) => console.log(data, errors);
  const onInvalid = (error: FieldErrors<CreateIngredientInput>) => console.warn('invalid', error.name);
  useEffect(() => {
    watch((value, { name, type }) => console.log('watch', value, name, type));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <label htmlFor="name-input">Name: </label>
      <input id="name-input" {...register('name', { required: true })} />
    </form>
  );
};

export default CreateIngredientForm;
