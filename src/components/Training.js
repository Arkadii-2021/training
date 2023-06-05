import {useState} from 'react'


export default function Training() {
	const [data, setData] = useState(
		[{
			date: '04.06.2023',
			distance: 5.1
		},
		{
			date: '05.06.2023',
			distance: 4.6
		}]
	)
	
	const [date, setDate] = useState({date: ''});
	const [distance, setdistance] = useState({distance: ''});
	
	const handleSubmit = (evt) => {
		evt.preventDefault();
	
		const checkDateIndex = data.findIndex(item => {
			return item.date === evt.target[0].value
		})

		if (checkDateIndex === -1 && /^\d{2}([.])\d{2}\1\d{4}$/.test(evt.target[0].value)) {
			setData([...data.slice(), {
			date: evt.target[0].value,
			distance: +evt.target[1].value
			}])
			setDate({date: ''});
			setdistance({distance: ''});
			return data.slice()
		} else {
			setDate({date: ''});
			setdistance({distance: ''});
			return data.slice()
		}
	}	
	
	sortDate(data);
	
	const addNewDate = ({target}) => {
		const {name, value} = target;
		setDate(prevForm => ({...prevForm, [name]: value}));
	}
	
	const addNewDurate = ({target}) => {
		const {name, value} = target;
		setdistance(prevForm => ({...prevForm, [name]: value}));
	}

	const removeItem = (item) => {
		setData(data => {
			return data.filter(itemData => itemData.date !== item.date)
		})
	}
	
	return (
	<>
		<form onSubmit={handleSubmit}>
			<div className="form_item">
				<div className="new_date">
					<label className="title_items" htmlFor="setData">Дата (ДД.ММ.ГГ)</label>
					<input className="field_to_new_item" id='setData' name='date' value={date.date} onChange={addNewDate} />
				</div>
				<div className="new_duration">
					<label className="title_items" htmlFor="distance">Пройдено км</label>
					<input className="field_to_new_item" id='distance' name='distance' value={distance.distance} onChange={addNewDurate} />
				</div>
			<button className="btn_ok" type="submit">ОК</button>
			</div>
		</form>
		<div className="container">
			<div className="blocks">
				<div className="block">
					<div className="title_items">Дата (ДД.ММ.ГГ)</div>
				</div>
				<div className="block">
					<div className="title_items">Пройдено км</div>
				</div>
				   <div className="block">
					<div className="title_items">Действия</div>
				</div>
			</div>
		</div>
		<TrainingList items={data} itemRemove={removeItem}/>
	</>
	)
}


function sortDate(data) {
	return (data.sort(
		(dateA, dateB) => Date.parse(dateA.date) - Date.parse(dateB.date)
	));
}


function TrainingList({ items, itemRemove }) {
	return (
		<div className="container">
			{items.map(item => {
				return (
					<div className="blocks" key={item.date}>
						<div className="block">
							<div className="title_items">{item.date}</div>
						</div>
						<div className="block">
							<div className="title_items">{item.distance}</div>
						</div>
						   <div className="block">
							<div className="remove_item"><div onClick={() => itemRemove(item)}>✘</div></div>
						</div>
					</div>
				)
			})}	
		</div>		
	)
}
