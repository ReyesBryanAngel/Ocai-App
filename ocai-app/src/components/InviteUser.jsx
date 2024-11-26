import React from 'react'
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
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import secureLocalStorage from "react-secure-storage";

const InviteUser = ({ closeModal, setSnackBar }) => {
    const accessToken = secureLocalStorage.getItem('accessToken');
    const [email, setEmail] = useState('');
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
                        <TextField
                            label="Email"
                            type="text"
                            variant="standard"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={() => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        // onClick={handleSubmit}
                    >
                        Send Invite
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default InviteUser
