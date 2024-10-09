import React from "react"
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
} from "@mui/material"

const DeleteConfirmation = ({ onCancel, onConfirm }) => (
	<Dialog fullWidth={200} open={true} onClose={onCancel}>
		<DialogTitle sx={{ fontWeight: "bold" }}>Delete user?</DialogTitle>
		<DialogContent>Are you sure you want to delete this user?</DialogContent>
		<DialogActions>
			<Button sx={{ fontWeight: "bold" }} onClick={onCancel}>
				CANCEL
			</Button>
			<Button sx={{ fontWeight: "bold" }} onClick={onConfirm}>
				DELETE
			</Button>
		</DialogActions>
	</Dialog>
)

export default DeleteConfirmation
