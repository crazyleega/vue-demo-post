<template>
    <div class="content">
        <!-- <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu> -->
        <el-row :gutter="20">
          <el-col :span="18">
            <el-tabs v-model="activeKey" type="card" @tab-click="handleClick">
              <el-tab-pane :label="item.name" :name="item.key" v-for="item in tags" :key="item._id">
                <el-table :data="posts" stripe :show-header="false" style="width: 100%">
                    <el-table-column>
                        <template scope="scope">
                            <span>{{scope.row.comments}}/{{scope.row.views}}</span>
                            <el-tag type="success">{{scope.row.tagName}}</el-tag>
                            <a v-bind:href="'/postDetail/'+scope.row._id">{{scope.row.title}}</a>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="content" width="180">
                    </el-table-column> -->
                    <el-table-column>
                        <template scope="scope">
                            {{scope.row.createdAt | date}} 
                        </template>   
                    </el-table-column>
                    <el-table-column fixed="right">
                        <template scope="scope">
                            <el-button type="danger" @click="remove(scope.row._id,scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="text-center">
                  <el-pagination
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    @current-change="handleCurrentChange"
                    :total="total">
                  </el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="4">
            <div><el-button type='primary'  @click="goAdd()">发布文章</el-button> </div>
            </br>
            <div><el-button type='default'  @click="addTag()">添加标签</el-button> </div>
          </el-col>
        </el-row>

        <el-dialog title="添加标签" :visible.sync="dialogVisible" size="tiny">
          <el-input v-model="tag.name" placeholder="请输入标签名称"></el-input>
          <br>
          <el-input v-model="tag.key" placeholder="请输入标签key"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="resetTag()">取 消</el-button>
            <el-button type="primary" @click="submitTag()">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      posts: [],
      tags: [],
      activeKey: 'all',
      total: 10,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      tag: {
        name: '',
        key: '',
      },
    };
  },
  async mounted() {
    await this.getAllTags();
    this.getPosts(this.activeKey);
  },
  methods: {
    handleClick() {
      this.currentPage = 1;
      this.getPosts(this.activeKey);
    },
    getAllTags() {
      this.$http.get('/api/getAllTags').then((res) => {
        if (res.data.success) {
          this.tags = res.data.data;
        }
      });
    },
    goAdd() {
      this.$router.push('addPost');
    },
    getPosts(activeKey) {
      this.$http.get(`/api/getAllPosts/${activeKey}/${this.currentPage}/${this.pageSize}`).then((res) => {
        if (res.data.success) {
          this.posts = res.data.data.data;
          this.total = res.data.data.total;
          this.tags.map((tag) => {
            this.posts.map((post) => {
              const temp = post;
              if (temp.tags.indexOf(tag._id) !== -1) {
                temp.tagName = tag.name;
              }
              return temp;
            });
            return tag;
          });
        } else {
          this.$message.error(res.data.info);
        }
      }, () => {
      });
    },
    remove(postId, index) {
      console.log(index);
      this.$http.delete(`/api/removePost/${postId}`).then((res) => {
        if (res.data.success) {
          this.$message('删除成功');
          this.posts.splice(index, 1);
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getPosts(this.activeKey);
    },
    addTag() {
      this.dialogVisible = true;
    },
    submitTag() {
      this.$http.post('/api/addTag', this.tag).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '添加成功',
          });
          this.dialogVisible = false;
        }
      });
    },
    resetTag() {
      this.tag = {
        name: '',
        key: '',
      };
      this.dialogVisible = false;
    },
  },
};
</script>

<<style scoped>
 .content{
    max-width:1200px;
    margin:0 auto;
}
.text-center{
  text-align:center;
}
</style>


