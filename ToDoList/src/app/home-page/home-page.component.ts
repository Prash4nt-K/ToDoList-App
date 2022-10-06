import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListApiServiceService } from '../list-api-service.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private listApi: ListApiServiceService) { }

  toggleCollapse = "collapse";
  flag = true;
  allLists:any = [];
  listName ="";
  nameError = false;
  listPresent = false;

  ngOnInit(): void {

    this.listApi.getAllLists().subscribe((data)=>{
      this.allLists = data;
      console.log(this.allLists);
    });

  }

  submitList() {
    if(this.validate()){
      this.allLists.push(this.listName);

      this.listApi.addList(this.listName).subscribe(data => {
        console.log(data);
      })      

      this.router.navigate(['list', this.listName]);
      this.listName = "";
    }
  }

  toggleCollapseOnClick() {
    if(this.flag == true){
      this.toggleCollapse = "collapse.show";
      this.flag = !this.flag;
    }
    else{
      this.toggleCollapse = "collapse";
      this.flag = !this.flag;
    }
  }

  validate(): boolean {
    if(this.listName.length == 0) 
    {
      this.nameError = true;
      this.listName = "";
      return false
    }
    else if(this.ifListAlreadyExist(this.listName)){
      this.listPresent = true;
      this.listName = "";
      return false
    }
    else{
      this.nameError = false;
      this.listPresent = false;
      return true;
    }
  }

  ifListAlreadyExist(name:string){
    if(this.allLists.includes(name)){
      return true;
    }
    else{
      return false;
    }
  }

}
