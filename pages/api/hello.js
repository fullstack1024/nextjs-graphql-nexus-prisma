export default function handler(req, res) {
  res.status(200).json({ name: '测试非 gql api' })
}
