const $ = selector => {
    if (selector.indexOf('#') === 0) {
        return document.querySelector(selector);
    }
    return document.querySelectorAll(selector);
};
const length = 3; // 每页的数据量
let current = 0;
/**
 * @param Array
 * data = [
 *      {'a':'a1','b':'b1'},
 *      {'a':'a2','b':'b2'}
 * ]
 * 
 */
data = [
    { a: 'a1', b: 'b1' },
    { a: 'a2', b: 'b2' },
    { a: 'a3', b: 'b3' },
    { a: 'a4', b: 'b4' },
    { a: 'a5', b: 'b5' },
    { a: 'a6', b: 'b6' },
    { a: 'a7', b: 'b7' },
]

const showButtom = () => {
    const totalPage = data.length / length;
    $("#data-show-buttom").innerHTML += '<button id="clcik-page-first">first</button>';
    $("#data-show-buttom").innerHTML += '<button id="clcik-page-previous">previous</button>';
    for (let i = 0; i < totalPage; i += 1) {
        if (i < 6) {
            $("#data-show-buttom").innerHTML += `<a id = "data-item-${i}">  ${i + 1}  </a>`;
        }
    }
    $("#data-show-buttom").innerHTML += '<button id="clcik-page-next">next</button>';
    $("#data-show-buttom").innerHTML += '<button id="clcik-page-end">end</button>';
}
const showContent = (start, end) => {
    const content = data.slice(start, end)

    // show data
    content.forEach((item) => {
        const element =
            `<tr>
            <td>${item.a}</td>
            <td>${item.b}</td>
        </tr>`
        $('#data-show-body').innerHTML += element;
    });

}
const showData = (start,end) => {
    // empty GUI data
    $("#data-show-buttom").innerHTML = '';
    $("#data-show-head").innerHTML = '';
    $('#data-show-body').innerHTML = '';

    showButtom();
    showContent(start,end);
}
// 下一页
const down = (data, start) => {

}
// 上一页
const up = (data, start) => {

}
// 首页
const firstPage = () => {
    showData(0, length);
}
// 尾页
const lastPage = (data, start) => {

}
// 跳到某页
const jump = (page) => {
    // showData(start,end)
    showData(page * length, page * length + length);
}
document.addEventListener('click', e => {
    switch (e.target.id) {
    case 'clcik-page-first': {
        getExpressionsByAPI();
        break;
    }
    case 'clcik-page-last': {
        getEntitiesByAPI();
        break;
    }
    case 'clcik-page-next': {
        getIntentByAPI();
        break;
    }
    case 'clcik-page-previous': {
        getIntentByAPI();
        break;
    }
    default:{
        if(e.target.id.includes('data-item-')){
            const page = e.target.id.substr(-1,1);
            jump(page);
        }
    }
    }
});
firstPage(0);