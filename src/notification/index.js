import { pushRegister } from '../redux/api/restV3/notification'

const PublicKey = 'BHu9mU0UUq95nIOkY2EGxHq4l2ibzVzVbcD0uZHAaibpLTQEBl9kL8sSUlXMMc_StUdlwIXa32gJFZKcOw6pw5A'

export function isNotificationAvailable() {
    if (!('serviceWorker' in navigator)) return false    
    if (!('PushManager' in window)) return false    
    return true
}

export async function registerServiceWorker(address) {
    try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        const permission = await requestPermission();
        const pushSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PublicKey)
        })       
        const subscription = pushSubscription.toJSON()
        const { endpoint, expirationTime: expireDate, keys } = subscription
        const { p256dh, auth } = keys
        const register = await pushRegister({ address, auth, endpoint, expireDate, p256dh })
        console.log(`${permission}, ${register.data.description}`)
    }
    catch(e) {
        console.error(e)        
    }
}

export async function requestPermission() {
    try {
        const permissionResult = await Notification.requestPermission()
        return permissionResult
    }
    catch(e) {
        console.error(e)        
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}