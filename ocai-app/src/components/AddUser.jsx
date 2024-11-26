import { useState } from 'react'
import { 
    Dialog,
    DialogContent,
    TextField,
    Button,
    IconButton,
    Switch,
    Container,
    Paper,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { addUser } from '../services/apiService';

const AddUser = ({ closeModal, setSnackBar }) => {
    const accessToken = secureLocalStorage.getItem('accessToken');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState({
        sectionId: "",
        schoolId: "",
        lastName: "",
        firstName: "",
        middleName: "",
        gender: "",
        role: "",
        guardianName: "",
        guardianContact: "",
        disability: "",
        contactNumber: "",
        homeAddress: "",
        username: "",
        password: "",
        photo: "",
        isArchived: false
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        setError('');
        const response = await addUser(accessToken, userData);
        console.log(response);
        if (response?.status === 200) {
            setSnackBar(true);
            closeModal();
            setTimeout(() => {
                setSnackBar(false);
                window.location.reload();
            }, 1000)
        }
        // try {
        //     const response = await addUser(accessToken, userData);
        //     console.log(response);
        //     if (response?.status === 200) {
        //         setSnackBar(true);
        //         closeModal();
        //         setTimeout(() => {
        //             setSnackBar(false);
        //             window.location.reload();
        //         }, 1000)
        //     }
        // } catch (err) {
        //     setError(err?.response?.data?.message);
        // }
    };
  return (
    <>
        <Dialog
            open={true}
            onClose={closeModal}
            maxWidth="md"
            fullWidth 
        >
           <DialogContent>
                <div className='my-10'>
                    <IconButton
                        aria-label="close"
                        onClick={closeModal}
                        sx={{
                        position: "absolute",
                        right: 6,
                        top: 4,
                        color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <HighlightOffRoundedIcon />
                    </IconButton>
                    <div className='flex gap-4'>
                        <TextField
                            label="First Name"
                            type="text"
                            variant="standard"
                            fullWidth
                            name="firstName"
                            margin="normal"
                            value={userData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Last Name"
                            type="text"
                            variant="standard"
                            fullWidth
                            name="lastName"
                            margin="normal"
                            value={userData.middleName}
                            onChange={handleInputChange}
                            required
                        />
                        {/* {error && (
                            <Typography color="error" variant="body2" align="center">
                                {error}
                            </Typography>
                        )} */}
                        <TextField
                            label="Last Name"
                            type="text"
                            variant="standard"
                            fullWidth
                            name="lastName"
                            margin="normal"
                            value={userData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex gap-4'>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={userData.role}
                                onChange={handleInputChange}
                                label="Role"
                            >
                                <MenuItem value={"Teacher"}>Teacher</MenuItem>
                                <MenuItem value={"Student"}>Student</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={userData.gender}
                                onChange={handleInputChange}
                                label="Age"
                                required
                            >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Disability"
                            type="text"
                            variant="standard"
                            fullWidth
                            name="disability"
                            value={userData.disability}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex gap-4'>
                        <TextField
                            label="Gurdian Name"
                            type="text"
                            variant="standard"
                            fullWidth
                            name="guardianName"
                            margin="normal"
                            value={userData.guardianName}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Gurdian Contact"
                            type="text"
                            variant="standard"
                            fullWidth
                            name="guardianContact"
                            margin="normal"
                            value={userData.guardianContact}
                            onChange={handleInputChange}
                            required
                        />
                         <TextField
                            label="Home Address"
                            type="text"
                            variant="standard"
                            fullWidth
                            name="homeAddress"
                            margin="normal"
                            value={userData.homeAddress}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <Switch
                        checked={userData.isArchived}
                        onChange={(e) => handleInputChange({ target: {name: "isArchived", value: e.target.checked  }}) }
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
           </DialogContent>
        </Dialog>
    </>
  )
}

export default AddUser
