
import { PublicClientApplication } from '@azure/msal-browser';
import { getCurrentInstance } from 'vue';
const msalConfig = {
    auth: {
        clientId: 'dd6246b2-6e41-4c18-8ea9-24f338c6b46c',
        authority: 'https://login.microsoftonline.com/0ccc3842-cffc-46df-8f30-782e969077e2',
        redirectUri: 'http://localhost:4200', // Adjust as needed
        // scopes: ["user.read", "openid", "profile"],
        // protectedResourceMap: new Map([
        //     [
        //         "https://graph.microsoft.com/v1.0/memberOf",
        //         ["user.read", "Directory.Read.All"],
        //     ],
        //     ['https://graph.microsoft.com/v1.0/me', ['user.read']], // Example mapping
        // ])
    },
    cache: {
        cacheLocation: "localStorage",
    },

};


let msalInstance = null;

export function createMsalPlugin() {
    return {
        install(app) {
            msalInstance = new PublicClientApplication(msalConfig);
            app.provide('$msal', msalInstance);
            app.config.globalProperties.$msal = msalInstance;
        },
    }
}
