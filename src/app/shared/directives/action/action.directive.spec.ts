import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDirective } from './action.directive';
import { ActionDirectiveModule } from './action.module';

describe(ActionDirective.name, () => {
    let fixture: ComponentFixture<ActionDirectiveTestComponent> = null;
    let component: ActionDirectiveTestComponent = null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActionDirectiveTestComponent],
            imports: [ActionDirectiveModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ActionDirectiveTestComponent);
        component = fixture.componentInstance;
    });

    it(`(D) (@Output appAction) should emit event if payload when enter key is pressed`, () => {
        const element: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const event = new KeyboardEvent('keyup', { key: 'Enter' });
        element.dispatchEvent(event);
        expect(component.hasEvent()).toBeTrue();
    });

    it(`(D) (@Output appAction) should emit event if payload when clicked`, () => {
        const element: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const event = new Event('click');
        element.dispatchEvent(event);
        expect(component.hasEvent()).toBeTrue();
    });
});

@Component({
    template: `
        <div class="dummy-component" (appAction)="actionHandler($event)"></div>
    `
})
class ActionDirectiveTestComponent {
    private event: Event = null;
    
    public actionHandler(event: Event): void {
        this.event = event;
    }

    public hasEvent(): boolean {
        return !!this.event;
    }
}
