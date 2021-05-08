const editor = document.querySelector('.editor');
const tools = document.querySelector('.tools');

editor.focus();

const format = (command, value) => {
    document.execCommand(command, false, value);
}

tools.addEventListener('click', (e) => {
    const formatType = e.target.closest('button').name;
    formatType && format(formatType);
})