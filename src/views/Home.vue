<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px;">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="user">
              <img src="@/assets/images/user.png" alt="">
              <div class="userinfo">
                <p class="name">Lei</p>
                <p class="access">超级管理员</p>
              </div>
            </div>
            <div class="login-info">
              <p>上次登录时间：<span>2023-04-05</span></p>
              <p>上次登录地点：<span>四川</span></p>
            </div>
          </el-card>
          <el-card>
            <el-table style="margin-top:20px; height: 460px;" :data="tableData">
              <!-- <el-table-column prop="name" label="品牌">
              </el-table-column>
              <el-table-column prop="todayBuy" label="今日购买">
              </el-table-column>
              <el-table-column prop="monthBuy" label="本月购买">
              </el-table-column>
              <el-table-column prop="totalBuy" label="总购买">
              </el-table-column> -->
              <el-table-column v-for="(item, key) in tableLabel" :key="item.name" :prop="key" :label="item">
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16" style="padding-left: 10px;">
        <div class="grid-content bg-purple-light">
          <div class="num">
            <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
              <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
              <div class="detail">
                <p class="price">{{ '￥' + item.value }}</p>
                <p class="desc">{{ item.name }}</p>
              </div>
            </el-card>
          </div>
          <el-card style="height: 280px;">
            <!-- 折线图 -->
            <div ref="echarts1" style="height: 280px;"></div>
          </el-card>
          <div class="graph">
            <!-- 柱状图 -->
            <el-card style="height: 260px;">
              <div ref="echarts2" style="height: 260px;"></div>
            </el-card>
            <el-card style="height: 260px;">
              <div ref="echarts3" style="height: 240px;"></div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getData } from '@/api'
import * as echarts from 'echarts'
export default {
  name: 'HomeC',
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 111,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 222,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 333,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 444,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 555,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 666,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ]
    }
  },
  methods: {
  },
  created() {
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data
      // console.log(data)
      this.tableData = tableData

      // 基于准备好的dom，初始化echarts实例
      // 折线图
      const myChart = echarts.init(this.$refs.echarts1)
      // 指定图标的配置项和数据
      const option = {}
      // 处理数据xAxis
      const { orderData, userData, videData } = data.data

      // console.log(data)

      const xAxis = Object.keys(orderData.data[0])
      option.xAxis = xAxis
      const xAxisData = {
        data: xAxis
      }
      option.legend = xAxisData
      option.xAxis = xAxisData
      option.yAxis = {}
      option.series = []
      xAxis.forEach(key => {
        option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      myChart.setOption(option)

      // 柱状图
      const myChart2 = echarts.init(this.$refs.echarts2)
      const echarts2Option = {
        legend: {
          color: '#333'
        },
        grid: {
          left: '20%'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar'
          }
        ]
      }
      myChart2.setOption(echarts2Option)

      // 饼状图
      const myChart3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip: {
          trigger: 'item'
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3edicf'
        ],
        series: [
          {
            data: videData,
            type: 'pie'
          }
        ]
      }
      myChart3.setOption(echarts3Option)
    })
  }
}
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }

    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}
</style>
