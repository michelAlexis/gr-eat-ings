import { CreateIngredientInput, CreateIngredientMutation, Ingredient } from '@/API';
import gql from 'graphql-tag';
import { FC } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { createIngredient } from '../../graphql/mutations';
import Awsclient from '../../services/aws-client';

export interface IngredientFormProps {
  onCreate: (res: Ingredient) => void;
}

export const CreateIngredientForm: FC<IngredientFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIngredientInput>();

  const onSubmit = async (data: CreateIngredientInput) => {
    const result = await Awsclient.mutate<CreateIngredientMutation>({
      mutation: gql(createIngredient),
      variables: {
        input: {
          ...data,
        },
      },
    });
    console.log('New restult', result);
    if (result.data?.createIngredient) {
      props.onCreate(result.data.createIngredient);
      reset();
    } else {
      console.warn('No result on save', result);
    }
  };
  const onInvalid = (error: FieldErrors<CreateIngredientInput>) => console.warn('invalid', error.name);

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name-input">Name *: </label>
        <input id="name-input" {...register('name', { required: 'This field is required' })} autoComplete="off" className="text-black" />
        {errors.name && <span className="text-red-600">{errors.name.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateIngredientForm;
