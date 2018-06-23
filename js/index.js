/**
 * Created by 52424 on 2018/6/21.
 */
// 获取轮播图的高度
;(function () {
  var jd_banner = document.querySelector('.jd_banner')
  var imgs = document.querySelectorAll('.banner_img img')
  function getHeight() {
    var height = imgs[0].offsetHeight
    jd_banner.style.height = height + 'px'
  }
  getHeight()
  window.onresize = getHeight
  window.onload = getHeight
})()

// 获取秒杀商品栏的宽度和滚动
;(function () {
  var ul = document.querySelector('.jd_sk_product ul')
  var lis = ul.children
  window.onload = function () {
    var width = lis[0].offsetWidth
    ul.style.width = width * lis.length + 'px'
    new IScroll('.jd_sk_product', {
      scrollX: true,
      scrollY: false
    })
  }

})()

// 设置搜索栏的显示
;(function () {
  var head = document.querySelector('.jd_head')
  var a = 0;
  window.onscroll = function () {
    if (window.pageYOffset < 500) {
      a = window.pageYOffset / 500 * 0.9
    } else {
      a = 0.9
    }
    head.style.backgroundColor = 'rgba(222, 24, 27, '+ a +')';
  }
})()

// 设置快报滚动
;(function () {
  var ul = document.querySelector('.news_info ul')
  var lis = ul.children
  var height = lis[0].offsetHeight
  var index = 0
  setInterval(function () {
    index++
    ul.style.transition = 'transform .5s'
    ul.style.transform = 'translateY('+ (-index * height) +'px)'
  },1000)
  ul.addEventListener('transitionend', function () {
    if (index >= lis.length - 1) {
      index = 0
      ul.style.transition = 'none'
      ul.style.transform = 'translateY(0px)'
    }
  })
})()

// 设置倒计时
;(function () {
  var spa = document.querySelectorAll('.skill_time span:nth-child(odd)')
  getTime()
  function getTime() {
    var targetTime = new Date('2018/6/21 17:30:00')
    var time = (targetTime - new Date()) / 1000
    if (time <= 0) {
      time = 0
      clearInterval(timer)
    }
    var hours = parseInt(time / 3600) % 24
    var minutes = parseInt(time / 60) % 60
    var seconds = parseInt(time) % 60
    spa[0].innerHTML = addZero(hours)
    spa[1].innerHTML = addZero(minutes)
    spa[2].innerHTML = addZero(seconds)

  }
  var timer = setInterval(getTime, 1000)
  function addZero(n) {
    return n < 10 ? '0' + n : n
  }
})()

// 设置轮播图(定位版)
;(function () {
  var ul = document.querySelector('.jd_banner ul')
  var lis = ul.children
  var width = lis[0].offsetWidth
  var olLis = document.querySelectorAll('.jd_banner ol li')
  var prev = lis.length - 1
  var now = 0
  var next = 1

  lis[prev].style.transform = 'translateX('+ (- width) +'px)'
  lis[now].style.transform = 'translateX('+ 0 +'px)'
  lis[next].style.transform = 'translateX('+ width +'px)'
  // 向左翻页
  function pageNext() {
    lis[prev].style.transition = 'none'
    lis[prev].style.transform = 'translateX('+ (2 * width) +'px)'

    prev = now
    now = next
    next++
    if (next > lis.length - 1) {
      next = 0
    }
    lis[prev].style.transition = 'transform .5s'
    lis[now].style.transition = 'transform .5s'
    lis[next].style.transition = 'none'
    lis[prev].style.transform = 'translateX('+ (- width) +'px)'
    lis[now].style.transform = 'translateX('+ 0 +'px)'
    lis[next].style.transform = 'translateX('+ width +'px)'
    olLis.forEach(function (v) {
      v.className = ''
    })
    olLis[now].className = 'current'
  }
  function pagePrev() {
    lis[next].style.transition = 'none'
    lis[next].style.transform = 'translateX('+ (2 * width) +'px)'

    next = now
    now = prev
    prev--
    if (prev < 0) {
      prev = lis.length - 1
    }
    lis[prev].style.transition = 'none'
    lis[now].style.transition = 'transform .5s'
    lis[next].style.transition = 'transform .5s'
    lis[prev].style.transform = 'translateX('+ (- width) +'px)'
    lis[now].style.transform = 'translateX('+ 0 +'px)'
    lis[next].style.transform = 'translateX('+ width +'px)'
    olLis.forEach(function (v) {
      v.className = ''
    })
    olLis[now].className = 'current'
  }
  var timer = setInterval(pageNext, 2500)

  // 添加手指时间
  var startX = 0
  var startTime = 0
  ul.addEventListener('touchstart', function (e) {
    startTime = new Date()
    startX = e.touches[0].clientX
    clearInterval(timer)
  })
  ul.addEventListener('touchmove', function (e) {
    var distanceX = e.touches[0].clientX - startX
    lis[prev].style.transition = 'none'
    lis[now].style.transition = 'none'
    lis[next].style.transition = 'none'
    lis[prev].style.transform = 'translateX('+ (- width + distanceX) +'px)'
    lis[now].style.transform = 'translateX('+ distanceX +'px)'
    lis[next].style.transform = 'translateX('+ (width + distanceX) +'px)'
  })
  ul.addEventListener('touchend', function (e) {
    var distanceX = e.changedTouches[0].clientX - startX
    var time = new Date() - startTime
    if (distanceX < - width / 3 || time < 200 && distanceX < - 50) {
      pageNext()
    } else if (distanceX > width / 3 || time < 200 && distanceX > 50) {
      pagePrev()
    } else {
      lis[prev].style.transition = 'transform .5s'
      lis[now].style.transition = 'transform .5s'
      lis[next].style.transition = 'transform .5s'
      lis[prev].style.transform = 'translateX('+ (- width) +'px)'
      lis[now].style.transform = 'translateX('+ 0 +'px)'
      lis[next].style.transform = 'translateX('+ width +'px)'
    }
    timer = setInterval(pageNext, 2500)
  })
})()
