export function search(list, query) {
  return list.filter(item => 
    Object.keys(query).every(key => 
      item[key] === query[key])
    );
}


export function sortDate(data) {
	return (data.sort(
		(dateA, dateB) => Date.parse(`${dateB.date.slice(3, -5)}.${dateB.date.slice(0, -8)}.${dateB.date.slice(6)}`) - Date.parse(`${dateA.date.slice(3, -5)}.${dateA.date.slice(0, -8)}.${dateA.date.slice(6)}`)
	));
}