import { Snackbar, Alert, Slide } from "@mui/material";

const SlideUp = (props) => <Slide {...props} direction="up" />;

const Notification = ({ open, type, message, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            TransitionComponent={SlideUp}
        >
            <Alert
                onClose={onClose}
                severity={type}
                variant="filled"
                sx={{ width: "100%", fontWeight: 500 }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
