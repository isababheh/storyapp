import React, { useEffect, useState } from "react";
import { db, collection, getDocs, query, orderBy } from '../components/firebaseConfig';
import { Loader } from '../components/util';

const DataContext = React.createContext();
const DataProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState(null);
    const [stories, setStories] = useState(null);
    const [swiperData, setSwiperData] = useState(null);


    async function getCategories() {
        setIsLoading(true)
        const categoriesCollection = collection(db, 'categories');
        const categoriesSnapshot = await getDocs(query(categoriesCollection, orderBy('index', 'asc')));
        const categoriesList = categoriesSnapshot.docs.map(doc => doc.data());
        setCategories(categoriesList);
        return categoriesList;
    }

    async function getStories(cats) {
        const storiesCollection = collection(db, 'stories');
        const storyiesSnapshot = await getDocs(query(storiesCollection, orderBy('timestamp', 'desc')));
        const storyList = storyiesSnapshot.docs.map(doc => doc.data());

        //inject the doc ref into each record, will be needed in delete/update
        storyList.map((el, i) => {
            el.docref = storyiesSnapshot._docs[i].id;
            el.index = i + 1;
        });

        // inject the label for each category
        storyList.forEach(story => {
            story['categoryMap'] = [];
            story.category.forEach(scat => {
                cats.forEach((cat, i) => {
                    if (scat == cat.title) {
                        story['categoryMap'].push({ title: cat.title, label: cat.label })
                    }
                })
            })
        })

        const swiperData = storyList.filter(story => story.showInSlider == true);
        setSwiperData(swiperData);

        setStories(storyList);
    }
 
    async function getData() {
        const cats = await getCategories();
        await getStories(cats);
        setIsLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        stories ?
            <DataContext.Provider value={{ categories, setCategories, stories, setStories, swiperData, isLoading, setIsLoading,getData }}>
                {children}
            </DataContext.Provider> :
            <Loader isLoading={isLoading} />
    )
}
export { DataContext, DataProvider }