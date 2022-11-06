import { Button } from '@/components/common/Button';
import { Layout } from '@/components/layout';
import { getDefaultQuantity } from '@/utils/ingredient.utils';
import { InferMutationInput, trpc } from '@/utils/trpc';
import { AnyObject } from '@/utils/ts.utils';
import { Listbox } from '@headlessui/react';
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

            {/* Unit ref */}
            <UnitRefDropdown {...{ control, errors }} />

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
        className={clsx('text-6xl bg-transparent w-full border-0 border-b-[1px] focus:ring-0', errors.name && 'border-red-600')}
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

const NutritionTable: FC<{ control: Control<CreateAction>; errors: FieldErrors<CreateAction> }> = ({ control, errors }) => {
  return (
    <table className="border">
      <tbody>
        <tr className="border">
          <th className="border-r w-50p"></th>
          <th className="text-left text-xl p-2 w-50p">
            <span>100 Gr</span>
          </th>
        </tr>

        {/* Energie - kJ */}
        <tr>
          <td rowSpan={2} className="border-r p-2">
            Energie
          </td>
          <td className="p-2">
            <NutritionInput control={control} errors={errors.kcal} propertyPath="kcal" unit="kcal" />
          </td>
        </tr>

        {/* Energie - kcal */}
        <tr className="border-b">
          <td className="p-2">{/* <NutritionInput control={control} errors={errors.kcal} propertyPath="kcal" unit="kcal" /> */}</td>
        </tr>

        {/* Fat */}
        <tr>
          <td className="border-r p-2">Fat</td>
          <td className="p-2">
            <NutritionInput control={control} errors={errors.fat} propertyPath="fat" unit="g" />
          </td>
        </tr>

        {/* Fat - saturated */}
        <tr className="border-b">
          <td className="border-r p-2">Saturated</td>
          <td className="p-2">
            <NutritionInput control={control} errors={errors.fatSaturated} propertyPath="fatSaturated" unit="g" />
          </td>
        </tr>

        {/* Carb */}
        <tr>
          <td className="border-r p-2">Carb</td>
          <td className="p-2">
            <NutritionInput control={control} errors={errors.carb} propertyPath="carb" unit="g" />
          </td>
        </tr>

        {/* Carb - sugar */}
        <tr className="border-b">
          <td className="border-r p-2">Sugar</td>
          <td className="p-2">
            <NutritionInput control={control} errors={errors.sugar} propertyPath="sugar" unit="g" />
          </td>
        </tr>

        {/* Fiber */}
        <tr className="border-b">
          <td className="border-r p-2">Fiber</td>
          <td className="p-2">
            <NutritionInput control={control} errors={errors.fiber} propertyPath="fiber" unit="g" />
          </td>
        </tr>

        {/* Protein */}
        <tr className="border-b">
          <td className="border-r p-2">Protein</td>
          <td className="p-2">
            <NutritionInput control={control} errors={errors.protein} propertyPath="protein" unit="g" />
          </td>
        </tr>

        {/* Salt */}
        <tr>
          <td className="border-r p-2">Salt</td>
          <td className="p-2">
            <NutritionInput control={control} errors={errors.salt} propertyPath="salt" unit="g" />
          </td>
        </tr>
      </tbody>
    </table>
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
          'block border-0 bg-transparent w-full px-2 py-4 text-sm rounded-lg text-gray-900',
          'bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500',
          'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        )}
      />
      <span className="absolute right-2 bottom-4 group-hover:mr-5 group-focus:mr-5 next-to-input-focus">{unit}</span>
      <DefaultErrorMessage errors={errors} />
    </div>
  );
};

const DefaultErrorMessage: FC<{ errors: FieldErrors | undefined }> = (props) => {
  return <>{props.errors && <span className="text-red-600">{props.errors.message}</span>}</>;
};
