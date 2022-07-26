import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const Login: FunctionComponent = () => {

	function handleChange(event: any) {
		
	}
	
	function handleSubmit(event: any) {

		event.preventDefault();
	}

	return (
		<div className="Login">
			<form>
				<TextField
					required
					id="outlined-required"
					label="Email"
					placeholder="jhon.doe@gmail.com"
				/>
				<TextField
					required
					id="standard-password-input"
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