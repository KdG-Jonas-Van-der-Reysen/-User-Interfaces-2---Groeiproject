export function switchToView(viewName) {
    const views = getViews();
    const viewToEnable = views.find(view => view.name === viewName);

    // Hide all views in the same group
    views.forEach(view => {
        if (view.group === viewToEnable.group) {
            view.hide();
        }
    })

    // Show the views to enable
    viewToEnable.show();
}

function getViews() {
    let views = [...document.querySelectorAll('.views')];

    views = views.map(view => {
        const viewName = view.getAttribute('data-views-name');
        const viewGroup = view.getAttribute('data-views-group');
        return {
            name: viewName,
            group: viewGroup,
            elem: view,
            show: function() {
                this.elem.classList.remove('d-none');
            },
            hide: function() {
                this.elem.classList.add('d-none');
            }
        }
    });

    return views;
}