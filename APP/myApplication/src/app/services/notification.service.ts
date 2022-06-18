import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../reusable-components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar:MatSnackBar) { 
    
  }
  showNotification(messageText: any,buttonText: any,messageType?: any){
    // this.snackbar.open('Notification','Button Text',{
    //   duration:5000,
    //   horizontalPosition:'center',
    //   verticalPosition:'bottom'
    // })
    if(!messageType)
    {
      messageType = 'info'
    }
    this.snackbar.openFromComponent(NotificationComponent,{
      data:{
message:messageText,
buttonText:buttonText,
messageType:messageType
      },
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }
}
