import { v4 } from 'uuid';


export default function TrainingList({items, itemRemove}) {
	return (
		<div className="container">
			{items.map(item => {
				return (
					<div className="blocks" key={v4()}>
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