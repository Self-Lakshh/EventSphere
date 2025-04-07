import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton, Card, CardContent, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import Popup from './Popup'; // Import Popup component

const ActiveEvents = () => {
    const [events, setEvents] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Fetch events from the API
    useEffect(() => {
        axios
            .get('http://20.193.138.209:4000/api/events')
            .then(response => {
                console.log('API Response:', response.data);  // Log the entire response to inspect the structure

                const eventsData = response.data.events || response.data;  // Adjust this line as needed based on your data structure

                if (Array.isArray(eventsData)) {
                    const activeEvents = eventsData
                        .filter(event => event.isActive === 1)
                        .map(event => ({
                            id: event.id,
                            title: event.title,
                            venue: event.venue,
                            end_date: new Date(event.end_date).toLocaleDateString(),
                        }));

                    console.log('Mapped Active Events:', activeEvents);  // Log the filtered and mapped events
                    setEvents(activeEvents);
                } else {
                    console.error('Expected events to be an array, but got:', eventsData);
                }
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    // Handle the delete event
    const handleDeleteEvent = (eventId) => {
        axios
            .delete(`http://localhost:4000/api/events/${eventId}`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`, // Replace with actual token
                },
            })
            .then(() => {
                setEvents(events.filter(event => event.id !== eventId));
                alert('Event deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting event:', error);
            });
    };

    // Handle open edit popup with selected event data
    const handleEditEvent = (event) => {
        setSelectedEvent(event);
        setOpenPopup(true);
    };

    // Handle form submission from Popup
    const handleFormSubmit = (updatedData) => {
        axios
            .put(`http://localhost:4000/api/events/${selectedEvent.id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem('token')}`, // Replace with actual token
                },
            })
            .then((response) => {
                const updatedEvents = events.map((event) =>
                    event.id === selectedEvent.id ? { ...event, ...updatedData } : event
                );
                setEvents(updatedEvents);
                setOpenPopup(false);
                alert('Event updated successfully');
            })
            .catch((error) => {
                console.error('Error updating event:', error);
            });
    };

    return (
        <Box sx={{ width: '95%', padding: 0, alignItems: 'center' }}>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <Card
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: 1,
                            width: '100%',
                            margin: '10px 0',
                            height: 60,
                            overflow: 'hidden',
                            borderRadius: 0,
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.02)',
                            },
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40 }}>
                            <EventIcon
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: '50%',
                                    backgroundColor: '#e0e0e0',
                                    padding: 0.5,
                                }}
                            />
                        </Box>
                        <CardContent sx={{ padding: 1, flex: 1 }}>
                            <Stack direction="column" spacing={0.5} justifyContent="center">
                                <Typography variant="h6" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                    {event.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                                    {event.venue}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                                    End Date: {event.end_date}
                                </Typography>
                            </Stack>
                        </CardContent>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingRight: 1,
                            }}
                        >
                            <IconButton size="small" onClick={() => handleEditEvent(event)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDeleteEvent(event.id)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Card>
                ))
            ) : (
                <Typography>No active events available</Typography>
            )}

            {/* Popup Component */}
            <Popup
                open={openPopup}
                handleClose={() => setOpenPopup(false)}
                title="Edit Event"
                formFields={[
                    { name: 'title', label: 'Event Title', type: 'text', required: true },
                    { name: 'venue', label: 'Venue', type: 'text', required: true },
                    { name: 'end_date', label: 'End Date', type: 'date', required: true },
                ]}
                onSubmit={handleFormSubmit}
            />
        </Box>
    );
};

export default ActiveEvents;
