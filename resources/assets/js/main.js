import Q from 'qoob';
import Promise from 'es6-promise';
import components from './components/index.js';

if (!window.crypto && !window.crypto.getRandomValues) {
  Q.show('#js-browser-warning');
}

Promise.polyfill();
components();
