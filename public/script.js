const convertedVapidKey = urlBase64ToUint8Array(
  'BCPdgS4aIvAZ-jwWPwHovpFvgjNDe5pKLDkJKmo6D-9ePuTbVGwD_z1XR10btRUuoZ4J-6fiDtuM724yqalt3w8'
);

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const key =
  'BCPdgS4aIvAZ-jwWPwHovpFvgjNDe5pKLDkJKmo6D-9ePuTbVGwD_z1XR10btRUuoZ4J-6fiDtuM724yqalt3w8';
const publickey = key;

if ('serviceWorker' in navigator && 'PushManager' in window) {
  if (localStorage.getItem('notify') === 'true') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered: ', registration);
          askPermissionForNotifications();
        })
        .catch((error) => {
          console.log('Service Worker registration failed: ', error);
        });
    });
  }
}

function askPermissionForNotifications() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted');
        subscribeToPushNotifications();
        resolve();
      } else {
        console.log('Notification permission denied');
        reject();
      }
    });
  });
}

function subscribeToPushNotifications() {
  return navigator.serviceWorker.ready
    .then((registration) => {
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
    })
    .then((subscription) => {
      console.log('Subscribed to push notifications:', subscription);
      sendSubscription(subscription, publickey);
    })
    .catch((error) => {
      console.log('Error subscribing to push notifications:', error);
    });
}

function sendSubscription(subscription, publickey) {
  console.log('Sending subscription:', subscription);
  console.log('Sending public key:', publickey);

  // Get the country and state information of the subscription
  fetch('https://ipapi.co/json/')
    .then((response) => response.json())
    .then((data) => {
      const country = data.country;
      const state = data.region;
      const city = data.city;
      console.log(data);
      // Add the country and state information to the subscription object
      subscription.country = country;
      subscription.state = state;
      subscription.city = city;

      const userAgent = navigator.userAgent;
      let browser = 'unknown';
      if (userAgent.indexOf('Edg') > -1) {
        browser = 'microsoftedge';
      } else if (userAgent.indexOf('Chrome') > -1) {
        browser = 'chrome';
      } else if (userAgent.indexOf('Firefox') > -1) {
        browser = 'firefox';
      } else if (userAgent.indexOf('Safari') > -1) {
        browser = 'safari';
      } else if (userAgent.indexOf('Opera') > -1) {
        browser = 'opera';
      }

      // Add the browser name to the subscription object
      subscription.browser = browser;

      // Send the subscription data to the backend server
      fetch('https://letsnotify.in:9000/subscription', {
        method: 'POST',
        body: JSON.stringify({
          subscription: subscription,
          publickey: publickey,
          browser: browser,
          country: country,
          state: state,
          city: city,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          console.log('Subscription sent to backend server');
        })
        .catch((error) => {
          console.error('Error sending subscription to backend server:', error);
        });
    })
    .catch((error) => {
      console.error('Error getting geolocation:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('notify') === 'true') {
    document.querySelector('#notifyAlertBox').style.display = 'none';
  } else {
    const myDiv = document.getElementById('myDiv');

    const notifyAlertBox = document.createElement('div');
    notifyAlertBox.id = 'notifyAlertBox';
    notifyAlertBox.style.width = '400px';
    notifyAlertBox.style.position = 'fixed';
    notifyAlertBox.style.left = '50%';
    notifyAlertBox.style.marginLeft = '-200px';
    notifyAlertBox.style.top = '0';
    notifyAlertBox.style.padding = '20px';
    notifyAlertBox.style.zIndex = '100000';
    notifyAlertBox.style.background = 'antiquewhite';
    notifyAlertBox.style.color = '#333';
    notifyAlertBox.style.transition = 'all 1s ease-in-out';
    notifyAlertBox.style.borderRadius = '10px';

    const notifyLogo = document.createElement('img');

    notifyLogo.style.width = '70px';
    notifyLogo.style.float = 'left';
    notifyLogo.style.marginRight = '10px';

    const notifyText = document.createElement('p');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    console.log(publickey);
    urlencoded.append('publicKey', publickey);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch('https://letsnotify.in:9000/project', requestOptions)
      .then((response) => response.json())

      .then((result) => {
        console.log(result);
        notifyText.textContent = result.result.Text;
        notifyLogo.src = `https://letsnotify.in/backend/letsnotify/app/src/project/${result.result.projectimage}`;
        console.log(result);
      })
      .catch((error) => console.log('error', error));

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';
    buttonsDiv.style.textAlign = 'right';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'alert-btn';
    cancelButton.id = 'notify-cancel-button';
    cancelButton.textContent = 'Cancel';
    cancelButton.style.background = '#024e73';
    cancelButton.style.color = '#fff';
    cancelButton.style.border = '0';
    cancelButton.style.padding = '8px 15px';
    cancelButton.style.fontSize = '18px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.style.margin = '10px';
    cancelButton.style.borderRadius = '10px';

    const allowButton = document.createElement('button');
    allowButton.className = 'alert-btn';
    allowButton.id = 'notify-button';
    allowButton.textContent = 'Allow';
    allowButton.style.background = '#024e73';
    allowButton.style.color = '#fff';
    allowButton.style.border = '0';
    allowButton.style.padding = '8px 15px';
    allowButton.style.fontSize = '18px';
    allowButton.style.cursor = 'pointer';
    allowButton.style.borderRadius = '10px';

    buttonsDiv.appendChild(cancelButton);
    buttonsDiv.appendChild(allowButton);

    notifyAlertBox.appendChild(notifyLogo);
    notifyAlertBox.appendChild(notifyText);
    notifyAlertBox.appendChild(buttonsDiv);
    var myHeaders = new Headers();
    myDiv.appendChild(notifyAlertBox);
  }

  setTimeout(function () {
    document.querySelector('#notifyAlertBox').style.top = '0';
  }, 1000);

  document.querySelector('#notify-button').onclick = () => {
    localStorage.setItem('notify', 'true');
    notifyTrue();
  };

  function notifyTrue() {
    if (localStorage.getItem('notify') === 'true') {
      document.querySelector('#notifyAlertBox').style.display = 'none';
      window.location.reload();
    }
  }

  document.querySelector('#notify-cancel-button').onclick = () => {
    localStorage.setItem('notify', 'false');
    notifyFalse();
  };

  function notifyFalse() {
    if (localStorage.getItem('notify') === 'false') {
      document.querySelector('#notifyAlertBox').style.display = 'none';
    }
  }
});
