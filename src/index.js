import React, {Suspense} from 'react';
import { createRoot } from 'react-dom/client';
import "./style/main.scss";
import App from "./App";

const container = document.getElementById('root');

const root = createRoot(container); 
root.render(
<React.StrictMode>
	<Suspense fallback="...loading">
		<App/>
	</Suspense>
</React.StrictMode>);


