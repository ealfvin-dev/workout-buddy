import React, { useState } from 'react';
import WorkoutListItem from './WorkoutListItem';
import { Grid, TextField, List, Button } from '@material-ui/core';
import API from '../utils/API';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    textForm: {
        marginBottom: '1.2rem'
    },
    subBtn: {
        marginBottom: '1.2rem'
    }
})

function CreateWorkout(props) {
    const [formObject, setFormObject] = useState({});
    const [exerciseList, setExerciseList] = useState([]);
    const [workoutName, setWorkoutName] = useState("");
    const classes = useStyles();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]:value })
    };

    const addExercise = (event) => {
        event.preventDefault();
        if (formObject.exercise && formObject.duration) {
            setExerciseList(exerciseList => [...exerciseList, formObject])
            clear();
        }
    }

    const clear = () => {
        setFormObject({
            exercise: "",
            duration: ""
        })
    }

    const clearAll = () => {
        setExerciseList([]);
        setWorkoutName("");
        props.SetWorkoutAdded(props.workoutAdded + 1);
    }

    const formSubmit = (event) => {
        event.preventDefault();
        API.saveWorkout({
            title: workoutName,
            exercises: exerciseList,
            user: props.user
        })
        .then((res) => clearAll());
    }
    
    return(
        <div>
            <Grid container>
                <Grid item>    
                    <h2>Create New Workout</h2>
                    <Grid item>
                        <TextField
                        label="Workout Name"
                        onChange={e => setWorkoutName(e.target.value)}
                        className={classes.textForm}
                        />
                    </Grid>
                    <form>
                        <Grid container direction="column">
                            <TextField
                            name="exercise"
                            id="exercise"
                            onChange={handleInputChange}
                            value={formObject.exercise}
                            className={classes.textForm}
                            label="Exercise Name"
                            />
                            <TextField
                            name="duration"
                            type="Number"
                            className={classes.textForm}
                            id="time"
                            label="Seconds"
                            onChange={handleInputChange}
                            value={formObject.duration}
                            />
                            <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={addExercise} 
                            // disabled={!(formObject.exercise && formObject.duration)}
                            type="submit"
                            className={classes.subBtn}
                            >Add Exercise</Button>
                        </Grid>
                    </form>
                        <Button
                            variant="contained" 
                            color="primary" 
                            onClick={formSubmit} 
                            type="submit"
                            >
                                Save Workout
                        </Button>
                    {exerciseList.length ? (
                    <List>
                        {exerciseList.map((exercise, i) => {
                            return(
                                <WorkoutListItem text={exercise.exercise + " " + exercise.duration} key={i} />
                            )
                            }
                        )}
                    </List>
                        ) : (
                            <h3>No Exercises Added Yet</h3>
                        )
                        }
                </Grid>
            </Grid>
        </div>
    )  
}

export default CreateWorkout;