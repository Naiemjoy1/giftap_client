import React from 'react'

const Subscription = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-8 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
                    <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-900 dark:border-gray-700">
                        <div className="flex-shrink-0">
                            <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-primary uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                                Casual
                            </h2>
                        </div>

                        <div className="flex-shrink-0">
                            <span className="pt-2 text-3xl font-bold text-gray-800 uppercase dark:text-gray-100">
                                Free
                            </span>
                        </div>

                        <ul className="flex-1 space-y-4">
                            <li className="text-gray-500 dark:text-gray-400">
                                Basic access to limited gift categories.
                            </li>

                            <li className="text-gray-500 dark:text-gray-400">
                                Send 1-2 gifts per month.
                            </li>

                            <li className="text-gray-500 dark:text-gray-400">
                                Standard delivery.
                            </li>
                            <li className="text-gray-500 dark:text-gray-400">
                                Occasional discounts.
                            </li>
                        </ul>

                        <button className="inline-flex items-center justify-center px-4 py-2 font-medium text-white uppercase transition-colors bg-primary rounded-lg focus:outline-none">
                            Start free
                        </button>
                    </div>

                    <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-900 dark:border-gray-700">
                        <div className="flex-shrink-0">
                            <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-primary uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                                Premium
                            </h2>
                        </div>

                        <div className="flex-shrink-0">
                            <span className="pt-2 text-3xl font-bold text-gray-800 uppercase dark:text-gray-100">
                                $24.90
                            </span>

                            <span className="text-gray-500 dark:text-gray-400">
                                /month
                            </span>
                        </div>

                        <ul className="flex-1 space-y-4">
                            <li className="text-gray-500 dark:text-gray-400">
                                Access to more categories and exclusive gifts.
                            </li>

                            <li className="text-gray-500 dark:text-gray-400">
                                Send up to 10 gifts monthly.
                            </li>

                            <li className="text-gray-500 dark:text-gray-400">
                                Faster delivery and advanced customization.
                            </li>

                            <li className="text-gray-500 dark:text-gray-400">
                                Premium-only discounts and event reminders.
                            </li>
                        </ul>

                        <button className="inline-flex items-center justify-center px-4 py-2 font-medium text-white uppercase transition-colors bg-primary rounded-lg  focus:outline-none">
                            Start Premium
                        </button>
                    </div>

                    <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-900 dark:border-gray-700">
                        <div className="flex-shrink-0">
                            <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-primary uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                                Luxury
                            </h2>
                        </div>

                        <div className="flex-shrink-0">
                            <span className="pt-2 text-3xl font-bold text-gray-800 uppercase dark:text-gray-100">
                                $49.90
                            </span>

                            <span className="text-gray-500 dark:text-gray-400">
                                /month
                            </span>
                        </div>

                        <ul className="flex-1 space-y-4">
                            <li className="text-gray-500 dark:text-gray-400">
                                Unlimited gifts and access to luxury items.
                            </li>

                            <li className="text-gray-500 dark:text-gray-400">
                                Same-day delivery and personalized concierge service.
                            </li>

                            <li className="text-gray-500 dark:text-gray-400">
                                Full gift customization with exclusive VIP discounts.
                            </li>

                            <li className="text-gray-500 dark:text-gray-400">
                                24/7 priority support and invitations to special events.
                            </li>


                        </ul>

                        <button className="inline-flex items-center justify-center px-4 py-2 font-medium text-white uppercase transition-colors bg-primary rounded-lg  focus:outline-none">
                            Start Luxury
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription
