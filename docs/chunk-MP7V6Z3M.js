import{A as L,a as E,b as c,d as x,e as g,f as S,h as C,i as V,k as I,l as M,o as _,p as q,q as N,t as T,u as h,x as w,y as D,z as A}from"./chunk-MBJSZB2B.js";import{i as j,k as B}from"./chunk-M5YW3KYN.js";import{a as b}from"./chunk-VDCNSOUF.js";import"./chunk-6UOKHWNW.js";import{Ia as r,Ta as y,Xa as d,aa as v,bb as a,fb as u,ib as n,jb as i,kb as l,la as F,nb as G,ob as f,yb as m,zb as s}from"./chunk-SVKJO3NG.js";function R(e,p){if(e&1&&(n(0,"mat-error"),m(1),i()),e&2){let t=f();r(),s(t.formatErrors(t.formGroup.controls.from))}}function k(e,p){if(e&1&&(n(0,"mat-error"),m(1),i()),e&2){let t=f();r(),s(t.formatErrors(t.formGroup.controls.to))}}var P=class e{injector=v(F);ExtraValidators=L(this.injector);formGroup=new S({from:new C("Bob",{nonNullable:!0,validators:[c.required,this.ExtraValidators.differentFrom("to")]}),to:new C("Alice",{nonNullable:!0,validators:[c.required,this.ExtraValidators.differentFrom("from")]})});formatErrors=A;onNgSubmit(){this.formGroup.invalid||alert("Submitted")}code=`
new FormControl('', {
  validators: [
    ExtraValidators.differentFrom('to'),
  ],
})
new FormControl('', {
  validators: [
    ExtraValidators.differentFrom('from'),
  ],
})
  `.trim();static \u0275fac=function(t){return new(t||e)};static \u0275cmp=y({type:e,selectors:[["app-inequality-validation"]],decls:17,vars:7,consts:[[3,"ngSubmit","formGroup"],["matInput","","type","text","name","from",3,"formControl"],["matInput","","type","text","name","to",3,"formControl"],["mat-flat-button","",3,"disabled"],["language","typescript",3,"code"]],template:function(t,o){t&1&&(n(0,"form",0),G("ngSubmit",function(){return o.onNgSubmit()}),n(1,"p")(2,"mat-form-field")(3,"mat-label"),m(4,"From account"),i(),l(5,"input",1),d(6,R,2,1,"mat-error"),i()(),n(7,"p")(8,"mat-form-field")(9,"mat-label"),m(10,"To account"),i(),l(11,"input",2),d(12,k,2,1,"mat-error"),i()(),n(13,"p")(14,"button",3),m(15,"Submit"),i()()(),l(16,"app-code",4)),t&2&&(a("formGroup",o.formGroup),r(5),a("formControl",o.formGroup.controls.from),r(),u(o.formGroup.controls.from.touched&&o.formGroup.controls.from.invalid?6:-1),r(5),a("formControl",o.formGroup.controls.to),r(),u(o.formGroup.controls.to.touched&&o.formGroup.controls.to.invalid?12:-1),r(2),a("disabled",o.formGroup.invalid),r(2),a("code",o.code))},dependencies:[h,T,q,N,B,j,D,w,_,V,E,x,g,I,M,b],encapsulation:2})};export{P as InequalityValidationComponent};
