import Q from 'qoob'

const TIMEOUT = 5000
const FLASH_EL = Q.first('#js-flash')
const FLASH_CONTENT_EL = Q.first('#js-flash-content')

export default (content) => {
  Q.html(FLASH_CONTENT_EL, content)
  Q.addClass(FLASH_EL, 'Flash--active')

  setTimeout(() => {
    Q.removeClass(FLASH_EL, 'Flash--active')
  }, TIMEOUT)
}
