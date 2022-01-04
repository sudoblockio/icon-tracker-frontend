import React, { useEffect, useState } from "react"
import { getUrl } from "../../utils/score"

const LinkButton = ({ address }) => {
  const [url, setUrl] = useState(false)
  const [loading, setLoading] = useState(false)

  const process = async () => {
    setLoading(true)
    try {
      const res = await getUrl({ _contract: address })
      setUrl(res)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }
  useEffect(() => {
    process()
  }, [address])

  const onClickLink = () => {
    window.open(url)
  }

  if (!!url && !loading) {
    return <i className="img token-img-link" onClick={onClickLink} />
  } else {
    return null
  }
}

export default LinkButton
