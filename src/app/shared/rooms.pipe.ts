import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'rooms'
})
export class RoomsPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value === 0 ? 'Студия' : value === 7 ? 'Инд. план.' : !value ? '' : `${value} комн.`;
    }

}
