
/**
 * 过滤对象中的空键值对。
 *
 * @param {Object} obj - 要过滤的对象。
 * @returns {Object} 过滤后的对象，不包含空键值对。
 * @example
 *
 * const inputObj = {
 *   name: 'John',
 *   address: null
 * };
 *
 * const filteredObj = filterEmptyKeys(inputObj);
 * // filteredObj 现在为 { name: 'John', }
 */
export function filterEmptyKeys(obj) {
  const filteredObj = {}
  for (const key in obj) {
    const value = obj[key]
    if (value !== null && value !== undefined && value !== '') {
      filteredObj[key] = value
    }
  }
  return filteredObj
}

/**
 * 检查是否包含中文(包括简繁)
 * @param {*} string
 * @returns 是否包含中文
 */
export function isChinese(string) {
  return /[\u4E00-\u9FFF\u3400-\u4DBF]/.test(string)
}

/**
 * 解析 Content-Disposition 标头，获取 filename
 * @param {string} contentDisposition 返回头的contentDisposition
 * @returns filename
 */
export function getFilenameFromContentDisposition(contentDisposition) {
  var matches = contentDisposition.match(/filename[^;=\n]*=(['"]?)([^'"\n]*)\1/)
  if (matches != null && matches.length > 2) {
    return window.decodeURIComponent(matches[2])
  }
  return null
}

/**
 * 下载文件到浏览器。
 *
 * @param {Object} options - 下载选项对象。
 * @param {Blob|ArrayBuffer|string} options.data - 文件的二进制数据、ArrayBuffer 或数据URL。
 * @param {string} [options.filename] - 下载的文件名（可选）。
 * @param {Object} [options.headers] - HTTP响应头对象，包含Content-Disposition头信息（可选）。
 * @param {string} [options.type] - 文件的MIME类型（可选，自动推断）。
 */
export function downloadFile({ data, filename = '', headers = {}, type = '' }) {
  // try parse filename
  if (!filename) {
    if (headers['content-disposition']) {
      filename = getFilenameFromContentDisposition(
        headers['content-disposition']
      )
    }
  }
  const options = {
    type,
  }
  const blob = new Blob([data], options)
  if (window.navigator.msSaveOrOpenBlob) {
    // 兼容IE
    window.navigator.msSaveOrOpenBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    window.URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  }
}

/**
 * 检查当前设备是否为移动设备的浏览器。
 * @returns {boolean} 如果是移动设备浏览器，则返回 true；否则返回 false。
 */
export function isMobileBrowser() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * 滚动至表单中第一个包含检验错误的表单字段。
 * @param {string} errorClassName - 表单字段包含错误的 CSS 类名。
 */
export function scrollToErrorFormField(errorClassName = 'has-error') {
  const elements = document.getElementsByClassName(errorClassName);
  if (elements.length > 0) {
    elements[0].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
}


