<template>
  <div class="upload_img">
      <!-- 删除图片 -->
      <div class="upload_delImg_wrapper" v-if="data.chooseImg" @click="fileDel($event)">
        <img  class="upload_delImg" src="../../../../static/image/goodsFiles/del.png">
      </div>
      
      <div class="upload_body">
          <!-- 左上角三角形 -->
          <img  class="upload_triangle" v-show="data.isMain" src="../../../../static/image/goodsFiles/triangle.png">
          <!-- 主图文字 -->
          <span class="upload_tittle" v-show="data.isMain">主图</span>
      <!-- 上传区域 -->
          <div class="upload_body_center">
            <div class="upload_addZoo" v-if="!data.chooseImg" @click="fileClick">+</div>
            <img class="upload_showImg" v-if="data.chooseImg" :src="data.pictureUrl">
            <!-- <el-progress class="img_progress" :show-text="false" :stroke-width="5" :percentage="precent"></el-progress> -->
          </div>
      </div>
      <el-progress class="img_progress" :show-text="false" :stroke-width="5" :percentage="precent" v-show="progressShow"></el-progress>
        <input 
        name="file"
        accept="image/png, image/jpeg, image/jpg" 
        @change="uploadpic($event)" 
        type="file" 
        class="upload_file" 
        style="display: none"/>
  </div>
</template>

<script>
  export default {
    name: 'upload_img',
    props:['data'],
    data() {
      return {
        precent:0,
        progressShow:false,
      }
    },
    watch: {
      'data.pictureUrl'(value){
        if(value == ""){
          this.data.chooseImg=false;
        }else{
          this.data.chooseImg=true;
        }
      }
    },
    methods: {
      uploadpic(e){
            var _this = this
            _this.progressShow=true;
        if($(e.target).val()!=''){
            let file = e.target.files[0]
            /* eslint-disable no-undef */
            let param = new FormData()  // 创建form对象
            param.append('files', file)  // 通过append向form对象添加数据
            param.append('chunk', '0') // 添加form表单中其他数据
            // console.log(1)
          this.$axios.uploadPhoto('/Home/UploadImage', param ,function(res){
            let loaded = res.loaded,
            total = res.total;
            console.log(res)
            _this.$nextTick(() =>{
              _this.precent = Math.ceil(loaded/total) * 100;//进度条
             })
            }).then(response => {
                if(response.result.length==1){
                    let isSuccess=response.result[0]['isSuccess'];
                    if(isSuccess){
                      let imagePath=response.result[0]['imagePath'];
                      let getBaseURL=_this.$axios.getBaseURL();
                      _this.data.pictureUrl=getBaseURL+imagePath
                      // console.log(_this.data.pictureUrl)
                    }else{
                      alert('上传失败')
                    }
                }else{
                  alert('上传失败')
                }
                $(e.target).val('')
                _this.progressShow=false;
                _this.precent=0
              },response => {
                console.log(response)
                alert('上传失败')
                $(e.target).val('')
                _this.progressShow=false;
                _this.precent=0
              })
          }
      },
      fileClick(e) {
          $(e.target).parents('.upload_img').find('.upload_file').click()
      },
      fileDel(e) {
          // $(e.target).parents('.upload_img').find('input').val('')
          this.data.pictureUrl="";

      },
    }
  }
</script>
<style scoped>

.upload_body{
  position: absolute;
  width: 141px;
  height: 141px;
  background-color: #fff;
}
.upload_tittle{
  position: absolute;
  top: 5px;
  left: 3px;
  color: #fff;
  font-size: 12px;
  z-index: 6;
}
  

  .upload_img {
    position: relative;
    border: 1px solid #f1f4f7;
    float: left;
    width: 141px;
    height: 141px;
    border-left: none;
    margin-bottom: 3px;
  }
 .upload_img:hover .upload_delImg{
    display: block;
 }
  .upload_triangle{
    width: 50px;
    height: 50px;
    position: absolute;
    top:0;
    left: 0;
    z-index: 5;
  }
  .upload_delImg_wrapper{
    width: 18px;
    height: 18px;
    position: absolute;
    top:0;
    right: 0;
    z-index: 5;
    cursor: pointer;
    background-color: #fff;
  }
  .upload_delImg{
    width: 18px;
    height: 18px;
    position: relative;
    display: none;
  }
  .upload_addZoo{
    position: relative;
    cursor: pointer;
    width: 80px;
    height: 80px;
    background-color: #f2f2f2;
    color: #c2cad8;
    border-radius: 5px;
    margin: auto;
    top:9px;
    text-align: center;
    font-size: 32px;
    line-height: 80px;
  }
  
   .upload_showImg{
    cursor: pointer;
    margin: auto;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .upload_img_warpper{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .upload_body_center{
    position: absolute;
    width: 95px;
    height: 95px;
    left:calc(50% - 47.5px);
    top:calc(50% - 47.5px);
  }
  .img_progress{
    position: absolute;
    bottom: 0;
    width: 100%
  }
</style>
