import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;



// window.onload = async () => {
//   chrome.runtime.onMessage.addListener(
//     async function (message, sender, callback) {
//       console.log(message);
//       if (message == "hashchange") {
//         await new Promise(r => setTimeout(() => r(), 4000));
//         appendApp();
//         //const app = document.querySelector("#app");
//         //if (!app) {
//         //  appendApp();
//         //}
//       }
//     }
//   );
//   appendApp();
// };
// 
// function appendApp() {
//   const el = document.querySelector("header")
//   if (el) {
//     el.insertAdjacentHTML(
//       'afterend',
//       '<div id="app"></div>',
//     );
//     new Vue({
//       render: (h) => h(App),
//     }).$mount('#app');
//   }
// }