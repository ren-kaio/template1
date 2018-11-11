// AdditionalCalc - дополнительные необходимые вычисления

function calculateMargin() {

    let img = document.getElementById("img-fluid-1");
    let height = getComputedStyle(img).height;
    let value = parseInt(height);
    console.log("value = " + value);

    let txt = document.getElementById("entry-text-1");

    txt.style.marginTop = value + 5 +'px';
    // var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

calculateMargin();

// ДОДЕЛАТЬ ФУНКЦИЮЮ!!!!!
// повесить обработчик, чтобы было изменение при изменении размеров окна и изображения
 window.addEventListener(window, 'innerWidth', calculateMargin );