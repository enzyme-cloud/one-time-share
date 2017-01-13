import system from './bootstrap.js'
import components from './components/bootstrap.js'

system.Q.documentReady(() => {
  components(system)
})
