export interface NavigatorData {
	[key: string]: Topic
}

export interface Topic {
	[key: string]: Section
}

export interface Section {
	content: string,
	references: string[]
}
