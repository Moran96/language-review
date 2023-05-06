import * as fs from 'fs'
import xlsx from 'node-xlsx'
import { TreeNode } from '../TreeNode'

interface TypeRow {
  index: number,
  code: string,
  zh: string,
  en: string,
  enSoft: string,
  enFinal: string
}
interface LanguageRow {
  index: number,
  target: string,
  content: string
}


function getSheet (path: string) {
  const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(path))
  const sheet = workSheetsFromBuffer[0]
  return sheet.data
}

function getLanguageItems (list: Array<any>) {
  const stack: Array<string> = []
  const rows: Array<LanguageRow> = []

  list.forEach(row => {
    const objLine: TypeRow = {
      index: parseInt(row[0]) - 1,
      code: row[1],
      zh: row[2],
      en: row[3],
      enSoft: row[4],
      enFinal: row[5]
    }
    if (!objLine.code) {
      stack.pop()
    } else {
      const lineNode = new TreeNode(objLine.code, objLine.en)
      const pCode = stack.join('.')
      lineNode.bindParent(pCode)
      if (!lineNode.isLeaf) {
        stack.push(lineNode.privateCode)
        // console.log(`\x1B[32m${objLine.index + 1}\t${stack.join('.')}\x1B[0m`)
      } else {
        const rowItem: LanguageRow = {
          index: objLine.index,
          target: objLine.en,
          content: objLine.enFinal
        }
        rows.push(rowItem)
      }
    }
  })

  return rows
}

export { getSheet, getLanguageItems }
