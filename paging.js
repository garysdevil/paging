
// eslint-disable-next-line func-names
const Pagination = function (data, column, config) { return _Pagination(data, column, config); };

const _Pagination = (allData, column, config) => {
    const $ = selector => {
        if (selector.indexOf('#') === 0) {
            return document.querySelector(selector);
        }
        return document.querySelectorAll(selector);
    };
    let filteredData = allData;
    const dataNumPerPage = 3; // 每页的数据量
    let totalData = filteredData.length; // 数据总量
    let totalPage = Math.ceil(totalData / dataNumPerPage); // 总页数
    let current = 0; // 当前页码  从0开始

    const configG = config || {
        add: true, update: true, delete: true, search: true,
    };
    const updateButtomElement = configG.update ? ' <td><button> update</button></td>' : '';
    const deleteCheckBox = configG.delete ? '<td><input type="checkbox"/></td>' : '';

    const getTheadElement = () => {
        let th = '';
        column.forEach(ele => {
            th += `<th>${ele}</th>`;
        });
        const thead = `<thead><tr>${th}</tr></thead>`;
        return thead;
    };

    const getTbodyElement = (content, start) => {
        // show data
        let tbodyElement = '<tbody>';
        content.forEach((item, index) => {
            const seq = start + index + 1;
            const element = `<tr>
                <td>${seq}</td>
                <td>${item.a}</td>
                <td>${item.b}</td>
                <td>${item.c}</td>      
                ${updateButtomElement}
                ${deleteCheckBox}
            </tr>`;
            tbodyElement += element;
        });
        tbodyElement += '</tbody>';
        return tbodyElement;
    };

    const getTableElement = (start, end) => {
        const content = filteredData.slice(start, end);

        const tableElement = `<table border="1" cellspacing='0'>
            ${getTheadElement()}
            ${getTbodyElement(content, start)}
            </table>`;
        return tableElement;
    };

    const getButtomElement = () => {
        // 跳转
        let pageButtomElement = `总共${totalData}条数据 共${totalPage}页，第
        <input type="number" min="1" step="1" max="${totalPage}" id="click-page-jump-value" value=${current + 1}>页
            <button id="click-page-jump">Go</button>
        `;
        pageButtomElement += '<button id="click-page-first">first</button>'; // 第一页
        pageButtomElement += '<button id="click-page-previous">previous</button>'; // 上一页
        pageButtomElement += '<button id="click-page-next">next</button>'; // 下一页
        pageButtomElement += '<button id="click-page-last">end</button>'; // 尾页

        return pageButtomElement;
    };

    const showData = (start, end) => {
        if (start < 0 || end > totalData) {
            console.log('err start < 0 || end > totalData');
        } else {
            current = start / dataNumPerPage;
            // empty GUI data
            $('#pagination').innerHTML = '';
            $('#pagination').innerHTML = getTableElement(start, end) + getButtomElement();
        }
    };
    // 首页
    const firstPage = () => {
        showData(0, dataNumPerPage);
    };
    // 尾页
    const lastPage = () => {
        const start = (totalPage - 1) * dataNumPerPage;
        showData(start, totalData);
    };
    // 下一页
    const nextPage = () => {
        if (current + 2 < totalPage) {
            const start = (current + 1) * dataNumPerPage;
            const end = start + dataNumPerPage;
            showData(start, end);
        } else {
            lastPage();
        }
    };
    // 上一页
    const previousPage = () => {
        if (current > 0) {
            const start = (current - 1) * dataNumPerPage;
            const end = start + dataNumPerPage;
            showData(start, end);
        } else {
            firstPage();
        }
    };

    // 跳到某页
    const jump = page => {
        if (parseInt(page, 10) === totalPage) {
            lastPage();
        } else if (page > 0) {
            const start = (page - 1) * dataNumPerPage;
            const end = (page - 1) * dataNumPerPage + dataNumPerPage;
            showData(start, end);
        }
    };
    // 搜索
    const resetFilteredData = data => {
        filteredData = data;
        totalData = filteredData.length; // 数据总量
        totalPage = Math.ceil(totalData / dataNumPerPage); // 总页数
        firstPage();
    };
    document.addEventListener('click', e => {
        switch (e.target.id) {
        case 'click-page-first': {
            firstPage();
            break;
        }
        case 'click-page-last': {
            lastPage();
            break;
        }
        case 'click-page-next': {
            nextPage();
            break;
        }
        case 'click-page-previous': {
            previousPage();
            break;
        }
        case 'click-page-jump': {
            const page = $('#click-page-jump-value').value;
            jump(page);
            break;
        }
        default: {
            if (e.target.id.includes('data-item-')) {
                const page = e.target.id.substr(-1, 1);
                jump(page);
            }
        }
        }
    });

    const api = {
        firstPage,
        lastPage,
        nextPage,
        previousPage,
        resetFilteredData,
    };
    return api;
};
