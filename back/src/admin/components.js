import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
  MyDashboard: componentLoader.add('MyDashboard', './my-dashboard-component'),
  // other custom components
}

export { componentLoader, Components }