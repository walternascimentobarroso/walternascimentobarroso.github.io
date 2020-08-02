/**
 * Aguarda o Dom ser carregado
 */
document.addEventListener("DOMContentLoaded", function (event) {

    function toggleTheme() {
        const htmlTag = document.getElementsByTagName('html')[0]
        if (htmlTag.hasAttribute('data-theme')) {
            htmlTag.removeAttribute('data-theme')
            return window.localStorage.removeItem("site-theme")
        }

        htmlTag.setAttribute('data-theme', 'dark')
        window.localStorage.setItem("site-theme", "dark")
    }

    function applyInitialTheme() {
        const theme = window.localStorage.getItem("site-theme")
        if (theme !== null) {
            const htmlTag = document.getElementsByTagName("html")[0]
            htmlTag.setAttribute("data-theme", theme)
        }
    }

    applyInitialTheme();

    document
        .getElementById("theme-toggle")
        .addEventListener("click", toggleTheme);


});