import {
  mst
} from 'reactotron-mst';
import Reactotron from 'reactotron-react-native';

Reactotron
  .configure()
  .useReactNative()
  .use(mst())
  .connect();

Reactotron.clear();

const oldConsoleLog = console.log;
console.log = (...args) => {
  oldConsoleLog(...args);
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};
