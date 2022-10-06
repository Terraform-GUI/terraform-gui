import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Redirect from 'react-router-dom';
import Home from './Home';
import Login from './security/Login';
import SignUp from './security/SignUp';
import Container from '@mui/material/Container';

import isLoggedIn from './services/isLoggedIn';

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Container style={{ padding: "4rem" }}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</Container>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
