import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../../utilities/firebase/firebase.utils.js";


export const CategoriesContext = createContext({
    CategoriesMap: []
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, []);

    const value = {categoriesMap};
    return <CategoriesContext.Provider value={value} >{children}</CategoriesContext.Provider>
}