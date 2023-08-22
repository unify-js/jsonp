import { expect, test } from 'vitest'
import puppeteer from 'puppeteer'

import jsonp from './index'

test('jsonp', async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.google.com')

  const response = await page.evaluate(async () => {
    const response = await jsonp<{
      userId: number
      id: number
      title: string
      completed: boolean
    }>('https://jsonplaceholder.typicode.com/todos/1', {
      timeout: 1000
    })

    return response
  })

  expect(response.userId).toBe(1)
})
