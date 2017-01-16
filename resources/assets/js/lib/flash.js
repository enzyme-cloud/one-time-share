import Q from 'qoob';

/**
 * Flash the given content on-screen for the user.
 *
 * @param  {string} content The message to display.
 */
const flash = function flash(content) {
  const timeout = 5000;
  const flash_el = Q.first('#js-flash');
  const flash_content_el = Q.first('#js-flash-content');

  Q.html(flash_content_el, content);
  Q.addClass(flash_el, 'Flash--active');

  setTimeout(() => {
    Q.removeClass(flash_el, 'Flash--active');
  }, timeout);
};

/**
 * Default export.
 */
export default flash;
