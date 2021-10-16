import {Node, State, Scheme} from './types';

export const isScheme = (node: Node): node is Scheme => {
  return node.type === 'scheme';
};

export const isState = (node: Node): node is State => {
  return node.type === 'state';
};
