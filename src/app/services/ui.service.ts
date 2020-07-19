import { HostBinding, Injectable, TemplateRef } from '@angular/core';
import { NbDialogService, NbIconConfig, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public bellIconConfig: NbIconConfig = { icon: 'bell-outline', pack: 'eva' };

  private editMode: boolean = false;

  constructor(private toastrService: NbToastrService, private dialogService: NbDialogService) { }

  @HostBinding('class')
  classes = 'example-items-rows';

  public showSuccess(msg: string) {
    this.toastrService.show(status, msg, { status: 'success' });
  }

  public showError(msg: string) {
    this.toastrService.show(status, msg, { status: 'danger' });
  }

  public setEditMode(val: boolean) {
    this.editMode = val;
  }

  public get isEditMode() {
    return this.editMode;
  }

  public openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
}
