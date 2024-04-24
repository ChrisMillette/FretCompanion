import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUserAuth } from '../auth-context';
import Link from 'next/link';

const SearchResult = () => {
	const { user, firebaseSignOut } = useUserAuth();
	const router = useRouter();
	const [searchResults, setSearchResults] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const { query } = router.query;

	const handleSignOut = () => {
		firebaseSignOut();
	}


	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`https://www.songsterr.com/a/ra/songs.json?pattern=${query}`);
				const data = await response.json();
				setSearchResults(data);
			} catch (error) {
				console.error("Error fetching: ", error);
			}
		};

		if (query) {
			fetchData();
		}
	}, [query]);

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
				<div className="text-black m-4">
					<h1>Results for "{query}"</h1>
				</div>
				<div className="flex flex-col items-center w-full max-w-lg">
					<ul>
						{searchResults.slice(0, 10).map((result, index) => (
							<li key={index}>
								<Link href={`/tab?id=${result.title}`}>
									<button className="mb-4 bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 w-full">{result.title}</button>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</main>

			<footer className="bg-white flex items-center justify-center w-full h-24 border-t">
				{/* Footer content */}
			</footer>
		</div>
	);
};

export default SearchResult;