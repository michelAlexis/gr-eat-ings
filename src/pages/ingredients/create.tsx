import { Layout } from '@/components/layout';
import { getDefaultQuantity } from '@/utils/ingredient.utils';
import { InferMutationInput, trpc } from '@/utils/trpc';
import { Listbox } from '@headlessui/react';
import { IngredientUnit } from '@prisma/client';
import { FC, useMemo } from 'react';
import { Control, FieldErrors, useController, useForm, useWatch } from 'react-hook-form';

type CreateAction = InferMutationInput<'ingredients.create'>;

export const IngredientDetailPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAction>({
    defaultValues: {
      unitRef: 'gr',
    },
  });

  const mutation = trpc.useMutation('ingredients.create');

  const onSubmit = async (data: CreateAction) => {
    console.log('submit', data);

    await mutation.mutateAsync(data);
    reset();
  };

  const onInvalid = (error: FieldErrors<CreateAction>) => console.warn('invalid', error.name);
  return (
    <Layout title="Ingredients">
      <div className="flex flex-col items-center">
        <div className="min-w-[600px]">
          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="mb-4 flex flex-col gap-2">
            {/* Name */}
            <InputNameTitle {...{ control, errors }} />

            {/* Unit ref */}
            <UnitRefDropdown {...{ control, errors }} />

            {/* Nutrition */}
            <NutritionForm {...{ control, errors }} />

            <div className="mt-3 bt-2 flex justify-end">
              <button type="submit" className="bg-slate-500 hover:bg-slate-400 py-2 px-3 rounded-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default IngredientDetailPage;

const InputNameTitle: FC<{ control: Control<CreateAction>; errors: FieldErrors<CreateAction> }> = ({ control, errors }) => {
  return (
    <>
      <input
        type="text"
        {...control.register('name', {
          required: {
            value: true,
            message: 'Name is required',
          },
          maxLength: {
            value: 100,
            message: 'Maximum 100 characters',
          },
        })}
        autoComplete="off"
        placeholder="Name"
        className="text-2xl bg-transparent w-full"
      />
      <DefaultErrorMessage errors={errors.name} />
    </>
  );
};

const unitRefOptions: IngredientUnit[] = ['gr', 'ml', 'unique'];

const UnitRefDropdown: FC<{ control: Control<CreateAction>; errors: FieldErrors<CreateAction> }> = ({ control, errors }) => {
  const unitRef = useWatch({ control: control, name: 'unitRef' });
  const defaultQuantity = useMemo(() => getDefaultQuantity(unitRef), [unitRef]);

  const {
    field: { value, onChange, onBlur },
  } = useController({
    name: 'unitRef',
    control,
    rules: {
      required: {
        value: true,
        message: 'A unit is required',
      },
    },
  });

  return (
    <>
      <div className="flex text-2xl bg-transparent w-full justify-between p-2 text-gray-500 border-[1px] border-gray-500">
        {defaultQuantity}
        <Listbox value={value} onChange={onChange} onBlur={onBlur} as="div" className="relative w-40">
          <Listbox.Button className="w-full text-left">{value ?? 'Select'}</Listbox.Button>
          <Listbox.Options as="ul" className="absolute bg-slate-400 w-full">
            {unitRefOptions.map((unit, i) => (
              <Listbox.Option key={i} value={unit} as="li" className="cursor-pointer hover:bg-slate-300 w-full p-2">
                {unit}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      <DefaultErrorMessage errors={errors.unitRef} />
    </>
  );
};

const NutritionForm: FC<{ control: Control<CreateAction>; errors: FieldErrors<CreateAction> }> = ({ control, errors }) => {
  return (
    <>
      <input
        type="number"
        min={0}
        {...control.register('nutritionRef.kcal', {
          valueAsNumber: true,
        })}
        placeholder="Kcal"
        className="text-2xl bg-transparent w-full"
      />
      <DefaultErrorMessage errors={errors.nutritionRef?.kcal} />
    </>
  );
};

const DefaultErrorMessage: FC<{ errors: FieldErrors | undefined }> = (props) => {
  return <>{props.errors && <span className="text-red-600">{props.errors.message}</span>}</>;
};
