import { Component } from '@angular/core';
import { TranslationService } from '../api/translation.service';
import { LoadingController } from '@ionic/angular';
import { HistoryRecord } from '../models/history-record.model';
import { HistoryService } from '../api/history.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page
{
  myinput:String = ''
  myoutput:String = ''
  loadingDialog:any

  constructor(private translationService: TranslationService, public loadingController: LoadingController, private historyService: HistoryService) {}

  public btnTranslateClicked():void
  {
    if(this.myinput.length >= 2)
    {
      this.presentLoading();
      this.translationService.getTranslation(this.myinput).subscribe((data)=>
      {
        this.myoutput = data['responseData']['translatedText'];
        let record = new HistoryRecord(this.myinput, this.myoutput);
        this.historyService.saveRecord(record);
        this.loadingDialog.dismiss();
      });
    }
  }

  async presentLoading() 
  {
    this.loadingDialog = await this.loadingController.create(
    {
      message: 'Translating', 
    });
    await this.loadingDialog.present();
  }
}
