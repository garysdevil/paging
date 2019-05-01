const allData = [
    { a: 'a1', b: 'b1', c: 'c1' },
    { a: 'a2', b: 'b2', c: 'c2' },
    { a: 'a3', b: 'b3', c: 'c3' },
    { a: 'a4', b: 'b4', c: 'c4' },
    { a: 'a5', b: 'b5', c: 'c5' },
    { a: 'a6', b: 'b6', c: 'c6' },
    { a: 'a7', b: 'b7', c: 'c7' },
    { a: 'a8', b: 'b8', c: 'c8' },
];
const column = ['序号', '姓名', '班级', '性别', '操作', '<input type="checkbox"/>'];
const config = {
    add: true, update: true, delete: true, search: true,
};
const page = new Pagination(allData, column);
// page.firstPage();
page.resetFilteredData(allData);
