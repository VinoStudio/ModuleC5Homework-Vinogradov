
function getRequest(url, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)

    xhr.onload = () => {
        if(xhr.status != 200) {
            console.log('Возникли неполадки в сети')
        } else {
            const result = JSON.parse(xhr.response)
            if(callback) {
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
        images.append(img)
    })

}

button.addEventListener("click", function(event) {
    const input = document.querySelector(".input1").value

    if(!input) {
        alert('Вы не ввели значения')
    }
    else if((input <= 0 || input > 10) || isNaN(input)){
        alert('Номер страницы вне диапазона или без значения')
    } else {
        const url = `https://picsum.photos/v2/list?limit=${input}`
        getRequest(url, addImages)
        document.querySelector('.slide_bar').style.display = "flex";
        if (input <= 3) {
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

const body = document.querySelector('body')
body.addEventListener('mouseover', (e) =>{
    if (document.querySelectorAll('.slide_bar img').length === 1) {
        document.querySelectorAll('.slide_bar img')[0].style.width = '100%'
    } else if (document.querySelectorAll('.slide_bar img').length === 2) {
        document.querySelectorAll('.slide_bar img')[0].style.width = '50%'
        document.querySelectorAll('.slide_bar img')[1].style.width = '50%'
    } else{
        myJSON = JSON.parse(localStorage.getItem('myJSON'))
    }
});

const switchButtons = document.querySelectorAll('i')

switchButtons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        const firstImg = images.querySelectorAll('img')[0];
        let firstImgWidth = firstImg.clientWidth + 14;
        images.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth
    })
})

if (localStorage.lastJson){
    const json = JSON.parse(localStorage.getItem('lastJson'));
    displayContent(json);
}