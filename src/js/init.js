/**
 * @function isMobile
 * detecta se o useragent e um dispositivo mobile
 */
function isMobile() {
    var userAgent = navigator.userAgent.toLowerCase();
    if( userAgent.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i)!= -1 )
        return true;
}

/**
 * Aguarda o Dom ser carregado
 */
document.addEventListener("DOMContentLoaded", function(event) {
    if(isMobile()) {
    } else {
    }


    function toggleTheme () {
        const htmlTag = document.getElementsByTagName('html')[0]
        if (htmlTag.hasAttribute('data-theme')) {
            htmlTag.removeAttribute('data-theme')
            return window.localStorage.removeItem("site-theme")
        }
    
        htmlTag.setAttribute('data-theme', 'dark')
        window.localStorage.setItem("site-theme", "dark")
    }
    
    function applyInitialTheme () {
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