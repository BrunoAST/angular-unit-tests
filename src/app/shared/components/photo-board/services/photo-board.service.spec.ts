import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PhotoBoardService } from './photo-board.service';

const mockData = {
    api: 'http://localhost:3000/photos',
    data: [
        {
            id: 1,
            description: 'Example 1',
            src: ''
        },
        {
            id: 2,
            description: 'Example 2',
            src: ''
        },
    ]
};

describe(PhotoBoardService.name, () => {
    let service: PhotoBoardService = null;
    let httpController: HttpTestingController = null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PhotoBoardService]
        }).compileComponents();

        service = TestBed.inject(PhotoBoardService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it(`#${PhotoBoardService.prototype.getPhotos.name} should return photos with description in uppercase`, done => {
        service.getPhotos().subscribe(photos => {
            expect(photos[0].description).toBe('EXAMPLE 1');
            expect(photos[0].description).toBe('EXAMPLE 2');
            done();
        });

        httpController.expectOne(mockData.api).flush(mockData.data);
    });
});
