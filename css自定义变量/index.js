window.addEventListener('load', () => {
    const padingInput = document.querySelector('#spacing')
    const blurInput = document.querySelector('#blur')
    const colorInput = document.querySelector('input[type=color]')

    function changePading() {
        document.documentElement.style.setProperty('--pading',padingInput.value+'px')
    }
    function changeBlur() {
        document.documentElement.style.setProperty('--blur',blurInput.value+'px')
    }
    function changeColor() {
        document.documentElement.style.setProperty('--color',colorInput.value)
    }
    padingInput.addEventListener('change',changePading)
    blurInput.addEventListener('change',changeBlur)
    colorInput.addEventListener('change', changeColor)
})