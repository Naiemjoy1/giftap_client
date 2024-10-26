import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import add from 'date-fns/add';
import isSameDay from 'date-fns/isSameDay';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import startOfToday from 'date-fns/startOfToday';
import { useState } from 'react';

// Expanded events array
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
    { id: 17, name: "World Kindness Day", startDatetime: '2024-11-13T00:00' },
    { id: 18, name: "Thanksgiving", startDatetime: '2024-11-28T00:00' },
    { id: 19, name: "New Year's Eve", startDatetime: '2024-12-31T00:00' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const EventCalendar = () => {
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
    const firstDayCurrentMonth = new Date(currentMonth);
    
    const days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    const selectedDayEvents = events.filter((event) =>
        isSameDay(parseISO(event.startDatetime), selectedDay)
    );

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4 space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Calendar Section */}
            <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
                <p className="font-bold text-center mb-7">Event Calendar</p>
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => setCurrentMonth(format(add(firstDayCurrentMonth, { months: -1 }), 'MMM-yyyy'))} className="text-gray-600 hover:text-primary">
                        <FaAnglesLeft size={20} />
                    </button>
                    <h2 className="text-xl font-semibold">{format(firstDayCurrentMonth, 'MMMM yyyy')}</h2>
                    <button onClick={() => setCurrentMonth(format(add(firstDayCurrentMonth, { months: 1 }), 'MMM-yyyy'))} className="text-gray-600 hover:text-primary">
                        <FaAnglesRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => {
                        const hasEvent = events.some((event) =>
                            isSameDay(parseISO(event.startDatetime), day)
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
            </div>

            {/* Special Occasion Section */}
            <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                <p className="font-bold text-center mb-7">Special Occasion</p>
                <div className="mt-6">
                    {selectedDayEvents.length > 0 ? (
                        <div className="p-4 bg-green-100 text-green-800 rounded-md">
                            <p className="font-semibold">Today is a special day!</p>
                            <p>Congratulations! It's <span className="font-bold">{selectedDayEvents[0].name}</span>. Enjoy your day!</p>
                        </div>
                    ) : (
                        <div className="p-4 bg-red-100 text-red-800 rounded-md">
                            <p>Today doesn't have any special occasion.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCalendar;
