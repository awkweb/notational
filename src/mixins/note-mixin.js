import moment from 'moment'
import 'string_score'

export const noteMixin = {
	methods: {
		createNote (id, title, body = '', dateModified = moment()) {
			return  {
				id: id,
				title: title,
				body: body,
				date_modified: dateModified
			}
		},

		filterNotesForQuery (query, notes) {
			return notes.filter(note => { return note.title.score(query) > 0 || note.body.score(query) > 0 })
		}
	}
}
