/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import RootApp from './RootApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootApp);
