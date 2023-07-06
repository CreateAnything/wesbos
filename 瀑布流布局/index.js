window.addEventListener('load', () => {
    const container = document.querySelector('.container')
    const width = 200
    function loadImage() {
        const fragment = document.createDocumentFragment()
        let count = 0
        for (let i = 0; i < imageList.length; i++){
            const div = document.createElement('div')
            const image = new Image()         
            image.src = imageList[i].src
            image.style.width = width + 'px'
            image.onload = () => {
                count++
                if (count === imageList.length) {
                    container.appendChild(fragment) 
                    layoutImage(true)
                }
            }
            div.appendChild(image)
            fragment.append(div)
        }
    }

    function layoutImage() {
        const clientWidth = container.clientWidth
        const columns = Math.floor(clientWidth / width)
        const gap = 10
        const lastWidth = (clientWidth - (columns * width + gap * (columns - 1)))
        container.style.margin = `0 ${lastWidth / 2}px`
        const arr = new Array(columns).fill(0)
        const imgDoms = container.children        
        let left = 0
        let top = 0
        for (let i = 0; i < imgDoms.length; i++){
            const index = findMin(arr)
            left = (width + gap) * index
            top = arr[index]
            imgDoms[i].style.transform = `translate(${left}px,${top}px)`;
            arr[index]+= imgDoms[i].offsetHeight + gap
        }
    }

    function findMin(arr) {
        let index = 0
        let min = arr[0]
        for (let i = 0; i < arr.length; i++){
            if (arr[i] < min) {
                min = arr[i]
                index = i
            }
        }
        return index
    }

    loadImage()
    window.addEventListener('resize', () => {
        layoutImage()
    })
})