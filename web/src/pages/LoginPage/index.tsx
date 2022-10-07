import React, { FunctionComponent, useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {userService} from '../../api'
import UserContext from '../../contexts/UserContext';
import { useNavigate } from "react-router-dom";

export const Login: FunctionComponent = () => {
	const {email, setEmail, accessToken, setAccessToken, refreshToken, setRefreshToken} = useContext(UserContext);
  const [error, setError] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      emailInput: {value: string},
      passwordInput: {value: string},
    }
    const email = formElements.emailInput.value;
    const password = formElements.passwordInput.value;

		setError("");
		!emailIsValid(email) && setError("Email is not valid");
		if (error != "") {
			return;
		}

		const login = await userService.login(email, password);
		if(login?.token){
			setEmail(email);
			setAccessToken(login.token);
			setRefreshToken(login.refresh_token);
			navigate('/');
		}
	}
	
	function emailIsValid (email: string) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}

	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<TextField
					required
					id="emailInput"
					label="Email"
					placeholder="john.doe@gmail.com"
				/>
				<TextField
					required
					id="passwordInput"
					label="Password"
					type="password"
					autoComplete="current-password"
					variant="standard"
				/>
				<input type="submit" value="Submit" />
			</form>
			<Button variant="outlined">Connexion GitHub</Button>
		</div>
	);
};

export default Login;