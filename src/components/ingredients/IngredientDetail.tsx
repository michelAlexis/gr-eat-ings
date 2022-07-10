import { trpc } from '@/utils/trpc';
import { ExternalLinkIcon } from '@heroicons/react/solid';
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
            <ExternalLinkIcon height={34} width={34} className="cursor-pointer hover:text-gray-300" />
          </a>
        </Link>
      </div>
      {data?.nutritions.map((nutrition, i) => (
        <div key={i}>
          <span>{nutrition.denomination}</span>
          <span>kcal: {nutrition.kcal}</span>
        </div>
      ))}
    </>
  );
};
