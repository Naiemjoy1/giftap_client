import React, { createContext, useContext, useState } from 'react';


const OffersContext = createContext();


export const useOffers = () => {
    return useContext(OffersContext);
};


export const OffersProvider = ({ children }) => {
    const [offers, setOffers] = useState([]); 
 
    const addOffer = (newOffer) => {
        setOffers((prevOffers) => [...prevOffers, newOffer]);
    };

   
    const getOffers = () => {
        return offers;
    };

    return (
        <OffersContext.Provider value={{ offers, addOffer, getOffers }}>
            {children}
        </OffersContext.Provider>
    );
};
