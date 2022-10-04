import * as React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/Main";
import CssPage from "./pages/CssPage";
import CustomHookPage from "./pages/CssPage";
import TranslationPage from "./pages/TranslationPage";
/*import ErrorPage from "./pages/ErrorPage";*/
import NavigationBar from "./components/NavigationBar";
import {ReactElement} from "react";
import i18next, {Resource} from "i18next";
import {initReactI18next} from 'react-i18next';

// Translation files
import english from './languages/English.json';
import german from './languages/German.json';


export interface Page {
    url: string,
    title?: string,
    component: ReactElement
}

export const pages: Page[] = [
    {url: "/", title: "Main", component: <MainPage/>},
    {url: "/css", component: <CssPage/>},
    {url: "/translation", component: <TranslationPage/>},
    {url: "/customHook", component: <CustomHookPage/>}
    /*{url: "*", component: <ErrorPage/>}*/
];

export interface Language {
    code: string,
    title: string
}

export const languages: Language[] = [
    {code: "en", title: "English"},
    {code: "de", title: "German"}
];

const i18nextResources: Resource = {
    en: {
        translation: english
    },
    de: {
        translation: german
    }
};

i18next
    .use(initReactI18next)
    .init({
        resources: i18nextResources,
        defaultNS: "translation",
        lng: "en",
        fallbackLng: "en",
        interpolation: {escapeValue: false}
    }).then(_ => {});

export default function App() {
    return (
        <>
            <NavigationBar/>
            <Routes>
                {pages.map((page, index) => (
                    <Route key={index} path={page.url} element={page.component}/>
                ))}
            </Routes>
        </>
    );
}