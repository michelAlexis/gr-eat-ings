import { Layout } from '@/components/layout';
import { InferMutationInput, trpc } from '@/utils/trpc';
import { Listbox } from '@headlessui/react';
import { IngredientUnit } from '@prisma/client';
import { FC } from 'react';
import { Control, FieldErrors, useController, useForm } from 'react-hook-form';

type CreateAction = InferMutationInput<'ingredients.create'>;

export const IngredientDetailPage = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateAction>({
    defaultValues: {
      nutritions: [
        {
          denomination: 'ref',
        },
      ],
    },
  });

  const mutation = trpc.useMutation('ingredients.create');

  const onSubmit = async (data: CreateAction) => {
    console.log('submit', data);
  };

  const onInvalid = (error: FieldErrors<CreateAction>) => console.warn('invalid', error.name);
  return (
    <Layout title="Ingredients">
      <div className="flex flex-col items-center">
        <div className="min-w-[600px]">
          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="mb-4 flex flex-col">
            {/* Name */}
            <InputNameTitle {...{ control, errors }} />

            {/* Unit ref */}
            <UnitRefDropdown {...{ control, errors }} />

            <div className="mt-3 bt-2">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default IngredientDetailPage;

const InputNameTitle: FC<{ control: Control<CreateAction>; errors: FieldErrors<CreateAction> }> = ({ errors, control }) => {
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

const unitRefOptions = Object.keys(IngredientUnit);

const UnitRefDropdown: FC<{ control: Control<CreateAction>; errors: FieldErrors<CreateAction> }> = ({ errors, control }) => {
  const {
    field: { value, onChange },
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
      <label>Unit</label>

      <Listbox value={value} onChange={onChange} as="div" className="relative">
        <Listbox.Button>{value ?? 'Select'}</Listbox.Button>
        <Listbox.Options as="ul" className="absolute">
          {unitRefOptions.map((unit, i) => (
            <Listbox.Option key={i} value={unit} as="li">
              {unit}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>

      <DefaultErrorMessage errors={errors.unitRef} />
    </>
  );
};

const DefaultErrorMessage: FC<{ errors: FieldErrors | undefined }> = (props) => {
  return <>{props.errors && <span className="text-red-600">{props.errors.message}</span>}</>;
};
