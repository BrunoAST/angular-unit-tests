import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoBoardComponent } from './photo-board.component';
import { PhotoBoardModule } from './photo-board.module';
import { buildPhotoList } from './test/build-photo-list';

describe(PhotoBoardComponent.name, () => {
    let fixture: ComponentFixture<PhotoBoardComponent> = null;
    let component: PhotoBoardComponent = null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PhotoBoardModule]
        }).compileComponents();

        fixture = TestBed.createComponent(PhotoBoardComponent);
        component = fixture.componentInstance;
    });

    it(`Should display rows and columns (@Input photos) as value`, () => {
        component.photos = buildPhotoList();
        fixture.detectChanges();

        const change: SimpleChanges = {
            photos: new SimpleChange([], component.photos, true)
        };
        component.ngOnChanges(change);

        expect(component.rows.length).toBe(2);
        expect(component.rows[0].length)
            .withContext('Number of columns from the first row').toBe(4);
        expect(component.rows[1].length)
            .withContext('Number of columns from the second row').toBe(4);
    });
});
