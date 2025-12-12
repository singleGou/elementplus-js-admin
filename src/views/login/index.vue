<script setup>
import { getUserInfo, login } from '@/api/user'
import { useUserStore } from '@/store'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginFormRef = ref(null)
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false,
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能少于3位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
  ],
}

const handleLogin = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true

      try {
        const res = await login(loginForm)

        const userStore = useUserStore()
        userStore.token = res.data.token

        const userInfo = await getUserInfo()
        userStore.avatar = userInfo.data.avatar
        userStore.username = userInfo.data.username
        ElMessage.success(res.message || '登录成功')
        router.push('/')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-bg-animation">
      <div class="bubble bubble-1"></div>
      <div class="bubble bubble-2"></div>
      <div class="bubble bubble-3"></div>
    </div>

    <div class="login-card">
      <div class="login-header">
        <div class="logo-container">
          <i-ep-element-plus class="logo-icon" />
        </div>
        <h1 class="login-title">欢迎回来</h1>
        <p class="login-subtitle">请登录您的账户以继续</p>
      </div>

      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" size="large">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名 / 邮箱" :prefix-icon="undefined">
            <template #prefix>
              <i-ep-user class="input-icon" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password @keyup.enter="handleLogin">
            <template #prefix>
              <i-ep-lock class="input-icon" />
            </template>
          </el-input>
        </el-form-item>

        <div class="form-options">
          <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
          <el-link type="primary" :underline="false">忘记密码？</el-link>
        </div>

        <el-form-item>
          <el-button :loading="loading" type="primary" class="login-button" @click="handleLogin" round>
            {{ loading ? '登录中...' : '登 录' }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <span class="divider">或者</span>
        <div class="social-login">
          <el-button circle size="small">
            <i-ep-chat-dot-round />
          </el-button>
          <el-button circle size="small">
            <i-ep-share />
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 容器与背景 */
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1f38 0%, #252a4a 100%);
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 动态背景气泡 */
.login-bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation: float 10s infinite ease-in-out;
}

.bubble-1 {
  width: 400px;
  height: 400px;
  background: #409eff;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.bubble-2 {
  width: 300px;
  height: 300px;
  background: #8e44ad;
  bottom: -50px;
  right: -50px;
  animation-delay: -2s;
}

.bubble-3 {
  width: 200px;
  height: 200px;
  background: #2ecc71;
  bottom: 20%;
  left: 30%;
  opacity: 0.4;
  animation-delay: -5s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 40px);
  }
}

/* 登录卡片 (Glassmorphism) */
.login-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
}

/* 头部 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo-container {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #409eff, #337ecc);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(64, 158, 255, 0.3);
}

.logo-icon {
  font-size: 32px;
  color: white;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.login-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

/* 表单样式调整 */
:deep(.el-input__wrapper) {
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: none !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  transition: all 0.3s;
}

:deep(.el-input__inner) {
  color: #fff;
  caret-color: #fff;
  height: auto;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
  border-color: #409eff;
  background-color: rgba(0, 0, 0, 0.3);
}

/* 修复浏览器自动填充背景变白问题 */
:deep(.el-input__inner:-webkit-autofill),
:deep(.el-input__inner:-webkit-autofill:hover),
:deep(.el-input__inner:-webkit-autofill:focus),
:deep(.el-input__inner:-webkit-autofill:active) {
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 99999s ease-in-out 0s;
  background-color: transparent !important;
}

.input-icon {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

:deep(.el-checkbox) {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #409eff;
}

.login-button {
  width: 100%;
  padding: 22px 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #409eff 0%, #0077ff 100%);
  border: none;
  box-shadow: 0 4px 14px 0 rgba(64, 158, 255, 0.39);
  transition: all 0.3s;
}

.login-button:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 20px 0 rgba(64, 158, 255, 0.5);
}

/* 底部 */
.login-footer {
  margin-top: 20px;
  text-align: center;
}

.divider {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 15px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 15px;
}

:deep(.social-login .el-button) {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s;
}

:deep(.social-login .el-button:hover) {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  transform: translateY(-2px);
}

/* 移动端适配 */
@media (max-width: 480px) {
  .login-card {
    margin: 20px;
    padding: 30px 20px;
  }
}
</style>
