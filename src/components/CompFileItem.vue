<template>
  <div class="file-item">
    <img
      :src="docIcon"
      v-if="
        fileType ==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      "
    />
    <img :src="pdfIcon" v-else-if="fileType == 'application/pdf'" />
    <img
      :src="excelIcon"
      v-else-if="
        fileType ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      "
    />
    <img :src="defaultIcon" v-else />
    <div class="file-text">
      <p>{{ fileName }}</p>
      <span>{{ fileSize }}kB</span>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import docIcon from "../assets/img/word.png";
import excelIcon from "../assets/img/excel.png";
import pdfIcon from "../assets/img/pdf.png";
import defaultIcon from "../assets/img/default.png";
export default {
  name: "FileItem",
  data() {
    return {
      docIcon: docIcon,
      excelIcon: excelIcon,
      pdfIcon: pdfIcon,
      defaultIcon: defaultIcon,
    };
  },
  method: {
    handelDelete() {
      this.$emit("handleDeleteFile");
    },
  },
  props: {
    fileType: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
  },
  // computed:{
  //     typeFile(){
  //         return this.fileType;
  //     }
  // }
};
</script>

<style scoped>
p {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
span {
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #666666;
}
img {
  width: 32px;
  height: 32px;
  padding: 8px 12px;
}
.file-item {
  display: flex;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  width: 244px;
  justify-content: center;
  margin-right: 17px;
}
.file-item .type-icon {
  padding: 8px 12px;
  width: 32px;
  height: 32px;
}
.file-text {
  width: 100%;
  overflow: hidden;
  padding-right: 12px;
  white-space: nowrap;
  padding: 8px;
}
.file-item .close-icon {
  width: 16px;
  height: 16px;
  padding: 16px 8px;
}
</style>
