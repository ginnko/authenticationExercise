[A Complete Firebase in React Authentication Tutorial ](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/)项目的练习

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