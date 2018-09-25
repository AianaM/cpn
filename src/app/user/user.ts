export class User {

    static readonly roles = [
        {role: 'ROLE_ADMIN', label: '👑 Администратор', desc: 'чтобы менять права пользоватлей и видеть "поток"'},
        {role: 'ROLE_MANAGER', label: '🎩 Менеджер', desc: 'чтобы видеть "поток"'},
        {role: 'ROLE_TEAMMATE', label: '👒 Карточка сотрудника', desc: 'чтобы профайл появился на странице "Наша команда"'},
        {role: 'ROLE_USER', label: 'Зарегистрированный пользователь', desc: 'Должно быть у всех пользователей', disabled: true}
    ];

    '@id': string;
    '@type': string;
    id: number;
    email: string;
    roles: string[];
    name: {
        lastName: string,
        firstName: string,
        phone: Phone[]
    };
    photo: any;
    teamCard?: TeamCard;
}

export class Phone {
    static readonly phoneTypes = ['Личный', 'Рабочий', 'Другой'];

    number: string = null;
    whatsApp = false;
    type: string = Phone.phoneTypes[0];

}

export class TeamCard {
    static readonly teams = ['Новостройки', 'Готовое жилье'];

    lastName: string = null;
    firstName: string = null;
    phone: Phone[] = [new Phone()];

    photo: any;
    email: string = null;
    team: string = null;
    role: string = null;

    constructor(photo: any) {
        this.photo = photo;
    }
}
