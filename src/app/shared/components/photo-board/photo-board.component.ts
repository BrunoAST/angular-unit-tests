import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from './interfaces/photo';

@Component({
    selector: 'app-photo-board',
    templateUrl: './photo-board.component.html',
    styleUrls: ['./photo-board.component.scss']
})
export class PhotoBoardComponent implements OnChanges {
    @Input() public photos: Photo[];

    public rows: any[][] = [];

    constructor() { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.photos) {
            this.rows = this._groupColumns(changes.photos.currentValue);
        }
    }

    private _groupColumns(photos: Photo[]): any[][] {
        const newRows = [];
        const step = 4;

        for (let i = 0; i < photos.length; i += step) {
            newRows.push(photos.slice(i, i + step));
        }

        return newRows;
    }
}
