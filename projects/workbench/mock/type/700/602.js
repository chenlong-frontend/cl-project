// let backData = [
//   list: []
// ]
let backData = [[{node_name: '安全质量拍照', node_id: '1'}], [{node_name: '安全部审核', node_id: '2'}],
  [{node_name: '工程技术部', node_id: '3'}, {node_name: '生产部', node_id: '4'}, {node_name: '项目经理', node_id: '5'}, {node_name: '质量部', node_id: '6'}],
  [{node_name: '安全部审核', node_id: '7'}]]

let backDatas = {
  code: 0,
  data: backData,
  msg: 'ok'
}
module.exports = reponse

function reponse (param) {
  return backDatas
}
