// AppContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext(); // Exporting AppContext

export function AppProvider({ children }) {
    const [showPopup, setShowPopup] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [category, setCategory] = useState([]);
    const [count, setCount] = useState(0);
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const onhandleclick = () => {
        setShowPopup((prevShowPopup) => !prevShowPopup);
        const appCsData = document.getElementsByClassName('App')[0];
        appCsData.style.opacity = showPopup ? 1 : 0.6;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const fetchData = async () => {
        try {
            const apiurl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
            const response = await fetch(apiurl);
            const jsondata = await response.json();
            setCategory(jsondata.categories);
            setFilteredCategory(jsondata.categories);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleOnClick = (categoryid, categoryname, categoryimage) => {
        if (count === category) {
            setCount(0);
            setSelectedCategory([]); // Reset to empty array
        } else {
            setCount(count + 1);
            setSelectedCategory((prevCategories) => [
                ...prevCategories,
                { idCategory: categoryid, strCategory: categoryname, strCategoryThumb: categoryimage }
            ]);
        }
    };

    const handleClickOnSearch = () => {
        if (searchValue.trim() === '') {
            setFilteredCategory(category);
        } else {
            const filtered = category.filter(cat =>
                cat.strCategory.toLowerCase() === searchValue.toLowerCase()
            );
            setFilteredCategory(filtered);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AppContext.Provider value={{
            showPopup,
            setShowPopup,
            searchValue,
            setSearchValue,
            category,
            count,
            filteredCategory,
            selectedCategory,
            setSelectedCategory,
            onhandleclick,
            handleInputChange,
            handleOnClick,
            handleClickOnSearch,
        }}>
            {children}
        </AppContext.Provider>
    );
}

// export const useAppContext = () => useContext(AppContext);
