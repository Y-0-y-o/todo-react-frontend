import {IconButton, ListItemIcon, Menu, MenuItem, Modal, Paper} from "@mui/material";
import styles from "./TaskSubMenu.module.scss";
import {Close, Edit, Menu as MenuIcon} from "@mui/icons-material";
import React, {useState} from "react";
import TodoForm from "./TodoForm";
import {DateTime} from "luxon";
import {useTranslation} from "react-i18next";

export default function TaskSubMenu(props: TaskSubMenuProps) {
    const {t} = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const [updateModalOpen, setUpdateModalOpen] = React.useState<boolean>(false);
    const handleUpdateModalClose = () => setUpdateModalOpen(false);

    return (
        <>
            <IconButton
                edge="end"
                aria-label="Task menu"
                id="menu-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => handleMenuClick(event)}
                className={styles.menuIconButton}>
                <MenuIcon/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleMenuClose()}
                MenuListProps={{
                    'aria-labelledby': 'menu-button',
                }}
            >
                <MenuItem onClick={() => {setUpdateModalOpen(true); handleMenuClose();}}>
                    <ListItemIcon><Edit/></ListItemIcon>
                    {t("edit")}
                </MenuItem>
                <MenuItem onClick={() => {props.deleteTask(props.task.id); handleMenuClose();}}>
                    <ListItemIcon><Close className={styles.closeIcon}/></ListItemIcon>
                    {t("delete")}
                </MenuItem>
            </Menu>
            <Modal
                open={updateModalOpen}
                onClose={() => handleUpdateModalClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={styles.updateModal}
            >
                <Paper className={styles.updateModalPaper} elevation={8}>
                    <h3>Update task</h3>
                    <TodoForm
                        getTasks={props.getTasks}
                        putTask={props.task}/>
                </Paper>
            </Modal>
        </>
    );
}

interface TaskSubMenuProps {
    task: {id: string, title: string, dateTime: DateTime, language: string}
    deleteTask: Function,
    getTasks: Function
}

TaskSubMenu.defaultProps = {
    taskId: "",
    taskTitle: "",
    taskDateTime: DateTime.now(),
    deleteTask: () => {},
    getTasks: () => {}
}