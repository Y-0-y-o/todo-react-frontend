import * as React from 'react';
import styles from '../pages/Main.module.scss';
import {Box, Button, Paper, Stack,} from "@mui/material";
import TaskList from "../components/TaskList"
import {useState} from "react";
import {useTranslation} from "react-i18next";

export default function Main() {
    const {t} = useTranslation();
    const [showForm, setShowForm] = useState(true);

    return (
        <Box className={styles.mainPage}>
            <Paper className={styles.todoCard} elevation={4}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <span className={styles.todoTitle}>To-Do {t("list")}</span>
                    <Button className={showForm ? styles.closeButton : styles.openButton} variant="contained"
                            onClick={() => setShowForm(!showForm)}>
                        {showForm ? t("closeForm") : t("openForm")}
                    </Button>
                </Stack>
                <TaskList showForm={showForm}/>
            </Paper>
			<Box sx={{height: "2vh"}}/>
        </Box>
    );
}