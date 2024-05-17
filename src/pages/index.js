import Head from 'next/head';
import Link from 'next/link';
import { useUserAuth } from '../auth-context';
import { useState } from 'react';

export default function Page() {
    const { user, firebaseSignOut } = useUserAuth();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSignOut = () => {
        firebaseSignOut();
    }

    return (
        <div className="bg-white flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Fret Companion</title>
                <link rel="icon" href="a.jpg" />
            </Head>

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
                <div className="flex flex-col items-center w-full max-w-lg">
                    <h1 className="text-black mb-10 font-bold">Search for Available Song Tabs by Keyword</h1>
                    <input className="w-full rounded-md text-black border border-gray300 py-2 px-4" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for tabs..." />
                    <Link className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={`/searchResult?query=${encodeURIComponent(searchQuery)}` }>Search</Link>
                </div>
            </main>

            <footer className="bg-white flex items-center justify-center w-full h-24 border-t">
            </footer>
        </div>
    );
}
