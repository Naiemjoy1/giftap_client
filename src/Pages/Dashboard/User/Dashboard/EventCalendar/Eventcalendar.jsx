import { Menu, Transition } from '@headlessui/react';
import { FaAnglesLeft,FaAnglesRight } from "react-icons/fa6";
// import { DotsVerticalIcon } from '@heroicons/react/solid';
import { HiDotsVertical } from "react-icons/hi";

import add from 'date-fns/add';
import isSameDay from 'date-fns/isSameDay';  

import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import startOfToday from 'date-fns/startOfToday';
import { Fragment, useState } from 'react';

// Sample events
const events = [
    // Event data as you provided
    // January
    {
      id: 1,
      name: "New Year's Day",
      imageUrl: 'https://example.com/new-year-image.jpg',
      startDatetime: '2024-01-01T00:00',
      endDatetime: '2024-01-01T23:59',
    },
    {
        id: 2,
        name: "National Hugging Day",
        imageUrl: 'https://example.com/hugging-day-image.jpg',
        startDatetime: '2024-01-21T00:00',
        endDatetime: '2024-01-21T23:59',
      },
      // February
  {
    id: 3,
    name: "Valentine's Day",
    imageUrl: 'https://example.com/valentines-image.jpg',
    startDatetime: '2024-02-14T00:00',
    endDatetime: '2024-02-14T23:59',
  },
  {
    id: 4,
    name: "World Day of Social Justice",
    imageUrl: 'https://example.com/social-justice-day-image.jpg',
    startDatetime: '2024-02-20T00:00',
    endDatetime: '2024-02-20T23:59',
  },
   // March
  {
    id: 5,
    name: "International Women's Day",
    imageUrl: 'https://example.com/womens-day-image.jpg',
    startDatetime: '2024-03-08T00:00',
    endDatetime: '2024-03-08T23:59',
  },
  {
    id: 6,
    name: "World Poetry Day",
    imageUrl: 'https://example.com/poetry-day-image.jpg',
    startDatetime: '2024-03-21T00:00',
    endDatetime: '2024-03-21T23:59',
  },
  // April
  {
    id: 7,
    name: "Earth Day",
    imageUrl: 'https://example.com/earth-day-image.jpg',
    startDatetime: '2024-04-22T00:00',
    endDatetime: '2024-04-22T23:59',
  },
  // May
  {
    id: 8,
    name: "Mother's Day",
    imageUrl: 'https://example.com/mothers-day-image.jpg',
    startDatetime: '2024-05-12T00:00',
    endDatetime: '2024-05-12T23:59',
  },
  // June
  {
    id: 9,
    name: "Father's Day",
    imageUrl: 'https://example.com/fathers-day-image.jpg',
    startDatetime: '2024-06-16T00:00',
    endDatetime: '2024-06-16T23:59',
  },
  // July
  {
    id: 10,
    name: "World Chocolate Day",
    imageUrl: 'https://example.com/chocolate-day-image.jpg',
    startDatetime: '2024-07-07T00:00',
    endDatetime: '2024-07-07T23:59',
  },
  // August
  {
    id: 11,
    name: "Friendship Day",
    imageUrl: 'https://example.com/friendship-day-image.jpg',
    startDatetime: '2024-08-04T00:00',
    endDatetime: '2024-08-04T23:59',
  },
  // September
   // October
   {
    id: 13,
    name: "Halloween",
    imageUrl: 'https://example.com/halloween-image.jpg',
    startDatetime: '2024-10-31T00:00',
    endDatetime: '2024-10-31T23:59',
  },
  
 
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const EventCalendar = () => {
    let today = startOfToday();
    let [selectedDay, setSelectedDay] = useState(today);
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });
    let selectedDayEvents = events.filter((event) =>
        isSameDay(parseISO(event.startDatetime), selectedDay)
      );
      
    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <button onClick={previousMonth}>
                    <FaAnglesLeft
                    className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-bold">{currentMonth}</h2>
                <button onClick={nextMonth}>
                    <FaAnglesRight  className="w-5 h-5" />
                </button>
            </div>
            <ul className="grid grid-cols-7 gap-4">
                {days.map((day) => (
                    <li
                        key={day.toString()}
                        className={classNames(
                            isSameDay(day, selectedDay) ? 'bg-blue-500 text-white' : 'text-gray-900',
                            'p-4 border rounded-md cursor-pointer hover:bg-blue-100'
                        )}
                        onClick={() => setSelectedDay(day)}
                    >
                        {format(day, 'd')}
                        {events.filter((event) => isSameDay(parseISO(event.startDatetime), day)).map((event) => (
                            <div key={event.id} className="flex items-center mt-2 px-2 py-1 space-x-4 bg-gray-100 rounded-md">
                                <img
                                    src={event.imageUrl}
                                    alt={event.name}
                                    className="flex-none w-10 h-10 rounded-full"
                                />
                                <div className="flex-auto">
                                    <p className="text-gray-900">{event.name}</p>
                                    <p className="mt-0.5">
                                        <time dateTime={event.startDatetime}>
                                            {format(new Date(event.startDatetime), 'h:mm a')}
                                        </time>{' '}
                                        -{' '}
                                        <time dateTime={event.endDatetime}>
                                            {format(new Date(event.endDatetime), 'h:mm a')}
                                        </time>
                                    </p>
                                </div>
                                <Menu as="div" className="relative">
                                    <div>
                                        <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                                            <span className="sr-only">Open options</span>
                                            <HiDotsVertical  className="w-6 h-6" aria-hidden="true" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Edit
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Cancel
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventCalendar;
