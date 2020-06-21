import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
 
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  
  {
    path: "/user",
    title: "User",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/family",
    title: "Family Information",
    icon: "icon-world",
    class: ""
  },
  {
    path: "/education",
    title: "Education",
    icon: "icon-single-copy-04",
    class: ""
  },
  {
    path: "/work-experience",
    title: "Work Experience",
    icon: "icon-laptop",
    class: ""
  }, 
  {
    path: "/gallery-image",
    title: "Gallery Image",
    icon: "icon-camera-18",
    class: ""
  }, 
  {
    path: "/skills",
    title: "Skills",
    icon: "icon-bulb-63",
    class: ""
  },{
    path: "/otherachievement",
    title: "Other Achievement",
    icon: "icon-trophy",
    class: ""
  },{
    path: "/cover-image",
    title: "Cover Image",
    icon: "icon-camera-18",
    class: ""
  }
  /*{
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/home",
    title: "Home",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/portfolio",
    title: "Portfolio",
    icon: "icon-single-02",
    class: ""
  },*/
  
  
  
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  currentUser : any;
  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.currentUser = JSON.parse(sessionStorage.getItem('token'));
    
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

}
