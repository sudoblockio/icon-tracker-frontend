import { pushRegister, pushWithdraw } from '../../redux/api/restV3/notification'
import { delay } from '../utils';

const path = '/sw.js'
const PublicKey = 'BHu9mU0UUq95nIOkY2EGxHq4l2ibzVzVbcD0uZHAaibpLTQEBl9kL8sSUlXMMc_StUdlwIXa32gJFZKcOw6pw5A'

class NotificationManager {
    constructor() {
        this.registration = null
        this.address = ''
        this.endpoint = ''
    }    

    available() {
        if (!('serviceWorker' in navigator)) return false    
        if (!('PushManager' in window)) return false    
        return true    
    }

    async registerServiceWorker(address) {
        try {
            const registration = await navigator.serviceWorker.register(path)
            const permission = await this.requestPermission();
            const pushSubscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(PublicKey)
            })       
            const subscription = pushSubscription.toJSON()
            const { endpoint, expirationTime: expireDate, keys } = subscription
            const { p256dh, auth } = keys
            
            await delay(500)
            const register = await pushRegister({ address, auth, endpoint, expireDate, p256dh })
            console.log(`${permission}, ${register.data.description}`)
            
            this.registration = registration
            this.address = address
            this.endpoint = endpoint
        }
        catch(e) {
            console.error(e)        
        }
    }

    async deregisterServiceWorker() {
        const { registration, address, endpoint } = this

        if (registration) {
            registration.unregister()
        }

        if (address && endpoint) {
            pushWithdraw({ address, endpoint })
        }
    }

    async requestPermission() {
        try {
            const permissionResult = await Notification.requestPermission()
            return permissionResult
        }
        catch(e) {
            console.error(e)        
        }
    }

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}

const NotificationManagerInstance = new NotificationManager()
export default NotificationManagerInstance