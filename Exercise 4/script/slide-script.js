const button = document.querySelector('.submit')
const images = document.querySelector('.slide_bar')

function getRequest(leftInput, rightInput) {
    return fetch(`https://picsum.photos/${leftInput}/${rightInput}`)
        .then(response => response.blob())
        .then(img => URL.createObjectURL(img))
        .catch(() => {
            console.log('Error')
            alert('Ошибка')
        })
}

button.addEventListener('click', async (event) => {
    const leftInput = document.querySelector('.input1').value
    const rightInput = document.querySelector('.input2').value

    if(!leftInput && !rightInput) {
        alert('Вы не ввели значения')
    }
    else if((leftInput < 100 || leftInput > 300 || isNaN(leftInput) && !leftInput)
        && (rightInput < 100 || rightInput > 300 || isNaN(rightInput) && !rightInput)) {
        alert('Одно или оба значения вне диапазона')
    }
    else if((leftInput < 100 || leftInput > 300) || isNaN(leftInput)){
        alert('Левое поле с неверным или пустым значением')
    }
    else if((rightInput < 100 || rightInput > 300) || isNaN(rightInput)) {
        alert('Правое поле с неверным или пустым значением')
    } else{
        url = await getRequest(leftInput, rightInput)
        const image = document.createElement('img')
        image.setAttribute('src', url)
        images.append(image)
        document.querySelector('.slide_bar').style.display = "flex";
        document.querySelector('.input_bar').style.display = "none";
        document.querySelector('.slide_bar').style.justifyContent = "center";
    }
})