<template>
  <div id="popup">
    <chrome-ex-img class="chrome-ex-img" :imagePath="'128.png'" />
    <p>Ver 1.1.0</p>
    <div class="input-form">
      <div class="title">
        <p>🔗 購入履歴ダウンロードURL</p>
        <button @click="showDiscription(0)">？</button>
      </div>
      <input v-model="purchaseOrderDownloadLink" />
    </div>
    <div v-if="visibleFlags[0]" class="box17">
      <p>
        💀
        <a
          href="https://pay.google.com/gp/w/u/0/home/customerorders"
          target="_blank"
        >https://pay.google.com/gp/w/u/0/home/customerorders</a>を開きます
        <br />💀「エクスポート」ボタンをクリックすると自動で設定されます
      </p>
    </div>
    <div class="input-form">
      <div class="title">
        <p>🔗 Discord Webhook URL</p>
        <button @click="showDiscription(1)">？</button>
      </div>
      <input v-model="discordWebhookLink" />
    </div>
    <div v-if="visibleFlags[1]" class="box17">
      <p>
        💀
        <a
          href="https://support.discord.com/hc/ja/articles/228383668-%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB-Webhooks%E3%81%B8%E3%81%AE%E5%BA%8F%E7%AB%A0"
          target="_blank"
        >Webhooksへの序章</a>を参考にしてください
      </p>
    </div>
    <button class="apply" @click="apply">設定反映</button>
    <button class="apply" @click="debug">テスト</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChromeExImg from "@/components/ChromeExImg.vue";
import {
  sleep,
  getChromeStorage,
  setChromeStorage,
  addChromeStorangeChangeEvent,
} from "../utils";

@Component({
  components: {
    ChromeExImg,
  },
})
export default class App extends Vue {
  public async mounted() {
    this.purchaseOrderDownloadLink = (await getChromeStorage(
      "purchaseOrderDownloadLink"
    )) as string;
    this.discordWebhookLink = (await getChromeStorage(
      "discordWebhookLink"
    )) as string;
    addChromeStorangeChangeEvent(
      "purchaseOrderDownloadLink",
      (oldValue: any, newValue: any) => {
        console.log("value change detected");
        if (newValue) this.purchaseOrderDownloadLink = newValue;
      }
    );
  }

  public purchaseOrderDownloadLink: string = "";
  public discordWebhookLink: string = "";
  public visibleFlags = [false, false];

  public showDiscription(index: number) {
    console.log(index);
    Vue.set(this.visibleFlags, index, !this.visibleFlags[index]);
  }

  public async apply() {
    if (
      this.validateUrl(this.purchaseOrderDownloadLink) &&
      this.validateUrl(this.discordWebhookLink)
    ) {
      await setChromeStorage({
        purchaseOrderDownloadLink: this.purchaseOrderDownloadLink,
      });
      await setChromeStorage({ discordWebhookLink: this.discordWebhookLink });
      this.sendNotificationToBroweser("👍 設定完了");
    } else {
      this.sendNotificationToBroweser("👎 設定失敗 URLが不正です");
    }
  }

  public async debug() {
    chrome.runtime.sendMessage({ type: "DEBUG_TEST" });
  }

  // 通知をchromeに送信する
  public sendNotificationToBroweser(message: string) {
    chrome.notifications.clear("id1");
    var notification = chrome.notifications.create(
      "id1",
      {
        type: "basic",
        iconUrl: chrome.runtime.getURL("128.png"),
        title: "SalesGang",
        message: message,
        priority: 100,
        isClickable: true,
      },
      function () {
        console.log(chrome.runtime.lastError);
      }
    );
  }

  public validateUrl(url: string) {
    const urlRe = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (!urlRe.test(url)) {
      return false;
    }
    return true;
  }
}
</script>

<style lang="scss" scoped>
#popup {
  width: 600px;
  height: auto;
  margin: 5px;
  display: block;
  text-align: center;
  background-color: black;
  color: white;
  .chrome-ex-img {
    margin: 20px auto;
    width: 200px;
    height: 200px;
  }
  .box17 {
    margin-top: 10px;
    margin-left: 5%;
    width: 90%;
    user-select: none;
    //padding: 0.5em 1em;
    //margin: 2em 0;
    border: double 4px violet;
    a {
      color: #ccc;
    }
  }
  .input-form {
    margin-left: 5%;
    margin-top: 10px;
    width: 90%;
    height: 50px;
    //text-align: center;
    .title {
      height: 20px;
      margin: 5px;
      display: inline-flex;
      //float: left;

      p {
        height: 20px;
        font-size: 12px;
        margin: 0px;
      }
      button {
        height: 20px;
        margin: 0px 0px 0px 5px;
        padding: 0px 3px;
        font-size: 12px;
        background-color: violet;
        border: none;
        border-radius: 10px;
      }
    }
    input {
      height: 15px;
      margin: 2.5px;
      width: 100%;
    }
  }
  .apply {
    margin: 20px auto;
    width: 100px;
    color: white;
    background-color: black;
    border: 1px solid white;
    &:hover {
      background-color: #ccc;
    }
  }
}
</style>
