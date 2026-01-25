import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfxDng5AiGzny7PD4AKU0Z6dRUA1JCCy8",
  authDomain: "tareasapp-aa89e.firebaseapp.com",
  projectId: "tareasapp-aa89e",
  storageBucket: "tareasapp-aa89e.firebasestorage.app",
  messagingSenderId: "181956472570",
  appId: "1:181956472570:web:bebba79306d663a30d2343",
  measurementId: "G-5F2DCQMN8N"
};

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }), 
//     provideRouter(routes),
//     // Conectamos los cables de Firebase
//     provideFirebaseApp(() => initializeApp(firebaseConfig)),
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore()),
//   ]
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    // Conectamos los cables de Firebase --
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
