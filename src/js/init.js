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
});
