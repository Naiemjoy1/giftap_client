import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { Fragment, useState } from 'react'
const events = [
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
    {
      id: 12,
      name: "International Day of Peace",
      imageUrl: 'https://example.com/peace-day-image.jpg',
      startDatetime: '2024-09-21T00:00',
      endDatetime: '2024-09-21T23:59',
    },
  
    // October
    {
      id: 13,
      name: "Halloween",
      imageUrl: 'https://example.com/halloween-image.jpg',
      startDatetime: '2024-10-31T00:00',
      endDatetime: '2024-10-31T23:59',
    },
  
    // November
    {
      id: 14,
      name: "Thanksgiving",
      imageUrl: 'https://example.com/thanksgiving-image.jpg',
      startDatetime: '2024-11-28T00:00',
      endDatetime: '2024-11-28T23:59',
    },
  
    // December
    {
      id: 15,
      name: "Christmas",
      imageUrl: 'https://example.com/christmas-image.jpg',
      startDatetime: '2024-12-25T00:00',
      endDatetime: '2024-12-25T23:59',
    },
  ];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Calendar() {
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  
    let days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    })
  
    function previousMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    function nextMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    let selectedDayEvents = events.filter((event) =>
      isSameDay(parseISO(event.startDatetime), selectedDay)
    )
  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <img
        src={meeting.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={meeting.endDatetime}>
            {format(endDateTime, 'h:mm a')}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
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
    </li>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]
