import React, { FunctionComponent, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import {userService} from '../../api'

export const ConfirmUserMail: FunctionComponent = () => {
  const [mailConfirmed, setMailConfirmed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
  
	async function confirmMail() {
		const fetchToken = searchParams.get('token');
		if(fetchToken){
			const confirm = await userService.confirmUserMail(fetchToken);
			if(confirm?.success){
				setMailConfirmed(true);
			}
		}
		else {
			navigate('/home');
		}
	}

	confirmMail();

	return (
		<Grid className="confirm-user-mail" container spacing={2}>
			{mailConfirmed ? (
				<>
					<Grid item xs={4}>
						<h1>Mail confirmed</h1>
						<a href="/login">Login</a>
					</Grid>
				</>
			) : (
				<>
					<Grid item xs={4}>	
						<h1>Confirming mail...</h1>
						<CircularProgress />
					</Grid>
				</>
			)}
		</Grid>
	);
};

export default ConfirmUserMail;
