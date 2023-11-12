import api from '@services/api';

export async function handleExecutionWithFallbacks<T>({
  firstFunction = () => Promise.resolve<T>(null as unknown as T),
  secondFunction = () => Promise.resolve<T>(null as unknown as T),
  thirdFunction = () => Promise.resolve<T>(null as unknown as T),
}: {
  firstFunction?: () => Promise<T>;
  secondFunction?: () => Promise<T>;
  thirdFunction?: () => Promise<T>;
}): Promise<T> {
  const firstRes = await firstFunction();

  if (
    firstRes &&
    typeof firstRes === 'object' &&
    'code' in firstRes &&
    firstRes.code === 402
  ) {
    const secondRes = await secondFunction();

    if (
      secondRes &&
      typeof secondRes === 'object' &&
      'code' in secondRes &&
      secondRes.code === 402
    ) {
      const thirdRes = await thirdFunction();

      if (
        thirdRes &&
        typeof thirdRes === 'object' &&
        'code' in thirdRes &&
        thirdRes.code === 402
      ) {
        return Promise.reject(thirdRes);
      }
    }
  }

  // Return a default value or handle other cases as needed
  return Promise.resolve(firstRes);
}

export default async function executeWithFallback(endpoint: string) {
  let data: any;

  await handleExecutionWithFallbacks({
    firstFunction: async () => {
      data = await api.get(
        `${endpoint}&apiKey=${process.env.SPOONACULAR_API_KEY_1}`
      );

      return data;
    },
    secondFunction: async () => {
      data = await api.get(
        `${endpoint}&apiKey=${process.env.SPOONACULAR_API_KEY_2}`
      );

      return data;
    },
    thirdFunction: async () => {
      data = await api.get(
        `${endpoint}&apiKey=${process.env.SPOONACULAR_API_KEY_3}`
      );

      return data;
    },
  });

  return data;
}
