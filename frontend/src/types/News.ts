export declare interface Source {
	id:   string;
	name: string;
}

export declare interface Article {
	source:			Source;
	author:     	string;  
	title:       	string;   
	description: 	string;  
	url:         	string; 
	urlToImage:  	string;   
	publishedAt: 	string;
	content:     	string;
}