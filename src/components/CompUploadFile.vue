<template>
<div class="upload">
<div
    id="drop-zone"
    @dragenter="isActive=true"
    @mouseleave="isActive=false"
    @drop.prevent="handleDragFiles"
    @dragover.prevent
    :class="{'active-dropzone' : isActive ,'active-err': isOver}"
  >
    <div class="upload-logo" @click="handleUpload" v-show="!isOver">
      <img src="../assets/img/upload.png" alt="" />
    </div>
    <p class="err-mess" v-show="isOver">Choose file no more than 10mb</p>
    <div class="upload-content">
      <h3>Drag and drop files</h3>
      <form >
        <input
          type="file"
          name="uploadFileName"
          id="uploadFile"
          class="uploadFile"
          @change="handleChangeFiles"
        />
        <label for="uploadFile">Browse files</label>
      </form>
    </div>
</div>
<p v-for="(file, index) in data" :key="index">{{ file.name }}||{{file.type}}||{{file.size}}</p>
  </div>
</template>

<script>
import {ref,uploadBytes } from 'firebase/storage';
import {storage} from '../firebase.config';
export default {
  name: "DropZone",
  data() {
    return {
      data: [],
      isNull:false,
      isOver:false,
      isActive: false,
    };
  },
  methods: {
    //check theChange 
    handleChangeFiles(e) {
      let files=e.target.files[0];
      if(files.size>1000000){
        this.isOver=true;
      }else{
        this.data.push(files);
        this.isOver=false;
        console.log('done');
      }
      // 
      // console.log(this.data);
    },

    handleDragFiles(e) {
      let files=e.dataTransfer.files[0];
      if(files.size>1000000){
        this.isOver=true;
      }else{
        this.data.push(files);
        this.isOver=false;
      }
     
      
    },

    handleUpload(){
      this.data.forEach((file)=>{
       const fileRef=ref(storage,`${file.name}`);
       uploadBytes(fileRef,file).then(()=>{
        this.data.forEach((file,index)=>{
          //Remove item in data array when upload to firebase
          if(file.name==file.name){
            this.data.splice(index,1);
          }
        })
       })
      })
    },


  },

};
</script>

<style scoped>
#drop-zone {
  display: flex;
  flex-wrap: wrap;
  width: 842px;
  margin:100px auto;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  padding-bottom: 60px;
}
.active-dropzone {
  opacity: 0.5;
  border: 1px dashed #000000 !important;
  background: chocolate !important;
}
.active-err{
  border:1px solid red !important;
}
.err-mess{
  width: 100%;
  padding-top:65px;
  margin:0;
  text-align: center;
  color: red;
}
.upload-logo {
  width: 100%;
  padding-top: 60px;
  text-align: center;

}
.upload-logo img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.upload-content {
  text-align: center;
  line-height: 22px;
}
.upload-content input {
  display: none;
}
.upload-content label {
  text-decoration: underline;
}
</style>
