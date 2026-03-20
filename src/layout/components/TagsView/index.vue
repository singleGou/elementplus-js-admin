<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContextMenu from './components/ContextMenu.vue'

const route = useRoute()
const router = useRouter()
const reload = inject('reload')

const tagViews = ref([
  {
    path: '/index',
    name: '首页',
  },
])
const menuVisible = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const selectedTag = ref(null)

if (route.fullPath !== '/index') {
  tagViews.value.push({
    path: route.fullPath,
    name: route.meta.title,
  })
}

watch(
  () => route.fullPath,
  () => {
    // 避免重复添加相同路由
    if (tagViews.value.some((tag) => tag.path === route.fullPath)) {
      return
    }
    tagViews.value.push({
      path: route.fullPath,
      name: route.meta.title,
    })
  }
)

const handleClick = (tag) => {
  router.push(tag.path)
}

const handleClose = (tag) => {
  if (tag.path === route.fullPath) {
    router.push('/index')
  }
  tagViews.value = tagViews.value.filter((item) => item.name !== tag.name)
}

const handleContextMenu = (tag, event) => {
  event.preventDefault()
  selectedTag.value = tag
  const menuWidth = 160
  const menuHeight = 170
  const maxX = window.innerWidth - menuWidth
  const maxY = window.innerHeight - menuHeight
  menuX.value = Math.max(0, Math.min(event.clientX, maxX))
  menuY.value = Math.max(0, Math.min(event.clientY, maxY))
  menuVisible.value = true
}

const closeContextMenu = () => {
  menuVisible.value = false
}

// 只刷新指定路径的组件
const triggerReloadByPath = (path) => {
  if (!reload) return
  const resolved = router.resolve(path)
  reload({
    name: resolved.name ? String(resolved.name) : undefined,
    fullPath: resolved.fullPath,
  })
}

const handleMenuAction = (action) => {
  const tag = selectedTag.value
  if (!tag) {
    closeContextMenu()
    return
  }

  if (action === 'refresh') {
    if (route.fullPath !== tag.path) {
      router.push(tag.path).then(() => {
        triggerReloadByPath(tag.path)
      })
    } else {
      triggerReloadByPath(tag.path)
    }
    closeContextMenu()
    return
  }

  if (action === 'closeCurrent' && tag.path !== '/index') {
    handleClose(tag)
  }

  if (action === 'closeOthers') {
    tagViews.value = tagViews.value.filter((item) => item.path === '/index' || item.path === tag.path)
    if (route.fullPath !== tag.path) {
      router.push(tag.path)
    }
  }

  if (action === 'closeAll') {
    tagViews.value = tagViews.value.filter((item) => item.path === '/index')
    router.push('/index')
  }

  closeContextMenu()
}

const disableCloseCurrent = computed(() => !selectedTag.value || selectedTag.value.path === '/index')
const disableCloseOthers = computed(() => !selectedTag.value || tagViews.value.length <= 1)
const disableCloseAll = computed(() => tagViews.value.length <= 1)

onMounted(() => {
  window.addEventListener('click', closeContextMenu)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeContextMenu)
})
</script>

<template>
  <div class="tags-view-container">
    <el-scrollbar>
      <div class="tags-view-content">
        <el-tag
          v-for="tag in tagViews"
          :key="tag.name"
          type="primary"
          :effect="tag.path === route.fullPath ? 'dark' : undefined"
          :closable="tag.path !== '/index'"
          @click="handleClick(tag)"
          @close="handleClose(tag)"
          @contextmenu="handleContextMenu(tag, $event)"
          class="tag-item"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </el-scrollbar>
    <ContextMenu
      :visible="menuVisible"
      :x="menuX"
      :y="menuY"
      :disable-close-current="disableCloseCurrent"
      :disable-close-others="disableCloseOthers"
      :disable-close-all="disableCloseAll"
      @action="handleMenuAction"
    />
  </div>
</template>

<style lang="scss" scoped>
.tags-view-content {
  display: flex;
  width: max-content;
  padding: 10px 20px;
}
.tag-item {
  flex-shrink: 0;
  margin-right: 5px;
  cursor: pointer;
}
</style>
