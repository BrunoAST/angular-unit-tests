import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
    let fixture: ComponentFixture<PhotoFrameComponent> = null;
    let component: PhotoFrameComponent;
    
    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [PhotoFrameModule]
        });

        fixture = TestBed.createComponent(PhotoFrameComponent);
        component = fixture.componentInstance;
    });

    it(`Should create component`, () => {
        expect(component).toBeTruthy();
    });

    it(`#${PhotoFrameComponent.prototype.like.name} should
        trigger (@output liked) once when called multiple
        times with debounce time`, fakeAsync(() => {
            fixture.detectChanges();
            let times = 0;
            component.liked.subscribe(() => times++);
            component.like();
            component.like();
            tick(5000);
            expect(times).toBe(1);
    }));

    it(`#${PhotoFrameComponent.prototype.like.name} should
        trigger (@output liked) two times when called outside
        debounce time`, fakeAsync(() => {
            fixture.detectChanges();
            let times = 0;
            component.liked.subscribe(() => times++);
            component.like();
            tick(5000);
            component.like();
            tick(5000);
            expect(times).toBe(2);
    }));

    it(`Should display number of likes em (@Input likes) is incremented`, () => {
        fixture.detectChanges();
        component.likes++;
        fixture.detectChanges();
        const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
        expect(element.textContent.trim()).toBe('1');
    });

    it(`(D) Should update aria-label when (@likes) is incremented`, () => {
        fixture.detectChanges();
        component.likes++;
        fixture.detectChanges();
        const element: HTMLElement = fixture.nativeElement.querySelector('span');
        expect(element.getAttribute('aria-label')).toBe('1: people liked');
    });

    it(`(D) Should have aria-label with 0 (@Input likes)`, () => {
        fixture.detectChanges();
        const element: HTMLElement = fixture.nativeElement.querySelector('span');
        expect(element.getAttribute('aria-label')).toBe('0: people liked');
    });

    it(`(D) Should display image with src and description when bound to properties`, () => {
        const description = 'some description';
        const src = 'http://somesite.com/img.jpg';
        component.description = description;
        component.src = src;
        fixture.detectChanges();
        const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
        expect(img.getAttribute('src')).toBe(src);
        expect(img.getAttribute('alt')).toBe(description);
    });
});
