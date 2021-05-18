import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
	const [diary,setDiary] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '21/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: '28/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '30/04/2021',
		},
	])

	const [searchText, setSearchText] = useState('');
	const [darkMode, setDarkMode] = useState(false);

	//getting an item from localstorage

	useEffect(() => {
		const savedDiary = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedDiary) {
			setDiary(savedDiary);
		}
	}, []);



	//setting an item to localstorage

	useEffect(()=>{
		localStorage.setItem(`react-notes-app-data`,JSON.stringify(diary))
	},[diary])

   //add new item

	const addDiary = (text)=>{
		const date = new Date();
		const newDiary = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		}

		const newDiarys = [...diary,newDiary]

		setDiary(newDiarys)
	}

   //delete item

	const deleteDiary = (id)=>{
		const newDiarys = diary.filter((value)=>{
			 return value.id !== id
		})
		setDiary(newDiarys)
	}


	//jsx-------------------------------------------------------
	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes = {
						diary.filter((value)=>{
							return value.text.toLowerCase().includes(searchText)
						})
					}
					handleAddNote={addDiary}
					handleDeleteNote={deleteDiary}
				/>
			</div>
		</div>
	);
};

export default App;
