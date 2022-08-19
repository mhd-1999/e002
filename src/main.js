import Vue from "vue";
import App from "./App.vue";
// import firebase from "firebase/app";
Vue.config.productionTip = false;
// var firebaseConfig = {
//   apiKey: "AIzaSyDw3ElXleoRiwp0yvaxQMNus_-JJZheOyM",
//   authDomain: "e002-62098.firebaseapp.com",
//   projectId: "e002-62098",
//   storageBucket: "e002-62098.appspot.com",
//   messagingSenderId: "389438030364",
//   appId: "1:389438030364:web:2034274714a4ee5bd815d9",
//   measurementId: "G-T8BGD1TS23",
// };
// firebase.initializeApp(firebaseConfig);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
