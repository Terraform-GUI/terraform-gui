import React, { FunctionComponent, useState } from "react";
import TextField from "@mui/material/TextField";
import { userService } from '../../api'

export const ForgotPassword: FunctionComponent = () => {
  const [error, setError] = useState("");
  const [mailSent, setMailSent] = useState(false);

	async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      emailInput: {value: string},
    }
    const email = formElements.emailInput.value;

		setError("");
		!emailIsValid(email) && setError("Email is not valid");
		if (error != "") {
			return;
		}

		const forgotPassword = await userService.forgotPassword(email);
		if(forgotPassword?.success){
			setMailSent(true);
		}
	}
	
	function emailIsValid (email: string) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}

	return (
		<div className="forgot">
			{!mailSent ? (
				<>
					<form onSubmit={handleSubmit}>
						<TextField
							required
							id="emailInput"
							label="Email"
							placeholder="john.doe@gmail.com"
						/>
						<input type="submit" value="Reset password" />
					</form>
					<div>{error}</div>
				</>
			) : (
				<div style={{margin: '40px'}}>A mail has been sent to your email address. Please click on the link to reset your password.</div>
			)}
		</div>
	);
};

export default ForgotPassword;