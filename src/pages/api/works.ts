// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dataJson from 'utils/db.json'

export type IWork = {
  id: number
  company: string
  logo: string
  new: boolean
  featured: boolean
  position: string
  role: string
  level: string
  postedAt: string
  contract: string
  location: string
  languages: string[]
  tools: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IWork[]>
) {
  res.status(200).json(dataJson)
}
