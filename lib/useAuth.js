// lib/auth.ts
"use server"

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function getAuthToken() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded 
  } catch (err) {
    console.error("Invalid token:", err)
    return null
  }
}
