export function isloggedIn() {
	let authenticated = true;

  // if(nextState.location.pathname === "/dashboard" && !authenticated) {
  //   replace({
	// 		pathname: "/login",
	// 		state: { nextPathname: nextState.location.pathname },
	// 	});
  // }

  // else if(["/", "/login", "/sign-up"].includes(nextState.location.pathname) && authenticated) {
  //   replace({
  //     pathname: "/dashboard",
  //     state: { nextPathname: nextState.location.pathname },
  //   });
  // }

	return authenticated;
}

export default isloggedIn;
