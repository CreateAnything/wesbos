window.addEventListener('load', () => {
    const paneList = document.querySelectorAll('.panels-item')
    let preDom = null
    Array.from(paneList).forEach(dom => {
        dom.addEventListener('click', () => {
            (preDom && preDom === dom) ? (dom.classList.toggle('active')) : (
                preDom && preDom.classList.remove('active'),
                dom.classList.add('active')
            )
            preDom = dom
        })
    })
})