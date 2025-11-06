export const HOST = 'https://rnapdbee.cs.put.poznan.pl';

export const environment = {
  production: true,
  baseUrl: `${HOST}/api/v1/engine`,
};

export enum ApiPaths {
  Tertiary = '/3d',
  Secondary = '/2d',
  Multi = '/multi'
}
