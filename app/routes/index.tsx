import { ActionFunction, LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getRedisClient } from '~/redis.server'

interface StuffItem {
  id: string
  name: string
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())
  const redis = await getRedisClient()
  await redis.hSet('stuff', data.key, data.name)

  return null
}

export const loader: LoaderFunction = async () => {
  let values: StuffItem[] = []
  try {
    const client = await getRedisClient()
    const stuff = await client.hGetAll('stuff')
    // console.log('stuff', stuff)

    // convert to array
    values = Object.keys(stuff).map((key) => {
      return { id: key, name: stuff[key] }
    })
  } catch (error) {
    console.error(error)
    throw error
  }
  return { stuff: values }
}

// TODO: Deal with pending state and clearing the form
export default function Index() {
  const { stuff } = useLoaderData()
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      {/* The 405 status messed me up here. An index route posting to itself needs this ?index in the action or it won't work */}
      <Form method="post" action="?index">
        <div>
          <label htmlFor="key">Id</label>
          <input id="key" type="text" name="key" />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" />
        </div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </Form>
      <ul>
        {stuff.map(({ id, name }: StuffItem) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  )
}
