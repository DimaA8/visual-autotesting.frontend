import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ProjectView from '@RouteViews/ProjectView'
import ProjectListView from '@RouteViews/ProjectListView'
import { Container } from '@material-ui/core'
import './App.scss'

export default function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Container>
                    <Switch>
                        <Route exact path={`/`} component={ProjectListView} />
                        <Route exact path={`/:project/`} component={ProjectView} />
                        <Route exact path={`/:project/:page`} component={ProjectView} />
                        <Route component={ProjectListView} />
                    </Switch>
                </Container>
            </BrowserRouter>
        </div>
    )
}


