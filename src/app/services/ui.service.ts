import { HostBinding, Injectable } from '@angular/core';
import { NbIconConfig, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public bellIconConfig: NbIconConfig = { icon: 'bell-outline', pack: 'eva' };

  private editMode: boolean = false;

  constructor(private toastrService: NbToastrService) { }

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
}
