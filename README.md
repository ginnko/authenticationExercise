[A Complete Firebase in React Authentication Tutorial ](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/)项目的练习

分支说明：
- master：跟随教程包含最新功能以及使用第三方库等
- basicfunction: 使用react和firebase，没有引入第三方状态管理库，没有使用hoc，render props，context等，不具有路由保护，但是基本功能都有。
- basicVersion: 使用react和firebase，没有引入第三方状态管理库，加入了hoc，render props,context等，具备路由保护以及user实体操纵，具备全部功能。

### 2018.4.16

写完**sign up**组件，能够正常工作，真是得感叹黑科技公司的东西真妥么好用

下面说说学到的东西：

1. firebase的使用，这部分感觉是固定的
  - firebase.js用于创建firebase实例
  - auth.js中是真正使用firebase的api的地方，将它转化成可供react直接使用的形式
  - 封装的接口
2. withRouter（signUp.js）
  这个高级组件包裹任意自定义组件后，即可在被包裹的组件中自由获得router的history，location，match属性
3. `history.push(routes.HOME);`（signUp.js）:这种写法会导致单页面跳转，此处无法使用Route组件，因为没有路径输入，也不能使用Link组件，因为这个需要点击，所以貌似只能使用这种形式
4. input元素的value由状态中的属性值决定，实现了对组件的完全控制(（signUp.js）)
5. byPropKey函数中使用了动态键的用法（signUp.js）
6. 在使用`this.setState()`更新状态时，向这个函数中传递的不是对象而是函数`byPropKey`，但感觉实际和传了个对象没什么区别，只是为了构造新的状态方便而已。而传递函数的真正目的可以参考[这里](https://juejin.im/entry/5873b04f61ff4b006d4d45f7)。

### 2018.4.17

1. 写完**sign in**组件，但是登陆后页面没有跳转到home页而是刷新了。。。问题啊。。。已经使用了`event.preventDefault()`了啊

找到问题了!!!
```
  onSubmit = (event) => {
    const {
      email,
      password
    } = this.state;
  //之前把this.state写成了this.props
  ...

  }
```

### 2018.4.18

1. 这段代码要注意一下,这个好像并没有在本地的firebase文件里有出现过,原生的一个api?
  ```
  firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
  ```

`onAuthStateChanged`这个函数获取一个函数作为输入，这个作为输入的函数能够接触到`authenticated user objec`。每次这个对象发生变化，这个传入的函数就会被调用（sign in, sign out, sign up）

2. [高階組件](https://www.robinwieruch.de/gentle-introduction-higher-order-components/)
*媽噠，輸入法莫名奇妙變成繁體還切換不回來了。。。*
高階組件的一個應用場景是：條件渲染

### 2018.4.19
- 高阶组件: 高阶组件通常接受一个组建或者其他可选参数作为参数输入,返回一个输入组件的强化版.

### 2018.4.22
  - react's context API
    - Provider
    - Consumer
    **Provider要包在Consumer顶层**
  - the [render props](https://reactjs.org/docs/render-props.html) pattern
    ```
      <AuthUserContext.Consumer>
        {
          authUser => authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
      </ AuthUserContext.Consumer>
    ```
    在Consumer组件中，用的是函数而不是一个组件，这种用法在react中就被称为**参数渲染模式(the render props pattern)**

    这个技巧的应用场景：
      1. hoc
      2. 组件重用
  - 箭头函数简洁形式加括号的问题（PasswordForget.js 30行）  
    而且此处使用了函数形式
    ```
      auth.doPasswordReset(email)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
        })
    ```
  - authUser改变后会记录email等信息（Account.js中）
    ```
      {
        authUser =>
          <div>
            <h1>Account: {authUser.email}</h1>
            <PasswordForgetForm />
            <PasswordChangeForm />
          </div>
      }
    ```
### 2018.4.23
  - authorization  
    如果发现有非验证用户就重定向到非验证用户看的页面,否则就什么也不做.
  - 控制条件
    1. authUser != null(general authorization)
    2. authUser.role === 'ADMIN'(specific authorization)
    3. authUser.permission.canEditAccount === true(specific authorization)
  - authorization: 授权  
    authentication: 身份验证
  - user entity management  
    store user in realtime database in firebase during the sign up process
  - 使用firebase登录后关闭浏览器后再打开，依然是登录状态，firebase会自动管理，withAuthentication()中的监听器也知道已验证的用户对象