import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

function useStream<Type>(stream$: Observable<Type>) {
  const [data, setData] = useState<Type>();

  useEffect(() => {
    const subscription = stream$.subscribe({
      next: (dataStream) => {
        setData(dataStream);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [stream$]);

  const result: [Type | undefined] = [data];
  return result;
}

export default useStream;
