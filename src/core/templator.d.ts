import { Component } from './Component';
import { MNTemplator } from './templator/Templator';
import { StateType } from './types';

declare global {
  const templator: MNTemplator;
}
