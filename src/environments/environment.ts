// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const HOST = 'http://localhost';

export const environment = {
  production: false,
  baseUrl: `${HOST}/api/v1/engine`,
  nucleoSizeUrl: `${HOST}/api/nucleosize`,
};

export enum ApiPaths {
  Tertiary = '/3d',
  Secondary = '/2d',
  Multi = '/multi'
}
