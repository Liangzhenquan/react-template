/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-29 10:07:21
 * @LastEditors: liang
 * @LastEditTime: 2020-05-29 10:36:48
 */
// 配置项目websocket
// 定义websocket
import { getStorage } from './storage';
import urls from '@/url';
let websocket = null;
let closeType = true;
let heart = null;
let ws = 'ws://url/token=';
// let ws = 'ws://192.168.13.133:8086/webSocket/token=' + socToken
export function AppWebSockt(val) {
  ws = `ws://${urls.socket}/webSocket/token=`;
  // }
  let socToken = localStorage.getItem('websocket_token');
  if (socToken) {
    socToken = socToken.replace(/["]/g, '');
  }
  if (!socToken) {
    return;
  }
  if ('WebSocket' in window) {
    websocket = new WebSocket(ws + socToken);
  } else {
    console.log('浏览器不支持websocket');
    return;
  }

  websocket.onopen = function () {
    // 链接成功
    heartTest();
    if (val) {
      sendWebsocket(val);
    }
  };

  websocket.onerror = function (res) {
    clearInterval(heart);
    // console.log('----------------------------------链接失败---')
    // 链接失败
    // ----------
    if (websocket.readyState === 3) {
      const token = getStorage('websocket_token');
      if (!token) {
        return;
      }
      if (!closeType) {
        return;
      }
      websocket = new WebSocket(ws);
    }
  };

  websocket.onmessage = function (e) {
    // 接受服务端信息
    // --------------
    websocketOnMessage(e);
  };

  websocket.onclose = function () {
    // 关闭链接
    // ----------
  };

  window.onbeforeunload = function () {
    websocket.close();
  };
}

export function sendWebsocket(data) {
  websocket.send(data);
}

export function closeWebsocket() {
  if (websocket) {
    websocket.close();
  }
}

export function websocketOnMessage(e) {
  if (e.data === 'kick_user_offline') {
    closeType = false;
    websocket.close();
  }
}

function heartTest() {
  heart = setInterval(() => {
    if (websocket.readyState === 3 || websocket.readyState === 4) {
      clearInterval(heart);
      return;
    }
    websocket.send('heart');
  }, 18000);
}
