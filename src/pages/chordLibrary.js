import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUserAuth } from '../auth-context';
import Link from 'next/link';

const ChordLibrary = () => {
	const { user, firebaseSignOut } = useUserAuth();
	const [searchQuery, setSearchQuery] = useState("");

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
				<div className="flex justify-center text-black items-center bg-white border-b border-black m-5 w-50 p-4">
					<div>
						<div>
							<h1>A Chord</h1>
							<img src="/a.jpg" alt='A Chord' />
						</div>
						<div>
							<h1>Am Chord</h1>
							<img src="am.jpg" alt='Am Chord' />
						</div>
						<div>
							<h1>B Chord</h1>
							<img src="b.jpg" alt='B Chord' />
						</div>
						<div>
							<h1>Bm Chord</h1>
							<img src="bm.jpg" alt='Bm Chord' />
						</div>
					</div>
					<div>
						<div>
							<h1>C Chord</h1>
							<img src="c.jpg" alt='C Chord' />
						</div>
						<div>
							<h1>Cm Chord</h1>
							<img src="cm.jpg" alt="Cm Chord" />
						</div>
						<div>
							<h1>D Chord</h1>
							<img src="d.jpg" alt="D Chord" />
						</div>
						<div>
							<h1>Dm Chord</h1>
							<img src="dm.jpg" alt="Dm Chord" />
						</div>
					</div>
					<div>
						<div>
							<h1>E Chord</h1>
							<img src="e.jpg" alt="E Chord" />
						</div>
						<div>
							<h1>Em Chord</h1>
							<img src="Em.jpg" alt="Em Chord" />
						</div>
						<div>
							<h1>F Chord</h1>
							<img src="f.jpg" alt="F Chord" />
						</div>
						<div>
							<h1>Fm Chord</h1>
							<img src="Fm.jpg" alt="Fm Chord" />
						</div>
					</div>
					<div>
						<div>
							<h1>G Chord</h1>
							<img src="g.jpg" alt="G Chord" />
						</div>
						<div>
							<h1>Gm Chord</h1>
							<img src="Gm.jpg" alt="Gm Chord" />
						</div>
					</div>
				</div>
			</main>

			<footer className="bg-white flex items-center justify-center w-full h-24 border-t">
				{/* Footer content */}
			</footer>
		</div>
	);
}

export default ChordLibrary;