// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api: 'http://localhost:8000',
    instagram: {
        CLIENT_ID: '464391c1b1af40e681f313aecc24ac1c',
        REDIRECT_URI: '257dc43b983448acba05426f4899b2a2',
        ACCESS_TOKEN: '2045157926.464391c.b8c5b4b6ff104fc39aa047661bb02f74'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
