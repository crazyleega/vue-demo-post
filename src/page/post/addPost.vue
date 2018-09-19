<template>
    <div class="editor">
        <el-row :gutter="20">
            <el-col :span="4">
                <el-select v-model="tag" placeholder="请选择标签">
                    <el-option
                        v-for="item in tags"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        </br>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-input v-model="title" placeholder="请输入文章标题"></el-input>
            </el-col>
        </el-row>
        </br>
        <el-row :gutter="20">
            <el-col :span="24">
                <markdown-editor :configs="configs" v-model="content"></markdown-editor>
            </el-col>
        </el-row>
        </br>
        <el-row :gutter="20">
            <el-col :span="1">
                <el-button type="primary" @click="add()">发布</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { markdownEditor } from 'vue-simplemde';
import jwt from 'jwt-decode';

export default {
  data() {
    return {
      title: '',
      content: '',
      tag: '',
      userId: '',
      configs: {
        status: false, // 禁用底部状态栏
        placeholder: 'Input something...', // 设置初始值
        renderingConfig: {
          codeSyntaxHighlighting: false, // 开启代码高亮
          highlightingTheme: 'atom-one-light', // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
        },
      },
      tags: [],
    };
  },
  components: {
    markdownEditor,
  },
  mounted() {
    const token = sessionStorage.getItem('login-token');
    if (token !== null && token !== 'null') {
      const decode = jwt(token);
      console.log(decode);
      this.userId = decode.id;
    }
    this.getAllTags();
  },
  methods: {
    getAllTags() {
      this.$http.get('/api/getAllTags').then((res) => {
        if (res.data.success) {
          this.tags = res.data.data;
        }
      });
    },
    add() {
      if (!this.tag) {
        this.$message.error('请选择标签');
        return false;
      }
      if (!this.title) {
        this.$message.error('标题不能为空');
        return false;
      }
      if (!this.content) {
        this.$message.error('内容不能为空');
        return false;
      }

      const post = {
        title: this.title,
        content: this.content,
        tags: [this.tag],
        userId: this.userId,
      };
      this.$http.post('/api/addPost', post).then((res) => {
        if (res.data.success) {
          this.tags = res.data.data;
          this.$message({
            type: 'success',
            message: '发布成功',
          });
          this.$router.push('/main');
        } else {
          this.$message.error('发布失败');
        }
      });
      return true;
    },
  },
};
</script>

<style scoped>
    .editor{
        max-width:1200px;
        margin:0 auto;
    }
</style>

