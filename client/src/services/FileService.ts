import $api from '../http/api'
export class FileService {
	static files() {
		return $api.get('files/disk')
	}

	static shared() {
		return $api.get('files/shared')
	}
}
