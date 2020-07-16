import IconService, { HttpProvider, IconBuilder } from "icon-sdk-js"
import { getWalletApiUrl } from "../redux/api/restV3/config"

export async function getUrl(params) {
  const walletApiUrl = await getWalletApiUrl()
  const provider = new HttpProvider(`${walletApiUrl}/api/v3`)
  const iconService = new IconService(provider)
  const scoreAddress =
    walletApiUrl === "https://wallet.icon.foundation"
      ? "cx372e64ed320a6d8d978f81716d0959f1bb33a18e"
      : "cx2f9ed6ce329af3f97a1a0e745852efe4e7a46263"
  const { CallBuilder } = IconBuilder
  const call = new CallBuilder()
    .to(scoreAddress)
    .method("get_url")
    .params(params)
    .build()

  const url = await iconService.call(call).execute()
  if (!!url) {
    return url
  } else {
    return false
  }
}
