import {
    Button,
    TextField,
    StandardTextFieldProps,
    FormLabel,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import styles from "./TodoForm.module.scss"
import React, {useEffect, useState} from "react";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterLuxon} from "@mui/x-date-pickers/AdapterLuxon";
import {DateTime} from "luxon";
import axiosInstance from "../config/AxiosConfig";
import {useTranslation} from "react-i18next";

interface TodoFormProps {
    getTasks: Function,
    putTask?: {id: string, title: string, dateTime: DateTime, language: string}
    textFieldVariant?: StandardTextFieldProps["variant"]
}

TodoForm.defaultProps = {
    getTasks: () => {},
    putTaskId: "",
    putDefaultValues: { title: "", dateTime: DateTime.now(), language: ""},
    textFieldVariant: "outlined"
};

export default function TodoForm(props: TodoFormProps) {
    const {t} = useTranslation();
    const [formTask, setFormTask] = useState<string>("");
    const [formDateTime, setFormDateTime] = useState<DateTime>(DateTime.now());
    const [formLanguage, setFormLanguage] = React.useState('');

    useEffect(() => {
        if (props.putTask !== undefined) {
            setFormTask(props.putTask.title);
            setFormDateTime(props.putTask.dateTime);
            setFormLanguage(props.putTask.language);
        }
    }, [props.putTask]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (formTask.length === 0) {
            alert("Please add a task description!");
            return;
        }

        // Placeholder for userId
        const userId = Math.floor(Math.random() * 10000) + 1;

        // Data that gets posted to the backend web-server
        const jsonData = {
            userId: userId.toString(),
            title: formTask,
            language: formLanguage,
            dateTime: formDateTime.toISO(),
            completed: false
        }

        const afterPostPut = () => {
            // Reload tasks via new get-request
            props.getTasks();

            // Reset form
            setFormTask("");
            setFormDateTime(DateTime.now());
        }

        // Send data to backend
        if (props.putTask === undefined || props.putTask.id.length === 0) {
            axiosInstance.post("/task", jsonData)
                .then(_ => {
                    console.log("Post request successful.");
                    afterPostPut();
                })
                .catch(exception => {
                    console.log(exception);
                });
        } else {
            axiosInstance.put(`/task/${props.putTask.id}`, jsonData)
                .then(_ => {
                    console.log("Put request successful.");
                    afterPostPut();
                })
                .catch(exception => {
                    console.log(exception);
                });
        }
    };

    const handleDateTimeChange = (newDateTime: DateTime | null) => {
        if (newDateTime === null)
            return;

        setFormDateTime(newDateTime);
    }

    return (
        <form className={styles.todoForm} onSubmit={(event) => handleSubmit(event)}>
            <Stack spacing={3}>
                <FormLabel htmlFor="task">{t("task_one").charAt(0).toUpperCase() + t("task_one").slice(1)}</FormLabel>
                <TextField className={styles.textField} id="task" label={t("taskLabel")}
                           variant={props.textFieldVariant}
                           size="small" value={formTask} onChange={(event) => setFormTask(event.target.value)}/>
                <FormLabel htmlFor="dateTime">{t("date")} &amp; {t("time")}</FormLabel>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <Stack spacing={3}>
                        <DatePicker
                            label={t("date")}
                            inputFormat="MM/dd/yyyy"
                            value={formDateTime}
                            onChange={(newDate) => {
                                handleDateTimeChange(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label={t("time")}
                            value={formDateTime}
                            onChange={(newTime) => {
                                handleDateTimeChange(newTime);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                <FormLabel htmlFor="language-select">{t("whichLanguage")}</FormLabel>
                <FormControl fullWidth>
                    <InputLabel id="language-select-label">{t("taskLanguage")}</InputLabel>
                    <Select
                        labelId="language-select-label"
                        id="language-select"
                        value={formLanguage}
                        label={t("taskLanguage")}
                        onChange={(event) => setFormLanguage(event.target.value)}
                    >
                        <MenuItem value={"en"}>{t("English")}</MenuItem>
                        <MenuItem value={"de"}>{t("German")}</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" className={styles.taskSubmitButton} color="primary"
                        variant="contained">{t("taskSubmit")}</Button>
            </Stack>
        </form>
    );
}