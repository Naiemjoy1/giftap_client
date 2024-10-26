import React, { useState } from 'react';
import useAuth from "../../../../Components/Hooks/useAuth";
import { isTomorrow, parseISO } from 'date-fns';
import EventCalendar from '../../User/Dashboard/EventCalendar/Eventcalendar';
import { useQuery } from 'react-query';
import useAxiosPublic from '../../../../Components/Hooks/useAxiosPublic';


const events = [
    { id: 1, name: "New Year's Day", startDatetime: '2024-01-01T00:00' },
    { id: 2, name: "National Hugging Day", startDatetime: '2024-01-21T00:00' },
    { id: 3, name: "Valentine's Day", startDatetime: '2024-02-14T00:00' },
    { id: 4, name: "World Day of Social Justice", startDatetime: '2024-02-20T00:00' },
    { id: 5, name: "International Women's Day", startDatetime: '2024-03-08T00:00' },
    { id: 6, name: "World Poetry Day", startDatetime: '2024-03-21T00:00' },
    { id: 7, name: "Earth Day", startDatetime: '2024-04-22T00:00' },
    { id: 8, name: "Mother's Day", startDatetime: '2024-05-12T00:00' },
    { id: 9, name: "Father's Day", startDatetime: '2024-06-16T00:00' },
    { id: 10, name: "World Chocolate Day", startDatetime: '2024-07-07T00:00' },
    { id: 11, name: "Friendship Day", startDatetime: '2024-08-04T00:00' },
    { id: 12, name: "Halloween", startDatetime: '2024-10-31T00:00' },
    { id: 13, name: "Christmas Day", startDatetime: '2024-12-25T00:00' },
    { id: 14, name: "Easter Sunday", startDatetime: '2024-04-07T00:00' },
    { id: 15, name: "Independence Day", startDatetime: '2024-07-04T00:00' },
    { id: 16, name: "Global Handwashing Day", startDatetime: '2024-10-25T00:00' },
    { id: 17, name: "World Kindness Day", startDatetime: '2024-10-26T00:00' },
    { id: 18, name: "World Mental Day", startDatetime: '2024-10-27T00:00' },
    { id: 19, name: "World Mental Day", startDatetime: '2024-10-29T00:00' },
  ];

const getUpcomingEventNotifications = () => {
    return events.filter(event => isTomorrow(parseISO(event.startDatetime)));
};

const Notification = () => {
    const { user } = useAuth();
    const axiopsPublic = useAxiosPublic();
    const [currentOffer, setCurrentOffer] = useState('');
    const [offers, setOffers] = useState([]);
    const notifications = getUpcomingEventNotifications();


    const handleInputChange = (e) => {
        setCurrentOffer(e.target.value); 
    };

    const handleSubmit = async () => {
        if (currentOffer.trim() !== '' && notifications.length > 0) {
            const event = notifications[0];
            const newOffer = {
                username: user.displayName,
                message: currentOffer,
                eventId: event.id,
                event: event.name,
            };

            try {
               const result= await axiopsPublic.post("/offers", newOffer); 
                setOffers(prevOffers => [...prevOffers, newOffer]);
                setCurrentOffer(''); 
            } catch (error) {
                console.error("Error submitting offer:", error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-center container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Upcoming Event Notifications</h2>
            {notifications.length > 0 ? (
                <div className="max-w-md w-full">
                    <p className="text-lg mb-2">Tomorrow's Event: {notifications[0].name}</p>
                    <textarea
                        value={currentOffer}
                        onChange={handleInputChange}
                        placeholder="Enter your offer here..."
                        rows="4"
                        className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                    />
                    <br />
                    <button 
                        onClick={handleSubmit} 
                        className="mt-4 px-4 py-2 text-lg bg-primary text-white rounded focus:outline-none"
                    >
                        Submit Offer
                    </button>
                </div>
            ) : (
                <p>No upcoming events tomorrow.</p>
            )}
           
            {offers.length > 0 && <EventCalendar offers={offers} />}
        </div>
    );
};

export default Notification;
