function getRequest(url, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)

    xhr.onload = () => {
        if(xhr.status != 200) {
            console.log('Возникли неполадки в сети')
        } else{
            const result = JSON.parse(xhr.response)
            if(callback){
                callback(result)
            }
        }
    }

    xhr.onerror = () => console.log(`Ошибка! Статус ${xhr.status}`);

    xhr.send();
};

const images = document.querySelector('.slide_bar')
const button = document.querySelector('.submit')
const wrapper = document.querySelector(".wrapper")

function addImages(result) {
    result.forEach(item => {
        let img = document.createElement('img')
        img.setAttribute('src', item.download_url)
        let p = document.createElement('p')
        p.innerText = item.author
        images.append(img, p)
//
//         const image = `
// <img src="${item.download_url}" alt="image">
// <p>${item.author}</p>
// `
//         images.innerHTML = image
    })

}

button.addEventListener("click", function(event) {
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
        getRequest(url, addImages)
        document.querySelector('.slide_bar').style.display = "flex";
        if (rightInput <= 3) {
            document.querySelector('.slide_bar').style.justifyContent = "center";
        }else {
            function showNavigate() {
                document.querySelector('i').style.visibility = 'visible';
                document.querySelector('.wrapper').lastElementChild.style.visibility = 'visible';
            }
            setTimeout(showNavigate, 2000)
        }
        document.querySelector('.input_bar').style.display = "none";
    }
});

const img = document.querySelectorAll('.slide_bar img')
const myPromise = new Promise((resolve, reject) => {
    if(img >= 1) {
        resolve
    }else {
        reject
    }
})

myPromise
    .then(r)

// if (document.querySelectorAll('.slide_bar img').length === 1) {
//     document.querySelectorAll('.slide_bar img')[0].style.width = '100%'
// } else if (document.querySelectorAll('.slide_bar img').length === 2) {
//     document.querySelectorAll('.slide_bar img')[0].style.width = '50%'
//     document.querySelectorAll('.slide_bar')[1].style.width = '50%'
// }


// const switchButtons = document.querySelectorAll('i')
// let imageIndex = 1, intervalID
//
// function autoSlide() {
//     intervalID = setInterval(() => slideImage(imageIndex++), 2000)
// }
//
// function slideImage() {
//     const imgs = document.querySelectorAll('img')
//     imageIndex = imageIndex === imgs.length ? 0 : imageIndex < 0 ? imgs.length - 1 : imageIndex;
//     images.style.transform = `translate(-${imageIndex * 100}%)`

const switchButtons = document.querySelectorAll('i')
const firstImg = images.querySelectorAll('img')[0];

// let firstImgWidth = firstImg.clientWidth + 14;


switchButtons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        images.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth
    })
})