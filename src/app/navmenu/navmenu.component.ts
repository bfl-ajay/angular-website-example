import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';

interface MenuItem {
	link: string;
	title: string;
}

@Component({
	selector: 'app-navmenu',
	templateUrl: './navmenu.component.html',
	standalone: true,
	imports: [RouterLinkActive, RouterLink, NgForOf],
})
export class NavmenuComponent {
	@Input() menu: MenuItem[] = [];
	@Input() menuOpen: boolean = false;
	@Output() menuStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

	toggleMenu(): void {
		this.menuStatus.emit(!this.menuOpen);
	}
}
