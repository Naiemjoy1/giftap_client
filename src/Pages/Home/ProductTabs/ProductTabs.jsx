import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import TopSeller from "./TopSeller/TopSeller";
import BestProduct from "./BestProduct/BestProduct";
import NewProduct from "./BestProduct/NewProduct/NewProduct";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = React.useState("newProduct");

  return (
    <div className="pt-[150px]">
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <TabsHeader
          className="rounded-none text-gray-500 border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-gray-900 shadow-none rounded-none"
          }}
        >
          <Tab
            value="topSeller"
            onClick={() => setActiveTab("topSeller")}
            className={
              activeTab === "topSeller" ? "text-black" : "text-gray-500"
            }
          >
            <h1 className="text-2xl md:text-3xl xl:text-4xl uppercase">Top Seller</h1>
          </Tab>
          <Tab
            value="bestProduct"
            onClick={() => setActiveTab("bestProduct")}
            className={
              activeTab === "bestProduct" ? "text-black" : "text-gray-500"
            }
          >
            <h1 className="text-4xl uppercase">Best Product</h1>
          </Tab>
          <Tab
            value="newProduct"
            onClick={() => setActiveTab("newProduct")}
            className={
              activeTab === "newProduct" ? "text-black" : "text-gray-500"
            }
          >
            <h1 className="text-4xl uppercase">New Product</h1>
          </Tab>
        </TabsHeader>
        <div className="mt-10">
          <TabsBody>
            <TabPanel value="topSeller">
              <TopSeller />
            </TabPanel>
            <TabPanel value="bestProduct">
              <BestProduct />
            </TabPanel>
            <TabPanel value="newProduct">
              <NewProduct />
            </TabPanel>
          </TabsBody>
        </div>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
