<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <el-carousel>
                  <el-carousel-item v-for="(item,index) in imglist" :key="index">
                    <!-- <h3>{{ item }}</h3> -->
                    <img :src="item.thumb_path" alt>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number
                          v-model="inputnum"
                          @change="handleChange"
                          :min="1"
                          :max="9999"
                          label="描述文字"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" @click="index=1" :class="{selected:index==1}">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="index=2" :class="{selected:index==2}">商品评论</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content entry" v-show="index==1" v-html="goodsinfo.content">内容</div>
              <div class="tab-content" v-show="index==2">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model="comment"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="postComment"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="item in commentlist">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time | formatTime-g}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="pageIndex"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalcount"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="item in hotgoodslist">
                    <div class="img-box">
                      <!-- <a href="#/site/goodsinfo/90" class> -->
                      <router-link :to="'/details/'+item.id">
                        <img :src="item.img_url">
                      </router-link>
                      <!-- </a> -->
                    </div>
                    <div class="txt-box">
                      <router-link :to="'/details/'+item.id">{{item.title}}</router-link>

                      <span>{{item.add_time | formatTime-g }}</span>
                    </div>
                  </li>
                  <!-- <li>
                    <div class="img-box">
                      <a href="#/site/goodsinfo/91" class>
                        <img
                          src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200214471783.jpg"
                        >
                      </a>
                    </div>
                    <div class="txt-box">
                      <a
                        href="#/site/goodsinfo/91"
                        class
                      >尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</a>
                      <span>2015-04-20</span>
                    </div>
                  </li>
                  <li>
                    <div class="img-box">
                      <a href="#/site/goodsinfo/92" class>
                        <img
                          src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200225107390.jpg"
                        >
                      </a>
                    </div>
                    <div class="txt-box">
                      <a href="#/site/goodsinfo/92" class>联想（Lenovo） G510AM 15.6英寸笔记本电脑</a>
                      <span>2015-04-20</span>
                    </div>
                  </li>
                  <li>
                    <div class="img-box">
                      <a href="#/site/goodsinfo/93" class>
                        <img
                          src="http://39.108.135.214:8899/upload/201504/20/201504200341260763.jpg"
                        >
                      </a>
                    </div>
                    <div class="txt-box">
                      <a href="#/site/goodsinfo/93" class>Apple iMac MF883CH/A 21.5英寸一体机电脑</a>
                      <span>2015-04-20</span>
                    </div>
                  </li>
                  <li>
                    <div class="img-box">
                      <a href="#/site/goodsinfo/94" class>
                        <img
                          src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200239192345.jpg"
                        >
                      </a>
                    </div>
                    <div class="txt-box">
                      <a href="#/site/goodsinfo/94" class>金士顿（Kingston） DataTraveler SE9 32GB 金属U盘</a>
                      <span>2015-04-20</span>
                    </div>
                  </li>
                  <li>
                    <div class="img-box">
                      <a href="#/site/goodsinfo/97" class>
                        <img
                          src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200258403759.jpg"
                        >
                      </a>
                    </div>
                    <div class="txt-box">
                      <a href="#/site/goodsinfo/97" class>三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</a>
                      <span>2015-04-20</span>
                    </div>
                  </li>
                  <li>
                    <div class="img-box">
                      <a href="#/site/goodsinfo/102" class>
                        <img src="http://39.108.135.214:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg">
                      </a>
                    </div>
                    <div class="txt-box">
                      <a href="#/site/goodsinfo/102" class>Hazzys哈吉斯2017新款男士长袖衬衫纯棉修身英伦衬衫显瘦商务衬衣</a>
                      <span>2017-09-13</span>
                    </div>
                  </li>
                  <li>
                    <div class="img-box">
                      <a href="#/site/goodsinfo/103" class>
                        <img src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg">
                      </a>
                    </div>
                    <div class="txt-box">
                      <a href="#/site/goodsinfo/103" class>骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫衣</a>
                      <span>2017-09-26</span>
                    </div>
                  </li>-->
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "details",
  data() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      index: 1,
      inputnum: 1,
      comment: "",
      pageIndex: 1,
      pageSize: 10,
      totalcount: "",
      commentlist: []
    };
  },
  //获取数据
  methods: {
    getDetails() {
      //主体商品
      this.$axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(res => {
          // console.log(res);
          this.goodsinfo = res.data.message.goodsinfo;
          this.hotgoodslist = res.data.message.hotgoodslist;
          this.imglist = res.data.message.imglist;
        });
    },
    postComment() {
      if (this.comment === "") {
        this.$message.error("弟弟,写点东西呗");
      } else {
        this.$axios
          .post(`site/validate/comment/post/goods/${this.$route.params.id}`, {
            commenttxt: this.comment
          })
          .then(res => {
            if (res.data.status === 0) {
              this.$message.success(res.data.message);
              // 本地清空
              this.comment = "";
            }
          });
      }
    },
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          // console.log(res);
          this.commentlist = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    },
    handleSizeChange(size){
      this.pageSize=size;
      this.getComments()
    },
    handleCurrentChange(current){
      this.pageIndex=current;
      this.getComments()
    }
  },
  created() {
    this.getDetails();
    this.getComments();
  },
  //使用侦听器重新获取数据  观察数据的改变
  watch: {
    //观察数据的改变
    $route(value, oldValue) {
      //接口的调用
      this.getDetails();
    }
  }
};
</script>

<style>
.pic-box {
  width: 395px;
  height: 320px;
}
/* .pic-box .el-carousel{

 }
 .pic-box .el-carousel__container{

 } */
.pic-box .el-carousel__container img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
