import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckService } from '../../../../services/check.service';

@Component({
  selector: 'app-view-check',
  templateUrl: './view-check.page.html',
  styleUrls: ['./view-check.page.scss'],
})
export class ViewCheckPage implements OnInit {

  constructor(private route:ActivatedRoute,
              private _checkService: CheckService
              ) { }

  check_id:any;
  check_view_data:any;
  showLoadingSpinner:boolean=false;

  ngOnInit() {
    this.check_view_data=null;
    this.check_id = this.route.snapshot.paramMap.get("id");
    this.loadCheckView();

  }

  loadCheckView(){
    this.showLoadingSpinner =true;
    this._checkService.getCheckView(this.check_id).subscribe( res =>{
      this.check_view_data =res.data;
      this.showLoadingSpinner =false;
    });
  }

}
