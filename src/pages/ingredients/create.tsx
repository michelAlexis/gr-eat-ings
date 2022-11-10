import { Button } from '@/components/common/Button';
import { Layout } from '@/components/layout';
import { getDefaultQuantity, kcalTokJ } from '@/utils/ingredient.utils';
import { InferMutationInput, trpc } from '@/utils/trpc';
import { AnyObject } from '@/utils/ts.utils';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { IngredientUnit } from '@prisma/client';
import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { Control, FieldErrors, FieldPath, useController, useForm, useWatch } from 'react-hook-form';

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

  const { mutateAsync, isLoading } = trpc.useMutation('ingredients.create');

  const onSubmit = async (data: CreateAction) => {
    console.log('submit', data);
    await mutateAsync(data);
    alert(`Ingredient "${data.name}" created with success`);
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

            {/* Nutition table */}
            <NutritionTable {...{ control, errors }} />

            <div className="mt-3 bt-2 flex justify-end">
              <Button type="submit" disabled={isLoading} intent="secondary">
                Submit
              </Button>
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
        className={clsx('text-6xl bg-transparent w-full border-0 border-b focus:ring-0', errors.name && 'border-red-600')}
      />
      <DefaultErrorMessage errors={errors.name} />
    </>
  );
};

const NutritionTable: FC<{ control: Control<CreateAction>; errors: FieldErrors<CreateAction> }> = ({ control, errors }) => {
  const kcal = useWatch({ control: control, name: 'kcal' });
  return (
    <table className="border">
      <thead>
        <tr className="border">
          <th className="border-r w-[100px]"></th>
          <th className="px-2 py-1">
            <QuantityRefInput control={control} errors={errors} />
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Energie - kcal */}
        <tr>
          <td rowSpan={2} className="border-r px-2 py-1">
            Energie
          </td>
          <td className="px-2 py-1">
            <NutritionInput control={control} errors={errors.kcal} propertyPath="kcal" unit="kcal" />
          </td>
        </tr>

        {/* Energie - kj */}
        <tr className="border-b">
          <td className="px-2 py-1">
            <div className="flex justify-between px-2 py-1 rounded-lg text-gray-900 dark:text-white">
              <span>{kcal && kcalTokJ(kcal).toFixed(2)}</span>
              <span>kj</span>
            </div>
          </td>
        </tr>

        {/* Fat */}
        <tr>
          <td className="border-r px-2 py-1">Fat</td>
          <td className="px-2 py-1">
            <NutritionInput control={control} errors={errors.fat} propertyPath="fat" unit="g" />
          </td>
        </tr>

        {/* Fat - saturated */}
        <tr className="border-b">
          <td className="border-r px-2 py-1">Saturated</td>
          <td className="px-2 py-1">
            <NutritionInput control={control} errors={errors.fatSaturated} propertyPath="fatSaturated" unit="g" />
          </td>
        </tr>

        {/* Carb */}
        <tr>
          <td className="border-r px-2 py-1">Carb</td>
          <td className="px-2 py-1">
            <NutritionInput control={control} errors={errors.carb} propertyPath="carb" unit="g" />
          </td>
        </tr>

        {/* Carb - sugar */}
        <tr className="border-b">
          <td className="border-r px-2 py-1">Sugar</td>
          <td className="px-2 py-1">
            <NutritionInput control={control} errors={errors.sugar} propertyPath="sugar" unit="g" />
          </td>
        </tr>

        {/* Fiber */}
        <tr className="border-b">
          <td className="border-r px-2 py-1">Fiber</td>
          <td className="px-2 py-1">
            <NutritionInput control={control} errors={errors.fiber} propertyPath="fiber" unit="g" />
          </td>
        </tr>

        {/* Protein */}
        <tr className="border-b">
          <td className="border-r px-2 py-1">Protein</td>
          <td className="px-2 py-1">
            <NutritionInput control={control} errors={errors.protein} propertyPath="protein" unit="g" />
          </td>
        </tr>

        {/* Salt */}
        <tr>
          <td className="border-r px-2 py-1">Salt</td>
          <td className="px-2 py-1">
            <NutritionInput control={control} errors={errors.salt} propertyPath="salt" unit="g" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const unitRefOptions: IngredientUnit[] = ['gr', 'ml', 'unique'];
const QuantityRefInput: FC<{
  control: Control<CreateAction>;
  errors: FieldErrors<CreateAction>;
}> = ({ control, errors }) => {
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
    <div className="text-right">
      <div className="flex text-2xl w-full justify-between">
        {defaultQuantity}

        {/* Unit dropdown */}
        <Listbox value={value} onChange={onChange} onBlur={onBlur} as="div" className="relative w-40">
          <Listbox.Button className="w-full flex items-center justify-between p-1 rounded bg-gray-700 hover:bg-gray-600">
            <span>{value ?? 'Select'}</span>
            <ChevronDownIcon className="w-5 h-5" />
          </Listbox.Button>
          <Listbox.Options as="ul" className="absolute w-full z-10 mt-1">
            {unitRefOptions.map((unit, i) => (
              <Listbox.Option
                key={i}
                value={unit}
                as="li"
                className={clsx(
                  'cursor-pointer bg-slate-600 hover:bg-slate-400 w-full p-2',
                  i === 0 && 'rounded-t-md',
                  i === unitRefOptions.length - 1 && 'rounded-b-md'
                )}>
                {unit}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>

        <DefaultErrorMessage errors={errors.unitRef} />
      </div>
    </div>
  );
};

const NutritionInput: FC<{
  control: Control<CreateAction>;
  errors?: AnyObject;
  propertyPath: FieldPath<CreateAction>;
  unit: string;
}> = ({ control, errors, propertyPath, unit }) => {
  return (
    <div className="relative group">
      <input
        type="number"
        min={0}
        step="any"
        {...control.register(propertyPath, {
          valueAsNumber: true,
          min: 0,
        })}
        className={clsx(
          'block border-0 bg-transparent w-full p-2 rounded-lg text-gray-900',
          'bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500',
          'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        )}
      />
      <span className="absolute right-2 bottom-2 group-hover:mr-5 group-focus:mr-5 next-to-input-focus">{unit}</span>
      <DefaultErrorMessage errors={errors} />
    </div>
  );
};

const DefaultErrorMessage: FC<{ errors: FieldErrors | undefined }> = (props) => {
  return <>{props.errors && <span className="text-red-600">{props.errors.message}</span>}</>;
};
