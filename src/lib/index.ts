import { uniqueId as getUniqueId } from 'lodash-es'

function clear(script: HTMLScriptElement, uniqueId: string, timer: ReturnType<typeof setTimeout>) {
  clearTimeout(timer)

  globalThis.document.body.removeChild(script)
  script.onerror = null
  script.onload = null
  Reflect.set(globalThis.window, uniqueId, null)
  Reflect.deleteProperty(globalThis.window, uniqueId)
}

/**
 * use jsonp to request data
 * @param url
 * @param options
 * @returns
 */
export default function request<Response>(
  url: string,
  options: {
    params?: Record<string, string>
    timeout?: number
  } = {}
): Promise<Response> {
  const { params = {}, timeout = 5000 } = options

  return new Promise((resolve, reject) => {
    const script = globalThis.document.createElement('script')
    const uniqueId = `${getUniqueId('jsonp')}_${Date.now()}`

    Reflect.set(globalThis.window, uniqueId, function (response: Response) {
      resolve(response)
    })

    console.log('globalThis', globalThis.window[uniqueId])

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

    globalThis.document.body.appendChild(script)
  })
}
