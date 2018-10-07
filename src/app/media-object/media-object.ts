import {Realty} from '../realty/realty';
import {User} from '../user/user';

export class MediaObject {
    id: string;
    contentURL: string;
    file?: File;
    createdUser: User;
    createdAt: Date;
    imageSize: number;
    tags: string[];
    users: any;
    realties: Realty[];
    links: {
        squared_thumbnail: string;
        squared_thumbnail_64: string;
        thumbnail_1080: string;
    };
}

export class MediaObjectFilter {
    createdUser: User;
    createdAt: Date = new Date();
    tags: string[] = [];
    tag: string = null;
    realtyId: number = null;
    itemsPerPage = 8;
}
