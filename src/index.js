import 'bootstrap' // importeer bootstrap JavaScript code
import * as grts from './js/greeting.js'

import 'bootstrap/dist/css/bootstrap.css' // importeer bootstrap CSS code
import './css/style.css'

document.getElementsByTagName('h1')[0].addEventListener('click', () => {
    console.log('Hello, H1!')
    grts.greeting()
})

