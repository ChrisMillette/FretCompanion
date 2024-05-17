import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUserAuth } from '../auth-context';
import Link from 'next/link';

const Tab = ({ songInfo }) => {
	const { user, firebaseSignOut } = useUserAuth();
	const router = useRouter();
	const { id } = router.query;
	const [searchQuery, setSearchQuery] = useState("");
	const [savedTab, setSavedTab] = useState([]);
	const [isSaved, setIsSaved] = useState(false);

	const handleSignOut = () => {
		firebaseSignOut();
	}

	useEffect(() => {
		const saveTabString = sessionStorage.getItem('savedTab');
		if (saveTabString) {
			setSavedTab(JSON.parse(saveTabString));
		}
		
	}, []);

	useEffect(() => {
		setIsSaved(savedTab.includes(id));
	}, [id, savedTab]);

	const handleSave = () => {
		setSavedTab([...savedTab, id])
		sessionStorage.setItem('savedTab', JSON.stringify([...savedTab, id]));
		setIsSaved(true);
		sessionStorage.setItem('isSaved', 'true');
	};

	const unsave = () => {
		const updatedSavedTab = savedTab.filter(tab => tab !== id);
		setSavedTab(updatedSavedTab);
		sessionStorage.setItem('savedTab', JSON.stringify(updatedSavedTab));
		setIsSaved(false);
		sessionStorage.setItem('isSaved', 'false');
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
				<div className="flex justify-center text-black items-center bg-white border-b border-black w-50 p-4">
					{songInfo && (
						<>
							<div className="mr-4">
								<div>Song Name: {songInfo.title}</div>
								<div>Artist: {songInfo.artist.name}</div>
								<div>Album: {songInfo.album.title}</div>
								<div>Available on Songsterr and Ultimate Guitar</div>
								{user ? (
									<div>
									{!isSaved ? (
										<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-20 rounded" onClick={handleSave}><h1>Save</h1></button>
									) : (
										<button className="bg-gray-300 text-white font-bold py-2 px-4 w-20 rounded" onClick={unsave}>Unsave</button>
									)}
									</div>
								) : (
									<div></div>
								)}								
							</div>
							<div>
								<img src={songInfo.album.cover_medium} alt={songInfo.album.title} />
							</div>
						</>
					)}
				</div>
			</main>

			<footer className="bg-white flex items-center justify-center w-full h-24 border-t">
			</footer>
		</div>
	);
}

export async function getServerSideProps({ query }) {
	try {
		const response = await fetch(`https://api.deezer.com/search?q=${query.id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();
		const songInfo = data.data[0];
		return {
			props: {
				songInfo
			}
		};
	} catch (error) {
		console.error('Error fetching song info:', error);
		return {
			props: {
				songInfo: null
			}
		};
	}
}

export default Tab;
