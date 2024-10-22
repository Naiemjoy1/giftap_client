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

// Updated events array with more special days
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
    { id: 13, name: "Christmas Day", startDatetime: '2024-12-25T00:00' }, // Added event
    { id: 14, name: "Easter Sunday", startDatetime: '2024-04-07T00:00' },  // Added event
    { id: 15, name: "Independence Day", startDatetime: '2024-07-04T00:00' }, // Added event
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

                {/* Special Offer Section */}
              {/* Special Offer Section */}
<div className="mt-6">
    {selectedDayEvents.length > 0 ? (
        <div className="p-4 bg-green-100 text-green-800 rounded-md">
            <p className="font-semibold">Special Offer:</p>
            <p>Congratulations! It's <span className="font-bold">{selectedDayEvents[0].name}</span>. Enjoy a 25% discount on all purchases today!</p>
        </div>
    ) : (
        <div className="p-4 bg-red-100 text-red-800 rounded-md">
            <p>No special occasion today. Regular prices apply.</p>
        </div>
    )}

  
</div>

            </div>

            {/* Right-side for special offer display */}
            <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-bold mb-4">Special Offer</h3>
    <div className="bg-white shadow-md rounded-lg p-4">
        <div>
            <img src="https://img.freepik.com/free-vector/special-offer-creative-sale-banner-design_1017-16284.jpg?t=st=1729603132~exp=1729606732~hmac=86d5cc12cf3a70bd2ed94af1445a6798c26c2083409c9cb3cc834272d9735a0a&w=740" alt="" />
        </div>
        {/* Check if today's selected day has any events */}
        {selectedDayEvents.length > 0 ? (
            <div>
                <p className="font-semibold text-green-600">Today has a Special Occasions!</p>
                <p className="mt-2 text-gray-600">Enjoy a 25% discount on all items for any selected special occasion!</p>
            </div>
        ) : (
            <div>
                <p className="font-semibold text-red-500">Today doesn't have any special offer.</p>
                <p className="mt-2 text-gray-500">Check the calendar for upcoming events.</p>
            </div>
        )}
    </div>
</div>

        </div>
    );
};

export default EventCalendar;
