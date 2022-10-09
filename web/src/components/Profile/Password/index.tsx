import React, { FunctionComponent, useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { userService } from '../../../api'
import UserContext from '../../../contexts/UserContext';
import { useNavigate } from "react-router-dom";

export const Profile: FunctionComponent = () => {
	const {email, setEmail, accessToken, setAccessToken, refreshToken, setRefreshToken} = useContext(UserContext);
  const [error, setError] = useState("");
	const navigate = useNavigate();

	return (
		<div className="profile">
			{/* update email */}
			<div>				
				<TextField
					required
					id="emailInput"
					label="Email"
					placeholder="john.doe@gmail.com"
					
				/>
			</div>
			{/* reset password */}
			{/* log out */}
			{/* delete account */}
		</div>
	);
};

export default Profile;