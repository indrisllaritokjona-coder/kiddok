import {
  DomSanitizer
} from "./chunk-NQDOAGAV.js";
import {
  CommonModule,
  DefaultValueAccessor,
  FormsModule,
  LucideAngularComponent,
  LucideAngularModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService
} from "./chunk-RD3QEML6.js";
import {
  Component,
  __async,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SFGRG2UU.js";

// src/app/components/lab-results/lab-results.component.ts
var _c0 = () => [1, 2, 3];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.value;
function LabResultsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r0.activeChild()) == null ? null : tmp_1_0.name);
  }
}
function LabResultsComponent_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13);
    \u0275\u0275element(2, "div", 14);
    \u0275\u0275elementStart(3, "div", 15);
    \u0275\u0275element(4, "div", 16)(5, "div", 17);
    \u0275\u0275elementEnd()()();
  }
}
function LabResultsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, LabResultsComponent_Conditional_10_For_2_Template, 6, 0, "div", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function LabResultsComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 18);
    \u0275\u0275element(2, "circle", 19)(3, "path", 20)(4, "circle", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h3", 22);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 24);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_11_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openAddModal());
    });
    \u0275\u0275element(10, "lucide-icon", 25);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.empty"] || "Nuk ka rezultate laboratorike", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.emptyHint"] || "Shtoni rezultatet e testimit p\xEBr t\xEB ndjekur sh\xEBndetin", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.addFirst"] || "Shto rezultatin e par\xEB", " ");
  }
}
function LabResultsComponent_Conditional_12_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lr_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(lr_r4.unit);
  }
}
function LabResultsComponent_Conditional_12_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lr_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18n.t()["labResults.refRange"] || "Ref", ": ", lr_r4.referenceRange, " ");
  }
}
function LabResultsComponent_Conditional_12_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "span", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lr_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getTypeLabel(lr_r4.type), " ");
  }
}
function LabResultsComponent_Conditional_12_For_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275element(1, "lucide-icon", 51);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lr_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(lr_r4.doctor);
  }
}
function LabResultsComponent_Conditional_12_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 52);
    \u0275\u0275element(2, "lucide-icon", 53);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lr_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", lr_r4.attachments.length, " ", ctx_r0.i18n.t()["labResults.attachments"] || "Dokumente", " ");
  }
}
function LabResultsComponent_Conditional_12_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lr_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", lr_r4.notes, " ");
  }
}
function LabResultsComponent_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "div", 28)(3, "div", 29);
    \u0275\u0275element(4, "lucide-icon", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 31)(6, "div", 32)(7, "h3", 33);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 34);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 35)(12, "span", 36);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, LabResultsComponent_Conditional_12_For_2_Conditional_14_Template, 2, 1, "span", 37);
    \u0275\u0275conditionalCreate(15, LabResultsComponent_Conditional_12_For_2_Conditional_15_Template, 2, 2, "span", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, LabResultsComponent_Conditional_12_For_2_Conditional_16_Template, 3, 1, "div", 39);
    \u0275\u0275conditionalCreate(17, LabResultsComponent_Conditional_12_For_2_Conditional_17_Template, 4, 1, "div", 40);
    \u0275\u0275conditionalCreate(18, LabResultsComponent_Conditional_12_For_2_Conditional_18_Template, 4, 2, "div", 41);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, LabResultsComponent_Conditional_12_For_2_Conditional_19_Template, 2, 1, "div", 42);
    \u0275\u0275elementStart(20, "div", 43)(21, "button", 44);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_12_For_2_Template_button_click_21_listener() {
      const lr_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openViewModal(lr_r4));
    });
    \u0275\u0275element(22, "lucide-icon", 45);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 46);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_12_For_2_Template_button_click_24_listener() {
      const lr_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openEditModal(lr_r4));
    });
    \u0275\u0275element(25, "lucide-icon", 47);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 48);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_12_For_2_Template_button_click_27_listener() {
      const lr_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.confirmDelete(lr_r4));
    });
    \u0275\u0275element(28, "lucide-icon", 49);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const lr_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(lr_r4.testName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(lr_r4.date), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(lr_r4.result);
    \u0275\u0275advance();
    \u0275\u0275conditional(lr_r4.unit ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(lr_r4.referenceRange ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(lr_r4.type ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(lr_r4.doctor ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(lr_r4.attachments && lr_r4.attachments.length > 0 ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(lr_r4.notes ? 19 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.view"] || "Shiko Detajet", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medications.edit"] || "Redakto", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.delete"] || "Fshi", " ");
  }
}
function LabResultsComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, LabResultsComponent_Conditional_12_For_2_Template, 30, 12, "div", 26, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.labResults());
  }
}
function LabResultsComponent_Conditional_13_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r6 = ctx.$implicit;
    \u0275\u0275property("value", opt_r6.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r6.label);
  }
}
function LabResultsComponent_Conditional_13_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_13_Conditional_58_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const fileInput_r8 = \u0275\u0275reference(7);
      return \u0275\u0275resetView(fileInput_r8.click());
    })("dragover", function LabResultsComponent_Conditional_13_Conditional_58_Template_div_dragover_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onDragOver($event));
    })("dragleave", function LabResultsComponent_Conditional_13_Conditional_58_Template_div_dragleave_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onDragLeave($event));
    })("drop", function LabResultsComponent_Conditional_13_Conditional_58_Template_div_drop_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onDrop($event));
    });
    \u0275\u0275element(1, "lucide-icon", 80);
    \u0275\u0275elementStart(2, "p", 81);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 82);
    \u0275\u0275text(5, "PDF, PNG, JPG, WebP \xB7 max 10MB");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "input", 83, 0);
    \u0275\u0275listener("change", function LabResultsComponent_Conditional_13_Conditional_58_Template_input_change_6_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["labResults.dropZoneHint"] || "Zv\xEBre dokumentin ose kliko p\xEBr t\xEB zgjedhur");
  }
}
function LabResultsComponent_Conditional_13_Conditional_59_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 86);
  }
}
function LabResultsComponent_Conditional_13_Conditional_59_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 87);
  }
}
function LabResultsComponent_Conditional_13_Conditional_59_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 84)(1, "div", 85);
    \u0275\u0275conditionalCreate(2, LabResultsComponent_Conditional_13_Conditional_59_For_2_Conditional_2_Template, 1, 0, "lucide-icon", 86)(3, LabResultsComponent_Conditional_13_Conditional_59_For_2_Conditional_3_Template, 1, 0, "lucide-icon", 87);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 31)(5, "p", 88);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 89);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 90);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_13_Conditional_59_For_2_Template_button_click_9_listener() {
      const $index_r10 = \u0275\u0275restoreView(_r9).$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removePendingFile($index_r10));
    });
    \u0275\u0275element(10, "lucide-icon", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(file_r11.mimeType === "application/pdf" ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(file_r11.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatFileSize(file_r11.size));
  }
}
function LabResultsComponent_Conditional_13_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275repeaterCreate(1, LabResultsComponent_Conditional_13_Conditional_59_For_2_Template, 11, 3, "div", 84, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.pendingFiles());
  }
}
function LabResultsComponent_Conditional_13_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.fileError(), " ");
  }
}
function LabResultsComponent_Conditional_13_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saveError(), " ");
  }
}
function LabResultsComponent_Conditional_13_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 92);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.saving"] || "Duke ruajtur...", " ");
  }
}
function LabResultsComponent_Conditional_13_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 93);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.save"] || "Ruaj", " ");
  }
}
function LabResultsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_13_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 55);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_13_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 56)(3, "h2", 57);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 58);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275element(6, "lucide-icon", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 60)(8, "div")(9, "label", 61);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function LabResultsComponent_Conditional_13_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formTestName, $event) || (ctx_r0.formTestName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 61);
    \u0275\u0275text(14);
    \u0275\u0275elementStart(15, "span", 63);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "select", 64);
    \u0275\u0275twoWayListener("ngModelChange", function LabResultsComponent_Conditional_13_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formType, $event) || (ctx_r0.formType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(18, "option", 65);
    \u0275\u0275text(19, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(20, LabResultsComponent_Conditional_13_For_21_Template, 2, 2, "option", 66, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 67)(23, "div")(24, "label", 61);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function LabResultsComponent_Conditional_13_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formResult, $event) || (ctx_r0.formResult = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div")(28, "label", 61);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function LabResultsComponent_Conditional_13_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formUnit, $event) || (ctx_r0.formUnit = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div")(32, "label", 61);
    \u0275\u0275text(33);
    \u0275\u0275elementStart(34, "span", 63);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function LabResultsComponent_Conditional_13_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formReferenceRange, $event) || (ctx_r0.formReferenceRange = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div")(38, "label", 61);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "input", 71);
    \u0275\u0275twoWayListener("ngModelChange", function LabResultsComponent_Conditional_13_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formDate, $event) || (ctx_r0.formDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div")(42, "label", 61);
    \u0275\u0275text(43);
    \u0275\u0275elementStart(44, "span", 63);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function LabResultsComponent_Conditional_13_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formDoctor, $event) || (ctx_r0.formDoctor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div")(48, "label", 61);
    \u0275\u0275text(49);
    \u0275\u0275elementStart(50, "span", 63);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "textarea", 72);
    \u0275\u0275twoWayListener("ngModelChange", function LabResultsComponent_Conditional_13_Template_textarea_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formNotes, $event) || (ctx_r0.formNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div")(54, "label", 61);
    \u0275\u0275text(55);
    \u0275\u0275elementStart(56, "span", 63);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(58, LabResultsComponent_Conditional_13_Conditional_58_Template, 8, 1);
    \u0275\u0275conditionalCreate(59, LabResultsComponent_Conditional_13_Conditional_59_Template, 3, 0, "div", 73);
    \u0275\u0275conditionalCreate(60, LabResultsComponent_Conditional_13_Conditional_60_Template, 2, 1, "div", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(61, LabResultsComponent_Conditional_13_Conditional_61_Template, 2, 1, "div", 75);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 76)(63, "button", 77);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_13_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275text(64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "button", 78);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_13_Template_button_click_65_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveLabResult());
    });
    \u0275\u0275conditionalCreate(66, LabResultsComponent_Conditional_13_Conditional_66_Template, 2, 1)(67, LabResultsComponent_Conditional_13_Conditional_67_Template, 2, 1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.editingResult() ? ctx_r0.i18n.t()["labResults.editResult"] || "Redakto Rezultatin" : ctx_r0.i18n.t()["labResults.addResult"] || "Shto Rezultat Laboratori", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.testName"] || "Emri i Testit", " * ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formTestName);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["labResults.testNamePlaceholder"] || "P.sh. Gjak i plot\xEB");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.type"] || "Lloji i Testit", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["labResults.optional"] || "opsionale", ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formType);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.getTypeOptions());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.result"] || "Rezultati", " * ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formResult);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.unit"] || "Nj\xEBsia", " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formUnit);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.referenceRange"] || "Vlera Referente", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["labResults.optional"] || "opsionale", ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formReferenceRange);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.date"] || "Data e Testit", " * ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formDate);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.doctor"] || "Doktori", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["labResults.optional"] || "opsionale", ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formDoctor);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["labResults.doctorPlaceholder"] || "P.sh. Dr. Arben Basha");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.notes"] || "Sh\xEBnime", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["labResults.optional"] || "opsionale", ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formNotes);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["labResults.notesPlaceholder"] || "Sh\xEBno detajet shtes\xEB...");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.attachments"] || "Dokumente", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["labResults.optional"] || "opsionale", ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.pendingFiles().length < ctx_r0.MAX_FILES ? 58 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.pendingFiles().length > 0 ? 59 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.fileError() ? 60 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saveError() ? 61 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.cancel"] || "Anulo", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving() || !ctx_r0.canSave());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 66 : 67);
  }
}
function LabResultsComponent_Conditional_14_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 99);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.viewingResult().unit);
  }
}
function LabResultsComponent_Conditional_14_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 100)(1, "p", 105);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 106);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["labResults.type"] || "Lloji i Testit");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getTypeLabel(ctx_r0.viewingResult().type));
  }
}
function LabResultsComponent_Conditional_14_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 100)(1, "p", 105);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 106);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["labResults.referenceRange"] || "Vlera Referente");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.viewingResult().referenceRange);
  }
}
function LabResultsComponent_Conditional_14_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101);
    \u0275\u0275element(1, "lucide-icon", 107);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.viewingResult().doctor);
  }
}
function LabResultsComponent_Conditional_14_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 97)(1, "p", 98);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 108);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["labResults.notes"] || "Sh\xEBnime");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.viewingResult().notes);
  }
}
function LabResultsComponent_Conditional_14_Conditional_24_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 112)(1, "div", 85);
    \u0275\u0275element(2, "lucide-icon", 113);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 31)(4, "p", 114);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 115)(7, "button", 116);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_14_Conditional_24_For_6_Template_button_click_7_listener() {
      const att_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.viewAttachment(att_r14));
    });
    \u0275\u0275element(8, "lucide-icon", 117);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 118);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_14_Conditional_24_For_6_Template_button_click_9_listener() {
      const ctx_r14 = \u0275\u0275restoreView(_r13);
      const att_r14 = ctx_r14.$implicit;
      const $index_r16 = ctx_r14.$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.downloadAttachment(att_r14, $index_r16));
    });
    \u0275\u0275element(10, "lucide-icon", 119);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const $index_r16 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r0.i18n.t()["labResults.attachments"] || "Dokumenti", " ", $index_r16 + 1);
  }
}
function LabResultsComponent_Conditional_14_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102)(1, "div", 109)(2, "p", 110);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 111);
    \u0275\u0275repeaterCreate(5, LabResultsComponent_Conditional_14_Conditional_24_For_6_Template, 11, 2, "div", 112, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18n.t()["labResults.attachments"] || "Dokumente", " (", ctx_r0.viewingResult().attachments.length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.viewingResult().attachments);
  }
}
function LabResultsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_14_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewingResult.set(null));
    });
    \u0275\u0275elementStart(1, "div", 94);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_14_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 56)(3, "h2", 57);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 58);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_14_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewingResult.set(null));
    });
    \u0275\u0275element(6, "lucide-icon", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 95)(8, "div", 96)(9, "div", 97)(10, "p", 98);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 36);
    \u0275\u0275text(13);
    \u0275\u0275conditionalCreate(14, LabResultsComponent_Conditional_14_Conditional_14_Template, 2, 1, "span", 99);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 97)(16, "p", 98);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p", 36);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(20, LabResultsComponent_Conditional_14_Conditional_20_Template, 5, 2, "div", 100);
    \u0275\u0275conditionalCreate(21, LabResultsComponent_Conditional_14_Conditional_21_Template, 5, 2, "div", 100);
    \u0275\u0275conditionalCreate(22, LabResultsComponent_Conditional_14_Conditional_22_Template, 4, 1, "div", 101);
    \u0275\u0275conditionalCreate(23, LabResultsComponent_Conditional_14_Conditional_23_Template, 5, 2, "div", 97);
    \u0275\u0275conditionalCreate(24, LabResultsComponent_Conditional_14_Conditional_24_Template, 7, 2, "div", 102);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 103)(26, "button", 104);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_14_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewingResult.set(null));
    });
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.viewingResult().testName, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["labResults.result"] || "Rezultati");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.viewingResult().result, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.viewingResult().unit ? 14 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["labResults.date"] || "Data");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(ctx_r0.viewingResult().date));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.viewingResult().type ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.viewingResult().referenceRange ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.viewingResult().doctor ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.viewingResult().notes ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.viewingResult().attachments && ctx_r0.viewingResult().attachments.length > 0 ? 24 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.close"] || "Mbyll", " ");
  }
}
function LabResultsComponent_Conditional_15_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 129);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.getPdfUrl(ctx_r0.viewingAttachment()), \u0275\u0275sanitizeResourceUrl);
  }
}
function LabResultsComponent_Conditional_15_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 130);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.viewingAttachment(), \u0275\u0275sanitizeUrl);
  }
}
function LabResultsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 120);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_15_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewingAttachment.set(null));
    });
    \u0275\u0275elementStart(1, "div", 121);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_15_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 122)(3, "p", 123);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 124)(6, "button", 125);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_15_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.downloadAttachment(ctx_r0.viewingAttachment(), 0));
    });
    \u0275\u0275element(7, "lucide-icon", 119);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 126);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_15_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewingAttachment.set(null));
    });
    \u0275\u0275element(9, "lucide-icon", 127);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 128);
    \u0275\u0275conditionalCreate(11, LabResultsComponent_Conditional_15_Conditional_11_Template, 1, 1, "iframe", 129)(12, LabResultsComponent_Conditional_15_Conditional_12_Template, 1, 1, "img", 130);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["labResults.viewAttachment"] || "Shiko Dokumentin");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r0.isPdfAttachment(ctx_r0.viewingAttachment()) ? 11 : 12);
  }
}
function LabResultsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_16_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showDeleteModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 131);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_16_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 132);
    \u0275\u0275element(3, "lucide-icon", 133);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 134);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 135);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 136)(9, "button", 137);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_16_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showDeleteModal.set(false));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 138);
    \u0275\u0275listener("click", function LabResultsComponent_Conditional_16_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.deleteLabResult());
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.deleteConfirmTitle"] || "Fshij Rezultatin?", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx_r0.deletingResult()) == null ? null : tmp_2_0.testName, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.cancel"] || "Anulo", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["labResults.delete"] || "Fshi", " ");
  }
}
var MAX_FILE_SIZE = 10 * 1024 * 1024;
var MAX_FILES = 5;
var ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp"];
var LabResultsComponent = class _LabResultsComponent {
  constructor() {
    this.i18n = inject(I18nService);
    this.data = inject(DataService);
    this.sanitizer = inject(DomSanitizer);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showDeleteModal = signal(false, ...ngDevMode ? [{ debugName: "showDeleteModal" }] : (
      /* istanbul ignore next */
      []
    ));
    this.viewingResult = signal(null, ...ngDevMode ? [{ debugName: "viewingResult" }] : (
      /* istanbul ignore next */
      []
    ));
    this.deletingResult = signal(null, ...ngDevMode ? [{ debugName: "deletingResult" }] : (
      /* istanbul ignore next */
      []
    ));
    this.editingResult = signal(null, ...ngDevMode ? [{ debugName: "editingResult" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saveError = signal(null, ...ngDevMode ? [{ debugName: "saveError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.fileError = signal(null, ...ngDevMode ? [{ debugName: "fileError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.viewingAttachment = signal(null, ...ngDevMode ? [{ debugName: "viewingAttachment" }] : (
      /* istanbul ignore next */
      []
    ));
    this.pendingFiles = signal([], ...ngDevMode ? [{ debugName: "pendingFiles" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isDragOver = signal(false, ...ngDevMode ? [{ debugName: "isDragOver" }] : (
      /* istanbul ignore next */
      []
    ));
    this.MAX_FILES = MAX_FILES;
    this.formTestName = signal("", ...ngDevMode ? [{ debugName: "formTestName" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formResult = signal("", ...ngDevMode ? [{ debugName: "formResult" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formUnit = signal("", ...ngDevMode ? [{ debugName: "formUnit" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formReferenceRange = signal("", ...ngDevMode ? [{ debugName: "formReferenceRange" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formDate = signal("", ...ngDevMode ? [{ debugName: "formDate" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formDoctor = signal("", ...ngDevMode ? [{ debugName: "formDoctor" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formNotes = signal("", ...ngDevMode ? [{ debugName: "formNotes" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formType = signal("", ...ngDevMode ? [{ debugName: "formType" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeChild = computed(() => {
      const id = this.data.activeChildId();
      return this.data.children().find((c) => c.id === id) ?? null;
    }, ...ngDevMode ? [{ debugName: "activeChild" }] : (
      /* istanbul ignore next */
      []
    ));
    this.labResults = computed(() => this.data.labResults(), ...ngDevMode ? [{ debugName: "labResults" }] : (
      /* istanbul ignore next */
      []
    ));
    this.canSave = computed(() => !!(this.formTestName().trim() && this.formResult().trim() && this.formDate()), ...ngDevMode ? [{ debugName: "canSave" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    this.loadLabResults();
  }
  ngOnDestroy() {
    this.pendingFiles.set([]);
    this.viewingAttachment.set(null);
    this.viewingResult.set(null);
  }
  loadLabResults() {
    return __async(this, null, function* () {
      const childId = this.data.activeChildId();
      if (!childId)
        return;
      this.loading.set(true);
      try {
        yield this.data.loadLabResults(childId);
      } catch (e) {
      } finally {
        this.loading.set(false);
      }
    });
  }
  openAddModal() {
    this.editingResult.set(null);
    this.formTestName.set("");
    this.formResult.set("");
    this.formUnit.set("");
    this.formReferenceRange.set("");
    this.formDate.set((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    this.formDoctor.set("");
    this.formNotes.set("");
    this.formType.set("");
    this.pendingFiles.set([]);
    this.saveError.set(null);
    this.fileError.set(null);
    this.showModal.set(true);
  }
  openEditModal(lr) {
    this.editingResult.set(lr);
    this.formTestName.set(lr.testName);
    this.formResult.set(lr.result);
    this.formUnit.set(lr.unit || "");
    this.formReferenceRange.set(lr.referenceRange || "");
    this.formDate.set(lr.date.split("T")[0]);
    this.formDoctor.set(lr.doctor || "");
    this.formNotes.set(lr.notes || "");
    this.formType.set(lr.type || "");
    const existing = (lr.attachments || []).map((att, i) => {
      const filename = this.getFilenameFromAtt(att, i);
      return {
        name: filename,
        size: Math.round(att.length * 3 / 4),
        // rough base64 estimate
        base64: att,
        mimeType: this.guessMimeType(att)
      };
    });
    this.pendingFiles.set(existing);
    this.saveError.set(null);
    this.fileError.set(null);
    this.showModal.set(true);
  }
  openViewModal(lr) {
    this.viewingResult.set(lr);
  }
  closeModal() {
    this.showModal.set(false);
    this.editingResult.set(null);
  }
  saveLabResult() {
    return __async(this, null, function* () {
      if (!this.canSave())
        return;
      const childId = this.data.activeChildId();
      if (!childId)
        return;
      this.saving.set(true);
      this.saveError.set(null);
      const attachments = this.pendingFiles().map((f) => f.base64);
      const payload = {
        testName: this.formTestName().trim(),
        result: this.formResult().trim(),
        unit: this.formUnit().trim() || void 0,
        referenceRange: this.formReferenceRange().trim() || void 0,
        date: new Date(this.formDate()).toISOString(),
        doctor: this.formDoctor().trim() || void 0,
        notes: this.formNotes().trim() || void 0,
        type: this.formType().trim() || void 0,
        attachments
      };
      try {
        if (this.editingResult()) {
          yield this.data.updateLabResult(this.editingResult().id, payload);
        } else {
          yield this.data.addLabResult(childId, payload);
        }
        yield this.data.loadLabResults(childId);
        this.closeModal();
      } catch (err) {
        this.saveError.set(err?.message || this.i18n.t()["labResults.saveError"] || "Ruajtja d\xEBshtoi.");
      } finally {
        this.saving.set(false);
      }
    });
  }
  confirmDelete(lr) {
    this.deletingResult.set(lr);
    this.showDeleteModal.set(true);
  }
  deleteLabResult() {
    return __async(this, null, function* () {
      const lr = this.deletingResult();
      if (!lr)
        return;
      try {
        yield this.data.deleteLabResult(lr.id);
        const childId = this.data.activeChildId();
        if (childId)
          yield this.data.loadLabResults(childId);
      } catch (e) {
      } finally {
        this.showDeleteModal.set(false);
        this.deletingResult.set(null);
      }
    });
  }
  formatDate(dateStr) {
    if (!dateStr)
      return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(this.i18n.isSq() ? "sq-AL" : "en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }
  getTypeLabel(type) {
    const labels = {
      hemogram: { sq: "Hemogram", en: "Hemogram" },
      urinalysis: { sq: "Analiz\xEB Urine", en: "Urinalysis" },
      biochemistry: { sq: "Biokim i gjakut", en: "Blood Biochemistry" },
      immunology: { sq: "Imunologji", en: "Immunology" },
      other: { sq: "Tjet\xEBr", en: "Other" }
    };
    return labels[type]?.[this.i18n.isSq() ? "sq" : "en"] || type;
  }
  // ─── File handling ───────────────────────────────────────────
  onDragOver(event) {
    event.preventDefault();
    this.isDragOver.set(true);
  }
  onDragLeave(event) {
    event.preventDefault();
    this.isDragOver.set(false);
  }
  onDrop(event) {
    event.preventDefault();
    this.isDragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files)
      this.processFiles(files);
  }
  onFileSelected(event) {
    const input = event.target;
    if (input.files)
      this.processFiles(input.files);
    input.value = "";
  }
  processFiles(files) {
    this.fileError.set(null);
    if (this.pendingFiles().length >= MAX_FILES) {
      this.fileError.set(this.i18n.t()["labResults.maxFilesReached"] || "Maksimumi 5 fajlla p\xEBr rezultat");
      return;
    }
    const remaining = MAX_FILES - this.pendingFiles().length;
    const toProcess = Array.from(files).slice(0, remaining);
    for (const file of toProcess) {
      if (file.size > MAX_FILE_SIZE) {
        this.fileError.set(this.i18n.t()["labResults.fileTooBig"] || "Skedari tejkalon 10MB");
        continue;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        this.fileError.set(this.i18n.t()["labResults.fileTypeError"] || "Lloji i skedarit nuk mb\xEBshtetet. Vet\xEBm PDF dhe imazhe.");
        continue;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = (e.target?.result).split(",")[1];
        const encodedAtt = this.encodeAttWithFilename(base64, file.name);
        const pending = {
          name: file.name,
          size: file.size,
          base64: encodedAtt,
          mimeType: file.type
        };
        this.pendingFiles.update((list) => [...list, pending]);
      };
      reader.readAsDataURL(file);
    }
    if (Array.from(files).length > remaining) {
      this.fileError.set(this.i18n.t()["labResults.maxFilesReached"] || "Maksimumi 5 fajlla p\xEBr rezultat");
    }
  }
  removePendingFile(index) {
    this.pendingFiles.update((list) => list.filter((_, i) => i !== index));
  }
  formatFileSize(bytes) {
    if (bytes < 1024)
      return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  guessMimeType(base64) {
    if (base64.startsWith("/9j/"))
      return "image/jpeg";
    if (base64.startsWith("iVBOR"))
      return "image/png";
    if (base64.startsWith("UEs"))
      return "application/pdf";
    if (base64.startsWith("JVBER"))
      return "application/pdf";
    return "application/octet-stream";
  }
  isPdfAttachment(base64) {
    return this.guessMimeType(base64) === "application/pdf";
  }
  getPdfUrl(base64) {
    const mime = this.guessMimeType(base64);
    return `data:${mime};base64,${base64}`;
  }
  viewAttachment(base64) {
    this.viewingAttachment.set(base64);
  }
  downloadAttachment(base64, index) {
    const mime = this.guessMimeType(base64);
    const ext = mime.split("/")[1];
    const filename = this.getFilenameFromAtt(base64, index);
    const dataUrl = `data:${mime};base64,${base64}`;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.click();
  }
  // ─── Filename encoding (preserves original name through edit cycles) ──
  encodeAttWithFilename(base64, filename) {
    try {
      const b64Name = btoa(encodeURIComponent(filename));
      return `__KDOC__${b64Name}::__${base64}`;
    } catch (e) {
      return base64;
    }
  }
  getFilenameFromAtt(base64, index) {
    const marker = "__KDOC__";
    const sep = "::__";
    const idx = base64.indexOf(marker);
    if (idx === -1) {
      return `${this.i18n.t()["labResults.attachments"] || "Dokumenti"} ${index + 1}`;
    }
    try {
      const endIdx = base64.indexOf(sep, idx);
      if (endIdx === -1)
        return `${this.i18n.t()["labResults.attachments"] || "Dokumenti"} ${index + 1}`;
      const b64Name = base64.substring(idx + marker.length, endIdx);
      return decodeURIComponent(atob(b64Name));
    } catch (e) {
      return `${this.i18n.t()["labResults.attachments"] || "Dokumenti"} ${index + 1}`;
    }
  }
  // ─── Type dropdown options ────────────────────────────────────────
  getTypeOptions() {
    return [
      { value: "hemogram", label: this.i18n.t()["labResults.typeHemogram"] || "Hemogram" },
      { value: "urinalysis", label: this.i18n.t()["labResults.typeUrinalysis"] || "Urinalysis" },
      { value: "biochemistry", label: this.i18n.t()["labResults.typeBiochemistry"] || "Blood Biochemistry" },
      { value: "immunology", label: this.i18n.t()["labResults.typeImmunology"] || "Immunology" },
      { value: "other", label: this.i18n.t()["labResults.typeOther"] || "Other" }
    ];
  }
  static {
    this.\u0275fac = function LabResultsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LabResultsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LabResultsComponent, selectors: [["app-lab-results"]], decls: 17, vars: 10, consts: [["fileInput", ""], [1, "min-h-screen", "bg-gray-50", "pb-24"], [1, "bg-white", "border-b", "border-gray-100", "px-4", "pt-6", "pb-4"], [1, "flex", "items-center", "justify-between"], [1, "text-3xl", "font-extrabold", "text-gray-800"], [1, "text-slate-400", "text-sm", "mt-1", "font-medium"], [1, "bg-indigo-500", "hover:bg-indigo-600", "text-white", "px-5", "py-2.5", "rounded-2xl", "font-bold", "shadow-sm", "transition-all", "flex", "items-center", "gap-2", "text-sm", 3, "click"], ["name", "plus", 1, "text-inherit"], [1, "px-4", "mt-4", "space-y-3"], [1, "flex", "flex-col", "items-center", "justify-center", "mt-20", "px-4"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-black/40", "backdrop-blur-sm"], [1, "fixed", "inset-0", "z-[60]", "flex", "items-center", "justify-center", "p-4", "bg-black/80", "backdrop-blur-sm"], [1, "bg-white", "rounded-2xl", "p-5", "border", "border-gray-100", "animate-pulse"], [1, "flex", "gap-4"], [1, "w-12", "h-12", "rounded-xl", "bg-gray-200"], [1, "flex-1", "space-y-2"], [1, "h-4", "bg-gray-200", "rounded", "w-1/2"], [1, "h-3", "bg-gray-100", "rounded", "w-1/3"], ["width", "160", "height", "160", "viewBox", "0 0 160 160", "fill", "none", 1, "mb-6"], ["cx", "80", "cy", "80", "r", "60", "fill", "#EEF2FF"], ["d", "M55 90 L70 90 M70 90 L70 65 M70 65 L90 65 L90 90 L110 90", "stroke", "#6366F1", "stroke-width", "4", "stroke-linecap", "round", "stroke-linejoin", "round", "fill", "none"], ["cx", "80", "cy", "50", "r", "10", "stroke", "#C7D2FE", "stroke-width", "3", "fill", "none"], [1, "text-xl", "font-extrabold", "text-gray-700", "mb-2"], [1, "text-slate-400", "text-center", "mb-6", "text-sm"], [1, "bg-indigo-500", "hover:bg-indigo-600", "text-white", "px-6", "py-3", "rounded-2xl", "font-bold", "shadow-sm", "transition-all", "text-sm", 3, "click"], ["name", "plus", 1, "text-inherit", "inline", "w-4", "h-4", "mr-1"], [1, "bg-white", "rounded-2xl", "border", "border-gray-100", "shadow-sm", "overflow-hidden"], [1, "p-5"], [1, "flex", "items-start", "gap-4"], [1, "w-12", "h-12", "rounded-xl", "bg-violet-100", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "flask-conical", 1, "text-violet-500", "w-5", "h-5"], [1, "flex-1", "min-w-0"], [1, "flex", "items-start", "justify-between", "gap-2"], [1, "font-bold", "text-gray-800", "text-base", "truncate"], [1, "text-xs", "font-semibold", "text-slate-400", "flex-shrink-0"], [1, "flex", "items-center", "gap-2", "mt-1.5", "flex-wrap"], [1, "text-lg", "font-extrabold", "text-gray-800"], [1, "text-sm", "text-slate-400"], [1, "text-xs", "text-slate-400", "bg-slate-100", "px-2", "py-0.5", "rounded-full"], [1, "mt-1"], [1, "flex", "items-center", "gap-2", "mt-1", "text-xs", "text-slate-400"], [1, "flex", "items-center", "gap-1.5", "mt-2"], [1, "mt-3", "text-xs", "text-slate-500", "bg-slate-50", "rounded-xl", "p-3"], [1, "flex", "items-center", "gap-2", "mt-4"], [1, "flex-1", "py-2", "rounded-xl", "text-xs", "font-semibold", "bg-indigo-50", "hover:bg-indigo-100", "text-indigo-600", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", 3, "click"], ["name", "eye", 1, "w-3.5", "h-3.5"], [1, "flex-1", "py-2", "rounded-xl", "text-xs", "font-semibold", "bg-slate-100", "hover:bg-slate-200", "text-slate-600", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", 3, "click"], ["name", "pencil", 1, "w-3.5", "h-3.5"], [1, "flex-1", "py-2", "rounded-xl", "text-xs", "font-semibold", "bg-red-50", "hover:bg-red-100", "text-red-600", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", 3, "click"], ["name", "trash-2", 1, "w-3.5", "h-3.5"], [1, "text-xs", "font-semibold", "text-violet-600", "bg-violet-50", "px-2", "py-0.5", "rounded-full"], ["name", "stethoscope", 1, "w-3.5", "h-3.5", "flex-shrink-0"], [1, "text-xs", "font-semibold", "text-indigo-600", "bg-indigo-50", "px-2", "py-0.5", "rounded-full", "flex", "items-center", "gap-1"], ["name", "paperclip", 1, "w-3", "h-3"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-black/40", "backdrop-blur-sm", 3, "click"], [1, "bg-white", "rounded-3xl", "shadow-2xl", "w-full", "max-w-md", "max-h-[90vh]", "overflow-y-auto", 3, "click"], [1, "px-6", "pt-6", "pb-4", "border-b", "border-gray-100", "flex", "items-center", "justify-between"], [1, "text-xl", "font-extrabold", "text-gray-800"], [1, "p-2", "rounded-xl", "hover:bg-gray-100", "transition-colors", 3, "click"], ["name", "x", 1, "w-5", "h-5", "text-slate-400"], [1, "p-6", "space-y-5"], [1, "block", "text-xs", "font-bold", "text-primary-700", "mb-2", "uppercase", "tracking-wider"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "font-medium", 3, "ngModelChange", "ngModel", "placeholder"], [1, "text-slate-400", "normal-case", "font-normal", "text-xs", "ml-1"], [1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "font-medium", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "grid", "grid-cols-2", "gap-3"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "font-medium", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "g/dL", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "font-medium", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "P.sh. 12.0 - 16.0", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "font-medium", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", 3, "ngModelChange", "ngModel"], ["rows", "2", "maxlength", "500", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "resize-none", 3, "ngModelChange", "ngModel", "placeholder"], [1, "mt-3", "space-y-2"], [1, "p-3", "bg-red-50", "border", "border-red-200", "rounded-xl", "text-red-600", "text-sm", "font-semibold", "mt-2"], [1, "p-3", "bg-red-50", "border", "border-red-200", "rounded-xl", "text-red-600", "text-sm", "font-semibold"], [1, "px-6", "pb-6", "flex", "gap-3"], [1, "flex-1", "py-3.5", "rounded-2xl", "font-bold", "text-slate-600", "bg-slate-100", "hover:bg-slate-200", "transition-all", "text-sm", 3, "click"], [1, "flex-1", "py-3.5", "rounded-2xl", "font-bold", "text-white", "bg-indigo-500", "hover:bg-indigo-600", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "text-sm", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], [1, "border-2", "border-dashed", "border-slate-300", "rounded-2xl", "p-6", "text-center", "cursor-pointer", "hover:border-indigo-400", "hover:bg-indigo-50/30", "transition-all", 3, "click", "dragover", "dragleave", "drop"], ["name", "upload-cloud", 1, "w-8", "h-8", "text-slate-400", "mx-auto", "mb-2"], [1, "text-sm", "text-slate-500"], [1, "text-xs", "text-slate-400", "mt-1"], ["type", "file", "accept", ".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp", 1, "hidden", 3, "change"], [1, "flex", "items-center", "gap-3", "bg-slate-50", "rounded-xl", "p-3", "border", "border-slate-200"], [1, "w-10", "h-10", "rounded-lg", "bg-indigo-100", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "file-text", 1, "w-5", "h-5", "text-red-500"], ["name", "image", 1, "w-5", "h-5", "text-indigo-500"], [1, "text-sm", "font-semibold", "text-gray-800", "truncate"], [1, "text-xs", "text-slate-400"], [1, "p-1.5", "rounded-lg", "hover:bg-red-100", "text-red-500", "transition-colors", "flex-shrink-0", 3, "click"], ["name", "x", 1, "w-4", "h-4"], ["name", "loader-2", 1, "w-4", "h-4", "animate-spin"], ["name", "check", 1, "w-4", "h-4"], [1, "bg-white", "rounded-3xl", "shadow-2xl", "w-full", "max-w-md", 3, "click"], [1, "p-6", "space-y-4"], [1, "grid", "grid-cols-2", "gap-4"], [1, "bg-slate-50", "rounded-2xl", "p-4"], [1, "text-xs", "text-slate-400", "font-semibold", "uppercase", "tracking-wider", "mb-1"], [1, "text-sm", "font-normal", "text-slate-400"], [1, "bg-violet-50", "rounded-2xl", "p-4"], [1, "flex", "items-center", "gap-2", "text-sm", "text-slate-500"], [1, "border", "border-slate-200", "rounded-2xl", "overflow-hidden"], [1, "px-6", "pb-6"], [1, "w-full", "py-3.5", "rounded-2xl", "font-bold", "text-slate-600", "bg-slate-100", "hover:bg-slate-200", "transition-all", "text-sm", 3, "click"], [1, "text-xs", "text-violet-500", "font-semibold", "uppercase", "tracking-wider", "mb-1"], [1, "text-base", "font-bold", "text-violet-700"], ["name", "stethoscope", 1, "w-4", "h-4", "text-slate-400"], [1, "text-sm", "text-slate-600"], [1, "px-4", "py-3", "bg-slate-50", "border-b", "border-slate-200"], [1, "text-xs", "font-bold", "text-slate-500", "uppercase", "tracking-wider"], [1, "p-4", "space-y-3"], [1, "flex", "items-center", "gap-3", "bg-white", "border", "border-slate-100", "rounded-xl", "p-3"], ["name", "file-text", 1, "w-5", "h-5", "text-indigo-500"], [1, "text-sm", "font-semibold", "text-gray-700"], [1, "flex", "gap-1"], [1, "p-2", "rounded-lg", "bg-indigo-50", "hover:bg-indigo-100", "text-indigo-600", "transition-colors", 3, "click"], ["name", "eye", 1, "w-4", "h-4"], [1, "p-2", "rounded-lg", "bg-slate-50", "hover:bg-slate-100", "text-slate-600", "transition-colors", 3, "click"], ["name", "download", 1, "w-4", "h-4"], [1, "fixed", "inset-0", "z-[60]", "flex", "items-center", "justify-center", "p-4", "bg-black/80", "backdrop-blur-sm", 3, "click"], [1, "bg-white", "rounded-3xl", "shadow-2xl", "w-full", "max-w-2xl", "max-h-[90vh]", "overflow-hidden", "flex", "flex-col", 3, "click"], [1, "px-6", "py-4", "border-b", "border-gray-200", "flex", "items-center", "justify-between", "bg-slate-50"], [1, "text-sm", "font-bold", "text-gray-700"], [1, "flex", "gap-2"], [1, "p-2", "rounded-xl", "bg-indigo-50", "hover:bg-indigo-100", "text-indigo-600", "transition-colors", 3, "click"], [1, "p-2", "rounded-xl", "hover:bg-gray-200", "text-gray-500", "transition-colors", 3, "click"], ["name", "x", 1, "w-5", "h-5"], [1, "flex-1", "overflow-auto", "p-4", "bg-gray-100"], [1, "w-full", "h-full", "min-h-[500px]", "rounded-xl", "border-0", 3, "src"], ["alt", "Attachment", 1, "max-w-full", "max-h-full", "object-contain", "rounded-xl", "mx-auto", 3, "src"], [1, "bg-white", "rounded-3xl", "shadow-2xl", "w-full", "max-w-sm", "p-6", 3, "click"], [1, "w-14", "h-14", "bg-red-100", "rounded-2xl", "flex", "items-center", "justify-center", "mx-auto", "mb-4"], ["name", "trash-2", 1, "text-red-500", "w-6", "h-6"], [1, "text-lg", "font-extrabold", "text-gray-800", "text-center", "mb-2"], [1, "text-slate-500", "text-sm", "text-center", "mb-6"], [1, "flex", "gap-3"], [1, "flex-1", "py-3", "rounded-2xl", "font-bold", "text-slate-600", "bg-slate-100", "hover:bg-slate-200", "transition-all", "text-sm", 3, "click"], [1, "flex-1", "py-3", "rounded-2xl", "font-bold", "text-white", "bg-red-500", "hover:bg-red-600", "transition-all", "text-sm", 3, "click"]], template: function LabResultsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div")(4, "h1", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(6, LabResultsComponent_Conditional_6_Template, 2, 1, "p", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 6);
        \u0275\u0275listener("click", function LabResultsComponent_Template_button_click_7_listener() {
          return ctx.openAddModal();
        });
        \u0275\u0275element(8, "lucide-icon", 7);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(10, LabResultsComponent_Conditional_10_Template, 3, 1, "div", 8);
        \u0275\u0275conditionalCreate(11, LabResultsComponent_Conditional_11_Template, 12, 3, "div", 9);
        \u0275\u0275conditionalCreate(12, LabResultsComponent_Conditional_12_Template, 3, 0, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(13, LabResultsComponent_Conditional_13_Template, 68, 33, "div", 10);
        \u0275\u0275conditionalCreate(14, LabResultsComponent_Conditional_14_Template, 28, 12, "div", 10);
        \u0275\u0275conditionalCreate(15, LabResultsComponent_Conditional_15_Template, 13, 2, "div", 11);
        \u0275\u0275conditionalCreate(16, LabResultsComponent_Conditional_16_Template, 13, 4, "div", 10);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.i18n.t()["labResults.title"] || "Rezultatet e Laboratorit");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeChild() ? 6 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["labResults.add"] || "Shto Rezultat", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading() && ctx.labResults().length === 0 ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading() && ctx.labResults().length > 0 ? 12 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showModal() ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.viewingResult() ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.viewingAttachment() ? 15 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showDeleteModal() ? 16 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, LucideAngularModule, LucideAngularComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LabResultsComponent, [{
    type: Component,
    args: [{ selector: "app-lab-results", imports: [CommonModule, FormsModule, LucideAngularModule], template: `
    <div class="min-h-screen bg-gray-50 pb-24">

      <!-- Header -->
      <div class="bg-white border-b border-gray-100 px-4 pt-6 pb-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['labResults.title'] || 'Rezultatet e Laboratorit' }}</h1>
            @if (activeChild()) {
              <p class="text-slate-400 text-sm mt-1 font-medium">{{ activeChild()?.name }}</p>
            }
          </div>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ i18n.t()['labResults.add'] || 'Shto Rezultat' }}
          </button>
        </div>
      </div>

      <!-- Loading Skeleton -->
      @if (loading()) {
        <div class="px-4 mt-4 space-y-3">
          @for (i of [1,2,3]; track i) {
            <div class="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-gray-200"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-3 bg-gray-100 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Empty State -->
      @if (!loading() && labResults().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" class="mb-6">
            <circle cx="80" cy="80" r="60" fill="#EEF2FF"/>
            <path d="M55 90 L70 90 M70 90 L70 65 M70 65 L90 65 L90 90 L110 90" stroke="#6366F1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <circle cx="80" cy="50" r="10" stroke="#C7D2FE" stroke-width="3" fill="none"/>
          </svg>
          <h3 class="text-xl font-extrabold text-gray-700 mb-2">
            {{ i18n.t()['labResults.empty'] || 'Nuk ka rezultate laboratorike' }}
          </h3>
          <p class="text-slate-400 text-center mb-6 text-sm">
            {{ i18n.t()['labResults.emptyHint'] || 'Shtoni rezultatet e testimit p\xEBr t\xEB ndjekur sh\xEBndetin' }}
          </p>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm">
            <lucide-icon name="plus" class="text-inherit inline w-4 h-4 mr-1"></lucide-icon>
            {{ i18n.t()['labResults.addFirst'] || 'Shto rezultatin e par\xEB' }}
          </button>
        </div>
      }

      <!-- Lab Results List -->
      @if (!loading() && labResults().length > 0) {
        <div class="px-4 mt-4 space-y-3">
          @for (lr of labResults(); track lr.id) {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <!-- Icon -->
                  <div class="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <lucide-icon name="flask-conical" class="text-violet-500 w-5 h-5"></lucide-icon>
                  </div>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <h3 class="font-bold text-gray-800 text-base truncate">{{ lr.testName }}</h3>
                      <span class="text-xs font-semibold text-slate-400 flex-shrink-0">
                        {{ formatDate(lr.date) }}
                      </span>
                    </div>

                    <!-- Result Value -->
                    <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span class="text-lg font-extrabold text-gray-800">{{ lr.result }}</span>
                      @if (lr.unit) {
                        <span class="text-sm text-slate-400">{{ lr.unit }}</span>
                      }
                      @if (lr.referenceRange) {
                        <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {{ i18n.t()['labResults.refRange'] || 'Ref' }}: {{ lr.referenceRange }}
                        </span>
                      }
                    </div>

                    <!-- Type badge -->
                    @if (lr.type) {
                      <div class="mt-1">
                        <span class="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                          {{ getTypeLabel(lr.type) }}
                        </span>
                      </div>
                    }

                    <!-- Doctor -->
                    @if (lr.doctor) {
                      <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <lucide-icon name="stethoscope" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                        <span>{{ lr.doctor }}</span>
                      </div>
                    }

                    <!-- Attachments badge -->
                    @if (lr.attachments && lr.attachments.length > 0) {
                      <div class="flex items-center gap-1.5 mt-2">
                        <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <lucide-icon name="paperclip" class="w-3 h-3"></lucide-icon>
                          {{ lr.attachments.length }} {{ i18n.t()['labResults.attachments'] || 'Dokumente' }}
                        </span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Notes -->
                @if (lr.notes) {
                  <div class="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
                    {{ lr.notes }}
                  </div>
                }

                <!-- Actions -->
                <div class="flex items-center gap-2 mt-4">
                  <button (click)="openViewModal(lr)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="eye" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['labResults.view'] || 'Shiko Detajet' }}
                  </button>
                  <button (click)="openEditModal(lr)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="pencil" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['medications.edit'] || 'Redakto' }}
                  </button>
                  <button (click)="confirmDelete(lr)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="trash-2" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['labResults.delete'] || 'Fshi' }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>

    <!-- Add/Edit Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="closeModal()">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
             (click)="$event.stopPropagation()">

          <!-- Modal Header -->
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">
              {{ editingResult() ? (i18n.t()['labResults.editResult'] || 'Redakto Rezultatin') : (i18n.t()['labResults.addResult'] || 'Shto Rezultat Laboratori') }}
            </h2>
            <button (click)="closeModal()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-5">

            <!-- Test Name -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.testName'] || 'Emri i Testit' }} *
              </label>
              <input type="text" [(ngModel)]="formTestName"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['labResults.testNamePlaceholder'] || 'P.sh. Gjak i plot\xEB'">
            </div>

            <!-- Type -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.type'] || 'Lloji i Testit' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <select [(ngModel)]="formType"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium">
                <option value="">--</option>
                @for (opt of getTypeOptions(); track opt.value) {
                  <option [value]="opt.value">{{ opt.label }}</option>
                }
              </select>
            </div>

            <!-- Result + Unit -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                  {{ i18n.t()['labResults.result'] || 'Rezultati' }} *
                </label>
                <input type="text" [(ngModel)]="formResult"
                  class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium">
              </div>
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                  {{ i18n.t()['labResults.unit'] || 'Nj\xEBsia' }}
                </label>
                <input type="text" [(ngModel)]="formUnit"
                  class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                  placeholder="g/dL">
              </div>
            </div>

            <!-- Reference Range -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.referenceRange'] || 'Vlera Referente' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <input type="text" [(ngModel)]="formReferenceRange"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                placeholder="P.sh. 12.0 - 16.0">
            </div>

            <!-- Date -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.date'] || 'Data e Testit' }} *
              </label>
              <input type="date" [(ngModel)]="formDate"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
            </div>

            <!-- Doctor -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.doctor'] || 'Doktori' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <input type="text" [(ngModel)]="formDoctor"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['labResults.doctorPlaceholder'] || 'P.sh. Dr. Arben Basha'">
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.notes'] || 'Sh\xEBnime' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <textarea [(ngModel)]="formNotes" rows="2" maxlength="500"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                [placeholder]="i18n.t()['labResults.notesPlaceholder'] || 'Sh\xEBno detajet shtes\xEB...'"></textarea>
            </div>

            <!-- Attachments -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.attachments'] || 'Dokumente' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>

              <!-- Drop zone -->
              @if (pendingFiles().length < MAX_FILES) {
                <div
                  class="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all"
                  (click)="fileInput.click()"
                  (dragover)="onDragOver($event)"
                  (dragleave)="onDragLeave($event)"
                  (drop)="onDrop($event)">
                  <lucide-icon name="upload-cloud" class="w-8 h-8 text-slate-400 mx-auto mb-2"></lucide-icon>
                  <p class="text-sm text-slate-500">{{ i18n.t()['labResults.dropZoneHint'] || 'Zv\xEBre dokumentin ose kliko p\xEBr t\xEB zgjedhur' }}</p>
                  <p class="text-xs text-slate-400 mt-1">PDF, PNG, JPG, WebP \xB7 max 10MB</p>
                </div>
                <input #fileInput type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp" class="hidden" (change)="onFileSelected($event)">
              }

              <!-- File list -->
              @if (pendingFiles().length > 0) {
                <div class="mt-3 space-y-2">
                  @for (file of pendingFiles(); track $index) {
                    <div class="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                      <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        @if (file.mimeType === 'application/pdf') {
                          <lucide-icon name="file-text" class="w-5 h-5 text-red-500"></lucide-icon>
                        } @else {
                          <lucide-icon name="image" class="w-5 h-5 text-indigo-500"></lucide-icon>
                        }
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800 truncate">{{ file.name }}</p>
                        <p class="text-xs text-slate-400">{{ formatFileSize(file.size) }}</p>
                      </div>
                      <button (click)="removePendingFile($index)"
                        class="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors flex-shrink-0">
                        <lucide-icon name="x" class="w-4 h-4"></lucide-icon>
                      </button>
                    </div>
                  }
                </div>
              }

              <!-- Error -->
              @if (fileError()) {
                <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold mt-2">
                  {{ fileError() }}
                </div>
              }
            </div>

            <!-- Save Error -->
            @if (saveError()) {
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
                {{ saveError() }}
              </div>
            }
          </div>

          <!-- Modal Footer -->
          <div class="px-6 pb-6 flex gap-3">
            <button (click)="closeModal()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['labResults.cancel'] || 'Anulo' }}
            </button>
            <button (click)="saveLabResult()"
              [disabled]="saving() || !canSave()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2">
              @if (saving()) {
                <lucide-icon name="loader-2" class="w-4 h-4 animate-spin"></lucide-icon>
                {{ i18n.t()['labResults.saving'] || 'Duke ruajtur...' }}
              } @else {
                <lucide-icon name="check" class="w-4 h-4"></lucide-icon>
                {{ i18n.t()['labResults.save'] || 'Ruaj' }}
              }
            </button>
          </div>
        </div>
      </div>
    }

    <!-- View Modal -->
    @if (viewingResult()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="viewingResult.set(null)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md"
             (click)="$event.stopPropagation()">

          <!-- Modal Header -->
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">
              {{ viewingResult()!.testName }}
            </h2>
            <button (click)="viewingResult.set(null)" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-50 rounded-2xl p-4">
                <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.result'] || 'Rezultati' }}</p>
                <p class="text-lg font-extrabold text-gray-800">{{ viewingResult()!.result }}
                  @if (viewingResult()!.unit) {
                    <span class="text-sm font-normal text-slate-400">{{ viewingResult()!.unit }}</span>
                  }
                </p>
              </div>
              <div class="bg-slate-50 rounded-2xl p-4">
                <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.date'] || 'Data' }}</p>
                <p class="text-lg font-extrabold text-gray-800">{{ formatDate(viewingResult()!.date) }}</p>
              </div>
            </div>

            @if (viewingResult()!.type) {
              <div class="bg-violet-50 rounded-2xl p-4">
                <p class="text-xs text-violet-500 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.type'] || 'Lloji i Testit' }}</p>
                <p class="text-base font-bold text-violet-700">{{ getTypeLabel(viewingResult()!.type!) }}</p>
              </div>
            }

            @if (viewingResult()!.referenceRange) {
              <div class="bg-violet-50 rounded-2xl p-4">
                <p class="text-xs text-violet-500 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.referenceRange'] || 'Vlera Referente' }}</p>
                <p class="text-base font-bold text-violet-700">{{ viewingResult()!.referenceRange }}</p>
              </div>
            }

            @if (viewingResult()!.doctor) {
              <div class="flex items-center gap-2 text-sm text-slate-500">
                <lucide-icon name="stethoscope" class="w-4 h-4 text-slate-400"></lucide-icon>
                <span>{{ viewingResult()!.doctor }}</span>
              </div>
            }

            @if (viewingResult()!.notes) {
              <div class="bg-slate-50 rounded-2xl p-4">
                <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.notes'] || 'Sh\xEBnime' }}</p>
                <p class="text-sm text-slate-600">{{ viewingResult()!.notes }}</p>
              </div>
            }

            <!-- Attachments section -->
            @if (viewingResult()!.attachments && viewingResult()!.attachments.length > 0) {
              <div class="border border-slate-200 rounded-2xl overflow-hidden">
                <div class="px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {{ i18n.t()['labResults.attachments'] || 'Dokumente' }} ({{ viewingResult()!.attachments!.length }})
                  </p>
                </div>
                <div class="p-4 space-y-3">
                  @for (att of viewingResult()!.attachments; track $index) {
                    <div class="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3">
                      <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <lucide-icon name="file-text" class="w-5 h-5 text-indigo-500"></lucide-icon>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-700">{{ i18n.t()['labResults.attachments'] || 'Dokumenti' }} {{ $index + 1 }}</p>
                      </div>
                      <div class="flex gap-1">
                        <button (click)="viewAttachment(att)"
                          class="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors">
                          <lucide-icon name="eye" class="w-4 h-4"></lucide-icon>
                        </button>
                        <button (click)="downloadAttachment(att, $index)"
                          class="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors">
                          <lucide-icon name="download" class="w-4 h-4"></lucide-icon>
                        </button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Modal Footer -->
          <div class="px-6 pb-6">
            <button (click)="viewingResult.set(null)"
              class="w-full py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['labResults.close'] || 'Mbyll' }}
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Attachment Viewer Modal -->
    @if (viewingAttachment()) {
      <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
           (click)="viewingAttachment.set(null)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
             (click)="$event.stopPropagation()">

          <!-- Viewer Header -->
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-slate-50">
            <p class="text-sm font-bold text-gray-700">{{ i18n.t()['labResults.viewAttachment'] || 'Shiko Dokumentin' }}</p>
            <div class="flex gap-2">
              <button (click)="downloadAttachment(viewingAttachment()!, 0)"
                class="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors">
                <lucide-icon name="download" class="w-4 h-4"></lucide-icon>
              </button>
              <button (click)="viewingAttachment.set(null)" class="p-2 rounded-xl hover:bg-gray-200 text-gray-500 transition-colors">
                <lucide-icon name="x" class="w-5 h-5"></lucide-icon>
              </button>
            </div>
          </div>

          <!-- Viewer Body -->
          <div class="flex-1 overflow-auto p-4 bg-gray-100">
            @if (isPdfAttachment(viewingAttachment()!)) {
              <iframe [src]="getPdfUrl(viewingAttachment()!)" class="w-full h-full min-h-[500px] rounded-xl border-0"></iframe>
            } @else {
              <img [src]="viewingAttachment()!" class="max-w-full max-h-full object-contain rounded-xl mx-auto" alt="Attachment">
            }
          </div>
        </div>
      </div>
    }

    <!-- Delete Confirmation Modal -->
    @if (showDeleteModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="showDeleteModal.set(false)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6"
             (click)="$event.stopPropagation()">
          <div class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <lucide-icon name="trash-2" class="text-red-500 w-6 h-6"></lucide-icon>
          </div>
          <h3 class="text-lg font-extrabold text-gray-800 text-center mb-2">
            {{ i18n.t()['labResults.deleteConfirmTitle'] || 'Fshij Rezultatin?' }}
          </h3>
          <p class="text-slate-500 text-sm text-center mb-6">
            {{ deletingResult()?.testName }}
          </p>
          <div class="flex gap-3">
            <button (click)="showDeleteModal.set(false)"
              class="flex-1 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['labResults.cancel'] || 'Anulo' }}
            </button>
            <button (click)="deleteLabResult()"
              class="flex-1 py-3 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all text-sm">
              {{ i18n.t()['labResults.delete'] || 'Fshi' }}
            </button>
          </div>
        </div>
      </div>
    }
  ` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LabResultsComponent, { className: "LabResultsComponent", filePath: "src/app/components/lab-results/lab-results.component.ts", lineNumber: 539 });
})();
export {
  LabResultsComponent
};
//# sourceMappingURL=chunk-YUGAGALH.js.map
