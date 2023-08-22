# @unify-js/jsonp

- A JSONP implementation
- ESM only
- Written in TypeScript

## Installation

```bash
# npm
npm install @unify-js/jsonp

# pnpm
pnpm add @unify-js/jsonp
```

## Usage

```ts
interface Response {
  userId: number
  id: number
  title: string
  completed: boolean
}

try {
  const res = await jsonp<Response>('https://jsonplaceholder.typicode.com/todos/1')
} catch (error) {
  console.log('error', error)
}
```

## API

`jsonp(url, options)`

- `url` (`string`)
- `options?` (`object`)
  - `param?` (`object`): query parameters
  - `timeout?` (`number`): timeout in milliseconds
