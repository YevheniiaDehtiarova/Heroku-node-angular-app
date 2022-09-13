import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('floating') floatingRef: ElementRef;

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analytics', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавление заказа'},
    {url: '/category', name: 'Ассортимент'},
  ]

  constructor(private auth: AuthService,
              private router: Router) { }

  ngAfterViewInit(): void {
   MaterialService.initializeFloatingButton(this.floatingRef)
  }

  ngOnInit(): void {
  }
  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
