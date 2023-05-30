import { NextApiRequest, NextApiResponse } from 'next'
import { getMoviesUrl } from '@/services/tmdb'

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
  const { id } = req.query
  if (!id || typeof id !== 'string') {
    res.status(400).json({ message: `Invalid id parameter of type ${typeof id}` })
    return
  }
  const url = getMoviesUrl(id)
  const response = await fetch(url)
  const data = await response.json()
  res.status(200).json(data)
}
