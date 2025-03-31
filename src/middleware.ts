import { SUBMIT_DATA_KEY } from '@/constants/cookie.constants'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const cookie = req.cookies.get(SUBMIT_DATA_KEY)

	if (!cookie || !cookie.value) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/thank-you/:path*',
}
