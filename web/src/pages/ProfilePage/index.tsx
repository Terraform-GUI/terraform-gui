import React, { FunctionComponent, useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { userService } from '../../api'
import UserContext from '../../contexts/UserContext';
import { useNavigate, Link } from "react-router-dom";
import Email from '../../components/Profile/Email'

export const Profile: FunctionComponent = () => {
	const {email, setEmail, accessToken, setAccessToken, refreshToken, setRefreshToken} = useContext(UserContext);
  const [error, setError] = useState("");
	const navigate = useNavigate();

	function logout () {
		setEmail('');
		setAccessToken('');
		setRefreshToken('');
		localStorage.clear();
		navigate('/home');
	}

	async function deleteAccount () {
		const deleteAccount = await userService.deleteAccount();
		if(deleteAccount?.success){
			setEmail('');
			setAccessToken('');
			setRefreshToken('');
			localStorage.clear();
		}
	}

	return (
		<div className="profile">
			<Email/>
			<Link to="/forgot-password" style={{textDecoration: 'none'}}>
				<Button variant="contained" color="primary" >
					Reset Password
				</Button>
			</Link>
			<Button onClick={() => logout()}>Log out</Button>
			<Button onClick={() => deleteAccount()}>Delete account</Button>
		</div>
	);
};

export default Profile;