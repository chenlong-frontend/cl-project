export default {
  download (opt) {
    let form = document.createElement('form')
    form.style = 'display: none'
    form.method = 'post'
    form.action = '/workbench/download'
    let type = document.createElement('input')
    type.name = 'type'
    type.value = opt.type
    let data = document.createElement('input')
    data.name = 'data'
    data.value = JSON.stringify(opt.data)
    let md5 = document.createElement('input')
    md5.name = 'md5'
    md5.value = 'x'
    form.appendChild(type)
    form.appendChild(data)
    form.appendChild(md5)
    document.body.appendChild(form)
    console.log(form)
    form.submit()
    document.body.removeChild(form)
  }
}
