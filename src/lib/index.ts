import { uniqueId as getUniqueId } from 'lodash-es'

function clear(script: HTMLScriptElement, uniqueId: string, timer: ReturnType<typeof setTimeout>) {
  clearTimeout(timer)

  document.body.removeChild(script)
  script.onerror = null
  script.onload = null
  Reflect.set(window, uniqueId, null)
  Reflect.deleteProperty(window, uniqueId)
}

interface Options {
  /** query parameters */
  params?: Record<string, string>
  /** Timeout in milliseconds. default is 5000ms */
  timeout?: number
}

/**
 * use jsonp to request data
 * @param url
 * @param options
 * @returns
 */
export default function request<Response>(url: string, options: Options = {}): Promise<Response> {
  const { params = {}, timeout = 5000 } = options

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    const uniqueId = `${getUniqueId('jsonp')}_${Date.now()}`

    Reflect.set(window, uniqueId, function (response: Response) {
      resolve(response)
    })

    let src = `${url}?callback=${uniqueId}`
    for (const key in params) {
      src = `${src}&${key}=${params[key]}`
    }
    script.src = src

    const timer = setTimeout(() => {
      clear(script, uniqueId, timer)
      reject('jsonp request timeout')
    }, timeout)

    script.onload = function () {
      clear(script, uniqueId, timer)
    }

    script.onerror = function () {
      clear(script, uniqueId, timer)
      reject('jsonp request error')
    }

    document.body.appendChild(script)
  })
}
