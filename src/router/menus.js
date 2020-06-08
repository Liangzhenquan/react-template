/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-06-07 16:57:23
 * @LastEditors: liang
 * @LastEditTime: 2020-06-08 10:40:13
 */

const menus = [
  {
    title: 'hello',
    sub: [
      {
        path: '/one',
        title: 'one'
      },
      {
        path: '/two',
        title: 'two'
      }
    ]
  },
  {
    title: 'world',
    sub: [
      {
        path: '/three',
        title: 'one'
      },
      {
        path: '/five',
        title: 'two'
      }
    ]
  },
  {
    path: '/',
    title: 'two'
  }
];
export default menus;
