import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

function useStream<Type>(stream$: Observable<Type>, defaultData: string | null) {
  const [data, setData] = useState<Type | string | null>(defaultData);
  const [error, setError] = useState<unknown>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const subscription = stream$.subscribe({
      next: (dataStream) => {
        console.log('dataStream', dataStream);
        setLoading(true);
        setTimeout(() => {
          setData(dataStream);
          setLoading(false);
        }, 2000);
      },
      error: (errorStream) => {
        console.log('errorStream', errorStream);
        setError(errorStream);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [stream$]);

  const result: [Type | string | null, unknown, boolean] = [data, error, isLoading];
  return result;
}

export default useStream;
