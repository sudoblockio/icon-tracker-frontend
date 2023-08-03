import React, { useState, useEffect } from 'react';
import { requestAddress } from '../../utils/connect';
import { CopyButton } from '../../components';
import checkIconex from 'check-iconex';
import NotificationManager from '../../utils/NotificationManager';

function Connect(props) {
    const [disabled, setDisabled] = useState(false);
    const [walletAddress, setWalletAddress] = useState(props.walletAddress);

    useEffect(() => {
        const fetchIconexStatus = async () => {
            const { isChrome, iconexInstalled, hasIconWallet } = await checkIconex(1000, 2000);
            setDisabled(!(isChrome && iconexInstalled && hasIconWallet));
        };
        fetchIconexStatus();
    }, []);

    useEffect(() => {
        if (props.walletAddress !== walletAddress) {
            setWalletAddress(props.walletAddress);
            window.dispatchEvent(
                new CustomEvent('CUSTOM_FX', {
                    detail: { type: 'SET_WALLET' },
                })
            );
        }
    }, [props.walletAddress]);

    const getWalletAddress = async () => {
        if (disabled) {
            window.open('https://chrome.google.com/webstore/detail/iconex/flpiciilemghbmfalicajoolhkkenfel', '_blank');
            return;
        }

        if (walletAddress) {
            return;
        }

        const address = await requestAddress();
        setWalletAddress(address);
        window.dispatchEvent(
            new CustomEvent('CUSTOM_FX', {
                detail: { type: 'SET_WALLET' },
            })
        );
        props.setAddress(address);
        props.history.push(`/address/${address}`);
    };

    const disconnect = () => {
        setWalletAddress(undefined);
        props.clearWallet();
        NotificationManager.deregisterServiceWorker();
    };

    return (
        <div className={`connect ${walletAddress ? 'join' : ''}`}>
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
                            props.history.push(`/address/${walletAddress}`);
                        }}
                    >
                        View Details
                    </span>
                </div>
            ) : null}
        </div>
    );
}

export default Connect;

