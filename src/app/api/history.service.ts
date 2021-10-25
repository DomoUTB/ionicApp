import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage';
import { HistoryRecord } from '../models/history-record.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService 
{
  historyArray: HistoryRecord[] = []
  
  constructor(private storage: Storage) { }

  public saveRecord(record: HistoryRecord)
  {
    this.historyArray.unshift(record);
    this.storage.set('history', JSON.stringify(this.historyArray));
  } 
} 