'use client'
import Link from "next/link"
import Image from "next/image"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
export default function Nav() {
	const [providers, setProviders] = useState(null);
	const isUserLoggedIn = false;
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const toggelMenu = useCallback(() => setToggleDropdown(prev => !prev), [])
	useEffect(() => {
		const fetchProviders = async () => {
			const response = await getProviders();
			setProviders(response)
		}
		fetchProviders();
	}, [])
	return (
		<nav className="flex-between w-full mb-6 pt-3">
			<Link Link href={'/'} className="flex gap-2 flex-center" >
				<Image
					src={"/assets/images/logo.svg"}
					width={30}
					height={30}
					className="object-contain bg-blend-multiply"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>
			<div className="sm:flex hidden">
				{isUserLoggedIn ?
					(<div className="flex gap-3 md:gap-5">
						<Link
							href={'/create-prompt'}
							className="black_btn"
						>
							Create Post
						</Link>
						<button
							type="button"
							className="outline_btn"
							onClick={signOut}
						>
							Sign Out
						</button>
						<Link href={"/profile"} className="gap-2 flex-center">
							Profile
							<Image
								src={"/assets/images/logo.svg"}
								height={30}
								width={30}
								className="object-contain"
							/>

						</Link>
					</div>) : (<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									key={provider.name}
									type="button"
									className="black_btn"
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>)
				}
			</div>
			<div className="sm:hidden flex relative">
				{isUserLoggedIn ?
					(<div>
						<Image
							src={"/assets/icons/menu.svg"}
							height={30}
							width={30}
							className="object-contain"
							alt="menu"
							onClick={toggelMenu}
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href={"/profile"}
									className="dropdown_link"
									onClick={toggelMenu}
								>
									My Profile
								</Link>
								<Link
									href={"/create-prompt"}
									className="dropdown_link"
									onClick={toggelMenu}
								>
									My Profile
								</Link>
								<button className="w-full black_btn mt-5"
									type="button"
									onClick={() => {
										toggelMenu();
										signOut();
									}}
								>Sign out</button>

							</div>
						)}
					</div>
					) : (<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									key={provider.name}
									type="button"
									className="black_btn"
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>)
				}
			</div>
		</nav >
	)
}
