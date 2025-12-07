//封装倒计时函数
import { ref, computed, onUnmounted } from "vue";
import dayjs from "dayjs";
export const countDown = () => {
  let timer = null
  const time = ref(0)
  //1.格式化时间 为xx分xx秒
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  //2.开启倒计时函数
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}
