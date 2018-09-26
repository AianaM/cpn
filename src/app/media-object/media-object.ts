import {Realty} from '../realty/realty';

export class MediaObject {
    id: string;
    contentURL: string;
    file?: File;
    createdUser: any;
    createdAt: Date;
    imageSize: number;
    tags: string[];
    users: any;
    realties: Realty[];
    links: {
        squared_thumbnail: string;
        squared_thumbnail_64: string;
    };
}
