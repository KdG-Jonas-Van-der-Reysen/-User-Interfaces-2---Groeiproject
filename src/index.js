// Bootstrap stuff
import 'bootstrap/dist/css/bootstrap.css' // importeer bootstrap CSS code
import "bootstrap-icons/font/bootstrap-icons.css";

// Our own styling
import './css/style.css'

// Our own modules! :-)
import coupleEventListeners from "./js/eventListenerUtility.js";

// Put into a seperate function so we can re-register the event handlers if the data would update :-)
coupleEventListeners();

