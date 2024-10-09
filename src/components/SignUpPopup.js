import React, { useState } from "react"
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	TextField
} from "@mui/material"

const SignUpPopup = ({ onClose, addUser, setEmailUser, setShowSuccess }) => {
	const [email, setEmail] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [password, setPassword] = useState("")
	const [retypePassword, setRetypePassword] = useState("")

	const handleSignUp = () => {
		addUser({ first_name: firstName, last_name: lastName, email })
		onClose()
		setEmailUser(email)
    setShowSuccess(true)
	}

	return (
		<div>
			<Dialog open={true} onClose={onClose}>
				<DialogTitle sx={{ fontWeight: "bold" }}>SIGN UP FORM</DialogTitle>
				<DialogContent sx={{ paddingY: "0" }}>
					Fill in the form below to sign up a new user
				</DialogContent>
				<DialogContent>
					<TextField
						label="Email"
						margin="normal"
						required
						fullWidth
						type="email"
						id="standard-basic"
						variant="standard"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						label="First Name"
						required
						fullWidth
						margin="normal"
						id="standard-basic"
						variant="standard"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<TextField
						label="Last Name"
						required
						fullWidth
						margin="normal"
						id="standard-basic"
						variant="standard"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<TextField
						label="Password"
						required
						type="password"
						fullWidth
						margin="normal"
						id="standard-basic"
						variant="standard"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<TextField
						label="Re-type password"
						required
						type="password"
						fullWidth
						margin="normal"
						id="standard-basic"
						variant="standard"
						value={retypePassword}
						onChange={(e) => setRetypePassword(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>CANCEL</Button>
					<Button variant="contained" color="primary" onClick={handleSignUp}>
						SIGN UP
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default SignUpPopup
