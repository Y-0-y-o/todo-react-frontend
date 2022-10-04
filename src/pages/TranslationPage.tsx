import {useTranslation} from "react-i18next";
import axiosInstance from "../config/AxiosConfig";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import PageContentBox from "../components/PageContentBox";

export default function TranslationPage() {
    const [countTasks, setCountTasks] = useState<number>(0);
    const {t} = useTranslation();

    const getTasks = () => {
        axiosInstance.get("/task")
            .then(response => {
                setCountTasks(response.data.length);
            })
            .catch(exception => {
                console.log(exception);
            });
    }

    useEffect(getTasks, []);

    return (
        <PageContentBox>
            <Box sx={{
                padding: "2vh 4vw"
            }}>
                <h2>{t("Main")}</h2>
                {t("translationContent")}
                <h3>{t("realValue")}</h3>
                <p>{t("amountOfTasks", {count: countTasks})}</p>
                <h3>{t("staticExample_other")}</h3>
                <p>{t("amountOfTasks", {count: 0})}</p>
                <p>{t("amountOfTasks", {count: 1})}</p>
                <p>{t("amountOfTasks", {count: 5})}</p>
            </Box>
        </PageContentBox>
    );
}