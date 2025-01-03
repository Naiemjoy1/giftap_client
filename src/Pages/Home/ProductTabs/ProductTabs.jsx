import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import NewProduct from "./BestProduct/NewProduct/NewProduct";
import BestProduct from "./BestProduct/BestProduct";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("newProduct");

  return (
    <div className="container 2xl:w-[70%] mx-auto mt-4 lg:mt-10">
      <div>
        <Tabs
          value={activeTab}
          className="w-full"
          onChange={(value) => setActiveTab(value)}
        >
          <TabsHeader
            className="lg:w-[50%] mx-auto"
            indicatorProps={{
              className:
                "bg-primary absolute shadow-none w-[150px] md:w-[170px] mx-auto ",
            }}
          >
            <Tab
              value="newProduct"
              onClick={() => setActiveTab("newProduct")}
              className={
                activeTab === "newProduct" ? "text-white" : "text-gray-500"
              }
            >
              <h1 className="md:text-xl relative z-50">New Product</h1>
            </Tab>
            <Tab
              value="topProduct"
              onClick={() => setActiveTab("topProduct")}
              className={
                activeTab === "topProduct" ? "text-white" : "text-gray-500"
              }
            >
              <h1 className="md:text-xl relative z-50">Top Product</h1>
            </Tab>
          </TabsHeader>

          <div className="w-full flex justify-center ">
            <TabsBody>
              <TabPanel value="newProduct">
                <div>
                  <NewProduct />
                </div>
              </TabPanel>
              <TabPanel value="topProduct">
                <div>
                  <BestProduct />
                </div>
              </TabPanel>
            </TabsBody>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductTabs;
