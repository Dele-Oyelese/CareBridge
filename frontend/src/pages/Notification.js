import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

const availableTime = 30

const notifications = [
    {id: 453645645645, title: 'New Patient Update (03/04/2023, 10:20:15)', message: 'Patient X received a bath.'},
    {id: 453645645646, title: 'New Patient Update (03/04/2023, 11:54:03)', message: 'Patient X were examined by Doctor H.'},
    {
        id: 453645645647, title: 'New Patient Update (03/04/2023, 14:10:00)',
        message: 'Patient X were transferred to the ER following breathing problems.'
    }
];

export const Notification = () => {

    const [selectedNotification, setSelectedNotification] = useState(null);
    const [remainingNotifications, setRemainingNotifications] = useState(notifications);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft) {
                setTimeLeft(timeLeft - 1);
            } else if (timeLeft === 0) {
                closeModal(selectedNotification);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetch('http://localhost:5000/get_patient_update');
            const newNotifications = await response.json();
            for (let i = 0; i < newNotifications.length; i++) {
                setRemainingNotifications((prevNotifications) => [...prevNotifications, newNotifications[i]]);
            }
            fetchNotifications();
        };

        fetchNotifications();

    }, []);

    const openModal = (notification) => {
        setSelectedNotification(notification);
        setTimeLeft(availableTime);
    };

    const closeModal = (notification) => {
        setRemainingNotifications((prevNotifications) =>
            prevNotifications.filter((n) => n.id !== notification.id)
        );
        setSelectedNotification(null);
        setTimeLeft(null);
    };

    return (
        <div className="notification-list">
            {remainingNotifications.map((notification) => (
                <div key={notification.id} className="notification" onClick={() => openModal(notification)}>
                    <h2>{notification.title}</h2>
                </div>
            ))}
            <Modal
                isOpen={!!selectedNotification}
                onRequestClose={() => closeModal(selectedNotification)}
                contentLabel="Notification Details"
                className="modal"
                overlayClassName="overlay"
            >
                {selectedNotification && (
                    <div>
                        <h2>{selectedNotification.title}</h2>
                        <p>{selectedNotification.message}</p>
                        <p>Time left: {timeLeft}s</p>
                        <button className="close-button" onClick={() => closeModal(selectedNotification)}>
                            OK
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}