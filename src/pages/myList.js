import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserAuth } from '../auth-context';

const myList = () => {
	const [savedTab, setSavedTab] = useState([]);
	const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const savedTabString = sessionStorage.getItem('savedTab');
		if (savedTabString) {
			setSavedTab(JSON.parse(savedTabString));
		}
	}, []);

	const handleSignOut = () => {
		firebaseSignOut();
	}

	const clearList = () => {
		sessionStorage.removeItem('savedTab');
		setSavedTab([]);
	};

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
				<div className="max-w-lg">
					{savedTab.length > 0 ? (
						<div className="flex">
							<ul className="mt-8">
								{savedTab.map((tabId, index) => (
									<li key={index} className="mb-4">
										<Link href={`/tab?id=${tabId}`}>
											<button className="mb-4 bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 w-full">{tabId}</button>
										</Link>
									</li>
								))}
							</ul>
						</div>
					) : (
						<p className="mt-8">You haven't saved any tabs yet.</p>
					)}
				</div>
				<div>
					{user && savedTab.length > 0 && (
						<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={clearList}><h1>Clear List</h1></button>
					)}
				</div>
			</main>

			<footer className="bg-white flex items-center justify-center w-full h-24 border-t">
				{/* Footer content */}
			</footer>
		</div>
	);
};

export default myList;