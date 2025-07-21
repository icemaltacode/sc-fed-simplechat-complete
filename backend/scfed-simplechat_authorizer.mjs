export async function handler(event) {
  const apiKeyHeader = event.headers?.['x-api-key'] || event.headers?.['X-API-Key'];

  const VALID_API_KEY = 'iOlWjQ29sH6lZ7WjYWvY1dPqbcAd6rE7jEYGXjVi';

  if (apiKeyHeader === VALID_API_KEY) {
    return {
      isAuthorized: true,
      context: {
        user: 'trusted-client'
      }
    };
  } else {
    return {
      isAuthorized: false
    };
  }
}