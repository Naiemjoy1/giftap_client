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
import { DialogTitle } from '@headlessui/react';
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

    const fetchReceivedWishes = async () => {
        try {
            const response = await axios.get('https://api.your-sms-provider.com/get-wishes', {
                headers: {
                    'Authorization': 'Bearer YOUR_API_KEY',
                },
            });
            setReceivedWishes(response.data.wishes);
        } catch (error) {
            console.error('Error fetching received wishes:', error);
        }
    };

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
        <div className="lg:flex lg:space-x-6 p-4">
           
            {/* Calendar Section */}
            <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <p className="font-bold text-center mb-7">Event Calendar</p>
                <div className="flex justify-between items-center mb-6">
                    <button onClick={previousMonth} className="text-gray-600 hover:text-primary">
                        <FaAnglesLeft size={20} />
                    </button>
                    <h2 className="text-xl font-semibold">{format(firstDayCurrentMonth, 'MMMM yyyy')}</h2>
                    <button onClick={nextMonth} className="text-gray-600 hover:text-primary">
                        <FaAnglesRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => {
                        const hasEvent = events.some((event) =>
                            event.startDatetime && isSameDay(parseISO(event.startDatetime), day)
                        );

                        return (
                            <div key={index} className="text-center">
                                <button
                                    onClick={() => setSelectedDay(day)}
                                    className={classNames(
                                        "py-1 px-2 rounded-full w-10 h-10 flex items-center justify-center border transition",
                                        isSameDay(day, selectedDay) ? 'bg-primary text-white' : 'bg-white text-black',
                                        hasEvent ? 'border-yellow-400' : 'border-gray-300'
                                    )}
                                >
                                    {format(day, 'd')}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6">
                    {selectedDayEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => setIsModalOpen(true)}
                            className="mt-2 p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 transition"
                        >
                            {event.name}
                        </div>
                    ))}
                </div>

              
              
            </div>

            {/* Right-side for viewing received wishes */}
            <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Received Wishes</h3>
                {receivedWishes.length === 0 ? (
                    <p>No wishes received yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {receivedWishes.map((wish) => (
                            <li key={wish.id} className="border-b pb-2">
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
