<template>
    <div class="content">
        <h2 class="text-center">{{post.title}}</h2>
        <div class="text-right">{{post.createdAt | date}}</div>
        <vue-markdown class="post-detail" :source="post.content"></vue-markdown>

        <!--评论列表-->
        <h2>评论列表</h2>
        <div>
          <div v-for="(item,index) in comments" v-bind:key="item._id">
            <el-row :gutter="20">
              <el-col :span="1">
                <img src="../../assets/default_avatar.png" width="40" height="40"> 
              </el-col>
              <el-col :span="23">
                <el-row :gutter="20"> 
                  <el-col :span="1"><span v-if="item.userInfo">{{item.userInfo.userName}}</span></el-col>
                  <el-col :span="1">{{index + 1}}楼</el-col>
                  <el-col :span="21">{{item.createdAt | date}}</el-col>
                </el-row>
                <div>
                  <vue-markdown :source="item.content"></vue-markdown>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!--发表评论-->
        <div>
          <markdown-editor :configs="configs" v-model="comment"></markdown-editor>
          </br>
          <el-button type="primary" @click="publish()">发布评论</el-button> 
        </div>
    </div>

</template>

<script>
import VueMarkdown from 'vue-markdown';
import { markdownEditor } from 'vue-simplemde';
import jwt from 'jwt-decode';

export default {
  data() {
    return {
      postId: '',
      post: '',
      userId: '',
      comment: '',
      comments: '',
      total: '',
      configs: {
        status: false, // 禁用底部状态栏
        initialValue: 'Input something...', // 设置初始值
        renderingConfig: {
          codeSyntaxHighlighting: false, // 开启代码高亮
          highlightingTheme: 'atom-one-light', // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
        },
      },
    };
  },
  components: {
    VueMarkdown,
    markdownEditor,
  },
  mounted() {
    const token = sessionStorage.getItem('login-token');
    if (token !== null && token !== 'null') {
      const decode = jwt(token);
      this.userId = decode.id;
    }

    if (this.$route.params.postId) {
      this.postId = this.$route.params.postId;
      this.getPostDetail();
      this.getCommentsByPostId(this.postId);
    }
  },
  methods: {
    getPostDetail() {
      this.$http.get(`/api/getPostDetail/${this.postId}`).then((res) => {
        if (res.data.success) {
          this.post = res.data.data;
        } else {
          this.$message.error('查询数据失败。');
        }
      });
    },
    publish() {
      const commentObj = {
        from: this.userId,
        parent_id: this.postId,
        content: this.comment,
        type: 1,
      };
      this.$http.post('/api/addComment', commentObj).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '发布评论成功',
          });
        } else {
          this.$message.error('发布评论出错');
        }
      }, () => {
        this.$message.error('发布评论出错');
      });
    },
    getCommentsByPostId(postId) {
      this.$http.get(`/api/getCommentsByPostId/${postId}`).then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          this.comments = res.data.data;
          this.total = res.data.total;
        } else {
          this.$message.error('获取评论出错');
        }
      }, () => {
        this.$message.error('获取评论出错');
      });
    },
  },
};
</script>
<style scoped>
    .content{
        max-width:1200px;
        margin:0 auto;
    }
    .text-center{
        text-align: center;
    }
    .text-right{
      text-align: right;
    }
    .post-detail {
      min-height:500px
    }
</style>
