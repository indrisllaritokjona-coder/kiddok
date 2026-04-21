import re

file_path = r'C:\Users\ggus\Desktop\jona\kiddok\src\app\components\shell.component.ts'
file_path = r'C:\Users\g_gus\Desktop\jona\kiddok\src\app\components\shell.component.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add signals after viewState signal
old_signals = "  viewState = signal<'selector' | 'app'>('selector');"
new_signals = """  viewState = signal<'selector' | 'app'>('selector');

  nameError = signal('');
  nameValidated = signal(false);
  bloodTypeSelected = signal(false);

  isValidName(name: string): boolean {
    return /^[a-zA-Z\\s]+$/.test(name.trim());
  }

  onNameInput(value: string, setter: (v: string) => void) {
    setter(value);
    this.nameValidated.set(true);
    if (value.length > 0 && !this.isValidName(value)) {
      this.nameError.set(this.i18n.isSq() ? 'Emri mund te permbaje vetem shkronja.' : 'Name can only contain letters.');
    } else {
      this.nameError.set('');
    }
  }"""

if old_signals in content:
    content = content.replace(old_signals, new_signals, 1)
    print('Replaced signals block')
else:
    print('NOT FOUND: signals block')
    idx = content.find("viewState")
    print(repr(content[idx:idx+200]))

# 2. Replace saveEditChild
old_save = """  saveEditChild() {
    const child = this.editingChild();
    if (!child || !this.editName || !this.editDob) return;
    // Convert DD/MM/YYYY (form)  YYYY-MM-DD (storage)
    const isoDate = this.toIso(this.editDob, this.i18n.locale());

    this.dataService.updateChild(
      child.id,
      this.editName,
      isoDate,
      child.birthWeight,
      child.deliveryDoctor,
      this.editBloodType || undefined,
    );
    this.closeEditModal();
  }"""

new_save = """  saveEditChild() {
    const child = this.editingChild();
    if (!child || !this.editName || !this.editDob) return;
    if (this.nameValidated() && !this.isValidName(this.editName)) {
      this.nameError.set(this.i18n.isSq() ? 'Emri mund te permbaje vetem shkronja.' : 'Name can only contain letters.');
      return;
    }
    const isoDate = this.toIso(this.editDob, this.i18n.locale());

    this.dataService.updateChildApi(child.id, {
      name: this.editName,
      dateOfBirth: isoDate,
      bloodType: this.editBloodType || undefined,
      birthWeight: child.birthWeight,
      deliveryDoctor: child.deliveryDoctor,
    }).then(() => {
      this.nameError.set('');
      this.closeEditModal();
    }).catch(() => {
      this.nameError.set(this.i18n.isSq() ? 'Ruajtja deshtoi. Provo perseri.' : 'Save failed. Try again.');
    });
  }"""

if old_save in content:
    content = content.replace(old_save, new_save, 1)
    print('Replaced saveEditChild')
else:
    print('NOT FOUND: saveEditChild')

# 3. Replace submitNewChild
old_submit = """  submitNewChild() {
    if (this.newChildName && this.newChildDob) {
      // Convert DD/MM/YYYY (form)  YYYY-MM-DD (storage)
      const isoDate = this.toIso(this.newChildDob, this.i18n.locale());
      this.dataService.addChild(
        this.newChildName,
        isoDate,
        this.newChildBirthWeight ?? undefined,
        this.newChildDeliveryDoctor || undefined,
        this.newChildBloodType || undefined,
      );
      this.isAddingChild.set(false);
      this.newChildName = '';
      this.newChildDob = '';
      this.newChildBirthWeight = null;
      this.newChildDeliveryDoctor = '';
      this.newChildBloodType = '';
    }
  }"""

new_submit = """  submitNewChild() {
    if (!this.newChildName || !this.newChildDob) return;
    if (this.nameValidated() && !this.isValidName(this.newChildName)) {
      this.nameError.set(this.i18n.isSq() ? 'Emri mund te permbaje vetem shkronja.' : 'Name can only contain letters.');
      return;
    }
    const isoDate = this.toIso(this.newChildDob, this.i18n.locale());
    this.dataService.createChild({
      name: this.newChildName,
      dateOfBirth: isoDate,
      birthWeight: this.newChildBirthWeight ?? undefined,
      deliveryDoctor: this.newChildDeliveryDoctor || undefined,
      bloodType: this.newChildBloodType || undefined,
    }).then(() => {
      this.isAddingChild.set(false);
      this.newChildName = '';
      this.newChildDob = '';
      this.newChildBirthWeight = null;
      this.newChildDeliveryDoctor = '';
      this.newChildBloodType = '';
      this.nameError.set('');
      this.nameValidated.set(false);
    }).catch(() => {
      this.nameError.set(this.i18n.isSq() ? 'Ruajtja deshtoi. Provo perseri.' : 'Save failed. Try again.');
    });
  }"""

if old_submit in content:
    content = content.replace(old_submit, new_submit, 1)
    print('Replaced submitNewChild')
else:
    print('NOT FOUND: submitNewChild')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done writing')
