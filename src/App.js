//Core imports
import React from 'react'
import Grid from '@material-ui/core/Grid'

//File imports
import Substation from './Components/Substation'
import Classes from './App.module.css'

export default function App() {
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid className={Classes.container} container item xs={12}>
                {/* Component which returns the cards */}
                <Substation />
            </Grid>
        </Grid>
    )
}
