import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";
import useTabs from "../../../Components/Hooks/useTabs";
import { FaHandPointRight } from "react-icons/fa";
import ApplySeller from "./ApplySeller/ApplySeller";
import { useState } from "react";

const ProfileDetails = () => {
  const { user } = useAuth();
  const [users] = useUsers();
  const usersDetails = users.filter((u) => u?.email === user?.email);
  const isAdmin = usersDetails.length > 0 && usersDetails[0]?.type === "admin";
  const isUser = usersDetails.length > 0 && usersDetails[0]?.type === "user";
  const [tabsData] = useTabs();

  const [isModalOpen, setIsModalOpen] = useState(false); // manage modal visibility

  return (
    <div className="container mx-auto my-10 space-y-4">
      <section className="flex items-center justify-end gap-4">
        <p className="flex items-center justify-center gap-4">
          For Seller Apply Here{" "}
          <span>
            <FaHandPointRight />
          </span>
        </p>
        <button
          className="btn btn-primary btn-sm text-white"
          onClick={() => setIsModalOpen(true)} // Open modal using state
        >
          Apply
        </button>

        {/* Modal */}
        {isModalOpen && (
          <dialog open className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setIsModalOpen(false)} // Close modal using state
                >
                  ✕
                </button>
              </form>
              <ApplySeller />
            </div>
          </dialog>
        )}
      </section>

      <Tabs>
        <TabList>
          {tabsData.map((tab, index) => (
            <Tab key={index}>{tab.name}</Tab>
          ))}
        </TabList>
        {tabsData.map((tab, index) => (
          <TabPanel key={index}>{tab.page}</TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default ProfileDetails;
