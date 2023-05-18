<template>
    <div class="app-container">
        讲师列表
        <el-upload
            class="avatar-uploader"
            :action="baseUrl+'/eduservice/teacher/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            field="file">
            <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form ref="form"  label-width="120px">
            <el-form-item label="讲师名称" width="60px">
                <el-input v-model="teacher.name"></el-input>
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input-number v-model.number="teacher.sort" controls-position="right" ></el-input-number>
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="teacher.level" placeholder="请选择">
                    <el-option label="高级讲师" :value="1"></el-option>
                    <el-option label="首席讲师" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="teacher.career"/>
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="teacher.intro" :rows="6" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

import teacher from "@/api/edu/teacher";
import avatar from "element-ui/packages/avatar";

export default {
    name:'Add',
    data(){
        return{
            teacher:{
                id:'',
                name:'',
                sort:0,
                level:1,
                career:'',
                intro:'',
                avatar:''
            },
            saveBtnDisabled:false,
            baseUrl: process.env.VUE_APP_BASE_API
        }
    },
    methods:{
        getTeacher(id){
            teacher.getTeacherById(id).then(response=>{
                this.teacher = response.data
                console.log(this.teacher);
            })
        },
        saveOrUpdate(){
            if(!this.teacher.id){
                this.saveTeacher()
            }else{
                this.updateTeacher();
            }
        },
        saveTeacher(){
            teacher.addTeacher(this.teacher).then(
                response =>{
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                //     回到列表
                    this.$router.push({name:'teacherList'})
                }
            )
        },
        updateTeacher(){
            teacher.updateTeacher(this.teacher).then(response=>{
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                //     回到列表
                this.$router.push({name:'teacherList'})
            })
        },
        handleAvatarSuccess(res, file) {
            this.teacher.avatar = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
            },

    },
    created() {
        if(this.$route.params && this.$route.params.id){
            const id =this.$route.params.id
            console.log("id = "+ id);
            this.getTeacher(id)
        }
    },

}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
