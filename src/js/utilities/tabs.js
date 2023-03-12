import * as bootstrap from "bootstrap";


export default function switchToTab(tabName) {
    const trigger = document.getElementById(`${tabName}-tab`)
    const tab = bootstrap.Tab.getOrCreateInstance(trigger);
    tab.show();
}
