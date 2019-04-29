import React, { Fragment, useEffect, useState } from 'react';
import { getUrl } from 'utils/utils'

const LinkButton = ({address}) => {
    const [contractAddress, setContractAddress] = useState(false);
    const [url, setUrl] = useState(false);
    useEffect(()=>{
        setContractAddress(address)
        return async () => {
            const res = await getUrl({_contract:address})
            setUrl(res)
        }
    },[contractAddress])


    const onClickLink = () => {
        window.open(url)
    }

    if(!!url){
        return <i className="img" onClick={onClickLink}></i>
    }else{
        return null
    }
}


export default LinkButton