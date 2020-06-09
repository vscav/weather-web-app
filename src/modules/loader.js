/**
 * Add the loader to the DOM.
 */
const addLoader = () => {
    let body = document.body,
        container = document.createElement('div'),
        loader = document.createElement('div');

    container.classList.add('loader_container');
    loader.classList.add('loader');
    container.appendChild(loader);
    body.prepend(container);
}

/**
 * Remove the loader.
 */
const removeLoader = () => {
    let container = document.querySelector('.loader_container');
    container.remove();
}

export { addLoader, removeLoader }