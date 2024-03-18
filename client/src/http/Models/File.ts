export default interface MyFile {
	file_id: string | number
	file_name: string
	author: string
	accesses: AccessFile
}

interface AccessFile {
	fullname: string
	email: string
	type: string
}
