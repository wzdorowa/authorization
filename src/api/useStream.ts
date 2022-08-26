import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

function useStream<Type>(stream$: Observable<Type>) {
  const [data, setData] = useState<Type>();
  const [error, setError] = useState<unknown>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const subscription = stream$.subscribe({
      next: (dataStream) => {
        setLoading(true);
        setTimeout(() => {
          setData(dataStream);
          setLoading(false);
        }, 2000);
      },
      error: (errorStream) => {
        setError(errorStream);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [stream$]);

  const result: [Type | undefined, unknown, boolean] = [data, error, isLoading];
  return result;
}

export default useStream;
