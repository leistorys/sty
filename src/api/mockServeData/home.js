// mock数据模拟

import Mock from 'mockjs'

// 图表数据
// Mock.Random.float 产生随机数100-8000之间 保留小数 最小0位 最大0位
const List = []
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        videData: [
          {
            name: '小米',
            value: 2999
          },
          {
            name: '苹果',
            value: 6999
          },
          {
            name: 'oppo',
            value: 3999
          },
          {
            name: 'vivo',
            value: 3899
          },
          {
            name: '魅族',
            value: 2899
          },
          {
            name: '三星',
            value: 5999
          }
        ],
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 12,
            active: 300
          },
          {
            date: '周三',
            new: 22,
            active: 500
          },
          {
            date: '周四',
            new: 23,
            active: 433
          },
          {
            date: '周五',
            new: 43,
            active: 233
          },
          {
            date: '周六',
            new: 43,
            active: 643
          },
          {
            date: '周日',
            new: 32,
            active: 534
          }
        ],
        orderData: {
          date: ['20230401', '20230402', '20230403', '20230404', '20230405', '20230406', '20230407'],
          data: List
        },
        tableData: [
          {
            name: '小米',
            todayBuy: 2200,
            monthBuy: 5002,
            totalBuy: 12313
          },
          {
            name: '三星',
            todayBuy: 123,
            monthBuy: 256,
            totalBuy: 2832
          },
          {
            name: '魅族',
            todayBuy: 83,
            monthBuy: 553,
            totalBuy: 6870
          },
          {
            name: 'oppo',
            todayBuy: 187,
            monthBuy: 2390,
            totalBuy: 7392
          },
          {
            name: 'vivo',
            todayBuy: 213,
            monthBuy: 2313,
            totalBuy: 13241
          },
          {
            name: '苹果',
            todayBuy: 99,
            monthBuy: 2641,
            totalBuy: 7829
          }
        ]
      }
    }
  }
}
