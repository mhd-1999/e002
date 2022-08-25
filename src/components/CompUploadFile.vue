<template>
  <div class="upload">
    <div
      id="drop-zone"
      @dragenter="isActive = true"
      @mouseleave="isActive = false"
      @drop.prevent="handleDragFiles"
      @dragover.prevent
      :class="{ 'active-dropzone': isActive, 'active-err': isOver }"
    >
      <div class="upload-logo" @click="handleUpload">
        <img src="../assets/img/upload.png" alt="" />
      </div>
      <div class="upload-content">
        <h3>Drag and drop files</h3>
        <form>
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
    <p class="err-mess" v-show="isOver">The maximum file size is 10 MB</p>
    <div class="file-list">
      <file-item
        v-for="(file, index) in data"
        :key="index"
        :fileName="file.name"
        :fileSize="parseInt(file.size / 1024)"
        :fileType="file.type"
        ref="fileItem"
      >
        <img
          class="close-icon"
          :src="closeIcon"
          alt=""
          @click="handleDelete(index)"
        />
      </file-item>
    </div>
  </div>
</template>

<script>
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.config";
import FileItem from "./CompFileItem.vue";
import excelIcon from "../assets/img/excel.png";
import closeIcon from "../assets/img/close-circle.png";
export default {
  name: "DropZone",
  components: {
    FileItem: FileItem,
  },
  data() {
    return {
      data: [],
      isNull: false,
      isOver: false,
      isActive: false,
      excelIcon: excelIcon,
      closeIcon: closeIcon,
      currentIdx: 0,
      left: 0,
    };
  },
  computed: {},
  methods: {
    //check theChange
    handleChangeFiles(e) {
      let files = e.target.files[0];
      if (files.size > 10000000) {
        this.isOver = true;
      } else {
        this.data.push(files);
        this.isOver = false;
        console.log(files.type);
      }
      //
      // console.log(this.data);
    },

    handleDragFiles(e) {
      let files = e.dataTransfer.files[0];
      if (files.size > 1000000) {
        this.isOver = true;
      } else {
        this.data.push(files);
        this.isOver = false;
      }
    },

    handleUpload() {
      this.data.forEach((file) => {
        const fileRef = ref(storage, `${file.name}`);
        uploadBytes(fileRef, file).then(() => {
          this.data.forEach((file, index) => {
            //Remove item in data array when upload to firebase
            if (file.name == file.name) {
              this.data.splice(index, 1);
            }
          });
        });
      });
    },

    handleDelete(index) {
      this.data.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.upload {
  margin: 100px auto;
  width: 842px;
}
#drop-zone {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  padding-bottom: 60px;
}
h3 {
  margin-bottom: 0;
  margin-top: 25px;
}
.active-dropzone {
  opacity: 0.5;
  border: 1px dashed #000000 !important;
}
.active-err {
  border: 1px solid red !important;
}
.err-mess {
  width: 100%;
  padding-top: 7px;
  margin: 0;
  text-align: start;
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
.file-list {
  display: flex;
  width: 842px;
  margin: 33px auto;
  padding-bottom: 33px;
  overflow-x: scroll;
}
</style>
