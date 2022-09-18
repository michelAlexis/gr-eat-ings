import { AutoComplete } from '@/components/common/Autocomplete';
import { Layout } from '@/components/layout';
import { useState } from 'react';

const IndexPage = () => {
  const search = async (query: string) => {
    return [
      {
        label: `Option vide`,
        value: null,
      },
      {
        label: `Query : ${query}`,
        value: 42,
      },
    ];
  };

  const [selected, setSelected] = useState<{ label: string; value: number | null }>({ label: '', value: null });

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="flex flex-col items-center">
        <div className="mb-3 min-w-[600px]">
          <h2 className="text-2xl">Formulaire</h2>
          <AutoComplete
            onQuery={search}
            getLabel={(s) => s?.label ?? ''}
            getDisable={(s) => !s.value}
            onChange={setSelected}
            minLength={0}
            value={selected}
          />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
