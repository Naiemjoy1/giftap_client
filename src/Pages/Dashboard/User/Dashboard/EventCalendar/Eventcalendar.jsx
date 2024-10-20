import { Menu, Transition, Dialog } from '@headlessui/react';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import add from 'date-fns/add';
import isSameDay from 'date-fns/isSameDay';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import startOfToday from 'date-fns/startOfToday';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';


// Sample events
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
    { id: 13, name: "Halloween", startDatetime: '2024-10-31T00:00' },
];


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const EventCalendar = () => {
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

    const days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });
    const selectedDayEvents = events.filter((event) =>
        isSameDay(parseISO(event.startDatetime), selectedDay)
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [smsDetails, setSmsDetails] = useState({ receiverEmail: '', receiverName: '', message: '' });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [receivedWishes, setReceivedWishes] = useState([]);

    // Fetch received wishes using axios
    const fetchReceivedWishes = async () => {
        try {
            const response = await axios.get('https://api.your-sms-provider.com/get-wishes', {
                headers: {
                    'Authorization': 'Bearer YOUR_API_KEY',
                },
            });
            setReceivedWishes(response.data.wishes);  // Assuming the response contains a "wishes" array
        } catch (error) {
            console.error('Error fetching received wishes:', error);
        }
    };

    // Fetch received wishes on component mount
    useEffect(() => {
        fetchReceivedWishes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSmsDetails({ ...smsDetails, [name]: value });
    };

    const openModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSmsDetails({ receiverEmail: '', receiverName: '', message: '' });
    };
    function previousMonth() {
        let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'));
    }
    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }

    // Send wish using axios (POST)
    const sendWish = async () => {
        try {
            const response = await axios.post('https://api.your-sms-provider.com/send', {
                to: smsDetails.receiverEmail,
                message: smsDetails.message,
                name: smsDetails.receiverName,
                event: selectedEvent.name,
            }, {
                headers: {
                    'Authorization': 'Bearer YOUR_API_KEY',
                },
            });

            if (response.status === 200) {
                alert('Wish sent successfully!');
                closeModal();
            } else {
                alert('Failed to send the wish');
            }
        } catch (error) {
            console.error('Error sending wish:', error);
        }
    };


    return (
        <div className="lg:flex lg:space-x-4">
            {/* Calendar Section */}
            <div className="lg:w-2/3">
                <div className="flex justify-between">
                    <button onClick={previousMonth}><FaAnglesLeft /></button>
                    <h2>{format(firstDayCurrentMonth, 'MMMM yyyy')}</h2>
                    <button onClick={nextMonth}><FaAnglesRight /></button>
                </div>

                <div className="grid grid-cols-7 gap-1 mt-4">
                    {days.map((day, index) => {
                        const hasEvent = events.some((event) =>
                            event.startDatetime && isSameDay(parseISO(event.startDatetime), day)
                        );

                        return (
                            <div key={index} className="text-center">
                                <button
                                    onClick={() => setSelectedDay(day)}
                                    className={`${isSameDay(day, selectedDay) ? 'bg-primary text-white' : ''} 
                    ${hasEvent ? 'bg-yellow-400' : ''} 
                    py-1 px-2 rounded-full w-8 h-8 flex items-center justify-center border`}
                                >
                                    {format(day, 'd')}
                                </button>
                            </div>
                        );
                    })}

                </div>

                {/* Display events for the selected day */}
                <div>
                    {selectedDayEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => openModal(event)}
                            className="mt-2 p-2   cursor-pointer"
                        >
                            {event.name}
                        </div>
                    ))}
                </div>

                {/* Modal for sending SMS */}
                <Dialog open={isModalOpen} onClose={closeModal} className="fixed inset-0 z-10">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
                        <Dialog.Title>Send Wish for {selectedEvent?.name}</Dialog.Title>
                        <input
                            name="receiverEmail"
                            value={smsDetails.receiverEmail}
                            onChange={handleInputChange}
                            placeholder="Recipient's Email"
                            className="block mt-2 w-full"
                        />
                        <input
                            name="receiverName"
                            value={smsDetails.receiverName}
                            onChange={handleInputChange}
                            placeholder="Recipient's Name"
                            className="block mt-2 w-full"
                        />
                        <textarea
                            name="message"
                            value={smsDetails.message}
                            onChange={handleInputChange}
                            placeholder="Your Wish Message"
                            className="block mt-2 w-full"
                        />
                        <button onClick={sendWish} className="bg-blue-500 text-white mt-4">Send Wish</button>
                    </div>
                </Dialog>
            </div>

            {/* Right-side panel for viewing received wishes */}
            <div className="lg:w-1/3">
                <h3 className="font-bold text-lg">Received Wishes</h3>
                {receivedWishes.length === 0 ? (
                    <p>No wishes received yet.</p>
                ) : (
                    <ul>
                        {receivedWishes.map((wish) => (
                            <li key={wish.id} className="border-b py-2">
                                <p><strong>From:</strong> {wish.senderName}</p>
                                <p><strong>Message:</strong> {wish.message}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EventCalendar;
