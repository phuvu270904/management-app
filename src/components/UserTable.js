import React, { useState } from "react"
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Checkbox,
	Button,
	TablePagination,
} from "@mui/material"

const UserTable = ({ users, setSelectedUsers, onDelete }) => {
	const [currentPage, setCurrentPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selected, setSelected] = useState([])

	const handlePageChange = (event, newPage) => {
		setCurrentPage(newPage)
	}

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setCurrentPage(0)
	}

	const handleSelectUser = (event, userId) => {
		const selectedIndex = selected.indexOf(userId)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, userId)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}

		setSelected(newSelected)
		setSelectedUsers(users.filter((user) => newSelected.includes(user.id)))
	}

  const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = users.map((user) => user.id)
			setSelected(newSelecteds)
			setSelectedUsers(users) 
			return
		}
		setSelected([])
		setSelectedUsers([]) 
	}

	const paginatedUsers = users.slice(
		currentPage * rowsPerPage,
		currentPage * rowsPerPage + rowsPerPage
	)

	return (
		<Paper>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									indeterminate={
										selected.length > 0 && selected.length < users.length
									}
									checked={users.length > 0 && selected.length === users.length}
									onChange={handleSelectAllClick}
								/>
							</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>First name</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Last name</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedUsers.map((user) => {
							const isSelected = selected.indexOf(user.id) !== -1
							return (
								<TableRow
									hover
									onClick={(event) => handleSelectUser(event, user.id)}
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={user.id}
									selected={isSelected}
								>
									<TableCell padding="checkbox">
										<Checkbox checked={isSelected} />
									</TableCell>
									<TableCell>{user.first_name}</TableCell>
									<TableCell>{user.last_name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										<Button
											sx={{ color: "info.main", fontWeight: "bold" }}
											onClick={() => onDelete(user)}
										>
											DELETE
										</Button>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={users.length}
				page={currentPage}
				onPageChange={handlePageChange}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleRowsPerPageChange}
			/>
		</Paper>
	)
}

export default UserTable
