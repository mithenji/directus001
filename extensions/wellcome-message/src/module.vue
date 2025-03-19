<template>
  <private-view title="欢迎">
    <div class="content">
      <v-card>
        <v-card-title>欢迎来到 Directus!</v-card-title>
        <v-card-text>
          <p>这是自定义模块页面。</p>
          
          <v-divider class="my-4" />
          
          <h2 class="time-header">来自 current-time 端点的数据：</h2>
          
          <div v-if="isLoading" class="loading">
            <v-progress-circular indeterminate />
            <span class="ml-2">加载中...</span>
          </div>
          
          <div v-else-if="error" class="error-message">
            <v-icon color="error">error</v-icon>
            <span class="ml-2">{{ error }}</span>
          </div>
          
          <div v-else class="time-info">
            <p><strong>当前时间:</strong> {{ timeData.currentTime }}</p>
            <p><strong>时间戳:</strong> {{ timeData.timestamp }}</p>
            <p><strong>消息:</strong> {{ timeData.message }}</p>
          </div>
          
          <v-btn class="mt-4" color="primary" @click="fetchTimeData">
            刷新时间
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </private-view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useApi } from '@directus/extensions-sdk';

export default defineComponent({
  name: 'WellcomeModule',
  
  setup() {
    const api = useApi();
    const timeData = ref<any>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    
    const fetchTimeData = async () => {
      isLoading.value = true;
      error.value = null;
      
      try {
        // 调用 current-time 端点
        const response = await api.get('/current-time');
        timeData.value = response.data;
      } catch (err) {
        console.error('获取时间数据失败:', err);
        error.value = '无法从 current-time 端点获取数据。请确保该扩展已启用。';
      } finally {
        isLoading.value = false;
      }
    };
    
    // 页面加载时获取数据
    onMounted(() => {
      fetchTimeData();
    });
    
    return {
      timeData,
      isLoading,
      error,
      fetchTimeData
    };
  }
});
</script>

<style scoped>
.content {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.time-header {
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: var(--theme--primary);
}

.loading {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.error-message {
  display: flex;
  align-items: center;
  color: var(--theme--danger);
  margin: 20px 0;
}

.time-info {
  background-color: var(--theme--background-subdued);
  padding: 16px;
  border-radius: 4px;
  margin: 20px 0;
}
</style>