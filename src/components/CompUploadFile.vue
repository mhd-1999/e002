<template>
  <div
    id="drop-zone"
    @dragenter="OnDragEnter"
    @dragleave="OnDragLeave"
    @dragover.prevent
    :class="{ dragging: isDragging }"
  >
    <div class="upload-logo">
      <img src="../assets/img/upload.png" alt="" />
    </div>
    <div class="upload-content">
      <h3>Drag and drop files</h3>
      <form @submit.prevent="handleSubmit">
        <input
          type="file"
          @change="handleChangeFiles"
          name="uploadFileName"
          id="uploadFile"
          class="uploadFile"
        />
        <label for="uploadFile">Browse files</label>
      </form>
    </div>
    <li v-for="(file, index) in files" :key="index">{{ file.name }}</li>
  </div>
</template>

<script>
export default {
  name: "DropZone",
  data() {
    return {
      isDragging: false,
      files: [],
    };
  },
  methods: {
    OnDragEnter(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    OnDragLeave(e) {
      e.preventDefault();
      this.isDragging = false;
    },
    handleSubmit() {
      let data = new FormData();
      data.append("files[]", this.files);
    },
    handleChangeFiles(e) {
      let file = e.target.files[0];
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
.dragging {
  opacity: 0.5;
  border: 1px dashed #000000 !important;
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
