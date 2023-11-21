# demo-step

1. 更加简单的进行步骤操作
2. 在不使用 `switch` 和 `if` 的情况下进行步骤操作，防止出现庞大的 `switch` 块、多人合作出现同一个 `case` 。
3. 增加代码的可读性，每个步骤都在 `saveDate` 函数中进行业务|逻辑操作。不用再考虑当前 `case` 的值并进行累加，只需专注于业务操作。

这是我提供的抽象类：

```typescript
interface StepHandler {
  id: string;
  component: unknown;
  title?: string;
  saveDate: () => Promise<boolean>;
  next?: () => StepHandler;
  previous?: () => StepHandler;
  finish?: () => void;
}
```

1. `id` 是唯一标识符，可以通过它来判断是否显示某个组件。
2. `component` 告诉程序你当前的组件是什么。
3. `title` 在标题样式统一的情况下，可以通过它来显示组件的标题。
4. `saveDate` 是一个异步函数，这里放业务|逻辑代码。如果你要阻拦程序进行下一步操作，你可以返回 `false` 反之 `true` 。
5. `next` 函数返回下一个步骤对象，不建议在这个函数进行业务代码。
6. `previous` 函数返回上一个步骤对象。
7. `finish` 当你没有下一步的时候，请务必将业务|逻辑代码放在这个函数。

详情请看 `DemoView.vue` 文件
