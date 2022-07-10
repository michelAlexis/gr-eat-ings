import { trpc } from '@/utils/trpc';
import { FC } from 'react';
import { Control, FieldErrors, useFieldArray, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Ingredient } from '@prisma/client';

export interface IngredientFormProps {}

export const CreateIngredientForm: FC<IngredientFormProps> = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Ingredient>({
    defaultValues: {
      nutritions: [
        {
          denomination: 'ref',
        },
      ],
    },
  });
  const mutation = trpc.useMutation('ingredients.create');

  const onSubmit = async (data: Ingredient) => {
    await mutation.mutateAsync(data);
    reset();
  };

  const onInvalid = (error: FieldErrors<Ingredient>) => console.warn('invalid', error.name);

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name-input">Name *: </label>
        <input
          id="name-input"
          {...register('name', { required: 'This field is required', maxLength: 100 })}
          autoComplete="off"
          className="text-black w-48"
        />
        {errors.name && <span className="text-red-600">{errors.name.message}</span>}
      </div>

      <div>
        <NutritionForm {...{ control, register, getValues, setValue }} />
      </div>

      <div className="mt-3 bt-2">
        <button type="submit">Submit</button>
      </div>

      <DevTool control={control} />
    </form>
  );
};

const NutritionForm: FC<{
  control: Control<Ingredient>;
  register: UseFormRegister<Ingredient>;
  setValue: UseFormSetValue<Ingredient>;
  getValues: UseFormGetValues<Ingredient>;
}> = ({ control, register, setValue, getValues }) => {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'nutritions',
  });

  return (
    <>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id} className="mt-3">
            <label htmlFor="`nutritions.${index}.kcal`">Kcal:</label>
            <input {...register(`nutritions.${index}.kcal`, { valueAsNumber: true })} className="text-black w-48" type="number" />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CreateIngredientForm;
