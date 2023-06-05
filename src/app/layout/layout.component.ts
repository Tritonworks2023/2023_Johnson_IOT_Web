import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
login:any='';
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.login=JSON.parse(sessionStorage.getItem('loginStatus'));

    if((this.login==false )|| (this.login==null)){
      this.router.navigateByUrl('/login')
    }
  }

}
