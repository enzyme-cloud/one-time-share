import Q from 'qoob';

const textSelect = function textSelect() {
  Q.each('.js-text-select', target => {
    Q.on(target, 'click', e => {
      e.target.select();
    });
  });
};

export default textSelect;
