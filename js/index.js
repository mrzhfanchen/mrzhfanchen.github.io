window.onload = function () {
    // 获取页面公用对象
    let list = document.getElementById('list')       
    let imgs = list.getElementsByTagName('a')
    let next_btn = document.getElementById('next')
    let pre_btn = document.getElementById('pre')
    let container = document.getElementById('container')
    let dots = document.getElementById('dot').getElementsByTagName('span')

    
    let auto
    let play_status = false
    let index = 0
    let old_index = 0 
    
    // 调用自动轮播的方法
    autoPlay()
    // container.onmouseover = function () {
    //     // 停止轮播
    //     // clearInterval(auto)
    // }

    // 绑定鼠标离开轮播图时重新开始自动轮播
    // container.onmouseout = function () {
    //     autoPlay()
    // }
    function autoPlay() {
        auto = setInterval(function () {
            next_btn.onclick()
        }, 6000)
    }
     // 绑定下一页的点击事件
     next_btn.onclick = function () {
        old_index = index       
        index = ++index > 2 ? 0 : index
        console.log(index)
        animate()
    }
    
    // 绑定上一页的点击事件
    pre_btn.onclick = function () {
        old_index = index 
        index = --index < 0 ? 2 : index
        console.log(index)
        animate()
    }
    // 绑定点焦点图跳转图片的事件
    for (let i = 0; i < dots.length; i++) {
        dots[i].onclick = function () {
            old_index = index
            index = i
            animate()
        }
    }
    // 封装执行动画的函数 
    function animate() {
        console.log(play_status)
        if (play_status) {
            return false
        }

        // 把动画的执行状态改为，动画执行中
        play_status = true
        let time = 5000       
        let speed = 6 / (time / 6) 
        console.log(speed)
        go()
        // 定义执行一帧的动画的函数 
        function go() {
            imgs[old_index].style.opacity -= speed      
            let opacity = Number(imgs[index].style.opacity)
            imgs[index].style.opacity = speed + opacity     
            console.log(imgs[old_index].style.opacity)
            console.log(imgs[index].style.opacity)
            if (imgs[old_index].style.opacity <= 0) {
                for (let i = 0; i < imgs.length; i++) {
                    imgs[i].style.zIndex = 0
                    imgs[i].style.opacity = 0
                }
                imgs[index].style.opacity = 1
                imgs[index].style.zIndex = 3
                play_status = false
                // 修改焦点图标的显示 
                checkDot()
            } else {
                setTimeout(function () {
                    go()            
                }, 10)
            }

        }
    }
    // 检查焦图装的状态并且改变dot显示
    function checkDot() {
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = ''
        }
        dots[index].className = 'on'
    }

}