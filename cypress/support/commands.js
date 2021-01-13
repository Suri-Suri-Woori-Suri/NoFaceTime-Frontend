// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import firebase from "firebase/app";
import admin from "firebase-admin";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";
import serviceAccount from "../../serviceAccount.json";

const fbConfig = {
  apiKey: "AIzaSyA_pCgO6Op35IZUzlrnkehQJUX_LGdyoOA",
  authDomain: "are-you-there-f8803.firebaseapp.com",
  databaseURL: "https://are-you-there-f8803.firebaseio.com",
  projectId: "are-you-there-f8803",
  storageBucket: "are-you-there-f8803.appspot.com",
  messagingSenderId: "138015314343",
  appId: "1:138015314343:web:ab205891393caaed38a682"
};

firebase.initializeApp(fbConfig);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://are-you-there-f8803.firebaseio.com"
// });

attachCustomCommands({ Cypress, cy, firebase });
