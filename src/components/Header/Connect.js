import React, { useState, useEffect } from 'react'
import { requestAddress } from '../../utils/connect'
import { CopyButton } from '../../components'
import checkIconex from 'check-iconex'
import NotificationManager from '../../utils/NotificationManager'
import { LoginModal, utils } from '../LoginComponent/LoginModal'

const LOCAL_KEY = '_UNIQUE_KEY_'

function Connect(props) {
    const [disabled, setDisabled] = useState(false)
    const [walletAddress, setWalletAddress] = useState(props.walletAddress)
    //
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
    const [localData, setLocalData] = useState(utils.getInitLocalData())

    function toggleLogin() {
        // toggles between login and logout
        if (localData.auth.successfulLogin) {
            handleLogout()
        } else {
            handleLogin()
        }
    }

    function handleLogin() {
        // login with ICON
        setLoginModalIsOpen(true)
    }

    function handleLogout() {
        // close user session
        handleLocalDataChange(utils.getInitLocalData())
    }

    function handleLocalDataChange(newLocalData) {
        //
        setLocalData(newLocalData)

        // write login data locally to make user session persistance
        utils.saveDataToLocal(newLocalData, LOCAL_KEY)
    }

    function closeLoginModal() {
        // this function handles the closing of the LoginModal
        // dataFromModal is the login data passed from the component
        // to the parent after the login process
        setLoginModalIsOpen(false)
    }

    function getDataFromLoginModal(loginData) {
        // Callback function that gets called from within LoginModal
        // to pass login data into parent
        console.log('####LOGIN DATA####')
        console.log(loginData)
        const newLocalData = {
            auth: { ...loginData },
        }

        console.log('login data')
        console.log(newLocalData)
        handleLocalDataChange(newLocalData)

        // fetch wallet address and type of wallet login used
        const address = newLocalData.auth.selectedWallet
        const walletType = newLocalData.auth.methodUsed
        const bip44Path = newLocalData.auth.bip44Path

        // set wallet address on local component state
        setWalletAddress(address)

        // set wallet address and type of wallet login on redux store
        props.setAddress(address)
        props.setWalletType(walletType)
        props.setBip44Path(bip44Path)
        props.history.push(`/address/${address}`)
        closeLoginModal()
    }

    //
    const getWalletAddress = async () => {
        if (disabled) {
            window.open(
                'https://chrome.google.com/webstore/detail/iconex/flpiciilemghbmfalicajoolhkkenfel',
                '_blank'
            )
            return
        }

        if (walletAddress) {
            return
        }

        // trigger the modal window to select which type of login
        handleLogin()
    }

    const disconnect = () => {
        setWalletAddress(undefined)
        props.clearWallet()
        NotificationManager.deregisterServiceWorker()
    }

    useEffect(() => {
        const fetchIconexStatus = async () => {
            const { isChrome, iconexInstalled, hasIconWallet } = await checkIconex(1000, 2000)
            setDisabled(!(isChrome && iconexInstalled && hasIconWallet))
        }
        fetchIconexStatus()

        // get local login data on first render
        const userLocalData = utils.getLocalData(LOCAL_KEY)

        // set loginData state
        handleLocalDataChange(userLocalData)
    }, [])

    useEffect(() => {
        if (props.walletAddress !== walletAddress) {
            setWalletAddress(props.walletAddress)
            window.dispatchEvent(
                new CustomEvent('CUSTOM_FX', {
                    detail: { type: 'SET_WALLET' },
                })
            )
        }
    }, [props.walletAddress])

    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent('CUSTOM_FX', {
                detail: { type: 'SET_WALLET' },
            })
        )
    }, [walletAddress])

    return (
        <div className={`connect ${walletAddress ? 'join' : ''}`}>
            <LoginModal
                isOpen={loginModalIsOpen}
                onRequestClose={closeLoginModal}
                onRetrieveData={getDataFromLoginModal}
            />
            <span onClick={getWalletAddress}>
                <em className="img" />
            </span>
            {walletAddress ? (
                <div className="sub-menu">
                    <p>
                        <span>Wallet Address</span>
                        <CopyButton data={walletAddress} title={'Copy Address'} wallet={true} />
                    </p>
                    <span className="btn" onClick={disconnect}>
                        Disconnect
                    </span>
                    <span
                        className="btn"
                        onClick={() => {
                            props.history.push(`/address/${walletAddress}`)
                        }}>
                        View Details
                    </span>
                </div>
            ) : null}
        </div>
    )
}

export default Connect
