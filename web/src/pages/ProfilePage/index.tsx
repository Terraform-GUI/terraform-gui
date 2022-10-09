import React, { FunctionComponent, useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { userService } from '../../api'
import UserContext from '../../contexts/UserContext';
import { useNavigate } from "react-router-dom";
import Email from '../../components/Profile/Email'

export const Profile: FunctionComponent = () => {
	const {email, setEmail, accessToken, setAccessToken, refreshToken, setRefreshToken} = useContext(UserContext);
  const [error, setError] = useState("");
	const navigate = useNavigate();

	return (
		<div className="profile">
			{/* update email */}	
			<Email/>
			{/* reset password */}
			{/* log out */}
			{/* delete account */}
		</div>
	);
};

export default Profile;