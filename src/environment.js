// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: "https://localhost:44326",
    // apiUrl: "https://wilson-api-dev01d-featuretest2.azurewebsites.net",
    zplCode:
        "^XA ^BY2,0,200^FO40,40^BC,,N^FD@DeliveryID@^FS^CFA,40^FO85,260^FD@DeliveryID@^FS^XZ",
    clientId: "dd6246b2-6e41-4c18-8ea9-24f338c6b46c",
    authority:
        "https://login.microsoftonline.com/0ccc3842-cffc-46df-8f30-782e969077e2",
    redirectUri: "http://localhost:4200/",
    apiRec4poUrl: "https://bbg-c4po-service-dev-wilson.azurewebsites.net",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
