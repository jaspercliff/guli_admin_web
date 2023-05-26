<script setup lang="ts">
const props = defineProps<{
  inverted:Boolean
}>();
const options =  [
  {
    label: '滨海湾金沙，新加坡',
    key: 'marina bay sands',
    disabled: true
  },
  {
    label: '布朗酒店，伦敦',
    key: "brown's hotel, london"
  },
  {
    label: '亚特兰蒂斯巴哈马，拿骚',
    key: 'atlantis nahamas, nassau'
  },
  {
    label: '比佛利山庄酒店，洛杉矶',
    key: 'the beverly hills hotel, los angeles'
  }
];
    function handleSelect(){
      console.log("selected")
   }
</script>

<template>
  <n-layout-header  bordered >
    <div class="setting">
      <n-avatar
          class="header-avatar"
          round
          size="medium"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-button>设置</n-button>
      </n-dropdown>
    </div>
  </n-layout-header>
</template>

<style scoped>
.setting{
  display: grid;
  justify-content: end;
  grid-template-columns:  60px 60px;
}

.header-avatar {
  margin-right: 10px; /* 调整头像和悬浮按钮之间的间距 */
}
</style>