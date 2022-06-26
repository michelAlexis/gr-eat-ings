import { CreateIngredientInput } from '@/API';
import { trpc } from '@/utils/trpc';
import { Ingredient } from '@prisma/client';
import { FC } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

export interface IngredientFormProps {}

export const CreateIngredientForm: FC<IngredientFormProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Ingredient>();

  //? using AwsAmplify
  // const onSubmit = async (data: CreateIngredientInput) => {
  //   const result = await Awsclient.mutate<CreateIngredientMutation>({
  //     mutation: gql(createIngredient),
  //     variables: {
  //       input: {
  //         ...data,
  //       },
  //     },
  //   });
  //   console.log('New restult', result);
  //   if (result.data?.createIngredient) {
  //     props.onCreate(result.data.createIngredient);
  //     reset();
  //   } else {
  //     console.warn('No result on save', result);
  //   }
  // };

  //? Using trpc
  const mutation = trpc.useMutation('create-ingredient');

  const onSubmit = async (data: Ingredient) => {
    mutation.mutate(data, {
      onSettled(data, error, variables, context) {
        reset();
      },
    });
  };

  const onInvalid = (error: FieldErrors<CreateIngredientInput>) => console.warn('invalid', error.name);

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name-input">Name *: </label>
        <input
          id="name-input"
          {...register('name', { required: 'This field is required' })}
          autoComplete="off"
          className="text-black w-48"
        />
        {errors.name && <span className="text-red-600">{errors.name.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateIngredientForm;
