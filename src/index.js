import React, {Suspense} from 'react';
import { createRoot } from 'react-dom/client';
import "./style/main.scss";
import { initializeApp } from "firebase/app";
import App from "./App";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

 
const container = document.getElementById('root');

const root = createRoot(container); 
root.render(
	<Suspense fallback="...loading">
		<App/>
	</Suspense>
);


