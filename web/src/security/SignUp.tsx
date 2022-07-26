import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export const Register: FunctionComponent = () => {

	function handleChange(event: any) {
		
	}
	
	function handleSubmit(event: any) {

		event.preventDefault();
	}

	return (
		<Grid className="SignUp" container spacing={2}>
			
			<Grid item xs={4}>
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
					<TextField
						required
						id="standard-password-input"
						label="Password confirmation"
						type="password"
						autoComplete="current-password"
						variant="standard"
					/>
					<input type="submit" value="Submit" />
				</form>
			</Grid>

			<Grid item xs={12}>
				<Button variant="outlined">Connexion GitHub</Button>
			</Grid>

		</Grid>
	);
};

export default Register;
