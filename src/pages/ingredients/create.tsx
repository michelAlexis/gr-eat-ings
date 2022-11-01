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

            {/* Nutrition */}
            <NutritionForm {...{ control, errors }} />

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
        className={clsx('text-6xl bg-transparent w-full border-0 border-b-[1px] focus:ring-0', {
          'border-red-600': errors.name,
        })}
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

const NutritionTable: FC<{ control: Control<CreateAction>; errors: FieldErrors<CreateAction> }> = ({ control, errors }) => {
  return (
    <table className="border-1">
      <tr className="border-1">
        <th className="border-r-1"></th>
        <th className="text-left text-xl p-2 w-32">
          <span>100 Gr</span>
        </th>
      </tr>

      {/* Energie - kJ */}
      <tr>
        <td rowSpan={2} className="border-r-1 p-2">
          Energie
        </td>
        <td className="p-2">
          <NutritionInput control={control} errors={errors.nutritionRef?.kcal} propertyPath="nutritionRef.kcal" unit="kJ" />
        </td>
      </tr>

      {/* Energie - kcal */}
      <tr className="border-b-1">
        <td className="p-2">
          <NutritionInput control={control} errors={errors.nutritionRef?.kcal} propertyPath="nutritionRef.kcal" unit="kcal" />
        </td>
      </tr>

      {/* Fat */}
      <tr>
        <td className="border-r-1 p-2">Fat</td>
        <td className="p-2">
          <div>5.9 gr</div>
        </td>
      </tr>

      {/* Fat - saturated */}
      <tr className="border-b-1">
        <td className="border-r-1 p-2">Saturated</td>
        <td className="p-2">
          <div>2.4gr</div>
        </td>
      </tr>

      {/* Carb */}
      <tr>
        <td className="border-r-1 p-2">Carb</td>
        <td className="p-2">
          <div>61.9 gr</div>
        </td>
      </tr>

      {/* Carb - sugar */}
      <tr className="border-b-1">
        <td className="border-r-1 p-2">Sugar</td>
        <td className="p-2">
          <div>10.6 gr</div>
        </td>
      </tr>

      {/* Fiber */}
      <tr className="border-b-1">
        <td className="border-r-1 p-2">Fiber</td>
        <td className="p-2">
          <div>8.9 gr</div>
        </td>
      </tr>

      {/* Protein */}
      <tr className="border-b-1">
        <td className="border-r-1 p-2">Protein</td>
        <td className="p-2">
          <div>10.5 gr</div>
        </td>
      </tr>

      {/* Salt */}
      <tr>
        <td className="border-r-1 p-2">Salt</td>
        <td className="p-2">
          <div>0.05 gr</div>
        </td>
      </tr>
    </table>
  );
};

const NutritionInput: FC<{ control: Control<CreateAction>; errors?: AnyObject; propertyPath: FieldPath<CreateAction>; unit: string }> = ({
  control,
  errors,
  propertyPath,
  unit,
}) => {
  return (
    <>
      <input
        type="number"
        min={0}
        {...control.register(propertyPath, {
          valueAsNumber: true,
        })}
        className="border-0 bg-transparent w-full"
      />
      <DefaultErrorMessage errors={errors} />
    </>
  );
};

const DefaultErrorMessage: FC<{ errors: FieldErrors | undefined }> = (props) => {
  return <>{props.errors && <span className="text-red-600">{props.errors.message}</span>}</>;
};
