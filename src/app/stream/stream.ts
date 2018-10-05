export class Stream {
    static items = [
        {name: 'Недвижимость', value: 'Realty'},
        {name: 'Пользователи', value: 'User'},
        {name: 'Адрес', value: 'Address'},
        {name: 'Файл', value: 'MediaObject'}
    ];
}

export class StreamFilter {
    action: string = null;
    item: string = null;
    itemId: number = null;
}
