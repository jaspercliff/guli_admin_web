<template>
<div class="app-container">
    <el-form :inline="true" :model="teacherQuery" class="demo-form-inline" :gutter="20" >
        <el-form-item label="讲师名称" size="small" :span="6">
            <el-input v-model="teacherQuery.name" placeholder="讲师名称"></el-input>
        </el-form-item>
        <el-form-item label="讲师头衔" size="small" :span="6">
            <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
                <el-option label="高级讲师" :value="1"></el-option>
                <el-option label="首席讲师" :value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="加入时间" size="small":span="6">
            <el-col >
                <el-date-picker type="datetime" placeholder="选择时间" v-model="teacherQuery.begin"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="截止时间" size="small":span="6">
            <el-col >
                <el-date-picker type="datetime" placeholder="选择时间" v-model="teacherQuery.end"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item size="small" :span="6">
            <el-button type="primary" @click="handleConditionGet">查询</el-button>
        </el-form-item>
        <el-form-item size="small" :span="6">
            <el-button type="primary" @click="clear">清空</el-button>
        </el-form-item>
    </el-form>
    <el-table
        :data="records.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
            width="70"
            align="center"
            label="序号">
            <template slot-scope="scope">
                {{  (current -1)*limit + scope.$index+1 }}
            </template>
        </el-table-column>
        <el-table-column
            label="名称"
            prop="name">
        </el-table-column>
        <el-table-column
            label="头衔">
            <template slot-scope="scope">
                {{ scope.row.level ===1 ?"高级讲师":"首席讲师"}}
            </template>
        </el-table-column>
        <el-table-column
            label="资历"
            prop="intro">
        </el-table-column>
        <el-table-column
            label="加入时间"
            prop="gmtCreate">
        </el-table-column>
        <el-table-column
            label="加入时间"
            prop="gmtCreate">
        </el-table-column>
        <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
                <router-link :to="{
                    name:'EduTeacherEdit',
                    params:{
                        id:scope.row.id
                    }
                }">
                    <el-button
                        size="mini"
                        round
                        type="primary">Edit</el-button>
                </router-link>
                <el-button
                    size="mini"
                    type="danger"
                    round
                    @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="block">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="getList"
            :current-page="current"
            :page-sizes="[6,8,10]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</div>
</template>
<script>
import teacher from "@/api/edu/teacher";
import {getList} from "@/api/table";
export default {
    name:'Teacher',
    data(){
        return{
            records:[],
            limit: 8,
            current: 1,
            teacherQuery:{},
            total:0,
            search: ''
        }
    },
    methods:{
    //     teacher list
        getList(current = 1){
            this.current = current
            teacher.getTeacherList(this.current,this.limit,this.teacherQuery)
                .then(response =>{
                    console.log(response);
                    this.records = response.data.records
                    this.current = response.data.current
                    this.total = response.data.total
                    this.limit = response.data.size
                })
                .catch(error =>{
                    console.log(error);
                })
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                teacher.deleteTeacherById(row.id)
                this.getList()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            console.log(index, row);
        },
        handleSizeChange(limit = 8){
            this.limit = limit;
            this.getList(1)
        },
        clear(){
            this.teacherQuery = {};
            this.getList();
        },
        handleConditionGet(){
            this.current = 1;
            this.getList()
        }
    },
    created() {
        this.getList();
    }
}
</script>
<style scoped lang="scss">

</style>