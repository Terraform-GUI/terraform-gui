import React, { FunctionComponent, useState } from "react";
import TextField from "@mui/material/TextField";
import { userService } from '../../api'
import { useSearchParams, useNavigate } from "react-router-dom";

export const ResetPassword: FunctionComponent = () => {
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		const fetchToken = searchParams.get('token');
		if(fetchToken){
			const form = event.currentTarget
			const formElements = form.elements as typeof form.elements & {
				passwordInput: {value: string},
				confirmInput: {value: string}
			}
			const password = formElements.passwordInput.value;
			const confirm = formElements.confirmInput.value;

			setError("");
			!passwordIsValid(password) && setError("Password should be at least 8 characters long and contain at least one number");
			!passwordsMatch(password, confirm) && setError("Passwords do not match");
			if (error != "") {
				return;
			}
			const resetPassword = await userService.resetPassword(fetchToken, password, confirm);
			if(resetPassword?.success){
				navigate('/login');
			}
		} else {
			navigate('/home');
		}
	}

  function passwordIsValid(password:string) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }

  function passwordsMatch(password:string, confirm:string) {
    return password === confirm;
  }

	return (
		<div className="forgot">
			<form onSubmit={handleSubmit}>
				<TextField
					required
					id="passwordInput"
					label="New password"
					type="password"
					variant="standard"
				/>
				<TextField
					required
					id="confirmInput"
					label="New password confirmation"
					type="password"
					variant="standard"
				/>
				<input type="submit" value="Submit"/>
			</form>
			<div>{error}</div>
		</div>
	);
};

export default ResetPassword;