// 任务1：昼夜换肤，单击按钮切换样式
const skinBtn = document.querySelector("#skinBtn");
const bodyDom = document.body;

skinBtn.addEventListener('click', function () {
  bodyDom.classList.toggle("night");
})


//任务2：完整注册表单校验
//1.获取全部DOM元素
const registerForm = document.querySelector("#registerForm");
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const pwdInput = document.querySelector('#pwd');
const repwdInput = document.querySelector('#repwd');

const userTip = document.querySelector('#userTip');
const emailTip = document.querySelector('#emailTip');
const pwdTip = document.querySelector('#pwdTip');
const repwdTip = document.querySelector('#repwdTip');

//正则
const regUsername = /^\w{3,16}$/;
const regEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;


//用户名 blur 失去焦点校验
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

//邮箱 blur校验
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

//密码失去焦点校验
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

//确认密码失去焦点，校验两次密码一致
repwdInput.addEventListener('blur', function () {
  const pwdVal = pwdInput.value;
  const repwdVal = repwdInput.value;
  if (repwdVal === pwdVal && repwdVal !== "") {
    repwdTip.innerText = "✅两次密码一致";
    repwdTip.style.color = "green";
  } else {
    repwdTip.innerText = "❌两次密码不相同";
    repwdTip.style.color = "red";
  }
})


//表单submit提交事件
registerForm.addEventListener('submit', function (e) {
  //阻止表单默认刷新！核心
  e.preventDefault();

  //获取所有输入的值
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const pwd = pwdInput.value;
  const repwd = repwdInput.value;

  //整体校验
  let passFlag = true;
  if (!regUsername.test(username)) passFlag = false;
  if (!regEmail.test(email)) passFlag = false;
  if (pwd.length < 6) passFlag = false;
  if (pwd !== repwd) passFlag = false;

  if (passFlag) {
    console.log("表单提交成功，表单数据：");
    console.log({
      用户名: username,
      邮箱: email,
      密码: pwd
    });
    alert("注册成功！打开F12控制台查看表单数据");
  } else {
    alert("表单校验不通过，请检查输入内容！");
  }
})