import { permission } from './permission'

export default function directive(app) {
  app.directive('permission', permission)
}
