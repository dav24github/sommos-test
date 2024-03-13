import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menu: any = [
    {
      label: 'Client',
      route: 'admin/client',
    },
    {
      label: 'Foods',
      route: 'admin/foods',
    },
  ];
}
