import { req } from './request'

export function largeFileUpload(chunks: any, hash: string) {

  function _postSlice(chunk: any) {
    const formData = new FormData()
    formData.append('hash', hash)
    formData.append('file', chunk)
    req.post('/file/large', {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formData
    }).then(res => res.data)
    
  }
}

export function commonFileUpload(file: any) {
  const formData = new FormData()
  formData.append('file', file)
  req.post('/file/common', {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: formData
  })
}