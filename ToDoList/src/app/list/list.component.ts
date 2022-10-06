import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListApiServiceService } from '../list-api-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private router: ActivatedRoute,private redirectRoute: Router, private listApi: ListApiServiceService) { }

  listName = "";
  taskName = "";
  task = "";
  toggleCollapse = "collapse";
  flag = true;
  alltasks:any = [];
  nameError = false;
  taskPresent = false;

  ngOnInit(): void {
    this.listName = this.router.snapshot.params['name'];

      this.listApi.getAllTasksByListName(this.listName).subscribe(data => {
      this.alltasks = data;
    });

  }

  submitTask() {
    if(this.validate()){
  
      this.alltasks.push(this.taskName);
      this.listApi.addTask({listName: this.listName, taskName: this.taskName}).subscribe(data => {
        console.log(data);
      }) 
      this.taskName = "";

      console.log(this.alltasks);
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

  deleteList(){
      this.listApi.deleteList(this.listName).subscribe(data => {
        console.log(data);
      });

      this.redirectRoute.navigate(['/']);
  }

  deleteTask(index: number){
    this.task = this.alltasks[index];
    
    this.listApi.deleteTask(this.task).subscribe(data => {
      console.log(data);
    });

    if (index > -1) {
      this.alltasks.splice(index, 1);
   }
  }

  validate(): boolean {
    if(this.taskName.length == 0) 
    {
      this.nameError = true;
      this.taskName = "";
      return false
    }
    else if(this.ifTaskAlreadyExist(this.taskName)){
      this.taskPresent = true;
      this.taskName = "";
      return false
    }
    else{
      this.nameError = false;
      this.taskPresent = false;
      return true;
    }
  }

  ifTaskAlreadyExist(name:string){
    if(this.alltasks.includes(name)){
      return true;
    }
    else{
      return false;
    }
  }

}
