import Promise from 'es6-promise';
import components from './components/index.js';

Promise.polyfill();
components();
