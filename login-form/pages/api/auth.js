export default function auth(req, res) {
  const { username, password } = req.body
  if (username === 'admin' && password === 'admin') {
    res.status(200).json({ message: 'Logged in successfully' })
  } else {
    res.status(401).json({ error: 'Incorrect username and/or password' })
  }
}
