<template>
  <div class="main">
    <el-form ref="formRef" :model="data" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="data.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="data.password"
          placeholder="请输密码"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="repPassword">
        <el-input
          type="password"
          v-model="data.repPassword"
          placeholder="请确认密码"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, Ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useStore } from "vuex";
import type { UserData } from "@/store/index";
const store = useStore();
const { userData: data } = toRefs(store.state) as { userData: Ref<UserData> };
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (value !== data.value.password) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<UserData>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "用户名应当3-10个字符", trigger: "blur" },
  ],
  nickname: [
    { required: true, message: "请输入昵称", trigger: "blur" },
    { min: 3, max: 5, message: "用户名应当3-5个字符", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  repPassword: [
    { validator: validatePass, trigger: "blur" },
    {
      min: 8,
      max: 16,
      message: "密码应当8-16个字符",
      trigger: "blur",
      required: true,
    },
  ],
});
const formRef = ref<FormInstance>();
</script>
<style>
.main {
  width: 400px;
  margin: 0 auto;
  padding: 40px;
  margin-bottom: 10px;
}
</style>
