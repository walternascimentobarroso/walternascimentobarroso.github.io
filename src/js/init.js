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
        document.querySelector('#whatsapplink').setAttribute("href", "https://api.whatsapp.com/send?phone=5595991712790&text=Oi,%20Gostaria%20de%20solicitar%20um%20orçamento.");
    } else {
        document.querySelector('#whatsapplink').setAttribute("href", "https://web.whatsapp.com/send?phone=5595991712790&text=Oi,%20Gostaria%20de%20solicitar%20um%20orçamento.");
    }
});