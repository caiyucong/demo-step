<template>
  <div>
    <component :is="stepHandler.component" ref="copyFormRef"></component>
    <div>
      <el-button
        v-if="stepHandler.next"
        :loading="loading"
        type="primary"
        @click="next"
      >
        下一步
      </el-button>
      <el-button
        v-if="stepHandler.finish"
        :loading="loading"
        type="primary"
        @click="finish"
      >
        完成
      </el-button>
      <el-button v-if="stepHandler.id === 'tow'" @click="stepHandler = newData">
        新页面
      </el-button>
      <el-button
        v-if="stepHandler.previous"
        :loading="loading"
        @click="previous"
      >
        上一步
      </el-button>
      <el-button :loading="loading" @click="cancel"> 取消 </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineAsyncComponent, markRaw } from "vue";
import { ElMessage } from "element-plus";
import type { StepHandler } from "@/store/index";
import { useStore } from "vuex";
const store = useStore();
const { newData } = store.state;
const loading = ref<boolean>(false);
const copyFormRef = ref<any>();
// 下一步
async function next() {
  loading.value = true;
  try {
    const refulst = await stepHandler.value.saveDate();
    if (!refulst) {
      return;
    }
    if (stepHandler.value.next) {
      stepHandler.value = stepHandler.value.next();
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
function previous() {
  if (stepHandler.value.previous) {
    stepHandler.value = stepHandler.value.previous();
  }
}
function cancel() {
  stepHandler.value = first;
  ElMessage.success("取消...");
}
async function finish() {
  if (!stepHandler.value.finish) return;
  const refulst = await stepHandler.value.finish();
  if (!refulst) {
    return;
  }
  /**
   * 这里可以写完成逻辑：如关闭页面、跳转页面、重置数据等
   * 比如重置到第一页：
   * componentIs.value = firststepHandler.value.component;
   */
  stepHandler.value = first;
}
const first: StepHandler = {
  id: "first",
  saveDate: async () => {
    await copyFormRef.value.$refs.formRef.validate();
    ElMessage.success("保存数据");
    return true;
  },
  next: () => info,
  // 请使用 markRaw 函数返回，可以防止不必要的性能开销
  component: markRaw(
    defineAsyncComponent(() => import("@/components/RegComponent.vue"))
  ),
};
const info: StepHandler = {
  id: "tow",
  saveDate: async () => {
    console.log("saveInfo");
    return true;
  },
  previous: () => first,
  component: markRaw(
    defineAsyncComponent(() => import("@/components/InfoComponent.vue"))
  ),
  finish: async () => {
    ElMessage.success("完成！");
    return true;
  },
};
const stepHandler = ref<StepHandler>(first);
</script>
<style></style>
