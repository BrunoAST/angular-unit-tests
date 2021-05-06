import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component: LikeWidgetComponent = null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LikeWidgetModule]
        }).compileComponents();

        fixture = TestBed.createComponent(LikeWidgetComponent);
        component = fixture.componentInstance;
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
        fixture.detectChanges();
        expect(component.id).toBeTruthy();
    });

    it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
        const someId = 'someId';
        component.id = someId;
        fixture.detectChanges();
        expect(component.id).toBe(someId);
    });

    it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger (@Output liked) when called`, () => {
        spyOn(component.liked, 'emit');
        fixture.detectChanges();
        component.like();
        expect(component.liked.emit).toHaveBeenCalled();
    });

    it(`(D) Should display number of likes when clicked`, done => {
        fixture.detectChanges();
        component.liked.subscribe(() => {
            component.likes++;
            fixture.detectChanges();
            const counterElement: HTMLElement = fixture
                .nativeElement.querySelector('.like-counter');
            
            expect(counterElement.textContent.trim()).toBe('1');
            done();
        });

        const likeWidgetContainerElement: HTMLElement = fixture
            .nativeElement.querySelector('.like-widget-container');

        likeWidgetContainerElement.click();
    });

    it(`(D) Should display number of likes when ENTER key is pressed`, done => {
        fixture.detectChanges();
        component.liked.subscribe(() => {
            component.likes++;
            fixture.detectChanges();
            const counterElement: HTMLElement = fixture
                .nativeElement.querySelector('.like-counter');
            
            expect(counterElement.textContent.trim()).toBe('1');
            done();
        });

        const likeWidgetContainerElement: HTMLElement = fixture
            .nativeElement.querySelector('.like-widget-container');

        const event = new KeyboardEvent('keyup', { key: 'Enter' });

        likeWidgetContainerElement.dispatchEvent(event);
    });
});
