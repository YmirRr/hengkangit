<template>
    <div class="commodityRecordDetails commodity">
            <el-col :span='24' class="border-left">
                <btm :date="bottonbox" style="background-color:#fff"> </btm>
                <el-row style="background:#fff;margin-top:20px; ">
                  <el-col :span="6">
                    <el-col :span="7">
                        <div class="bgcolor smallBgcolor" >
                                <label><small>*</small>类目</label>
                       </div>
                    </el-col>
                    <el-col :span="15" >
                        <div class="smallBgcolor" >
                        <el-input placeholder="" v-model="value" id="coding" ></el-input>
                        </div>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row style=" background: rgb(249,249,249);padding-top:20px;">
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>商品编码</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>商品名称</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>品牌</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>单位</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>商品条码</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>助记码</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>上市时间</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>单位</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>体质期</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>备注</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                </el-row>
                <el-row style="    background: rgb(249,249,249); padding-bottom:20px">
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :xl="2" :lg="2" :md="4" :sm="5" :xs="6">
                        <template>
                            <el-checkbox v-model="checked">启用多单位</el-checkbox>
                        </template>                       
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="4" :sm="5" :xs="6">
                        <template>
                            <el-checkbox v-model="checked">唯一代码管理</el-checkbox>
                        </template>   
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="4" :sm="5" :xs="6">
                        <template>
                            <el-checkbox v-model="checked">批次管理</el-checkbox>
                        </template>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="4" :sm="5" :xs="6">
                        <template>
                            <el-checkbox v-model="checked">保质期管理</el-checkbox>
                        </template>   
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="4" :sm="5" :xs="6">
                        <template>
                            <el-checkbox v-model="checked">是否套件</el-checkbox>
                        </template>   
                    </el-col>
                </el-row>
                <el-row class="bm-pd10 mt10" style=" background: rgb(249,249,249);">
                    <el-col :span="12">
                        <span class="shop-title">
                            商品价格
                        </span>
                    </el-col>
                    <el-col :span="12" >
                        <span class="shop-sq" @click="ifShow = !ifShow">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}" style="width:15px;height:15px;margin-left:10px;color:#888;"></i></span>
                    </el-col>
                </el-row>
                <el-collapse-transition>
                        <div v-show="ifShow">
                <el-row style=" background: rgb(249,249,249); padding-top:20px;">
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>进货价</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>批发价</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>会员价</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>零售价</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="7">
                          <div class="bgcolor smallBgcolor" >
                                  <label><small>*</small>折扣率</label>
                         </div>
                      </el-col>
                      <el-col :span="15" >
                          <div class="smallBgcolor" >
                          <el-input placeholder="" v-model="value" id="coding" ></el-input>
                          </div>
                      </el-col>
                    </el-col>
                </el-row>
            </div>
        </el-collapse-transition>
                <el-row class="bm-pd10 mt10" style=" background: rgb(249,249,249);">
                    <el-col :span="12">
                        <span class="shop-title">
                            商品规格
                        </span>
                    </el-col>
                    <el-col :span="12" >
                        <span class="shop-sq" @click="ifShow1 = !ifShow1">收起<i @click="ifShow1 = !ifShow1" :class="{rotate : !ifShow1}"  class="el-icon-arrow-down" style="width:15px;height:15px;margin-left:10px;color:#888;"></i></span>
                    </el-col>
                </el-row>
                <el-collapse-transition> 
                    <div v-show="ifShow1"> 
                        <el-row class="pl10 pt10 pr10 pb10" style=" background: rgb(249,249,249);">
                            <el-col :span="24">
                                <el-table :data="tableData" border style="width: 100%">
                                    <el-table-column prop="sequenceNumber" label="序号" width="60">
                                    </el-table-column>
                                    <el-table-column prop="AttributeEncoding" label="规格编码" width="120">
                                    </el-table-column>
                                    <el-table-column prop="AttributeEncoding" label="规格" width="120">
                                    </el-table-column>
                                    <el-table-column prop="startUsing" label="规格组" width="120">
                                    </el-table-column>
                                    <el-table-column prop="startUsing1" label="规格名称">
                                    </el-table-column>
                                  </el-table>
                            </el-col>
                        </el-row>
                    </div>
                </el-collapse-transition>
                <el-row class="bm-pd10 mt10" style=" background: rgb(249,249,249);">
                    <span class="shop-sq" style="position:absolute;
                    right:0;top:0;z-index:999" @click="ifShow2 = !ifShow2">收起<i @click="ifShow2 = !ifShow2" :class="{rotate : !ifShow2}" class="el-icon-arrow-down" style="width:15px;height:15px;margin-left:10px;color:#888;"></i></span>
                    <template>
                      <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="SKU" name="first">
                            <el-collapse-transition> 
                                <div v-show="ifShow2"> 
                                    <el-row class="pl10 pt10 pr10 pb10" style=" background: rgb(249,249,249);">
                                        <el-col :span="24">
                                            <el-table :data="tableData1" border style="width: 100%">
                                            <el-table-column prop="sequenceNumber" label="序号" width="60">
                                            </el-table-column>
                                            <el-table-column prop="AttributeEncoding" label="SKU" width="100">
                                            </el-table-column>
                                            <el-table-column prop="AttributeEncoding" label="SKU名称" width="100">
                                            </el-table-column>
                                            </el-table-column>
                                            <el-table-column prop="startUsing" label="条码">
                                            </el-table-column>
                                            <el-table-column prop="startUsing1" label="颜色">
                                            </el-table-column>
                                            <el-table-column prop="startUsing2" label="尺码">
                                            </el-table-column>
                                            <el-table-column prop="startUsing3" label="单位">
                                            </el-table-column>
                                            <el-table-column prop="startUsing4" label="进货价">
                                            </el-table-column>
                                            <el-table-column prop="startUsing5" label="零售价">
                                            </el-table-column>
                                            <el-table-column prop="startUsing6" label="批发价">
                                            </el-table-column>
                                            <el-table-column prop="startUsing7" label="会员价">
                                            </el-table-column>
                                            <el-table-column prop="startUsing8" label="折扣率">
                                            </el-table-column>
                                            <el-table-column prop="startUsing9" label="允许使用">
                                            </el-table-column>
                                            <el-table-column prop="startUsing10" label="备注">
                                            </el-table-column>
                                          </el-table>    
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-collapse-transition>
                        </el-tab-pane>
                        <el-tab-pane label="商品属性" name="second">
                            <el-collapse-transition> 
                                <div v-show="ifShow2"> 
                                    <el-row style=" background: rgb(249,249,249);">
                                      <el-col :span="6">
                                        <el-col :span="7">
                                            <div class="bgcolor smallBgcolor" >
                                                    <label><small>*</small>品类</label>
                                           </div>
                                        </el-col>
                                        <el-col :span="15" >
                                            <div class="smallBgcolor" >
                                            <el-input placeholder="" v-model="value" id="coding" ></el-input>
                                            </div>
                                        </el-col>
                                      </el-col>
                                      <el-col :span="6">
                                        <el-col :span="7">
                                            <div class="bgcolor smallBgcolor" >
                                                    <label><small>*</small>系列</label>
                                           </div>
                                        </el-col>
                                        <el-col :span="15" >
                                            <div class="smallBgcolor" >
                                            <el-input placeholder="" v-model="value" id="coding" ></el-input>
                                            </div>
                                        </el-col>
                                      </el-col>
                                      <el-col :span="6">
                                        <el-col :span="7">
                                            <div class="bgcolor smallBgcolor" >
                                                    <label><small>*</small>性别</label>
                                           </div>
                                        </el-col>
                                        <el-col :span="15" >
                                            <div class="smallBgcolor" >
                                            <el-input placeholder="" v-model="value" id="coding" ></el-input>
                                            </div>
                                        </el-col>
                                      </el-col>
                                      <el-col :span="6">
                                        <el-col :span="7">
                                            <div class="bgcolor smallBgcolor" >
                                                    <label><small>*</small>季节</label>
                                           </div>
                                        </el-col>
                                        <el-col :span="15" >
                                            <div class="smallBgcolor" >
                                            <el-input placeholder="" v-model="value" id="coding" ></el-input>
                                            </div>
                                        </el-col>
                                      </el-col>
                                      <el-col :span="6">
                                        <el-col :span="7">
                                            <div class="bgcolor smallBgcolor" >
                                                    <label><small>*</small>年份</label>
                                           </div>
                                        </el-col>
                                        <el-col :span="15" >
                                            <div class="smallBgcolor" >
                                            <el-input placeholder="" v-model="value" id="coding" ></el-input>
                                            </div>
                                        </el-col>
                                      </el-col>
                                      <el-col :span="6">
                                        <el-col :span="7">
                                            <div class="bgcolor smallBgcolor" >
                                                    <label><small>*</small>其他属性</label>
                                           </div>
                                        </el-col>
                                        <el-col :span="15" >
                                            <div class="smallBgcolor" >
                                            <el-input placeholder="" v-model="value" id="coding" ></el-input>
                                            </div>
                                        </el-col>
                                      </el-col>
                                    </el-row>
                                </div>
                            </el-collapse-transition>
                        </el-tab-pane>
                        <el-tab-pane label="图片" name="third">
                            <el-collapse-transition> 
                                <div v-show="ifShow2">  
                                    <!-- <span>图片一</span> -->
                                    <el-row style="text-align:center">
                                        <el-col :span="3">
                                            <el-upload
                                              class="upload-demo"
                                              action="https://jsonplaceholder.typicode.com/posts/"
                                              :on-preview="handlePreview"
                                              :on-remove="handleRemove"
                                              :file-list="fileList2"
                                              list-type="picture">
                                              <el-button size="small" type="primary">点击上传</el-button>
                                              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-upload
                                              class="upload-demo"
                                              action="https://jsonplaceholder.typicode.com/posts/"
                                              :on-preview="handlePreview"
                                              :on-remove="handleRemove"
                                              :file-list="fileList2"
                                              list-type="picture">
                                              <el-button size="small" type="primary">点击上传</el-button>
                                              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-upload
                                              class="upload-demo"
                                              action="https://jsonplaceholder.typicode.com/posts/"
                                              :on-preview="handlePreview"
                                              :on-remove="handleRemove"
                                              :file-list="fileList2"
                                              list-type="picture">
                                              <el-button size="small" type="primary">点击上传</el-button>
                                              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-upload
                                              class="upload-demo"
                                              action="https://jsonplaceholder.typicode.com/posts/"
                                              :on-preview="handlePreview"
                                              :on-remove="handleRemove"
                                              :file-list="fileList2"
                                              list-type="picture">
                                              <el-button size="small" type="primary">点击上传</el-button>
                                              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-upload
                                              class="upload-demo"
                                              action="https://jsonplaceholder.typicode.com/posts/"
                                              :on-preview="handlePreview"
                                              :on-remove="handleRemove"
                                              :file-list="fileList2"
                                              list-type="picture">
                                              <el-button size="small" type="primary">点击上传</el-button>
                                              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-upload
                                              class="upload-demo"
                                              action="https://jsonplaceholder.typicode.com/posts/"
                                              :on-preview="handlePreview"
                                              :on-remove="handleRemove"
                                              :file-list="fileList2"
                                              list-type="picture">
                                              <el-button size="small" type="primary">点击上传</el-button>
                                              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-upload
                                              class="upload-demo"
                                              action="https://jsonplaceholder.typicode.com/posts/"
                                              :on-preview="handlePreview"
                                              :on-remove="handleRemove"
                                              :file-list="fileList2"
                                              list-type="picture">
                                              <el-button size="small" type="primary">点击上传</el-button>
                                              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-upload
                                              class="upload-demo"
                                              action="https://jsonplaceholder.typicode.com/posts/"
                                              :on-preview="handlePreview"
                                              :on-remove="handleRemove"
                                              :file-list="fileList2"
                                              list-type="picture">
                                              <el-button size="small" type="primary">点击上传</el-button>
                                              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-col>
                                    </el-row>
                                    
                                </div>
                            </el-collapse-transition>
                        </el-tab-pane>
                        <el-tab-pane label="使用组织" name="fourth">
                            <el-collapse-transition> 
                                <div v-show="ifShow2"> 
                                    <el-row class="pl10 pt10 pr10 pb10" style=" background: rgb(249,249,249);">
                                        <el-col :span="24">
                                            <el-table :data="tableData4" border style="width: 100%">
                                            <el-table-column prop="sequenceNumber" label="序号" width="60">
                                            </el-table-column>
                                            <el-table-column prop="AttributeEncoding" label="业务组织">
                                            </el-table-column>
                                            <el-table-column prop="startUsing" label="上市日期">
                                            </el-table-column>
                                            <el-table-column prop="startUsing1" label="备注">
                                            </el-table-column>
                                            <el-table-column prop="startUsing2" label="允许使用">
                                            </el-table-column>
                                          </el-table>    
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-collapse-transition>
                        </el-tab-pane>

                      </el-tabs>
                    </template>
                </el-row>
                <el-row class="bm-pd10 mt10" style=" background: rgb(249,249,249);">
                    <el-col :span="24" class="pb10">
                        <span class="shop-title" style="border:none">
                            审计信息
                        </span>
                    </el-col>
                </el-row>
                <el-row style=" background: rgb(249,249,249); padding-top:20px;" class="pt20">
                  <el-col :span="6">
                    <el-col :span="7">
                        <div class="bgcolor smallBgcolor" >
                                <label><small>*</small>创建人</label>
                       </div>
                    </el-col>
                    <el-col :span="15" >
                        <div class="smallBgcolor" >
                        <el-input placeholder="" v-model="value" id="coding" ></el-input>
                        </div>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col :span="7">
                        <div class="bgcolor smallBgcolor" >
                                <label><small>*</small>创建时间</label>
                       </div>
                    </el-col>
                    <el-col :span="15" >
                        <div class="smallBgcolor" >
                        <el-input placeholder="" v-model="value" id="coding" ></el-input>
                        </div>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col :span="7">
                        <div class="bgcolor smallBgcolor" >
                                <label><small>*</small>修改人</label>
                       </div>
                    </el-col>
                    <el-col :span="15" >
                        <div class="smallBgcolor" >
                        <el-input placeholder="" v-model="value" id="coding" ></el-input>
                        </div>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col :span="7">
                        <div class="bgcolor smallBgcolor" >
                                <label><small>*</small>修改时间</label>
                       </div>
                    </el-col>
                    <el-col :span="15" >
                        <div class="smallBgcolor" >
                        <el-input placeholder="" v-model="value" id="coding" ></el-input>
                        </div>
                    </el-col>
                  </el-col>
                </el-row>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import Btm from '../../base/btm/btm'
import Textbox from '../../base/textbox/textbox'
    export default{
        name:'customerInfor',
        data(){
            return {
                fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
                ,
                activeName: 'second',
                ifShow:true,
                ifShow1:true,
                ifShow2:true,
                checked:true,
                try:{
                "groupId": 2,
                "stockId": 1,
                "addressId": 8,
                "completeAddress": "str33ing",
                "transportMethodId": 1,
                "contactPerson": "stri55ng",
                "phone": "18200326666",
                "logisticsCompany": "str55ing",
                "isDefault": true,
                "remark": "st54ring"
                },
                bottonbox:{
                    url: '/Record/commodityRecord',
                   botton:[{
                    class: 'erp_bt bt_back',
                    imgsrc: '../../../static/image/common/bt_back.png',
                    show:true,
                    text: '返回'
                },{
                    class: 'erp_bt bt_modify',
                    imgsrc: '../../../static/image/common/bt_modify.png',
                    show:true,
                    text: '修改'
                },{
                    class: 'erp_bt bt_save',
                    imgsrc: '../../../static/image/common/bt_save.png',
                    show:true,
                    text: '保存'
                },{
                    class: 'erp_bt bt_save_add',
                    imgsrc: '../../../static/image/common/bt_save_add.png',
                    show:true,
                    text: '保存并新增'
                },{
                    class: 'erp_bt bt_add',
                    imgsrc: '../../../static/image/common/bt_save_add.png',
                    show:true,
                    text: '新增'
                },{
                    class: 'erp_bt bt_del',
                    imgsrc: '../../../static/image/common/bt_del.png',
                    show:true,
                    text: '删除'
                },{
                    class: 'erp_bt bt_auxiliary',
                    imgsrc: '../../../static/image/common/bt_audit.png',
                    show:true,
                    text: '审核'
                }]},
                options: [{
                    value: '选项1',
                    label: '仓库'
                    }, {
                    value: '选项2',
                    label: '地址'
                    }, {
                    value: '选项3',
                    label: '总部'
                    }, {
                    value: '选项4',
                    label: '总部2'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                    }],

                value: '',
                tableData: [{
                      sequenceNumber: '1',
                      AttributeEncoding: '颜色',
                      attributeName: '选择规格',
                      startUsing: '/',
                      startUsing1: '红/白'
                    }, {
                      sequenceNumber: '2',
                      AttributeEncoding: '尺码',
                      attributeName: '选择规格组',
                      startUsing: '同学尺码',
                      startUsing1: '17码/18码',
                    }],
                tableData1: [{
                      sequenceNumber: '1',
                      AttributeEncoding: '20171012',
                      attributeName: '',
                      startUsing: '',
                      startUsing1: '红',
                      startUsing2: 'X',
                      startUsing3: '件',
                      startUsing4: '',
                      startUsing5: '',
                      startUsing6: '',
                      startUsing7: '',
                      startUsing8: '',
                      startUsing9: '',
                      startUsing10: '',
                    }, {
                      sequenceNumber: '2',
                      AttributeEncoding: '20171013',
                      attributeName: '',
                      startUsing: '',
                      startUsing1: '红',
                      startUsing2: 'M',
                      startUsing3: '件',
                      startUsing4: '',
                      startUsing5: '',
                      startUsing6: '',
                      startUsing7: '',
                      startUsing8: '',
                      startUsing9: '',
                      startUsing10: '',
                    }, {
                      sequenceNumber: '3',
                      AttributeEncoding: '20171112',
                      attributeName: '',
                      startUsing: '',
                      startUsing1: '绿',
                      startUsing2: 'X',
                      startUsing3: '箱',
                      startUsing4: '',
                      startUsing5: '',
                      startUsing6: '',
                      startUsing7: '',
                      startUsing8: '',
                      startUsing9: '',
                      startUsing10: '',
                    },{
                      sequenceNumber: '4',
                      AttributeEncoding: '20171113',
                      attributeName: '',
                      startUsing: '',
                      startUsing1: '绿',
                      startUsing2: 'M',
                      startUsing3: '箱',
                      startUsing4: '',
                      startUsing5: '',
                      startUsing6: '',
                      startUsing7: '',
                      startUsing8: '',
                      startUsing9: '',
                      startUsing10: '',
                    },], 
                    tableData4: [{
                      sequenceNumber: '1',
                      AttributeEncoding: '20171012',
                      attributeName: '20171012',
                      startUsing: '20171012',
                      startUsing1: '20171012',
                      startUsing2: '',
                    }, {
                      sequenceNumber: '2',
                      AttributeEncoding: '20171013',
                      attributeName: '20171013',
                      startUsing: '20171013',
                      startUsing1: '20171013',
                      startUsing2: '',
                    }, {
                      sequenceNumber: '3',
                      AttributeEncoding: '20171112',
                      attributeName: '20171112',
                      startUsing: '20171112',
                      startUsing1: '20171112',
                      startUsing2: '',
                    }, {
                      sequenceNumber: '4',
                      AttributeEncoding: '20171113',
                      attributeName: '20171113',
                      startUsing: '20171113',
                      startUsing1: '20171113',
                      startUsing2: '',
                    }],   
                    pageIndex:-1,//分页的当前页码
			        totalPage:20,//当前分页总数
            }
        },
        created:function(){
            
            
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleCurrentChange:function(val){//获取当前页码
                this.pageIndex=val;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            back(e){
                this.$store.state.url='/Record/commodityRecord/default'
               this.$router.push({path:this.$store.state.url})//点击切换路由
            },

            storageData(e){//点击新增跳转
                var flag=false;
                var slidbarData=this.$store.state.slidbarData;//储存页签数组
                let name = '客户资料-基本信息';
                if(slidbarData.length==0){//slidbarData为空
                    flag=true;
                }else{//slidbarData不为空
                    for(var i=0;i<slidbarData.length;i++){
                        if(slidbarData[i].name==name){//相同页签
                            flag=false;
                            break;
                        }else{
                        flag=true;
                        }
                    }
                }
                //var pushItem={'name':name,'url':menuUrl+'/'+idparam};
                var pushItem={'name':'客户资料-基本信息','url':'customerBasicInfor','params':'default'}
                this.$store.state.url='/customerBasicInfor/default';//储存当前url
                if(flag){
                    slidbarData.push(pushItem);
                }
        
                this.switch();
                
            },

        },
        components:{
            Btm,
            Textbox
        }
    }
</script>

<style scoped>
.smallBgcolor .el-select{
    width: 100% !important ;
    margin-left: 10px;
}
.bgcolor label{
    width: 100% !important ;
    margin-right: 0; 
}
.smallBgcolor .el-input--suffix{
    width: 100% !important ;
}
.smallBgcolor .el-input{
    width: 100% !important ;
    margin-left: 10px;
}
.bgcolor{
        overflow:  visible; 
    }
.bg-white{
    background: white;
    border-radius: 3px;
}
.bg-white{
    background: white;
    border-radius: 3px;
}

.mt10{
    margin-top: 10px;
}
.pl10{
    padding-left: 10px;
}
.pt10{
    padding-top: 10px;
}
.pb10{
    padding-bottom: 10px;
}
.pr10{
    padding-right: 10px;
}
.shop-title{
    float: left;
    height: 40px;
    line-height: 40px;
    margin: 0;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 3px solid rgb(51,204,204);
    color: #000;
    padding: 0 20px;
}
.shop-sq{
    float: right;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    color: #000;
    cursor: pointer;
}
</style>

<style>
.commodityRecordDetails .smallBgcolor .el-input input{
    height: 33px !important;
}
.el-tabs__nav{
    margin-left: 20px;
}

.bm-pd10{
    border-bottom: 1px solid #e4e4e4;
}
/* 重写checkbox */
.customer-infor-wrapper .el-checkbox__inner{
    width: 18px;
    height: 18px;
    border-radius:50% !important; 
   background-color:  #f4f4f5;
}
.customer-infor-wrapper .el-checkbox__inner::after{
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 3px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 11px;
    left: 4px !important;
    position: absolute;
    top: -2px !important;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 6px;
    -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    -webkit-transform-origin: center;
    transform-origin: center;
}
</style>