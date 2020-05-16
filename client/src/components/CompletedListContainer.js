import React, { useState, useEffect } from "react";
import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CompletedListItem from "./CompletedListItem";
import API from '../utils/API';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

function CompletedListContainer() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        API.getCompleted("erik").then((results) => {
            setWorkouts(results.data);
        });
    }, [])

    return(
        <List dense={dense}>
            {workouts.map((workout, i) => {
                return <CompletedListItem title={workout} key={i} />
            })}
        </List>
    )
}

export default CompletedListContainer;