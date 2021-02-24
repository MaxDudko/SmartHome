import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import CreateHome from './components/AddHome/CreateHome'
import JoinHome from './components/AddHome/JoinHome'
import SelectHome from './components/AddHome/SelectHome'
import Analytics from './components/Analytics/Analytics'
import LoginForm from './components/Authentication/LoginForm'
import RefreshForm from './components/Authentication/RefreshForm'
import RegisterForm from './components/Authentication/RegisterForm'
import RestoreForm from './components/Authentication/RestoreForm'
import Devices from './components/Devices/Devices'
import Gallery from './components/Gallery/Gallery'
import History from './components/History/History'
import Overview from './components/Overview/Overview'
import Rules from './components/Rules/Rules'
import Settings from './components/Settings/Settings'

interface RouteItem {
  path: string
  component: React.FunctionComponent
}

interface SmartSwitchProps {
  routes: RouteItem[]
}

interface SmartRedirectProps {
  path: string
}
const SmartSwitch: React.FC<SmartSwitchProps> = (props) => {
  const { routes } = props
  return (
    <Switch>
      {routes.map((route: Route, index: number) => (
        <Route path={route.path} component={route.component} key={index} />
      ))}
    </Switch>
  )
}

const SmartRedirect: React.FC<SmartRedirectProps> = (props) => {
  const { path } = props
  return <Redirect to={path} />
}

class SmartRouter {
  private readonly routes: {
    dashboardRoutes: RouteItem[]
    homeRoutes: RouteItem[]
    authRoutes: RouteItem[]
  }
  constructor() {
    this.routes = {
      authRoutes: [
        {
          path: '/login',
          component: LoginForm,
        },
        {
          path: '/register',
          component: RegisterForm,
        },
        {
          path: '/restore',
          component: RestoreForm,
        },
        {
          path: '/refresh',
          component: RefreshForm,
        },
      ],
      homeRoutes: [
        {
          path: '/select-home',
          component: SelectHome,
        },
        {
          path: '/create-home',
          component: CreateHome,
        },
        {
          path: '/join-home',
          component: JoinHome,
        },
      ],
      dashboardRoutes: [
        {
          path: '/overview',
          component: Overview,
        },
        {
          path: '/devices',
          component: Devices,
        },
        {
          path: '/analytics',
          component: Analytics,
        },
        {
          path: '/rules',
          component: Rules,
        },
        {
          path: '/gallery',
          component: Gallery,
        },
        {
          path: '/history',
          component: History,
        },
        {
          path: '/settings',
          component: Settings,
        },
      ],
    }
  }

  public getRoutes(type: string) {
    if (type) {
      return <SmartSwitch routes={this.routes[type]} />
    }
  }

  public getPaths(type: string) {
    if (type) {
      return this.routes[type].map((route: RouteItem) => route.path)
    }
  }
  // public getRedirects(type: string, pathname: string, redirect: string) {
  //   if (type) {
  //     const paths = this.routes[type].map((route: RouteItem) => route.path)
  //
  //     if (paths.includes(pathname)) {
  //       return <SmartRedirect path={pathname} />
  //     } else {
  //       return <SmartRedirect path={redirect} />
  //     }
  //   }
  // }
}

export default SmartRouter
