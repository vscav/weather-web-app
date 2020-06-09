const MESSAGE_TIME = 5000;
const ERROR_MESSAGE = "An error occured. Please reload the page.";
const WARNING_MESSAGE = "This city has already been added.";

const renderErrorMessage = (e) => {
    console.log(e);
    let body = document.body,
        child = body.lastElementChild,
        message = document.createElement('div');

    while (child) {
        body.removeChild(child);
        child = body.lastElementChild;
    }

    message.classList.add('alert', 'alert-danger');
    message.setAttribute('role', 'alert');

    message.innerHTML = `<strong>Sorry!</strong> ${ERROR_MESSAGE}`;

    body.appendChild(message);
}

const renderWarningMessage = () => {
    if (!document.getElementById('add-user-city').parentNode.parentNode.lastElementChild.classList.contains('alert-secondary')) {
        let body = document.body,
            message = document.createElement('div');

        message.classList.add('alert-secondary', 'alert-warning');
        message.setAttribute('role', 'alert');

        message.innerHTML = `<strong>Warning!</strong> ${WARNING_MESSAGE}`;

        let container = document.getElementById('add-user-city').parentNode.parentNode;
        container.appendChild(message);

        container.appendChild(message);
        setTimeout(() => { message.remove(); }, MESSAGE_TIME);
    }
}

export { renderErrorMessage, renderWarningMessage }