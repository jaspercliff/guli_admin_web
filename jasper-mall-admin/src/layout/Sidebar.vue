<script setup lang="ts">
const props = defineProps<
    {
      menuOptions:Array<Object>
    }>()
</script>

<template>
    <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        style="max-height: 100vh;height: 100vh"
    >
      <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="props.menuOptions"
      />
    </n-layout-sider>
</template>

<style scoped>

</style>