import { trpc } from '@/utils/trpc';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  id: string;
}

export const IngredientDetail: FC<Props> = ({ id }) => {
  const { data } = trpc.useQuery(['ingredients.by-id', { id }]);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-between">
        <h3>{data.name}</h3>
        <Link href={`ingredients/${id}`}>
          <a>
            <ArrowTopRightOnSquareIcon height={34} width={34} className="cursor-pointer hover:text-gray-300" />
          </a>
        </Link>
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};
