//封装轮播图业务相关的逻辑代码
import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home";

export function useBanner() {
  const bannerList = ref([])

  const getbanner = async () => {
    const res = await getBannerAPI({ distributionSite: '2' })
    console.log(res);
    bannerList.value = res.result
  }
  onMounted(() => getbanner())
  return {
    bannerList
  }
}