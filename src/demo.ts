import * as fs from 'fs'
import { getSheet, getLanguageItems } from './core/readExcel'

const xlsx = 'D:/local_project/language-review/src/IO/final.xlsx'
const sheet = getSheet(xlsx)
const items = getLanguageItems(sheet)

function isSingleQuotation (line: string) {
  // remove spaces
  const str = line.replace (/\s+/g,'')
  const indexColon = str.indexOf(':')

  if (indexColon === -1) {
    throw new Error('No Colon!')
  }

  const indexQuotation = indexColon + 1
  return str[indexQuotation] === '\''
}

function write (arr: Array<any>) {
  const p = 'D:/project/general-web/src/lang/en.js'
  const data = fs.readFileSync(p, 'utf8').split('\n')

  arr.forEach((item, index) => {
    try {
      // 获取原始文本
      const sourceStr = data[item.index]
      // 获取原始文本的引号类型
      const sourceQuotation = isSingleQuotation(sourceStr) ? '\'' : '"'
      // 替换内容
      const target = sourceStr.substring(sourceStr.indexOf(sourceQuotation), sourceStr.lastIndexOf(sourceQuotation) + 1)

      // 替换文本引号类型
      const quotation = item.content.includes('\'') ? '\"' : '\''
      const result = `${quotation}${item.content}${quotation}`

      data.splice(item.index, 1, sourceStr.replace(target, result))
    } catch (e) {
      // content 为 undefined 代表为废弃字段
      // console.log(item.index + 1, '\t', data[item.index])
      // console.table(item)
    }
  })
  // write
  fs.writeFileSync(p, data.join('\n'), 'utf8')
}

write(items)
