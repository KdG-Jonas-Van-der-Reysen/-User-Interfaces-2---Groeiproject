// Bootstrap stuff
import 'bootstrap/dist/css/bootstrap.css' // importeer bootstrap CSS code
import "bootstrap-icons/font/bootstrap-icons.css";

// Our own styling
import './css/style.css'

// Import page utility functions
import initializeTabSystem from "./js/utilities/eventListeners.js";

// Import page functions
import loadMission from "./js/views/detail/missionForm.js";
import loadDetailsPage from "./js/views/detail/detail.js";
import loadSearchPage from "./js/views/search.js";
import {loadNavBar} from "./js/partials/navbar.js";
import loadSettingsPage from "./js/views/settings.js";

// Put into a seperate function, so we can re-register the event handlers if the data would update :-)
initializeTabSystem();

// Load partials (navbar, ...)
loadNavBar();

// Load pages
loadDetailsPage();
loadSearchPage();
loadSettingsPage();

// On the details page, we need to load the first mission
loadMission(16)




