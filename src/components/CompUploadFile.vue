<template>
  <div
    id="drop-zone"
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="drop"
    :class="{'active-dropzone' : active }"
  >
    <div class="upload-logo">
      <img src="../assets/img/upload.png" alt="" />
    </div>
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
    <li v-for="(file, index) in files" :key="index">{{ file.name }}</li>
  </div>
</template>

<script>
import {ref} from "vue"

export default {
  name: "DropZone",
  data() {
    return {
      files: [],
    };
  },
  setup(){
    let active=ref(false);
    //  let dropzoneFile=ref("");
    // let drop=(e)=>{
    //   dropzoneFile.value=e.dataTranfer.files[0];
    //   this.files.push(dropzoneFile.value);
    // }
    let toggleActive=()=>{
      active.value = !active.value;
    };
    return {active,toggleActive};
  },
  methods: {
    // OnDragEnter(e) {
    //   e.preventDefault();
    //   this.isDragging = true;
    // },
    // OnDragLeave(e) {
    //   e.preventDefault();
    //   this.isDragging = false;
    // },
    // handleSubmit() {
    //   let data = new FormData();
    //   data.append("files[]", this.files);
    //   const storageRef=stRef(storage,"files/"+file.name);
    //   uploadBytes(storageRef,data).then((snapshot){
    //     var newFileRef=push()
    //   })
    // },
    handleChangeFiles(e) {
      let file = e.dataTranfer.files[0];
      this.files.push(file);
    },
  },
};
</script>

<style scoped>
#drop-zone {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  border: 1px solid #dcdcdc;
  padding-bottom: 60px;
}
.active-dropzone {
  opacity: 0.5;
  border: 1px dashed #000000 !important;
  background: chocolate !important;
}
.upload-logo {
  width: 100%;
  padding-top: 60px;
  text-align: center;
}
.upload-logo img {
  width: 32px;
  height: 32px;
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
