import Link from "next/link";

export default function Footer() {
	return (
		<div className={'flex-shrink-0 text-center text-md p-4 border-t bg-white'}>
			Created by {' '}
			<Link
				className={'text-primary-main'}
				href={"https://www.haafeez.vercel.app"}
				target={'_blank'}
				rel={'noopener noreferrer'}
			>
				Haafeez ali
			</Link>
		</div>
	)
}