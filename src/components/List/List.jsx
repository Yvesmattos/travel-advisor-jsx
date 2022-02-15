import React, { useState, createRef, useEffect } from "react";
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'

import useStyles from './styles'

import PlaceDetails from '../PlaceDetails/PlaceDetails'

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {

    const classes = useStyles();
        const [elRefs, setElRefs] = useState([])



    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
        setElRefs(refs)

    }, [places])


    return (
        <div className={classes.container}>
            <Typography variant="h4">
                Restaurantes, hotéis e atrações perto de você
            </Typography>
            {isLoading ? (
                <div className="classes.loading">
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Filtro</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="restaurants">Restaurantes</MenuItem>
                            <MenuItem value="hotels">Hotéis</MenuItem>
                            <MenuItem value="attractions">Atrações</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Avaliação</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value={0}>Todas</MenuItem>
                            <MenuItem value={3}>Acima de 3</MenuItem>
                            <MenuItem value={4}>Acima de 4</MenuItem>
                            <MenuItem value={4.5}>Acima de 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, i) => (
                            <Grid
                                ref={elRefs[i]}
                                item
                                key={i}
                                xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

        </div>
    )
}

export default List;