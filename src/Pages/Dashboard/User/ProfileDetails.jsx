import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useTabs from "../../../Components/Hooks/useTabs";
import { FaHandPointRight } from "react-icons/fa";
import ApplySeller from "./ApplySeller/ApplySeller";
import { useState } from "react";
import useType from "../../../Components/Hooks/useType";

const ProfileDetails = () => {
  const [userType] = useType();
  const [tabsData] = useTabs();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto my-10 space-y-4 font-opensans">
      {userType === "user" && (
        <section className="flex items-center justify-end gap-4">
          <p className="flex items-center justify-center gap-4">
            For Seller Apply Here{" "}
            <span>
              <FaHandPointRight />
            </span>
          </p>
          <button
            className="btn btn-primary btn-sm text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Apply
          </button>

          {isModalOpen && (
            <dialog open className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => setIsModalOpen(false)}
                  >
                    ✕
                  </button>
                </form>
                <ApplySeller setIsModalOpen={setIsModalOpen} />
              </div>
            </dialog>
          )}
        </section>
      )}

      <Tabs>
        <TabList className="uppercase">
          {tabsData.map((tab, index) => (
            <Tab key={index}>{tab.name}</Tab>
          ))}
        </TabList>
        <div className="divider divider-primary"></div>
        {tabsData.map((tab, index) => (
          <TabPanel className="mt-5" key={index}>
            {tab.page}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default ProfileDetails;
