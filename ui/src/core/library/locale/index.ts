
import zhCN from './zh_CN'     // 中文
import enUS from './en_US'     // 英文

export type localeData = {
    [key:string]:string
}

type localeAll = {
    [key:string]:localeData
}

const localeAllData:localeAll =  {
    'en_US': enUS,
    'zh_CN': zhCN
}
export default localeAllData
