import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import {Kafka, KafkaConsumer} from 'kafka-node';

const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new KafkaConsumer(
    client,
    [{ topic: 'PatientUpdate', partition: 0 }],
    { autoCommit: true }
);

const availableTime = 5

const notifications = [
    {id: 0, title: 'Patient general update (2023-03-04 10:00)', message: 'Patient X received a bath.'},
    {id: 1, title: 'Patient general update (2023-03-04 11:00)', message: 'Patient X were examined by Doctor H.'},
    {
        id: 2, title: 'Patient transfer (2023-03-04 15:00)',
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
        consumer.on('message', (message) => {
            const notification = JSON.parse(message.value);
            setRemainingNotifications((prevNotifications) => [...prevNotifications, notification]);
        });
        consumer.on('error', (error) => {
            console.error('Error from Kafka consumer:', error);
        });
        return () => consumer.close();
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