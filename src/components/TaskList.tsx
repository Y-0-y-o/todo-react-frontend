import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {CheckBoxOutlineBlank, CheckBox} from '@mui/icons-material';
import React, {useEffect, useState} from "react";
import TaskSubMenu from "./TaskSubMenu";
import axiosInstance from "../config/AxiosConfig";
import {DateTime} from "luxon";
import TodoForm from "./TodoForm";
import {useTranslation} from "react-i18next";

interface TaskListProps {
    showForm: boolean
}

TaskList.defaultProps = {
    showForm: true
}

interface TaskJson {
    _id: string,
    userId: string,
    title: string,
    language: string,
    dateTime: string,
    completed: boolean
}

interface Task {
    id: string,
    userId: string,
    title: string,
    language: string,
    dateTime: DateTime,
    completed: boolean
}

export default function TaskList(props: TaskListProps) {
    const {t} = useTranslation();
    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = () => {
        axiosInstance.get("/task")
            .then(response => {
                const newTaskList: Task[] = response.data.map((jsonResponse: TaskJson) => {
                    return {
                        id: jsonResponse._id,
                        userId: jsonResponse.userId,
                        title: jsonResponse.title,
                        language: jsonResponse.language,
                        dateTime: DateTime.fromISO(jsonResponse.dateTime),
                        completed: jsonResponse.completed
                    };
                });

                setTasks(newTaskList);
            })
            .catch(exception => {
                console.log(exception);
            });
    }

    useEffect(getTasks, []);

    const toggleTask = (index: number, id: string) => {
        axiosInstance.patch(`/task/completed/${id}`, {completed: !tasks[index].completed})
            .then(_ => {
                console.log(`Patch request for task ${id} successful.`);
                getTasks();
            })
            .catch(exception => {
                console.log(exception);
            });
    };

    const deleteTask = (id: string) => {
        /* setTasks(tasks.filter((task) => (task.id !== id))); */
        axiosInstance.delete(`/task?id=${id}`)
            .then(_ => {
                console.log(`Deleted task with id ${id}`);
                getTasks();
            })
            .catch(exception => {
                console.log(exception);
            });
    }

    return (
        <>
            {props.showForm ? <TodoForm getTasks={getTasks}/> : <br/>}
            {
                tasks.length > 0 ?
                    <List>
                        {tasks.map((task, index) => (
                            <ListItem key={index} disablePadding secondaryAction={
                                <TaskSubMenu task={{id: task.id, title: task.title, dateTime: task.dateTime, language: task.language}}
                                             deleteTask={deleteTask}
                                             getTasks={getTasks}
                                />
                            }>
                                <ListItemButton onClick={() => toggleTask(index, task.id)} dense disableGutters>
                                    <ListItemIcon>
                                        {task.completed ? <CheckBox/> : <CheckBoxOutlineBlank/>}
                                    </ListItemIcon>
                                    <ListItemText primary={task.title}
                                                  secondary={task.dateTime.toLocal().toLocaleString(DateTime.DATETIME_FULL)}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    :
                    <p>{t("noTasks")}</p>
            }
        </>
    );
}