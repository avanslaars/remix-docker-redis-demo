export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <form>
        <div>
          <label htmlFor="key">Key</label>
          <input id="key" type="text" name="key" />
        </div>
        <div>
          <label htmlFor="val">Value</label>
          <input id="val" type="text" name="val" />
        </div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
      <ul>
        <li>items</li>
        <li>from</li>
        <li>redis</li>
        <li>here</li>
      </ul>
    </div>
  )
}
