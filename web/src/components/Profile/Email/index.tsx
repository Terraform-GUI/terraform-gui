import React, { FunctionComponent, useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { userService } from '../../../api'
import UserContext from '../../../contexts/UserContext';

export const Email: FunctionComponent = () => {
	const {email, setEmail, setAccessToken, setRefreshToken} = useContext(UserContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState("");

	async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {emailInput: {value: string}}
    const email = formElements.emailInput.value;

    setError("");
    !emailIsValid(email) && setError("Email is not valid");
    if (error != "") {
      return;
    }
		const updateMail = await userService.updateMail(email);
		if(updateMail?.success){
			setEmail('');
			setAccessToken('');
			setRefreshToken('');
			localStorage.clear();
		}
  }

  function emailIsValid (email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

	return (
		<div className="email">
			{isUpdate ? (
				<div>				
					<form onSubmit={handleSubmit}>
						<TextField
							required
							id="emailInput"
							label="Email"
							placeholder="john.doe@gmail.com"
						/>
						<input type="submit" value="Submit"/>
					</form>
					<div>{error}</div>
				</div>
			) : (
				<div>
					{email}
				</div>
			)}
			<Button onClick={() => setIsUpdate(!isUpdate)}>
				Update
			</Button>
		</div>
	);
};

export default Email;