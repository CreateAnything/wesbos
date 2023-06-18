window.addEventListener('load', () => {
    const url = 'https://gist.githubusercontent.com/BideoWego/60fbd40d5d1f0f1beca11ba95221dd38/raw/58fb4cce910fbf5fa67a2f0f1f619c09d7b1b373/dictionary.json'
    const searchInput = document.querySelector('input[type=text]')
    const container = document.querySelector('.list')
    const loading = document.querySelector('.loading')
    const observe = new IntersectionObserver(loadMore)
    const size = 20
    let next = null    
    let data = []
    let totalPage = 0;
    //搜索
    function onSearch() {
        const keywords = searchInput.value
        next = foundList(keywords)
        container.innerHTML = ''
        const arr = next()
        render(arr)
    }
    //加载更多
    function loadMore(entries) {
        const { isIntersecting } = entries[0]
        if (isIntersecting && next) {
            const arr = next()   
            render(arr)
        }        
    }
    //渲染列表
    function render(arr) {
        const fragment = document.createDocumentFragment()
        arr.forEach(item => {
            const div = document.createElement('div')
            const span = document.createElement('span')
            const p = document.createElement('p')
            span.className = 'name'
            div.className = 'list-item'
            span.innerText = item.label
            p.innerText = item.value
            div.appendChild(span)
            div.appendChild(p)
            fragment.appendChild(div)
        })
        container.appendChild(fragment)
    }
    //搜索列表
    function foundList(keywords) {
        let index = 0
        let length = data.length
        let result = []
        for (let i = 0; i < length; i++){
            if (data[i].label.search(keywords) !== -1) {
                result.push(data[i])
            }
        }
        totalPage = Math.ceil(result.length / size)
        return function () {
            index++
            if(index > totalPage || result.length === 0) return []
            let start = (index - 1) * size
            let end = index * size
            return result.slice(start,end)
        }
    }
    //请求函数
    function request(url) {
        return new Promise((reslove, reject) => {
            fetch(url).then(res => res.json()).then(res => {
                reslove(res)
            })            
        })
    }
    //节流函数
    function throttle(fn, wait) {
        let timeout;
        return function() {
            let context = this;
            let args = arguments;
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    fn.apply(context, args)
                }, wait)
            }
        }
    }
    //初始化函数
    async function init() {
        searchInput.addEventListener('input', throttle(onSearch, 500))
        const result = await request(url)
        loading.classList.add('hide')
        observe.observe(loading)
        Object.keys(result).forEach(v => {
            let obj = {}
            obj.label = v
            obj.value = result[v]
            data.push(obj)
        })
        searchInput.focus()
    }
    init()
})