import { TreeNode } from './TreeNode'
import * as fs from 'fs'
import * as readline from 'readline'

async function processFileByLine () {
  const rl = readline.createInterface({
    input: fs.createReadStream('./src/in.csv'),
    crlfDelay: Infinity,
  })

  const stack: Array<string> = []

  rl.on('line', (line) => {
    const arr: Array<string> = line.split(',')
    const objLine = {
      order: arr[0],
      code: arr[1],
      // TODO 可能会有异常逻辑
      text: arr[2] || null
    }
    if (!objLine.code) {
      stack.pop()
      console.log(stack)
      // pFlag = true
    } else {
      const lineNode = new TreeNode(objLine.code, objLine.text)
      const pCode = stack.join('.')
      lineNode.bindParent(pCode)
      if (!lineNode.isLeaf) {
        stack.push(lineNode.privateCode)
        console.log(stack)
      }
    }
  })
}

processFileByLine()
