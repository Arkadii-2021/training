import { useState } from 'react';
import { FormTitle } from './FormTitle';
import { search, sortDate } from './calculating';
import TrainingList from './TrainingList';


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
	);
	
	const [date, setDate] = useState({date: ''});
	const [distance, setDistance] = useState({distance: ''});
	
	const handleSubmit = (evt) => {
		evt.preventDefault();

		const checkDateIndex = data.findIndex(item => {
			return item.date === evt.target.date.value
		});

		if (checkDateIndex === -1 && /^\d{2}([.])\d{2}\1\d{4}$/.test(evt.target.date.value)) {
			setData(sortDate([...data.slice(), {
				date: evt.target.date.value,
				distance: +evt.target.distance.value
				}])
			)
		} else if (search(data, {date: evt.target.date.value}).length) {
			data.slice()[checkDateIndex].distance += +evt.target.distance.value;
			setData([...data.slice()]);
			return data.slice();
		}
		setDate({date: ''});
		setDistance({distance: ''});
	};
		
	const addNewDate = ({target}) => {
		const {name, value} = target;
		setDate(prevForm => ({...prevForm, [name]: value}));
	};
	
	const addNewDurate = ({target}) => {
		const {name, value} = target;
		setDistance(prevForm => ({...prevForm, [name]: value}));
	};

	const removeItem = (item) => {
		setData(data => {
			return data.filter(itemData => itemData.date !== item.date)
		})
	};
	
	return (
	<>
		<form onSubmit={ handleSubmit }>
			<div className="form_item">
				<div className="new_date">
					<label className="title_items" htmlFor="date">Дата (ДД.ММ.ГГ)</label>
					<input className="field_to_new_item" id='date' name='date' value={date.date} onChange={addNewDate} />
				</div>
				<div className="new_duration">
					<label className="title_items" htmlFor="distance">Пройдено км</label>
					<input className="field_to_new_item" id='distance' name='distance' value={distance.distance} onChange={addNewDurate} />
				</div>
			<button className="btn_ok" type="submit">ОК</button>
			</div>
		</form>
		<FormTitle />
		<TrainingList items={data} itemRemove={removeItem} />
	</>
	)
};
