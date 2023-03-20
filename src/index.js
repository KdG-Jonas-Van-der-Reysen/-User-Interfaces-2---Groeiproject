// Bootstrap stuff
import 'bootstrap/dist/css/bootstrap.css' // importeer bootstrap CSS code
import "bootstrap-icons/font/bootstrap-icons.css";

// Our own styling
import './scss/style.scss'
import './scss/custom.scss'

// Import page utility functions
import initializeTabSystem from "./js/utilities/eventListeners.js";

// Import page functions
import loadHomePage from "./js/views/home.js";
import loadDetailsPage from "./js/views/detail/detailsPage.js";
import {editState} from "./js/views/detail/formView.js";
import {loadMissionDetails} from "./js/views/detail/detailsView.js";
import loadSearchPage from "./js/views/search.js";
import loadSettingsPage from "./js/views/settings.js";
import {loadNavBar} from "./js/partials/navbar.js";

// Put into a seperate function, so we can re-register the event handlers if the data would update :-)
initializeTabSystem();

// Load partials (navbar, ...)
loadNavBar();

// Load views
loadHomePage();
loadDetailsPage();
loadSearchPage();
loadSettingsPage();

// On the details page, we need to load the first mission
editState(1)

loadMissionDetails(1)




