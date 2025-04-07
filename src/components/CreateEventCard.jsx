import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
    Box,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import Popup from "../components/Popup";
import Notification from "../components/Notification";
import axios from "axios";

function CreateEventCard() {
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({
        open: false,
        type: "success",
        message: "",
    });

    const formFields = [
        { label: "Title", name: "title", type: "text", required: true },
        { label: "Description", name: "description", type: "text", required: true },
        { label: "Date", name: "date", type: "date", required: true },
    ];

    const handleSubmit = async (formData) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setNotify({
                open: true,
                type: "error",
                message: "No token found. Please login again.",
            });
            return;
        }

        try {
            const response = await axios.post(
                "http://20.193.138.209:4000/api/events",
                {
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                }
            );

            if (response.data.success) {
                setNotify({
                    open: true,
                    type: "success",
                    message: "Event created successfully!",
                });
                setOpen(false);
            } else {
                setNotify({
                    open: true,
                    type: "error",
                    message: response.data.message || "Failed to create event.",
                });
            }
        } catch (error) {
            setNotify({
                open: true,
                type: "error",
                message:
                    error?.response?.data?.message || "Something went wrong!",
            });
        }
    };

    return (
        <>
            <Card
                sx={{
                    p: 2,
                    borderRadius: 3,
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    width: { xs: "100%", sm: "75%", md: "250px" },
                    m: { xs: "8px 0", sm: "8px" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
                    },
                }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <IconButton
                        sx={{ color: "var(--text-color)", mb: 2, width: 38, height: 38 }}
                    >
                        <EventIcon />
                    </IconButton>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Create Event
                    </Typography>
                    <Typography variant="body2" color="var(--text-color)">
                        Start a new event quickly.
                    </Typography>
                </CardContent>

                <Box textAlign="center" sx={{ mt: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{
                            backgroundColor: "var(--btn-color)",
                            borderRadius: "8px",
                            px: 2,
                            py: 1,
                            width: "85%",
                            fontSize: "0.9rem",
                            "&:hover": { backgroundColor: "var(--btn-hover-color)" },
                        }}
                    >
                        Create Event
                    </Button>
                </Box>
            </Card>

            <Popup
                open={open}
                handleClose={() => setOpen(false)}
                title="Create Event"
                formFields={formFields}
                onSubmit={handleSubmit}
            />

            <Notification
                open={notify.open}
                type={notify.type}
                message={notify.message}
                onClose={() => setNotify({ ...notify, open: false })}
            />
        </>
    );
}

export default CreateEventCard;
