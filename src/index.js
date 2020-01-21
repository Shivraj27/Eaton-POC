import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import * as PXBThemes from '@pxblue/themes/react'
require('typeface-open-sans')
require('@pxblue/icons/iconfont/PXBlueIcons.css')

ReactDOM.render(
    <MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
        <CssBaseline />
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
)
// ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
