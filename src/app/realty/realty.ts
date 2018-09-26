import {MediaObject} from '../media-object/media-object';
import {User} from '../user/user';

export enum Categories {
    flat = 'Квартира',
    garage = 'Гараж'
    // TODO , 'Участок', 'Дача', 'Дом', 'Деревянный',
}

export enum RealtyStatus {
    reserved = 'Зарезервировано',
    active = 'Активно',
    sold = 'Продано',
    removed = 'Снято с продажи',
}

export class Address {
    ['@id']: string;
    ['@type']: string;
    id: number;
    street: string = null;
    number: string = null;
    district: string = null;
    name: string = null;
    type: string = null;
    developer: string = null;
    newBuilding = false;
    year: number = null;
    floors: number = null;
    description: {
        quarter: string;
        mortgage: string[];
        elevator: boolean;
        feature: string[];
        text: string;
    } = {
        quarter: null,
        mortgage: [],
        elevator: false,
        feature: [],
        text: null
    };

    static get buildingTypes() {
        return ['112 серия', 'Блочный', 'Дерев. б/у', 'Дерев. ч/б',
            'Другое', 'Инд. планировка', 'КПД', 'Малосемейка',
            'Монолитно-каркасный', 'Хрущевка'];
    }

    static get districts() {
        return ['103 квартал(Ростелеком)', '11 квартал', '16 квартал', '202, 203 мкрн.', '26 школа', '31 школа',
            'Авиагруппа', 'Авиапорт', 'Автовокзал', 'Автодорожная', 'Авторынок', 'Апельсин', 'Белое Озеро', 'Борисовка-2', 'Вавилон',
            'Вилюйский тракт', 'Гимеин', 'Глазная больница', 'ГРЭС', 'Даркылах', 'Дом быта', 'Другие пригороды', 'Другие районы',
            'ДСК', 'ДСР', 'Жатай', 'Залог', 'Кангалассы', 'Кирзавод', 'Крестьянский рынок, стадион "Туймаада"', 'Маган',
            'Маганский тракт', 'Манчаары', 'Марха', 'Намский тракт', 'Намцырский тракт', 'Областная больница, рынок "Манньыаттаах"',
            'Площадь Победы', 'Покровский тракт', 'Поселок Газовиков', 'Поселок Геологов, Борисовка-1', 'Пригородный', 'Птицефабрика',
            'Рабочий городок, Водоканал', 'Радиоцентр', 'Рынок Столичный', 'Сайсары', 'Сахацирк', 'Сергеляхское шоссе', 'Старый город',
            'Студгородок', 'Табага', 'Тулагино-Кильдямцы', 'ТЦ "Олонхо"', 'Улус', 'Хатассы', 'Центр - район пл. Дружбы',
            'Центр - район пл. Комсомольская', 'Центр - район пл. Ленина', 'Центр - район пл. Орджоникидзе', 'ЯГИТИ', 'ЯГСХА', 'ЯКСМК'];
    }

    static get developers() {
        return ['АО ДСК ', 'АО Республиканское ипотечное агентство (РИА)',
            'АЭБ Капитал, ООО', 'Арктик Комфорт +', 'Высота, ООО',
            'ГУП Комитет по драгоценным металлам и драгоценным камням Республики Саха(Якутия)',
            'Голдлайн, ООО', 'Делайн, ООО', 'Домостроительный комбинат, АО', 'Жилищно - строительная компания, ООО',
            'ИНКОМ, ООО', 'ИФК РФА - Инвест, АО', 'ИнвестСтрой, ООО', 'Интер - Континенталь, ООО',
            'Ир - строй, ООО', 'КапиталСтрой, ООО', 'ЛенаТрансСервис, ООО', 'МУП Агентство по развитию территорий',
            'Монолит Строй, ООО', 'Новая Якутия, ООО', 'НордСтрой, ООО', 'ООО "Стройкон"', 'ООО Прометей',
            'Оптима - Строй, ООО', 'ПКФ Ормикс, ООО', 'Полипрофиль, ООО', 'РИК, АО', 'СЭТТЭ, ООО ДСО', 'СахаКластер, ООО',
            'Север - Строй, ООО', 'Северная строительная компания, ООО', 'Симиир, ООО', 'СпецСнаб, ООО', 'Стрела, ООО',
            'Строй - Индустрия, ООО', 'Строймонтаж - 2002, ООО', 'Товары Саха Якутместпрома, ООО', 'Транстрой, ООО',
            'ЯкутИнвестСтрой, ООО', 'Якутпромстрой, ЗАО'];
    }

    static get quarters() {
        return ['I квартал', 'II квартал', 'III квартал', 'IV квартал'];
    }

    static get floorsArr() {
        return Array.from({length: 16}, (x, i) => i + 1);
    }

    static get features() {
        return [
            {name: 'Отопление', value: ['автономное']},
            {name: 'Коммуникации', value: ['интернет', 'телефон', 'кабельное тв']},
        ];
    }
}

export const BANKS = ['АКБ Алмазэргиэнбанк АО', 'Республиканское ипотечное агентство АО', 'Россельхозбанк ОАО',
    'Газпромбанк ОАО', 'Азиатско-Тихоокеанский банк ОАО', 'МТС-банк ОАО',
    'Сбербанк России ОАО', 'ПАО АКБ Связь-Банк', 'ПАО ВТБ', 'АИЖК', 'СКБ'
];

export class Owner {
    name: string = null;
    phone: {
        number: string;
        whatsApp: boolean;
        type: string;
    }[] = [{
        number: null,
        whatsApp: false,
        type: null,
    }];
}

export class HiddenInfo {
    flat: string = null;
    entrance: string = null;
    fee: string = null;
    haggle = false;
    note: string = null;
    encumbranceBank: string = null;
    encumbranceAmount: number = null;
    maternalCapital = false;
    shareProperty = false;
    ownershipLessThan3years = false;
}

export class Realty {
    id: string;
    category: Categories = Categories.flat;
    area: number;
    price: number;
    rooms: number;
    floor: number;
    status: RealtyStatus = RealtyStatus.reserved;
    address: Address = new Address();
    cadastralNumber: string = null;
    fee: number = null;
    exclusive = false;
    hiddenInfo: HiddenInfo = new HiddenInfo();
    owner: Owner = new Owner();
    mediaObjects: MediaObject[] = [];
    manager: User;
    updatedUser: User;
    updatedAt: Date;
    description: {
        balconyArea: number;
        feature: string[];
        text: string;
    } = {
        balconyArea: null,
        feature: [],
        text: null
    };

    static get categories() {
        return Object.values(Categories);
    }

    static get statuses() {
        return Object.values(RealtyStatus);
    }

    static get roomsArr() {
        return Array.from({length: 8}, (x, i) => i);
    }

    static get features() {
        return [
            {name: 'Окна', value: ['во двор', 'на улицу', 'стеклопакет']},
            {name: 'Балкон', value: ['остеклен', 'не остеклен', 'отсутствует']},
            {name: 'Санузел', value: ['совмещенный', 'разделенный', 'c/y отсутствует']},
            {name: 'Полы', value: ['ламинат', 'линнолиум', 'плитка']},
            {name: 'Потолок', value: ['побелка', 'натяжные', 'панели и плиты']},
            {name: 'Стены', value: ['покраска', 'обои']},
        ];
    }
}
