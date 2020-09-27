import { App } from './components/index';
import { MNTemplator } from './core/templator/Templator';
import { initComponents } from './utils/initComponents';

(window as any).templator = new MNTemplator();
initComponents();

const root = document.querySelector('#root');
if (!root) {
  throw new Error('Root node not exist');
}

root.appendChild(templator.compile(App, {}));
