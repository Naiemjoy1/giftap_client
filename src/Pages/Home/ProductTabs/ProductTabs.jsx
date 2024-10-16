import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import NewProduct from "./BestProduct/NewProduct/NewProduct";
import TopSeller from "./TopSeller/TopSeller";
import BestProduct from "./BestProduct/BestProduct";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("newProduct");

  return (
    <div className="pt-[150px] max-w-6xl mx-auto"> 
      
      <div className="mt-10 w-full">
       
        <Tabs
          value={activeTab}
          className="w-full"
          onChange={(value) => setActiveTab(value)}
        >
          <TabsHeader
            className=""
            indicatorProps={{
              className: "bg-primary/50 shadow-none !text-gray-900",
            }}
          >
            <Tab
              value="newProduct"
              onClick={() => setActiveTab("newProduct")}
              className={activeTab === "newProduct" ? "text-black" : "text-gray-500"}
            >
              <h1>New Product</h1>
            </Tab>
            <Tab
              value="topProduct"
              onClick={() => setActiveTab("topProduct")}
              className={activeTab === "topProduct" ? "text-black" : "text-gray-500"}
            >
              <h1>Top Product</h1>
            </Tab>
            <Tab
              value="topSeller"
              onClick={() => setActiveTab("topSeller")}
              className={activeTab === "topSeller" ? "text-black" : "text-gray-500"}
            >
              <h1>Top Seller</h1>
            </Tab>
          </TabsHeader>

          
          <div className="w-full flex justify-center mt-5">
            <TabsBody>
              <TabPanel value="newProduct">
                <div className="w-full h-full overflow-y-auto">
                  <NewProduct />
                </div>
              </TabPanel>
              <TabPanel value="topProduct">
                <div className="w-full h-full overflow-y-auto">
                  <BestProduct />
                </div>
              </TabPanel>
              <TabPanel value="topSeller">
                <div className="w-full h-full overflow-y-auto">
                  <TopSeller />
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
