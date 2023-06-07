// Прошу прощения за ужасный код, но потратил на задание слишком много времени, из-за чего: "И так сойдёт!"
const images = document.querySelector('.slide_bar')
const button = document.querySelector('.submit')
const wrapper = document.querySelector(".wrapper")

function addImages(result) {
    result.forEach(item => {
        let img = document.createElement('img')
        img.setAttribute('src', item.download_url)
        let p = document.createElement('p')
        p.innerText = item.author
        images.append(img)
    })
}
function transform() {
    document.querySelector('.input_bar').style.display = "none";
    document.querySelector('.slide_bar').style.display = "flex";
    if (document.querySelectorAll('.slide_bar img').length === 1) {
        document.querySelectorAll('.slide_bar img')[0].style.width = '100%'
    } else if (document.querySelectorAll('.slide_bar img').length === 2) {
        document.querySelectorAll('.slide_bar img')[0].style.width = '50%'
        document.querySelectorAll('.slide_bar img')[1].style.width = '50%'
    } if (document.querySelectorAll('.slide_bar img').length <= 3) {
        document.querySelector('.slide_bar').style.justifyContent = "center";
    } else {
        function showNavigate() {
            document.querySelector('i').style.visibility = 'visible';
            document.querySelector('.wrapper').lastElementChild.style.visibility = 'visible';
        }
        setTimeout(showNavigate, 2000)
    }
}

if(localStorage.lastSession) {
    const json = JSON.parse(localStorage.getItem('lastSession'))
    addImages(json)
    transform()
    localStorage.clear()
}

button.addEventListener("click", async function(event) {
    const leftInput = document.querySelector(".input1").value
    const rightInput = document.querySelector(".input2").value

    if(!leftInput && !rightInput) {
        alert('Вы не ввели значения')
    }
    else if((leftInput <= 0 || leftInput > 10 || isNaN(leftInput) && !leftInput)
        && (rightInput <= 0 || rightInput > 10 || isNaN(rightInput) && !rightInput)) {
        alert('Номер страницы и лимит картинок вне диапазона')
    }
    else if((leftInput <= 0 || leftInput > 10) || isNaN(leftInput)){
        alert('Номер страницы вне диапазона или без значения')
    }
    else if((rightInput <= 0 || rightInput > 10) || isNaN(rightInput)) {
        alert('Лимит картинок вне диапазона или без значения')
    } else {
        const url = `https://picsum.photos/v2/list?page=${leftInput}&limit=${rightInput}`
        const responsePromise = fetch(url)
        responsePromise
            .then(data => data.json())
            .then(image => {
                addImages(image)
                localStorage.setItem('lastSession', JSON.stringify(image))
            })
            .then(slide => transform())
            .catch(error => {
                console.log('Возникла непредвиденная ошибка')
                alert('Произошла ошибка сервера')
            });
    }
    setTimeout(message => alert('Дважды перезагрузите старницу для возвращения к полю ввода значений.'), 5000)
});


const switchButtons = document.querySelectorAll('i')


// let firstImgWidth = firstImg.clientWidth + 14;


switchButtons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        const firstImg = images.querySelectorAll('img')[0];
        let firstImgWidth = firstImg.clientWidth + 14;
        images.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth
    })
})