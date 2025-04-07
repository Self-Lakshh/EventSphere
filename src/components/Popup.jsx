import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from "@mui/material";
import { useState, useEffect } from "react";

const Popup = ({ open, handleClose, title, formFields, onSubmit }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const initialForm = {};
        formFields.forEach((field) => {
            initialForm[field.name] = "";
        });
        setFormData(initialForm);
    }, [formFields, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    {formFields.map((field) => (
                        <TextField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            required={field.required}
                            value={formData[field.name]}
                            onChange={handleChange}
                            fullWidth
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} variant="contained" color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Popup;
