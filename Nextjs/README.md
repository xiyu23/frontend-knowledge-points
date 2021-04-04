## 1. 预渲染(Pre-rendering)

默认情况下，next.js 对每个**page**(页面)都会做预渲染，即先生成页面 HTML 最后直接返回给客户端，而不是让客户端去做渲染前的一些工作（比如请求数据、根据不同逻辑确定显示界面等）。

预渲染有两种方式：

1. 静态生成（Static Generation）
   构建时生成 HTML，并在后续每个请求时可以重用。

2. 服务端渲染（Server-side Rendering）
   每个请求都会触发生成 HTML。

### 1.1 带数据的静态生成(Static Generation with data)

若页面内容需要预先查一波数据，则可以用 nextjs 提供的`getStaticProps`。

在页面中，通过导出一个叫做`getStaticProps`的`async`函数，**在 nextjs 构建时，此函数会被调用**，随后在预渲染阶段，会将数据通过页面的`props`属性传递给页面使用。

> 在`production`模式下，只会在*build time*运行`getStaticProps`
>
> 在`development`模式下，每次客户端请求到来都会执行`getStaticProps`

语法：

```js
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
```

例子：

```tsx
function Blog({ posts }) {
  // 这里返回一个React Function Component
}

// 此函数会在构建时运行
export async function getStaticProps() {
  // get data...
  const posts = [{ title: "学习nextjs" }, { title: "学习react" }];

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
```

还有一种情况，我们的**path**可能会依赖于外部数据，比如`id=1`时返回`pages/posts/1`，`id=2`时返回`pages/posts/2`。

那么就可以使用**动态路由**，创建一个这样的*动态页面*：

    pages/posts/[id].js

`id`依赖于外部数据，那么可以需要用`getStaticPaths`来获取：

```tsx
// 获取所有路径
export async function getStaticPaths() {
  // get paths...
  const posts = [
    { id: 1, title: "学习nextjs" },
    { id: 2, title: "学习react" },
  ];

  // 这里返回完整的路径，如：/posts/1
  const paths = posts.map((post) => `/posts/${post.id}`);

  return {
    paths,
    fallback: false, // means other routes should 404. i don't know...
  };
}

// 根据访问的post id，查询具体的post内容
// 注意了！
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  // get post detail according to id...
  const post = { id: 1, title: "学习nextjs" };

  // 返回这个post
  return {
    props: {
      post,
    },
  };
}

// post将会是id对应的post
function Blog({ post }) {
  // 这里返回一个React Function Component，如
  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.id}</h2>
    </div>
  );
}

export default Blog;
```

### 1.2 服务端渲染(SSR)

可以在 page 中通过导出一个`async`的`getServerSideProps`函数实现。

每个客户端请求来临时，nextjs 都会调用`getServerSideProps`。

```tsx
function Page({ data }) {
  // 这里返回一个React Function Component
}

// 每当客户端请求来临时，nextjs都会调用它来进行SSR
export async function getServerSideProps() {
  // get data...
  const data = "some data";

  return {
    props: {
      data,
    },
  };
}

export default Page;
```

ref: https://nextjs.org/docs/basic-features/data-fetching

## 2. 导入 CSS

css 文件必须以`*.module.css`的扩展名命名，导入时固定写的`styles`？

```tsx
import styles from "./Button.module.css";

export function Button() {
  return (
    <button type="button" className={styles.error}>
      Destroy
    </button>
  );
}
```

## 3.
