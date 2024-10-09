import React from "react"
import {
	Dialog,
	DialogActions,
	DialogContent,
	Button,
} from "@mui/material"

const DeleteConfirmation = ({ onCancel, email }) => (
	<Dialog fullWidth={200} open={true} onClose={onCancel}>
		<DialogContent>
			The user with email {email} was added successfully
		</DialogContent>
		<DialogActions>
			<Button sx={{ fontWeight: "bold" }} onClick={onCancel}>
				CLOSE
			</Button>
		</DialogActions>
	</Dialog>
)

export default DeleteConfirmation
