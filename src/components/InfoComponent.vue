<template>
  <div class="main">
    <el-form :model="data">
      <el-form-item label="姓名">
        <el-input v-model="data.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="data.sex" class="ml-4">
          <el-radio :label="false" size="large">男</el-radio>
          <el-radio :label="true" size="large">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="data.age" placeholder="请输年龄" />
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="data.id" placeholder="请确认身份证号码" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
interface formData {
  name: string;
  sex: boolean;
  age?: number;
  id: string;
}
const data = reactive<formData>({
  name: "",
  sex: false,
  age: undefined,
  id: "",
});
</script>
