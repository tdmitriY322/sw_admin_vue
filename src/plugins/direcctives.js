export default {
    install(Vue) {
        Vue.directive('andrey', {
            bind(el) {
                el.addEventListener('mouseenter', function (event) {
                    el.style.color = "purple";
                    setTimeout(function () {
                        event.target.style.color = "rgba(253, 99, 3, 0.9)";
                    }, 1500);
                }, false);
            }
        })
    }
}
