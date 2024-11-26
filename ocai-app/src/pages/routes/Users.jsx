import React, { useEffect, useState } from 'react'
import { getUsers } from '../../services/apiService'
import secureLocalStorage from 'react-secure-storage'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Button
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUser from '../../components/AddUser';
import InviteUser from '../../components/InviteUser';

const Users = () => {
  const accessToken = secureLocalStorage.getItem('accessToken');
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackBar, setSnackBar] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers(accessToken);
      setUsers(usersData?.data?.data);
    }

    fetchUsers();
  },[accessToken]);

  const closeModal = () => {
    setIsModalOpen(false);
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      {/* Hi users */}
      <div>
        {/* {isModalOpen &&(
          <AddUser closeModal={closeModal} setSnackBar={setSnackBar} />
        )} */}

        {isModalOpen &&(
          <InviteUser closeModal={closeModal} setSnackBar={setSnackBar} />
        )}
        {snackBar && (
          <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={() => setSnackBar(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={() => setSnackBar(false)}
                severity="success"
            >
                {apiResponse}
            </MuiAlert>
          </Snackbar>
        )}

        <Button variant='contained' sx={{ marginBottom:"20px" }} onClick={() => setIsModalOpen(true)}>
          Invite User
        </Button>
        <TableContainer>
          <Table className="table-auto border-collapse border border-gray-400 w-full">
              <TableHead>
                  <TableRow className="bg-gray-100">
                      <TableCell className="border border-gray-300 px-4 py-2">ID No.</TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2">Role</TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2">First Name</TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2">Last Name</TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2">Gender</TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2">Contact No.</TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2">Address</TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2">Action</TableCell>
                      
                  </TableRow>
              </TableHead>
              <TableBody>
                  {users?.map((user, index) => (
                      <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                          <TableCell className="border border-gray-300 px-4 py-2">{user.schoolId}</TableCell>
                          <TableCell className="border border-gray-300 px-4 py-2">{user.role}</TableCell>
                          <TableCell className="border border-gray-300 px-4 py-2">{user.firstName}</TableCell>
                          {/* <TableCell className="border border-gray-300 px-4 py-2">{user.middleName}</TableCell> */}
                          <TableCell className="border border-gray-300 px-4 py-2">{user.lastName}</TableCell>
                          <TableCell className="border border-gray-300 px-4 py-2">{user.gender}</TableCell>
                          <TableCell className="border border-gray-300 px-4 py-2">{user.contactNumber}</TableCell>
                          <TableCell className="border border-gray-300 px-4 py-2">{user.homeAddress}</TableCell>
                          <TableCell className="border border-gray-300 px-4 py-2">
                              {/* <Tooltip title='Edit'>
                                  <IconButton onClick={() => getTask(task?._id)}>
                                      <EditIcon color='primary' />
                                  </IconButton>
                              </Tooltip> */}
                              <Tooltip title='Delete'>
                                  <IconButton onClick={() => {
                                      setIsModalDeleteTaskOpen(true);
                                      setTaskId(task?._id);
                                  }}>
                                      <DeleteIcon color='error' />
                                  </IconButton>
                              </Tooltip>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Users
