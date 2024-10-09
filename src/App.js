import React, { useState } from "react"
import { Button, Box } from "@mui/material"
import UserTable from "./components/UserTable"
import SignUpPopup from "./components/SignUpPopup"
import DeleteConfirmation from "./components/DeleteConfirmation"
import SignUpSuccess from "./components/SignUpSuccess"

function App() {
	// Hardcoded user data
	const [users, setUsers] = useState([
		{ id: 1, first_name: "FN1", last_name: "LN1", email: "email1@example.com" },
		{ id: 2, first_name: "FN2", last_name: "LN2", email: "email2@example.com" },
		{ id: 3, first_name: "FN3", last_name: "LN3", email: "email3@example.com" },
		{ id: 4, first_name: "FN4", last_name: "LN4", email: "email4@example.com" },
		{ id: 5, first_name: "FN5", last_name: "LN5", email: "email5@example.com" },
	])

	const [selectedUsers, setSelectedUsers] = useState([])
	const [showSignUp, setShowSignUp] = useState(false)
	const [showDelete, setShowDelete] = useState(false)
	const [userToDelete, setUserToDelete] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [emailUser, setEmailUser] = useState("")

	// Handle delete user action
	const handleDelete = () => {
		setUsers(users.filter((user) => user.id !== userToDelete.id))
		setShowDelete(false)
	}

	const handleExport = () => {
		const headers = "id,email,first_name,last_name\n"

		const csvRows = selectedUsers.map((user, index) => {
			return `${index + 1},${user.email},${user.first_name},${user.last_name}`
		})

		const csvString = headers + csvRows.join("\n")

		const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })

		const link = document.createElement("a")
		const url = URL.createObjectURL(blob)
		link.setAttribute("href", url)
		link.setAttribute("download", "users.csv")
		link.style.visibility = "hidden"

		document.body.appendChild(link)
		link.click()

		document.body.removeChild(link)
	}

  const addUser = (newUser) => {
		setUsers((prevUsers) => [
			...prevUsers,
			{ id: prevUsers.length + 1, ...newUser },
		])
	}

	return (
		<Box
			sx={{
				padding: "20px",
				width: "1000px",
				margin: "auto",
				marginTop: "100px",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "end",
					marginBottom: "20px",
				}}
			>
				<Button
					variant="contained"
					sx={{ marginRight: "10px" }}
					color="primary"
					onClick={() => setShowSignUp(true)}
				>
					SIGN UP
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={handleExport}
					disabled={selectedUsers.length === 0}
				>
					EXPORT
				</Button>
			</Box>

			<UserTable
				users={users}
				setSelectedUsers={setSelectedUsers}
				onDelete={(user) => {
					setUserToDelete(user)
					setShowDelete(true)
				}}
			/>

			{showSignUp && (
				<SignUpPopup
					onClose={() => setShowSignUp(false)}
					addUser={addUser}
					setEmailUser={setEmailUser}
          setShowSuccess={setShowSuccess}
				/>
			)}
			{showDelete && (
				<DeleteConfirmation
					onCancel={() => setShowDelete(false)}
					onConfirm={handleDelete}
				/>
			)}
			{showSuccess && (
				<SignUpSuccess
					onCancel={() => setShowSuccess(false)}
					email={emailUser}
				/>
			)}
		</Box>
	)
}

export default App
