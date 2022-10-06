import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import {userService} from '../../api'

export const Register: FunctionComponent = () => {
  const [error, setError] = useState("");

	async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      emailInput: {value: string},
      passwordInput: {value: string},
      confirmInput: {value: string}
    }
    const email = formElements.emailInput.value;
    const password = formElements.passwordInput.value;
    const confirm = formElements.confirmInput.value;

    setError("");
    !passwordIsValid(password) && setError("Password should be at least 8 characters long and contain at least one number");
    !passwordsMatch(password, confirm) && setError("Passwords do not match");
    !emailIsValid(email) && setError("Email is not valid");
    if (error != "") {
      return;
    }

		const register = await userService.register(email, password, confirm);
    console.log(register);
		if(register?.success){
		}
  }

  function emailIsValid (email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function passwordIsValid(password:string) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }

  function passwordsMatch(password:string, confirm:string) {
    return password === confirm;
  }

	return (
		<Grid className="register" container spacing={2}>
			
			<Grid item xs={4}>
				<form onSubmit={handleSubmit}>
					<TextField
						required
						id="emailInput"
						label="Email"
						placeholder="jhon.doe@gmail.com"
					/>
					<TextField
						required
						id="passwordInput"
						label="Password"
						type="password"
						variant="standard"
					/>
					<TextField
						required
						id="confirmInput"
						label="Password confirmation"
						type="password"
						variant="standard"
					/>
					<input type="submit" value="Submit"/>
				</form>
        <div>{error}</div>
			</Grid>

			<Grid item xs={12}>
				<Button variant="outlined">Connexion GitHub</Button>
			</Grid>

		</Grid>
	);
};

export default Register;
