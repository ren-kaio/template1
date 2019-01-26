// скрипт уже не нужен, но он норм работает, посему оставлю здесь, пусть будет, может еще пригодится

// AdditionalCalc - дополнительные  вычисления

// меняем отступ у текста в случае изменения ширины картинки с position:absolute

/*
function calculateMargin() {

    let img = document.getElementsByClassName("img-fluid-1");

    let txt = document.getElementsByClassName("entry-text-1");

    for(let i=0; i<txt.length; i++) {
        let height = getComputedStyle(img[i]).height;
        let value = parseInt(height);
        console.log("value = " + value);


        txt[i].style.marginTop = value + 20 +'px';
    }

}*/


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// решить здесь проблему Футера - меняется его размер при сжатии страницы - он переполняется и отрывается от низа страницы
// !!!!!!!!!!!!!!!!!!!!!!!!!


function addMargin() {
    let body = document.body;
    document.body.marginBottom = '30px';
    console.log(1);
}



window.addEventListener('load', addMargin); // все норм работает
window.addEventListener('resize', addMargin); // все норм работает
