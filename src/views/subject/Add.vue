<template>
  <div>
    course sort add
    <el-upload
      class="upload-demo"
      drag
      :action="baseUrl+'/eduservice/subject/addsubject'"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API
    }
  },
  methods: {},
  created() {

  }
}
</script>
<style scoped lang="scss">

</style>
