// В статическом экспорте next/image не добавляет basePath к локальным картинкам,
// поэтому подставляем префикс вручную. В dev basePath пустой.
export const BASE_PATH =
  process.env.NODE_ENV === 'production' ? '/kod-dostupa-k-sebe' : '';

export const asset = (path: string) => `${BASE_PATH}${path}`;
