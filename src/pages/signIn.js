import { useState } from 'react';
import { useUserAuth } from '../auth-context.js';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignIn = () => {
	const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();

	const handleSignInGit = () => {
		gitHubSignIn();
		router.push('/');		
	};

	const handleSignInGoogle = () => {
		googleSignIn();
		router.push('/');
	};

	const handleSignOut = () => {
		firebaseSignOut();
	}

	return (
		<div className="bg-white flex flex-col items-center justify-center min-h-screen py-2">
			<header className="flex justify-between items-center bg-white border-b border-black w-full p-4">
				<div className="flex items-center">
					<Link href={`/`}>
						<button className="bg-white text-black font-bold py-2 px-4"><h1>Fret Companion</h1></button>
					</Link>
				</div>
				<div className="flex items-center">
					<Link href={`/chordLibrary`}>
						<button className="bg-white text-black font-bold py-2 px-4"><h1>Chord Library</h1></button>
					</Link>
				</div>
				<div className="flex">
					<input className="w-50 rounded-md text-black border border-gray300 py-2 px-4" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for tabs..." />
					<Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded" href={`/searchResult?query=${encodeURIComponent(searchQuery)}`}>Search</Link>
				</div>
				<div className="flex items-center">
					{user ? (
						<Link href={`/myList`}>
							<button className="mb-4 bg-white text-black font-bold py-2 px-4"><h1>My List</h1></button>
						</Link>
					) : (
						<div></div>
					)}
				</div>
				<div>
					{user ? (
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignOut}><h1>Sign Out</h1></button>
					) : (
						<Link href={`/signIn`}>
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><h1>Sign In</h1></button>
						</Link>
					)}
				</div>
			</header>

			<main className="bg-gray-300 flex flex-col justify-center items-center w-full flex-1 px-20 text-center">
				<div className="flex justify-center text-black items-center bg-white m-5 w-50 p-4">
					<button className="bg-blue-500 hover:bg-blue-700 text-white mr-4 font-bold py-2 px-4 rounded" onClick={handleSignInGit}><h1>Sign In with Github</h1></button>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignInGoogle}><h1>Sign In With Google</h1></button>
				</div>
			</main>

			<footer className="bg-white flex items-center justify-center w-full h-24 border-t">
			</footer>
		</div>
	);
}

export default SignIn;
