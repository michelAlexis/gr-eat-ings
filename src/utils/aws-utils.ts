import { API, graphqlOperation } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';

type UseQueryType<ResultType> = {
  loading: boolean;
  error: unknown;
  data: ResultType;
  refetch: () => void;
};

export const useQuery = <ResultType extends object, VariablesType extends object = ResultType>(
  query: string,
  variables?: VariablesType
): UseQueryType<ResultType | null> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>('');
  const [data, setData] = useState<null | ResultType>(null);

  const fetchQuery = useCallback(async (query: string, variables?: VariablesType) => {
    try {
      const res = (await API.graphql(graphqlOperation(query, variables))) as any;
      if (res.data) {
        setData(res.data as ResultType);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = () => {
    fetchQuery(query, variables);
  };

  useEffect(() => {
    fetchQuery(query, variables);
  }, [query, variables, fetchQuery]);

  return {
    loading,
    data,
    error,
    refetch,
  };
};
