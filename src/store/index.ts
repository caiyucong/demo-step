import { ElMessage } from "element-plus";
import { defineAsyncComponent, markRaw } from "vue";
import { createStore } from "vuex";
export interface UserData {
  username: string;
  password: string;
  repPassword: string;
  nickname: string;
}
export interface StepHandler {
  id: string;
  component: unknown;
  title?: string;
  saveDate: () => Promise<boolean>;
  next?: () => StepHandler;
  previous?: () => StepHandler;
  finish?: () => Promise<boolean>;
}
export default createStore({
  state: {
    userData: {
      username: "",
      password: "",
      repPassword: "",
      nickname: "",
    } as UserData,
    newData: {
      id: "new",
      component: markRaw(
        defineAsyncComponent(() => import("@/components/NewComponent.vue"))
      ),
      finish: async () => {
        ElMessage.success("完成！");
        return true;
      },
    } as StepHandler,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
