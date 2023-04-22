class TreeNode {
  public publicCode: string
  public readonly privateCode: string
  private parentCode: string | null
  data: string | null
  isLeaf: boolean

  constructor (code: string, value: any) {
    this.privateCode = code
    this.publicCode = ''
    this.parentCode = ''

    this.isLeaf = typeof value === 'string'
    this.data = this.isLeaf ? value : null
  }

  print (order: string | number) {
    console.log(order, '\t', this.isLeaf, '\t', this.publicCode)
    // console.log(this.publicCode, '\t', this.privateCode, '\t', this.data)
  }

  bindParent (parentCode: string) {
    this.parentCode = parentCode
    this.publicCode = parentCode ? `${parentCode}.${this.privateCode}` : this.privateCode
  }
}

export { TreeNode }
