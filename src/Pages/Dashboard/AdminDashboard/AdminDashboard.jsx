import { FaWallet } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { IoMdCart } from "react-icons/io";
import AdminChart from "./AdminChart/AdminChart";



const AdminDashboard = () => {


    return (
        <div className="mx-auto container bg-[#FBEDEF]">

            <div className="">
                <div>
                    <h1 className="text-4xl font-bold text-center">General Statistics</h1>
                </div>

                <div className="lg:flex  justify-between">

                    {/* Card */}
                    <div className="mt-14 ml-8">
                        <div className="md:flex  lg:flex justify-center gap-4  mt-10  ">
                            {/* today's money */}
                            <div className="bg-[#EEF9FF]  p-6 w-80 lg:w-96 h-32 rounded-2xl flex justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-black">Today's Money</h1>
                                    <div className="flex ">
                                        <p className="text-3xl font-bold text-black mt-2">$53,000</p>
                                        <p className="text-xl mt-3 ml-2 text-green-400 font-semibold">+55%</p>
                                    </div>
                                </div>
                                <div className="bg-[#FBEDEF] p-5 m-2 rounded-full">
                                    <FaWallet className="text-2xl" />
                                </div>
                            </div>

                            {/* new clients */}
                            <div className="bg-[#EEF9FF]  p-6 w-80 lg:w-96 h-32 rounded-2xl flex justify-between  mt-4 md:mt-0 lg:mt-0">
                                <div>
                                    <h1 className="text-2xl font-bold text-black">New Clients</h1>
                                    <div className="flex ">
                                        <p className="text-3xl font-bold text-black mt-2">+3,462 </p>
                                        <p className="text-xl mt-3 ml-2 text-rose-600 font-semibold">-2%</p>
                                    </div>
                                </div>
                                <div className="bg-[#FBEDEF] p-5 m-2 rounded-full">
                                    <IoDocumentText className="text-2xl" />
                                </div>
                            </div>
                        </div>

                        <div className="lg:flex md:flex justify-center gap-4  mt-4 lg:mt-4">
                            {/* today's users */}
                            <div className="bg-[#EEF9FF]  p-6 w-80 lg:w-96  h-32 rounded-2xl flex justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-black">Today's Users</h1>
                                    <div className="flex ">
                                        <p className="text-3xl font-bold text-black mt-2">2,300</p>
                                        <p className="text-xl mt-3 ml-2 text-green-400 font-semibold">+3%</p>
                                    </div>
                                </div>
                                <div className="bg-[#FBEDEF] p-3 m-3 rounded-full">
                                    <TbWorld className="text-3xl" />
                                </div>
                            </div>

                            {/* Today's Sales */}
                            <div className="bg-[#EEF9FF]  p-6 w-80 lg:w-96 h-32 rounded-2xl flex justify-between mt-4 md:mt-0 ">
                                <div>
                                    <h1 className="text-2xl font-bold text-black">Today's Sales</h1>
                                    <div className="flex ">
                                        <p className="text-3xl font-bold text-black mt-2">$103,430  </p>
                                        <p className="text-xl mt-3 ml-2 text-green-500 font-semibold">+5%</p>
                                    </div>
                                </div>
                                <div className="bg-[#FBEDEF] p-4 m-3 rounded-full">
                                    <IoMdCart className="text-3xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className="md:flex lg:flex justify-center gap-4  mt-10 ">
                        <div className="bg-[#EEF9FF]  p-6 w-80 lg:w-[710px] h-96 rounded-2xl ml-7 lg:ml-0 md:ml-0">

                            <h1 className="text-3xl font-bold text-black text-center">Sales by Country</h1>

                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="text-black font-bold text-xl">
                                            <th>Country:</th>
                                            <th>Sales:</th>
                                            <th>Value:</th>
                                            <th>Bounce:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        <tr>

                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src="https://i.postimg.cc/L4PsS9n0/United-States-svg.png"
                                                                alt="United States" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xl lg:text-xl font-bold text-black">United States</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-xl lg:text-xl font-bold text-black">2500</span>
                                            </td>
                                            <td className="text-xl lg:text-xl font-bold text-black">$230,900</td>
                                            <th className="text-xl lg:text-xl font-bold text-black">29.9%</th>
                                        </tr>
                                        {/* row 2 */}
                                        <tr>

                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src="https://i.postimg.cc/Z5sm32Wd/German-Flag.png"
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xl lg:text-xl font-bold text-black">Germany</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-xl lg:text-xl font-bold text-black">3.900</span>
                                            </td>
                                            <td className="text-xl lg:text-xl font-bold text-black">$440,000</td>
                                            <th className="text-xl lg:text-xl font-bold text-black">40.22%</th>
                                        </tr>
                                        {/* row 3 */}
                                        <tr>

                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src="https://i.postimg.cc/9QrK3MfD/Brazil.png"
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xl lg:text-xl font-bold text-black">Brasil</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-xl lg:text-xl font-bold text-black">562</span>
                                            </td>
                                            <td className="text-xl lg:text-xl font-bold text-black">$143,960</td>
                                            <th className="text-xl lg:text-xl font-bold text-black">32.14%</th>
                                        </tr>

                                    </tbody>

                                </table>
                                <button className="btn btn-primary text-white border border-blue-400 ml-72">See All</button>
                            </div>


                        </div>

                    </div>



                </div>


                <AdminChart></AdminChart>

            </div>


        </div>
    );
};

export default AdminDashboard;