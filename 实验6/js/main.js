// 任务1：昼夜换肤（#skinBtn 在Vue容器外面）
const skinBtn = document.querySelector("#skinBtn");
const bodyDom = document.body;
skinBtn.addEventListener('click', function () {
  bodyDom.classList.toggle("night");
})

//=====注册表单校验，在#app外面，页面加载执行=====
function initRegisterForm(){
  const registerForm = document.querySelector("#registerForm");
  if(!registerForm) return;

  const usernameInput = document.querySelector('#username');
  const emailInput = document.querySelector('#email');
  const pwdInput = document.querySelector('#pwd');
  const repwdInput = document.querySelector('#repwd');

  const userTip = document.querySelector('#userTip');
  const emailTip = document.querySelector('#emailTip');
  const pwdTip = document.querySelector('#pwdTip');
  const repwdTip = document.querySelector('#repwdTip');

  const regUsername = /^\w{3,16}$/;
  const regEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  usernameInput.addEventListener('blur', function () {
    const val = usernameInput.value.trim();
    if (regUsername.test(val)) {
      userTip.innerText = "✅用户名格式正确";
      userTip.style.color = "green";
    } else {
      userTip.innerText = "❌用户名需3‑16位字母、数字或下划线";
      userTip.style.color = "red";
    }
  })

  emailInput.addEventListener('blur', function () {
    const val = emailInput.value.trim();
    if (regEmail.test(val)) {
      emailTip.innerText = "✅邮箱格式正确";
      emailTip.style.color = "green";
    } else {
      emailTip.innerText = "❌邮箱格式错误";
      emailTip.style.color = "red";
    }
  })

  pwdInput.addEventListener('blur', function () {
    const val = pwdInput.value;
    if (val.length >= 6) {
      pwdTip.innerText = "✅密码长度合格";
      pwdTip.style.color = "green";
    } else {
      pwdTip.innerText = "❌密码至少6位";
      pwdTip.style.color = "red";
    }
  })

  repwdInput.addEventListener('blur', function () {
    const pwdVal = pwdInput.value;
    const repwdVal = repwdInput.value;
    if (repwdVal === pwdVal && repwdVal!=='') {
      repwdTip.innerText = "✅两次密码一致";
      repwdTip.style.color = "green";
    } else {
      repwdTip.innerText = "❌两次密码不一致";
      repwdTip.style.color = "red";
    }
  })

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const pwd = pwdInput.value;
    const repwd = repwdInput.value;

    let passFlag = true;
    if (!regUsername.test(username)) passFlag = false;
    if (!regEmail.test(email)) passFlag = false;
    if (pwd.length < 6) passFlag = false;
    if (pwd !== repwd) passFlag = false;

    if (passFlag) {
      console.log("表单提交成功", {username,email,pwd});
      alert("注册成功！打开F12控制台查看表单数据");
    } else {
      alert("表单校验不通过，请检查输入内容！");
    }
  })
}

// ========= Task3 博文卡片局部组件 复用 =========
const PostCard = {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  template: `
    <article class="card">
      <div class="meta">{{ article.date }}</div>
      <h2 class="title">{{ article.title }}</h2>
      <p class="summary">{{ article.summary }}</p>
    </article>
  `
};

// ========= 定义路由页面组件 =========
//页面1 首页 / 带搜索过滤
const HomePage = {
  components:{PostCard},
  data(){
    return {
      keyword:"",
      blogArticles: blogArticles //✅ 把全局文章数组放到组件data内，模板可访问
    }
  },
  computed:{
    filteredArticles(){
      if(!this.keyword.trim()) return this.blogArticles;
      return this.blogArticles.filter(a=>a.title.includes(this.keyword.trim()))
    }
  },
  methods:{
    resetSearch(){
      this.keyword = "";
    }
  },
  template:`
  <main class="container">
    <section class="content">
      <div class="card">
        <h3>文章搜索</h3>
        <input type="text" v-model="keyword" placeholder="输入文章标题关键词">
        <button @click="resetSearch">重置</button>
        <p>当前关键词：{{ keyword }}</p>
      </div>
      <p>显示{{filteredArticles.length}}/共{{blogArticles.length}}篇文章</p>
      <p v-if="filteredArticles.length===0">没有搜索到相关文章</p>
      <div>
        <post-card v-for="art in filteredArticles" :key="art.id" :article="art"></post-card>
      </div>
    </section>
    <aside class="sidebar">
      <section class="card">
        <h3>关于我</h3>
        <img class="avatar" src="images/yuan-yi.png" alt="我的头像：缘一">
        <p style="text-align:center">大家好，我是王均均，<br>QQ:2762861401</p>
      </section>
      <section class="card">
        <h3>我的技能表</h3>
        <table>
          <tr><th>技能</th><th>掌握程度</th></tr>
          <tr><td>HTML</td><td>★★★☆☆</td></tr>
          <tr><td>CSS</td><td>★★☆☆☆</td></tr>
        </table>
      </section>
    </aside>
  </main>
  `
};

//页面2 文章分类 /articles，全部文章，不带搜索
const ArticlePage = {
  components:{PostCard},
  data(){
    return {
      blogArticles: blogArticles //✅ 同样加入data，模板读取this.blogArticles
    }
  },
  template:`
  <main class="container">
    <section class="content">
      <div class="card">
        <h3>文章分类 - 全部博文</h3>
      </div>
      <div>
        <post-card v-for="art in blogArticles" :key="art.id" :article="art"></post-card>
      </div>
    </section>
    <aside class="sidebar">
      <section class="card">
        <h3>关于我</h3>
        <img class="avatar" src="images/yuan-yi.png" alt="我的头像：缘一">
        <p style="text-align:center">大家好，我是王均均，<br>QQ:2762861401</p>
      </section>
    </aside>
  </main>
  `
};

//页面3 留言板 /message
const MessagePage = {
  data(){
    return {
      nickname:"",
      content:"",
      messages:[]
    }
  },
  methods:{
    addMessage(){
      const nick = this.nickname.trim();
      const cont = this.content.trim();
      if(!nick||!cont){
        alert("昵称和留言内容不能为空！");
        return;
      }
      this.messages.push({
        id:Date.now(),
        nickname:nick,
        content:cont
      })
      this.nickname = "";
      this.content = "";
    },
    deleteMessage(delId){
      this.messages = this.messages.filter(item=>item.id!==delId)
    }
  },
  template:`
  <main class="container">
    <section class="content">
      <div class="card">
        <h3>给我留言</h3>
        <form @submit.prevent="addMessage">
          <label>昵称：</label>
          <input v-model="nickname" placeholder="1‑20字">
          <br>
          <label>留言内容：</label>
          <textarea v-model="content" rows="3"></textarea>
          <br>
          <button type="submit">发表留言</button>
        </form>
        <p>共有 {{ messages.length }} 条留言</p>
        <div v-for="msg in messages" :key="msg.id" class="card">
          <p>昵称：{{ msg.nickname }}</p>
          <p>{{ msg.content }}</p>
          <button @click="deleteMessage(msg.id)">删除留言</button>
        </div>
      </div>
    </section>
  </main>
  `
};

// ========= 创建路由实例 CDN写法 修复！！ =========
// 修改点：改用解构写法，并且routes数组增加 {path:"/message",component:MessagePage}
const { createRouter, createWebHashHistory } = VueRouter;

const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    {path:"/",component:HomePage},
    {path:"/articles",component:ArticlePage},
    {path:"/message",component:MessagePage},
    {path:"/:catchAll(.*)",component:{template:`
      <div class="card" style="margin:2rem;text-align:center">
        <h2>404 页面不存在</h2>
      </div>
    `}}
  ]
})

// ========= 创建Vue应用，安装路由插件 =========
const app = Vue.createApp({})
app.use(router)

router.isReady().then(()=>{
  app.mount("#app");
  initRegisterForm();
})