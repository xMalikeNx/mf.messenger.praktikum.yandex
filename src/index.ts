import { App } from './components';
import { MNTemplator } from './core/templator/Templator';
import { initComponents } from './utils/initComponents';
import './index.scss';
import { Component } from './core/Component';

const templator = MNTemplator.getInstance();
initComponents();

const root = document.querySelector('#root');
if (!root) {
  throw new Error('Root node not exist');
}

root.appendChild(templator.compile(App as typeof Component, {}));
